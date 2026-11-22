(function () {
  'use strict';

  var form = document.getElementById('queer-city-form');
  var cityInput = document.getElementById('queer-city-input');
  var status = document.getElementById('queer-place-status');
  var layout = document.getElementById('queer-place-layout');
  var mapElement = document.getElementById('queer-map');
  var list = document.getElementById('queer-place-list');
  var resultTitle = document.getElementById('queer-result-title');
  var localDetails = document.getElementById('queer-local-place');
  var localForm = document.getElementById('queer-local-form');

  if (!form || !cityInput || !status || !layout || !mapElement || !list) return;

  var STORAGE_KEY = 'unbond-queere-orte-v1';
  var map = null;
  var markerLayer = null;
  var activeCity = '';
  var activeCityLabel = '';
  var activePlaces = [];

  function setStatus(message, state) {
    status.textContent = message;
    if (state) status.setAttribute('data-state', state);
    else status.removeAttribute('data-state');
  }

  function normalise(value) {
    return String(value || '')
      .toLocaleLowerCase('de')
      .normalize('NFKD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  function readStore() {
    try {
      var parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
      if (!parsed || typeof parsed !== 'object') return { cities: {} };
      if (!parsed.cities || typeof parsed.cities !== 'object') parsed.cities = {};
      return parsed;
    } catch (error) {
      return { cities: {} };
    }
  }

  function writeStore(store) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
      return true;
    } catch (error) {
      setStatus('Deine Notiz konnte in diesem Browser nicht gespeichert werden.', 'error');
      return false;
    }
  }

  function getCityData(create) {
    var store = readStore();
    var city = store.cities[activeCity];
    if (!city && create) {
      city = { labels: {}, custom: [] };
      store.cities[activeCity] = city;
    }
    if (city) {
      if (!city.labels || typeof city.labels !== 'object') city.labels = {};
      if (!Array.isArray(city.custom)) city.custom = [];
    }
    return { store: store, city: city || { labels: {}, custom: [] } };
  }

  function saveRating(placeId, rating) {
    var data = getCityData(true);
    data.city.labels[placeId] = rating;
    data.store.cities[activeCity] = data.city;
    if (writeStore(data.store)) {
      setStatus('Deine Einschätzung wurde nur auf diesem Gerät gespeichert.');
    }
  }

  function placeCoordinates(element) {
    var lat = element.lat || (element.center && element.center.lat);
    var lon = element.lon || (element.center && element.center.lon);
    if (!Number.isFinite(Number(lat)) || !Number.isFinite(Number(lon))) return null;
    return [Number(lat), Number(lon)];
  }

  function describePlace(tags) {
    var type = tags.amenity || tags.leisure || tags.tourism || tags.shop || tags.community_centre;
    var readable = {
      bar: 'Bar', pub: 'Bar / Pub', nightclub: 'Club', cafe: 'Café',
      community_centre: 'Community-Zentrum', social_centre: 'Community-Zentrum',
      theatre: 'Kulturort', arts_centre: 'Kulturort', association: 'Initiative',
      books: 'Buchhandlung', clothes: 'Geschäft', hotel: 'Unterkunft'
    };
    return readable[type] || 'Queer markierter Ort';
  }

  function parsePlaces(payload) {
    var seen = {};
    return (payload.elements || []).map(function (element) {
      var tags = element.tags || {};
      var name = String(tags.name || '').trim();
      var coordinates = placeCoordinates(element);
      if (!name || !coordinates) return null;
      var id = 'osm-' + element.type + '-' + element.id;
      var duplicateKey = normalise(name) + '-' + coordinates.map(function (n) { return n.toFixed(4); }).join('-');
      if (seen[duplicateKey]) return null;
      seen[duplicateKey] = true;
      return {
        id: id,
        name: name,
        description: describePlace(tags),
        coordinates: coordinates,
        localOnly: false
      };
    }).filter(Boolean).slice(0, 40);
  }

  function createRatingButton(place, rating, label, selected) {
    var button = document.createElement('button');
    button.type = 'button';
    button.className = 'nc-rating-btn';
    button.setAttribute('data-rating', rating);
    button.setAttribute('aria-pressed', selected ? 'true' : 'false');
    button.textContent = label;
    button.addEventListener('click', function () {
      saveRating(place.id, rating);
      Array.prototype.forEach.call(button.parentNode.querySelectorAll('.nc-rating-btn'), function (item) {
        item.setAttribute('aria-pressed', item === button ? 'true' : 'false');
      });
    });
    return button;
  }

  function createPlaceCard(place, savedRating) {
    var card = document.createElement('article');
    card.className = 'nc-place-card';

    var heading = document.createElement('h4');
    heading.textContent = place.name;
    card.appendChild(heading);

    var description = document.createElement('p');
    description.textContent = place.localOnly ? 'Private Notiz · nur auf diesem Gerät' : place.description + ' · Daten: OpenStreetMap';
    card.appendChild(description);

    var group = document.createElement('div');
    group.className = 'nc-rating-group';
    group.setAttribute('aria-label', 'Private Einschätzung für ' + place.name);
    group.appendChild(createRatingButton(place, 'safe', 'Fühlt sich safe an', savedRating === 'safe'));
    group.appendChild(createRatingButton(place, 'unsicher', 'Fühlt sich unsicher an', savedRating === 'unsicher'));
    group.appendChild(createRatingButton(place, 'offen', 'Noch offen', !savedRating || savedRating === 'offen'));
    card.appendChild(group);
    return card;
  }

  function renderPlaces() {
    list.textContent = '';
    var data = getCityData(false);
    var customPlaces = data.city.custom.map(function (item) {
      return {
        id: item.id,
        name: item.name,
        description: 'Private Notiz',
        coordinates: null,
        localOnly: true
      };
    });
    var allPlaces = activePlaces.concat(customPlaces);

    resultTitle.textContent = allPlaces.length
      ? 'Orte in ' + activeCityLabel + ' (' + allPlaces.length + ')'
      : 'Noch keine Orte gefunden';

    if (!allPlaces.length) {
      var empty = document.createElement('p');
      empty.className = 'nc-place-card';
      empty.textContent = 'In den öffentlichen Kartendaten ist hier noch kein eindeutig queer markierter Ort eingetragen. Du kannst unten einen Ort privat notieren.';
      list.appendChild(empty);
      return;
    }

    allPlaces.forEach(function (place) {
      list.appendChild(createPlaceCard(place, data.city.labels[place.id]));
    });
  }

  function renderMarkers() {
    if (!map || !markerLayer || !window.L) return;
    markerLayer.clearLayers();
    activePlaces.forEach(function (place) {
      var popup = document.createElement('div');
      var title = document.createElement('strong');
      title.textContent = place.name;
      popup.appendChild(title);
      popup.appendChild(document.createElement('br'));
      popup.appendChild(document.createTextNode(place.description));
      window.L.marker(place.coordinates).bindPopup(popup).addTo(markerLayer);
    });
  }

  function initialiseMap(lat, lon) {
    if (!window.L) throw new Error('map-library');
    layout.hidden = false;
    localDetails.hidden = false;
    if (!map) {
      map = window.L.map(mapElement, { scrollWheelZoom: false, zoomControl: true });
      window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap-Mitwirkende'
      }).addTo(map);
      markerLayer = window.L.layerGroup().addTo(map);
    }
    map.setView([lat, lon], 13);
    window.setTimeout(function () { map.invalidateSize(); }, 0);
  }

  function fetchWithTimeout(url, options, timeout) {
    var controller = typeof AbortController === 'function' ? new AbortController() : null;
    var timer = window.setTimeout(function () {
      if (controller) controller.abort();
    }, timeout);
    var requestOptions = options || {};
    if (controller) requestOptions.signal = controller.signal;
    return fetch(url, requestOptions).finally(function () { window.clearTimeout(timer); });
  }

  function geocodeCity(city) {
    var url = 'https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&accept-language=de&q=' + encodeURIComponent(city);
    return fetchWithTimeout(url, { headers: { Accept: 'application/json' } }, 12000)
      .then(function (response) {
        if (!response.ok) throw new Error('geocode');
        return response.json();
      })
      .then(function (items) {
        if (!items || !items.length) throw new Error('not-found');
        return {
          lat: Number(items[0].lat),
          lon: Number(items[0].lon),
          label: String(items[0].display_name || city).split(',')[0]
        };
      });
  }

  function findQueerPlaces(lat, lon) {
    var radius = 14000;
    var query = [
      '[out:json][timeout:18];',
      '(',
      'nwr(around:' + radius + ',' + lat + ',' + lon + ')["lgbtq"];',
      'nwr(around:' + radius + ',' + lat + ',' + lon + ')["lgbtq_friendly"];',
      'nwr(around:' + radius + ',' + lat + ',' + lon + ')["gay"];',
      'nwr(around:' + radius + ',' + lat + ',' + lon + ')["community_centre"~"lgbtq|queer|gay",i];',
      'nwr(around:' + radius + ',' + lat + ',' + lon + ')["name"~"queer|lesb|lgbt|pride",i];',
      ');',
      'out center tags 60;'
    ].join('');
    var url = 'https://overpass-api.de/api/interpreter?data=' + encodeURIComponent(query);
    return fetchWithTimeout(url, { headers: { Accept: 'application/json' } }, 22000)
      .then(function (response) {
        if (!response.ok) throw new Error('places');
        return response.json();
      })
      .then(parsePlaces);
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    var city = cityInput.value.trim();
    if (!city) {
      cityInput.focus();
      setStatus('Bitte gib zuerst eine Stadt ein.', 'error');
      return;
    }

    var submitButton = form.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.textContent = 'Suche läuft …';
    setStatus('Stadt wird gesucht …');

    geocodeCity(city)
      .then(function (location) {
        activeCityLabel = location.label;
        activeCity = normalise(location.label) || normalise(city);
        initialiseMap(location.lat, location.lon);
        setStatus('Queer markierte Orte werden geladen …');
        return findQueerPlaces(location.lat, location.lon)
          .then(function (places) {
            activePlaces = places;
            renderMarkers();
            renderPlaces();
            if (places.length) {
              setStatus(places.length + ' öffentlich markierte Orte gefunden. Deine Einschätzungen bleiben privat auf diesem Gerät.');
            } else {
              setStatus('Keine eindeutig queer markierten Orte in den öffentlichen Kartendaten gefunden.');
            }
          })
          .catch(function () {
            activePlaces = [];
            renderMarkers();
            renderPlaces();
            setStatus('Die Karte ist geöffnet, aber die Ortsdaten sind gerade nicht erreichbar. Private Notizen funktionieren weiterhin.', 'error');
          });
      })
      .catch(function (error) {
        if (error && error.message === 'map-library') {
          setStatus('Die Kartenansicht konnte nicht geladen werden. Bitte prüfe deine Internetverbindung.', 'error');
        } else if (error && error.message === 'not-found') {
          setStatus('Diese Stadt wurde nicht gefunden. Ergänze bei Bedarf Land oder Region.', 'error');
        } else {
          setStatus('Die Stadtsuche ist gerade nicht erreichbar. Bitte versuche es später noch einmal.', 'error');
        }
      })
      .finally(function () {
        submitButton.disabled = false;
        submitButton.textContent = 'Orte finden';
      });
  });

  if (localForm) {
    localForm.addEventListener('submit', function (event) {
      event.preventDefault();
      if (!activeCity) return;
      var nameField = localForm.elements.name;
      var ratingField = localForm.elements.rating;
      var name = nameField.value.trim();
      if (!name) {
        nameField.focus();
        return;
      }
      var data = getCityData(true);
      var id = 'local-' + Date.now().toString(36);
      data.city.custom.push({ id: id, name: name });
      data.city.labels[id] = ratingField.value;
      data.store.cities[activeCity] = data.city;
      if (writeStore(data.store)) {
        localForm.reset();
        renderPlaces();
        setStatus('„' + name + '“ wurde privat auf diesem Gerät gespeichert.');
      }
    });
  }
})();
