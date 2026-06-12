/* ============================================================
   JELLYFIN VHS VIDEOTHEEK THEMA - JAVASCRIPT EXTRA'S
   Versie 1.0 - voor Jellyfin 10.9/10.10 webclient

   Dit zijn de twee effecten uit het prototype die niet in CSS
   kunnen omdat het Custom CSS veld alleen CSS accepteert:

   1. REC indicator: tijdens het afspelen van een video staat
      rechtsboven een knipperende rode stip met REC en de
      verstreken speeltijd, zoals op een opnemende videorecorder
   2. Tape laden: bij het starten van een video schuift kort een
      VHS-cassette in een videorecorder, met een TRACKING balk
      die vult tot de video echt speelt

   Installeren: zie de sectie "Animaties" in README.md.
   Kort: via de "Custom JavaScript" plugin (aanbevolen) of door
   een <script> regel toe te voegen aan index.html op de server.

   Het script wacht op de <video class="htmlvideoplayer"> die de
   Jellyfin webclient zelf aanmaakt en luistert alleen mee naar
   diens events; het verandert niks aan het afspelen zelf.
   ============================================================ */
(function () {
    "use strict";
    if (window.__vhsExtras) return; // niet dubbel laden
    window.__vhsExtras = true;

    /* ---------- Stijlen voor de twee effecten ---------- */
    var css = [
        "#vhsRec {",
        "  position: fixed; top: 4.6em; right: 1.2em; z-index: 999998;",
        "  display: none; align-items: center; gap: 0.45em;",
        "  font-family: 'Trebuchet MS', 'Segoe UI', system-ui, sans-serif;",
        "  font-size: 0.95em; font-weight: 500; letter-spacing: 0.18em;",
        "  color: var(--vhs-green, #5DCAA5);",
        "  background: rgba(13, 11, 10, 0.72); padding: 0.3em 0.7em;",
        "  border: 2px solid var(--vhs-green, #5DCAA5);",
        "  pointer-events: none; }",
        "#vhsRec.show { display: flex; }",
        "#vhsRec .vhsRecDot {",
        "  width: 0.6em; height: 0.6em; border-radius: 50%;",
        "  background: var(--vhs-red, #E24B4A);",
        "  animation: vhsRecBlink 1.6s steps(1) infinite; }",
        "@keyframes vhsRecBlink { 0%, 70% { opacity: 1; } 71%, 100% { opacity: 0.15; } }",

        "#vhsLoader {",
        "  position: fixed; inset: 0; z-index: 999999;",
        "  background: rgba(13, 11, 10, 0.95);",
        "  display: none; align-items: center; justify-content: center;",
        "  font-family: 'Trebuchet MS', 'Segoe UI', system-ui, sans-serif;",
        "  color: var(--vhs-ink, #FFF8E7); text-align: center; }",
        "#vhsLoader.show { display: flex; }",
        "#vhsLoader .vhsSlotMask { height: 8.5em; overflow: hidden; position: relative; width: 16em; margin: 0 auto; }",
        "#vhsLoader .vhsMiniTape {",
        "  position: absolute; left: 50%; top: 0.5em; width: 13em; margin-left: -6.5em;",
        "  background: var(--vhs-panel, #26211f); border: 0.21em solid var(--vhs-ink, #FFF8E7);",
        "  border-radius: 0.3em; padding: 0.6em 0.7em; }",
        "#vhsLoader.show .vhsMiniTape { animation: vhsInsert 1.3s cubic-bezier(.5,0,.8,.4) 0.4s forwards; }",
        "@keyframes vhsInsert { to { transform: translateY(125%); } }",
        "#vhsLoader .vhsTapeStripes { display: flex; height: 0.36em; margin-bottom: 0.4em; }",
        "#vhsLoader .vhsTapeStripes b { flex: 1; }",
        "#vhsLoader .vhsTapeWin {",
        "  background: #0d0b0a; border: 0.14em solid #444441; border-radius: 0.21em;",
        "  display: flex; justify-content: space-between; padding: 0.29em 0.43em; }",
        "#vhsLoader .vhsReel {",
        "  width: 1.1em; height: 1.1em; border-radius: 50%;",
        "  border: 0.18em solid #6b655f; border-top-color: var(--vhs-ink, #FFF8E7);",
        "  animation: vhsSpin 0.9s linear infinite; }",
        "@keyframes vhsSpin { to { transform: rotate(360deg); } }",
        "#vhsLoader .vhsVcrFace {",
        "  width: 16em; margin: 0 auto; background: #1a1a1a; position: relative; z-index: 2;",
        "  border: 0.21em solid var(--vhs-ink, #FFF8E7); border-radius: 0.4em;",
        "  padding: 1em 1.3em 1.14em; }",
        "#vhsLoader .vhsVcrSlit { height: 0.86em; background: #0d0b0a; border: 0.16em solid #444441; border-radius: 0.21em; }",
        "#vhsLoader .vhsVcrLeds {",
        "  display: flex; justify-content: space-between; margin-top: 0.71em;",
        "  font-size: 0.79em; letter-spacing: 0.18em; color: var(--vhs-green, #5DCAA5); font-weight: 500; }",
        "#vhsLoader .vhsLoadTxt { font-size: 1.07em; font-weight: 500; letter-spacing: 0.25em; margin: 1.3em 0 0.86em; }",
        "#vhsLoader .vhsLoadTxt .vhsDots::after { content: ''; animation: vhsDots 1.2s steps(4) infinite; }",
        "@keyframes vhsDots { 0% { content: ''; } 25% { content: '.'; } 50% { content: '..'; } 75% { content: '...'; } }",
        "#vhsLoader .vhsTrackBar { height: 0.71em; border: 0.16em solid var(--vhs-ink, #FFF8E7); background: #0d0b0a; width: 16em; margin: 0 auto; }",
        "#vhsLoader .vhsTrackBar > div { height: 100%; width: 0; background: var(--vhs-green, #5DCAA5); transition: width 0.15s steps(3); }",
        "#vhsLoader .vhsTrackLbl { font-size: 0.71em; letter-spacing: 0.2em; color: #B4B2A9; margin-top: 0.5em; }",

        /* Bewegingsarm: animaties uit, effecten blijven functioneel */
        "@media (prefers-reduced-motion: reduce) {",
        "  #vhsRec .vhsRecDot, #vhsLoader .vhsMiniTape, #vhsLoader .vhsReel, #vhsLoader .vhsLoadTxt .vhsDots::after { animation: none !important; }",
        "}"
    ].join("\n");

    var style = document.createElement("style");
    style.id = "vhsExtrasStyle";
    style.textContent = css;
    document.head.appendChild(style);

    /* ---------- REC indicator ---------- */
    var rec = document.createElement("div");
    rec.id = "vhsRec";
    rec.innerHTML = '<span class="vhsRecDot"></span> REC <span class="vhsRecTime">00:00:00</span>';
    document.body.appendChild(rec);
    var recTime = rec.querySelector(".vhsRecTime");

    function fmt(sec) {
        sec = Math.max(0, Math.floor(sec || 0));
        var h = String(Math.floor(sec / 3600)).padStart(2, "0");
        var m = String(Math.floor((sec % 3600) / 60)).padStart(2, "0");
        var s = String(sec % 60).padStart(2, "0");
        return h + ":" + m + ":" + s;
    }

    /* ---------- Tape laden overlay ---------- */
    var loader = document.createElement("div");
    loader.id = "vhsLoader";
    loader.innerHTML =
        '<div>' +
        '  <div class="vhsSlotMask"><div class="vhsMiniTape">' +
        '    <div class="vhsTapeStripes"><b style="background:#E24B4A;"></b><b style="background:#FAC775;"></b><b style="background:#378ADD;"></b></div>' +
        '    <div class="vhsTapeWin"><span class="vhsReel"></span><span class="vhsReel"></span></div>' +
        '  </div></div>' +
        '  <div class="vhsVcrFace"><div class="vhsVcrSlit"></div>' +
        '    <div class="vhsVcrLeds"><span>&#9654; PLAY</span><span>SP</span></div></div>' +
        '  <p class="vhsLoadTxt">TAPE LADEN<span class="vhsDots"></span></p>' +
        '  <div class="vhsTrackBar"><div></div></div>' +
        '  <p class="vhsTrackLbl">TRACKING</p>' +
        '</div>';
    document.body.appendChild(loader);
    var trackFill = loader.querySelector(".vhsTrackBar > div");
    var miniTape = loader.querySelector(".vhsMiniTape");

    var trackTimer = null;
    var safetyTimer = null;
    var pct = 0;

    function showLoader() {
        if (loader.classList.contains("show")) return;
        loader.classList.add("show");
        // insert-animatie herstarten bij elke nieuwe tape
        miniTape.style.animation = "none";
        void miniTape.offsetWidth;
        miniTape.style.animation = "";
        pct = 0;
        trackFill.style.width = "0%";
        clearInterval(trackTimer);
        trackTimer = setInterval(function () {
            // hapert een beetje, zoals echte tracking; wacht op de video bij 90%
            pct = Math.min(90, pct + 6 + Math.random() * 14);
            trackFill.style.width = pct + "%";
        }, 180);
        // als de video nooit start (fout, traag netwerk): overlay niet laten hangen
        clearTimeout(safetyTimer);
        safetyTimer = setTimeout(hideLoader, 10000);
    }

    function hideLoader() {
        clearTimeout(safetyTimer);
        if (!loader.classList.contains("show")) return;
        trackFill.style.width = "100%";
        clearInterval(trackTimer);
        setTimeout(function () { loader.classList.remove("show"); }, 350);
    }

    /* ---------- Meeluisteren met de Jellyfin videospeler ----------
       Media-events bubbelen niet, maar met capture op document
       vangen we ze toch op, ook voor videospelers die de webclient
       pas later aanmaakt. */
    function isPlayer(t) {
        return t && t.tagName === "VIDEO" && t.classList.contains("htmlvideoplayer");
    }

    document.addEventListener("loadstart", function (e) {
        if (isPlayer(e.target)) showLoader();
    }, true);

    document.addEventListener("playing", function (e) {
        if (!isPlayer(e.target)) return;
        hideLoader();
        rec.classList.add("show");
    }, true);

    document.addEventListener("timeupdate", function (e) {
        if (isPlayer(e.target)) recTime.textContent = fmt(e.target.currentTime);
    }, true);

    ["pause", "ended", "emptied"].forEach(function (ev) {
        document.addEventListener(ev, function (e) {
            if (!isPlayer(e.target)) return;
            rec.classList.remove("show");
            if (ev === "emptied") hideLoader(); // speler gestopt voor de start
        }, true);
    });

    // overlay nooit in de weg laten zitten: klik of Escape sluit hem
    loader.addEventListener("click", hideLoader);
    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") hideLoader();
    });
})();
