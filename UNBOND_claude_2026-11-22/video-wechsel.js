(() => {
  "use strict";

  // A fresh URL on each page visit prevents an old clip surviving a file replacement.
  const revision = Date.now().toString(36);
  window.UNBOND_VIDEO_REVISION = revision;
  const background = document.querySelector(".page-background-video");
  let previousY = window.scrollY;
  let wantsPlayback = false;
  let starting = false;
  let started = false;

  const onScroll = () => {
    const y = window.scrollY;
    const down = y > previousY;
    previousY = y;
    if (!down || y < 8 || !background || started) return;
    wantsPlayback = true;
    startPlayback();
  };

  function startPlayback() {
    if (!background || starting || started) return;
    starting = true;
    Promise.resolve(background.play()).then(() => {
      started = true;
      window.removeEventListener("scroll", onScroll);
    }).catch((error) => {
      starting = false;
      console.warn("UNBOND: Hintergrundvideo konnte nicht gestartet werden.", error);
    });
  }

  document.querySelectorAll("video[data-video-file]").forEach((video) => {
    video.muted = true;
    video.defaultMuted = true;
    video.pause();
    video.addEventListener("loadedmetadata", () => {
      // Explicit seeking asks the browser to decode the first frame while paused.
      if (video === background && wantsPlayback) return;
      const duration = video.duration;
      video.currentTime = Number.isFinite(duration) && duration > 0
        ? Math.min(0.01, duration / 2)
        : 0.01;
    }, { once: true });
    video.addEventListener("error", () => {
      console.error("UNBOND: Videodatei konnte nicht geladen werden: " + JSON.stringify({
        file: video.dataset.videoFile,
        code: video.error?.code,
        message: video.error?.message,
        source: video.currentSrc,
        h264Support: video.canPlayType('video/mp4; codecs="avc1.42E01E"'),
      }));
    });
    const url = new URL(video.dataset.videoFile, document.baseURI);
    url.searchParams.set("video", revision);
    url.hash = "t=0.01";
    video.src = url.href;
    video.load();
  });

  if (background) window.addEventListener("scroll", onScroll, { passive: true });
})();
