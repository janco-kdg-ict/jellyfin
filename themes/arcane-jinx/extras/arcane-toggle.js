/* ============================================================
   ARCANE: POWDER ⇄ JINX  —  live-schakelaar
   Versie 1.0 — voor Jellyfin 10.9/10.10 webclient

   Voegt een zwevende POWDER ⇄ JINX-knop toe aan de webinterface.
   De knop zet de class html.arcane-powder of html.arcane-jinx,
   die het palet uit jellyfin-arcane-jinx.css omschakelt. De keuze
   wordt onthouden in localStorage.

   Dit is OPTIONEEL en puur cosmetisch — het verandert niks aan
   het afspelen of je bibliotheek. Installeren via de Custom
   JavaScript plugin of een <script>-regel in index.html; zie de
   sectie "Live-schakelaar" in README.md.

   Vereist dat het CSS-thema jellyfin-arcane-jinx.css geladen is.
   ============================================================ */
(function () {
    "use strict";
    if (window.__arcaneToggle) return;
    window.__arcaneToggle = true;

    var KEY = "arcane-mode";
    var root = document.documentElement;

    function apply(mode) {
        root.classList.remove("arcane-powder", "arcane-jinx");
        root.classList.add(mode === "powder" ? "arcane-powder" : "arcane-jinx");
        try { localStorage.setItem(KEY, mode); } catch (e) {}
        if (btn) btn.setAttribute("data-mode", mode);
    }

    /* Opgeslagen keuze, standaard jinx */
    var saved = "jinx";
    try { saved = localStorage.getItem(KEY) || "jinx"; } catch (e) {}

    /* ---------- knop + stijl ---------- */
    var style = document.createElement("style");
    style.textContent = [
        "#arcaneToggle{position:fixed;right:1rem;bottom:1rem;z-index:999999;",
        "  display:flex;align-items:center;gap:.5rem;cursor:pointer;user-select:none;",
        "  padding:.3rem .35rem;border-radius:999px;",
        "  background:color-mix(in srgb, var(--bg-1,#0c1320) 85%, transparent);",
        "  border:2px solid color-mix(in srgb, var(--c-1,#ff2d78) 50%, transparent);",
        "  font-family:'Trebuchet MS','Segoe UI',system-ui,sans-serif;",
        "  backdrop-filter:blur(8px);transition:border-color .3s;}",
        "#arcaneToggle:hover{border-color:var(--c-1,#ff2d78);}",
        "#arcaneToggle .lbl{font-size:.6rem;font-weight:800;letter-spacing:.16em;padding:0 .4rem;transition:opacity .3s;}",
        "#arcaneToggle .lp{color:#6fe3ff;} #arcaneToggle .lj{color:#ff2d78;}",
        "#arcaneToggle[data-mode='jinx'] .lp{opacity:.35;}",
        "#arcaneToggle[data-mode='powder'] .lj{opacity:.35;}",
        "#arcaneToggle .track{width:48px;height:24px;border-radius:999px;position:relative;",
        "  background:linear-gradient(90deg,#173a55,#3a1240);",
        "  border:1px solid color-mix(in srgb, var(--c-3,#44e0ff) 40%, transparent);}",
        "#arcaneToggle .knob{position:absolute;top:50%;left:3px;width:18px;height:18px;border-radius:50%;",
        "  transform:translateY(-50%);background:radial-gradient(circle at 35% 30%,#cfeeff,var(--c-1,#ff2d78));",
        "  box-shadow:0 0 12px var(--glow,#ff2d78);transition:left .4s cubic-bezier(.7,-0.4,.3,1.4);}",
        "#arcaneToggle[data-mode='jinx'] .knob{left:27px;}",
        "@media (prefers-reduced-motion: reduce){#arcaneToggle .knob{transition:none;}}"
    ].join("\n");
    document.head.appendChild(style);

    var btn = document.createElement("div");
    btn.id = "arcaneToggle";
    btn.title = "Wissel tussen Powder en Jinx";
    btn.innerHTML =
        '<span class="lbl lp">POWDER</span>' +
        '<span class="track"><span class="knob"></span></span>' +
        '<span class="lbl lj">JINX</span>';
    btn.addEventListener("click", function () {
        var next = root.classList.contains("arcane-powder") ? "jinx" : "powder";
        apply(next);
    });

    function mount() {
        if (!document.body) return;
        if (!document.getElementById("arcaneToggle")) document.body.appendChild(btn);
        apply(saved);
    }
    if (document.body) mount();
    else document.addEventListener("DOMContentLoaded", mount);
})();
