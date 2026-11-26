<?php
// UNBOND – zentraler Brevo-Opt-in
// Haupt-Leadmagnet -> Liste 12
// SOS-Notfallkoffer -> Liste 13
// Keine Test-/Report-Routings. Erfolg erst nach verifizierter Listenzugehörigkeit.
// Optional: Double-Opt-in pro Liste (Schalter BREVO_DOI_TEMPLATE_* unten, 0 = aus).

declare(strict_types=1);

/*
======================================================================
                 !!! BREVO API-SCHLUESSEL !!!
======================================================================

WICHTIG: Den API-Schluessel NICHT direkt in diese PHP-Datei schreiben.

EMPFOHLENER UND VORGESEHENER ORT:

    brevo_key.txt

Die Datei muss EINE EBENE OBERHALB von public_html liegen.

Beispiel:

    /home/DEIN-ACCOUNT/brevo_key.txt          <-- HIER kommt der API-Key hinein
    /home/DEIN-ACCOUNT/public_html/
        send_to_brevo.php                    <-- DIESE PHP-DATEI
        index.html
        script.js

In brevo_key.txt steht NUR der Brevo-API-Key, zum Beispiel:

    xkeysib-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

Keine Anfuehrungszeichen, kein "BREVO_API_KEY=", keine Leerzeichen davor.

Diese PHP-Datei liest den Schluessel unten automatisch aus:
    dirname(__DIR__) . '/brevo_key.txt'

Alternativ kann der Server eine Umgebungsvariable BREVO_API_KEY setzen.
Diese wird zuerst verwendet.
======================================================================
*/

const BREVO_LIST_MAIN = 12;
const BREVO_LIST_SOS = 13;
const MAX_VERIFY_ATTEMPTS = 3;

/*
======================================================================
             DOUBLE-OPT-IN (BESTAETIGUNGSMAIL) – SCHALTER
======================================================================

Hier stellst du ein, ob eine Frau ihre Anmeldung erst per Mail
bestaetigen muss, bevor sie in der Liste landet (Double-Opt-in).

    0            = AUS. Alles bleibt wie bisher: Die Adresse wird
                   sofort in die Liste eingetragen.
    eine Zahl    = AN. Die Zahl ist die ID deiner DOI-Vorlage in Brevo
    groesser 0     (Marketing -> Templates, die Nummer hinter dem #).
                   Brevo schickt dann eine Mail mit dem Knopf
                   "Anmeldung bestaetigen". Erst nach dem Klick steht die
                   Adresse in der Liste. Der Link ist 30 Tage gueltig.

Beispiel: Deine Vorlage heisst "#45" -> eintragen:
    const BREVO_DOI_TEMPLATE_SOS = 45;

Die Vorlage braucht in Brevo das Tag "optin" und einen Knopf mit dem
Link-Typ "Double-Opt-in-Link". Ohne aktive Vorlage NICHT umstellen.

Nach dem Aendern diese Datei erneut nach public_html hochladen.

REDIRECT = die Seite, die sich nach dem Klick auf den Bestaetigungs-
knopf oeffnet. Muss mit https:// beginnen.
======================================================================
*/
const BREVO_DOI_TEMPLATE_SOS = 0;    // SOS-Notfallkoffer (Liste 13)
const BREVO_DOI_TEMPLATE_MAIN = 0;   // Haupt-Leadmagnet (Liste 12)
const BREVO_DOI_REDIRECT_SOS = 'https://www.unbond.de/no-contact/bestaetigt.html';
const BREVO_DOI_REDIRECT_MAIN = 'https://www.unbond.de/';

header('Content-Type: application/json; charset=UTF-8');
header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
header('Pragma: no-cache');
header('X-Content-Type-Options: nosniff');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Accept');

$allowedOrigins = [
    'https://unbond.de',
    'https://www.unbond.de',
];
$origin = (string) ($_SERVER['HTTP_ORIGIN'] ?? '');
if ($origin !== '' && in_array($origin, $allowedOrigins, true)) {
    header('Access-Control-Allow-Origin: ' . $origin);
    header('Vary: Origin');
}

$method = strtoupper((string) ($_SERVER['REQUEST_METHOD'] ?? ''));
if ($method === 'OPTIONS') {
    http_response_code(204);
    exit;
}
if ($method !== 'POST') {
    respond(false, 'Nur POST-Anfragen sind erlaubt.', 405);
}
if (!function_exists('curl_init')) {
    respond(false, 'PHP-cURL ist auf dem Server nicht aktiv.', 500);
}

// ================================================================
// API-KEY LADEN
// 1. bevorzugt aus der Server-Umgebungsvariable BREVO_API_KEY
// 2. sonst aus ../brevo_key.txt  <<< HIER LIEGT DEIN API-SCHLUESSEL
// ================================================================
$apiKey = trim((string) (getenv('BREVO_API_KEY') ?: ''));
if ($apiKey === '') {
    $keyFile = dirname(__DIR__) . '/brevo_key.txt'; // <<< API-KEY-DATEI
    if (is_readable($keyFile)) {
        $apiKey = trim((string) file_get_contents($keyFile));
    }
}
if ($apiKey === '') {
    respond(false, 'Der Brevo-API-Key ist serverseitig nicht hinterlegt.', 500);
}

$raw = (string) file_get_contents('php://input');
$data = json_decode($raw, true);
if (!is_array($data)) {
    respond(false, 'Die Anfrage enthält kein gültiges JSON.', 400);
}

$email = strtolower(trim((string) ($data['email'] ?? '')));
$vorname = trim((string) ($data['vorname'] ?? $data['first_name'] ?? ''));
$profil = strtolower(trim((string) ($data['profil'] ?? '')));
$test = strtolower(trim((string) ($data['test'] ?? '')));
$quelle = strtolower(trim((string) ($data['quelle'] ?? $data['entry_source'] ?? '')));
$zustand = strtolower(trim((string) ($data['zustand'] ?? '')));

if ($email === '' || strlen($email) > 254 || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond(false, 'Bitte gib eine gültige E-Mail-Adresse ein.', 400);
}

$isSos = in_array($profil, [
    'notfallkoffer_sos',
    'landingpage_sos',
    'sos_notfallkoffer',
], true)
    || in_array($test, ['notfallkoffer', 'sos'], true)
    || in_array($zustand, ['sos_notfallkoffer', 'notfallkoffer_sos'], true)
    || $quelle === 'manychat_instagram_sos';

$listId = $isSos ? BREVO_LIST_SOS : BREVO_LIST_MAIN;

// Auf der Haupt-Landingpage ist der Vorname Pflicht; der SOS-Funnel darf nur E-Mail senden.
if (!$isSos && $vorname === '') {
    respond(false, 'Bitte gib deinen Vornamen ein.', 400);
}
if ($vorname !== '') {
    $nameLength = function_exists('mb_strlen') ? mb_strlen($vorname, 'UTF-8') : strlen($vorname);
    if ($nameLength > 80) {
        respond(false, 'Der Vorname ist zu lang.', 400);
    }
}

// ================================================================
// DOUBLE-OPT-IN-MODUS
// Nur aktiv, wenn oben fuer diese Liste eine Vorlagen-ID > 0 steht.
// Bei 0 wird dieser Block uebersprungen und es geht unveraendert
// mit der direkten Eintragung (Schritt 1 bis 4) weiter.
// ================================================================
$doiTemplateId = (int) ($isSos ? BREVO_DOI_TEMPLATE_SOS : BREVO_DOI_TEMPLATE_MAIN);
if ($doiTemplateId > 0) {
    $funnel = $isSos ? 'sos' : 'main';

    // a) Ist die Adresse schon bestaetigt in der Zielliste (und nicht abgemeldet)?
    //    Dann keine zweite Bestaetigungsmail verschicken.
    $existing = brevoRequest(
        'GET',
        'https://api.brevo.com/v3/contacts/' . rawurlencode($email) . '?identifierType=email_id',
        null,
        $apiKey
    );
    if ($existing['curl_error'] === '' && $existing['status'] >= 200 && $existing['status'] < 300
        && is_array($existing['body'])) {
        $existingLists = isset($existing['body']['listIds']) && is_array($existing['body']['listIds'])
            ? array_map('intval', $existing['body']['listIds'])
            : [];
        $blacklisted = !empty($existing['body']['emailBlacklisted']);
        if (in_array($listId, $existingLists, true) && !$blacklisted) {
            respond(true, null, 200, [
                'already_subscribed' => true,
                'list_id' => $listId,
                'funnel' => $funnel,
            ]);
        }
    } elseif ($existing['status'] !== 404) {
        // 404 = Kontakt gibt es noch nicht (normal). Alles andere nur protokollieren
        // und trotzdem die Bestaetigungsmail anfordern.
        serverLog('doi_lookup http=' . $existing['status'] . ' curl=' . $existing['curl_error'], $email);
    }

    // b) Brevo verschickt die Bestaetigungsmail. Erst nach dem Klick landet
    //    der Kontakt in der Liste.
    $doiPayload = [
        'email' => $email,
        'includeListIds' => [$listId],
        'templateId' => $doiTemplateId,
        'redirectionUrl' => $isSos ? BREVO_DOI_REDIRECT_SOS : BREVO_DOI_REDIRECT_MAIN,
    ];
    if ($vorname !== '') {
        $doiPayload['attributes'] = ['VORNAME' => $vorname];
    }
    $doi = brevoRequest('POST', 'https://api.brevo.com/v3/contacts/doubleOptinConfirmation', $doiPayload, $apiKey);

    // c) 201 = neu angelegt, 204 = Kontakt gab es schon; in beiden Faellen ist die Mail unterwegs.
    if ($doi['curl_error'] !== '') {
        serverLog('doi list=' . $listId . ' curl=' . $doi['curl_error'], $email);
        respond(false, 'Brevo konnte nicht erreicht werden.', 502, [
            'brevo_step' => 'doi',
        ]);
    }
    if ($doi['status'] < 200 || $doi['status'] >= 300) {
        serverLog('doi list=' . $listId . ' template=' . $doiTemplateId . ' http=' . $doi['status'] . ' body=' . compactBody($doi['raw']), $email);
        respond(false, 'Die Bestätigungsmail konnte gerade nicht verschickt werden. Bitte versuch es in ein paar Minuten noch einmal.', 502, [
            'brevo_step' => 'doi',
            'brevo_status' => $doi['status'],
        ]);
    }

    respond(true, null, 200, [
        'doi_pending' => true,
        'list_id' => $listId,
        'funnel' => $funnel,
    ]);
}

// 1) Kontakt bewusst ohne optionale Custom-Attribute anlegen/aktualisieren.
// So kann ein fehlendes oder falsch typisiertes Attribut den Opt-in nicht blockieren.
$upsert = brevoRequest(
    'POST',
    'https://api.brevo.com/v3/contacts',
    [
        'email' => $email,
        'updateEnabled' => true,
    ],
    $apiKey
);

if ($upsert['curl_error'] !== '') {
    serverLog('contact_upsert curl=' . $upsert['curl_error'], $email);
    respond(false, 'Brevo konnte nicht erreicht werden.', 502, [
        'brevo_step' => 'contact_upsert',
    ]);
}
if ($upsert['status'] < 200 || $upsert['status'] >= 300) {
    serverLog('contact_upsert http=' . $upsert['status'] . ' body=' . compactBody($upsert['raw']), $email);
    respond(false, 'Der Kontakt konnte bei Brevo nicht angelegt oder aktualisiert werden.', 502, [
        'brevo_step' => 'contact_upsert',
        'brevo_status' => $upsert['status'],
    ]);
}

// 2) Explizit über den Listen-Endpunkt der festgelegten Liste hinzufügen.
$add = brevoRequest(
    'POST',
    'https://api.brevo.com/v3/contacts/lists/' . $listId . '/contacts/add',
    ['emails' => [$email]],
    $apiKey
);

if ($add['curl_error'] !== '') {
    serverLog('list_add list=' . $listId . ' curl=' . $add['curl_error'], $email);
}
if ($add['status'] < 200 || $add['status'] >= 300) {
    serverLog('list_add list=' . $listId . ' http=' . $add['status'] . ' body=' . compactBody($add['raw']), $email);
}

// 3) Tatsächliche Zugehörigkeit verifizieren; kurze API-Verzögerungen werden abgefangen.
$verified = false;
$verification = null;
for ($attempt = 1; $attempt <= MAX_VERIFY_ATTEMPTS; $attempt++) {
    $verification = getContact($email, $listId, $apiKey);
    if ($verification['verified']) {
        $verified = true;
        break;
    }
    if ($attempt < MAX_VERIFY_ATTEMPTS) {
        usleep(250000);
    }
}

if (!$verified) {
    $status = is_array($verification) ? (int) ($verification['status'] ?? 0) : 0;
    $body = is_array($verification) ? (string) ($verification['raw'] ?? '') : '';
    serverLog('verification_failed list=' . $listId . ' http=' . $status . ' body=' . compactBody($body), $email);
    respond(false, 'Brevo hat die Aufnahme in die vorgesehene Liste nicht bestätigt.', 502, [
        'brevo_step' => 'verification',
        'brevo_status' => $status,
        'list_id' => $listId,
    ]);
}

// 4) Vorname erst nach bestätigter Listenzugehörigkeit bestmöglich ergänzen.
if ($vorname !== '') {
    $attributeUpdate = brevoRequest(
        'PUT',
        'https://api.brevo.com/v3/contacts/' . rawurlencode($email) . '?identifierType=email_id',
        [
            'attributes' => [
                'VORNAME' => $vorname,
            ],
        ],
        $apiKey
    );

    if ($attributeUpdate['curl_error'] !== '' || $attributeUpdate['status'] >= 400) {
        serverLog(
            'attribute_update http=' . $attributeUpdate['status'] .
            ' curl=' . $attributeUpdate['curl_error'] .
            ' body=' . compactBody($attributeUpdate['raw']),
            $email
        );
    }
}

respond(true, null, 200, [
    'verified' => true,
    'list_id' => $listId,
    'funnel' => $isSos ? 'sos' : 'main',
]);

function getContact(string $email, int $expectedListId, string $apiKey): array
{
    $response = brevoRequest(
        'GET',
        'https://api.brevo.com/v3/contacts/' . rawurlencode($email) . '?identifierType=email_id',
        null,
        $apiKey
    );

    $listIds = [];
    if (is_array($response['body']) && isset($response['body']['listIds']) && is_array($response['body']['listIds'])) {
        $listIds = array_map('intval', $response['body']['listIds']);
    }

    return [
        'verified' => $response['curl_error'] === ''
            && $response['status'] >= 200
            && $response['status'] < 300
            && in_array($expectedListId, $listIds, true),
        'status' => $response['status'],
        'raw' => $response['raw'],
    ];
}

function brevoRequest(string $method, string $url, ?array $payload, string $apiKey): array
{
    $ch = curl_init($url);
    $headers = [
        'Accept: application/json',
        'api-key: ' . $apiKey,
    ];

    $options = [
        CURLOPT_CUSTOMREQUEST => $method,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 25,
        CURLOPT_CONNECTTIMEOUT => 8,
        CURLOPT_HTTPHEADER => $headers,
    ];

    if ($payload !== null) {
        $json = json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        if ($json === false) {
            return [
                'status' => 0,
                'body' => null,
                'raw' => '',
                'curl_error' => 'JSON encoding failed',
            ];
        }
        $headers[] = 'Content-Type: application/json';
        $options[CURLOPT_HTTPHEADER] = $headers;
        $options[CURLOPT_POSTFIELDS] = $json;
    }

    curl_setopt_array($ch, $options);
    $raw = curl_exec($ch);
    $curlError = curl_error($ch);
    $status = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    $rawString = is_string($raw) ? $raw : '';
    $decoded = json_decode($rawString, true);

    return [
        'status' => $status,
        'body' => is_array($decoded) ? $decoded : null,
        'raw' => $rawString,
        'curl_error' => $curlError,
    ];
}

function compactBody(string $body): string
{
    $body = trim(preg_replace('/\s+/', ' ', $body) ?? '');
    return substr($body, 0, 500);
}

function serverLog(string $message, string $email): void
{
    $hash = substr(hash('sha256', strtolower($email)), 0, 12);
    error_log('[UNBOND Brevo][' . $hash . '] ' . $message);
}

function respond(bool $success, ?string $error, int $status, array $extra = []): void
{
    http_response_code($status);
    $payload = array_merge(['success' => $success], $extra);
    if ($error !== null) {
        $payload['error'] = $error;
    }
    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}
