# Jellyfin VHS Videotheek Thema

Een neo-brutalist thema voor de Jellyfin webinterface, geinspireerd op een ouderwetse videotheek: scheve posterhoezen met harde blokschaduwen, een rode play-sticker die met een bounce indraait, VCR-groene voortgangsbalken, scheve sectielabels en een glitchende paginatitel.

## Snelle installatie (aanbevolen: via link)

1. Open je Jellyfin webinterface als beheerder
2. Hamburgermenu linksboven > **Dashboard** > **Algemeen** (General)
3. Plak in het veld **Aangepaste CSS** (Custom CSS code) deze ene regel:

```css
@import url("https://cdn.jsdelivr.net/gh/janco-kdg-ict/jellyfin@main/jellyfin-vhs-thema.css");
```

4. Klik **Opslaan** en doe een harde refresh: **Ctrl + F5**

Updates aan het CSS-bestand in deze repo komen daarna vanzelf bij alle clients terecht (jsDelivr cachet tot ongeveer 12 uur, dus een update kan even op zich laten wachten).

> **Let op:** zet je naast deze regel ook eigen CSS in het veld, dan moet de `@import`-regel helemaal **bovenaan** staan. Een `@import` na andere CSS-regels wordt door browsers genegeerd.

## Alternatieve installatie (zonder GitHub)

Wil je geen repo gebruiken: open `jellyfin-vhs-thema.css`, kopieer de volledige inhoud en plak die rechtstreeks in hetzelfde Custom CSS veld. Werkt identiek, alleen moet je bij een update opnieuw plakken. Tijdens het tweaken van kleuren is dit juist de handigste methode, want je ziet elke wijziging direct na Ctrl + F5.

## Alleen voor jezelf testen

Profielicoon rechtsboven > **Weergave** (Display) > daar zit hetzelfde Custom CSS veld, maar dan alleen voor jouw account. Handig om het thema te proberen zonder dat andere gebruikers het zien.

## Kleuren aanpassen

Alle kleuren staan bovenaan `jellyfin-vhs-thema.css` bij elkaar in het `:root` blok:

| Variabele | Doet | Standaard |
|---|---|---|
| `--vhs-paper` | achtergrond | donkerpaars-zwart |
| `--vhs-ink` | randen en tekst | creme |
| `--vhs-panel` | panelen en kaarten | donkerbruin |
| `--vhs-red` | play knoppen | VHS rood |
| `--vhs-pink` | hover accent | roze |
| `--vhs-green` | voortgangsbalken | VCR groen |
| `--vhs-amber` | tags en badges | amber |

Een variabele aanpassen verandert het overal tegelijk.

## Animaties

**Deze animaties zitten in het CSS-thema en werken direct**, zonder extra stappen — het zijn pure CSS-animaties en die accepteert Jellyfin gewoon via het Custom CSS veld:

| Animatie | Waar je het ziet |
|---|---|
| Glitch op de paginatitel | bovenaan elke pagina, om de paar seconden |
| Scheve posters die rechtspringen met een bounce | hover (of focus op TV) over een kaart |
| Rode play-sticker die indraait | hover over een kaart |
| Roze schaduw onder knoppen | hover over een knop |

**Twee effecten uit het prototype vereisen JavaScript**, en dat accepteert het Custom CSS veld niet (Jellyfin filtert daar bewust alles behalve CSS). Daarvoor zit `extras/jellyfin-vhs-extras.js` in deze repo:

- **REC indicator**: tijdens het afspelen knippert rechtsboven een rode stip met REC en de verstreken speeltijd, zoals op een opnemende videorecorder
- **Tape laden**: bij het starten van een video schuift kort een VHS-cassette in een videorecorder, met een TRACKING-balk die vult tot de video echt speelt

### JavaScript-extra's installeren (optioneel)

**Optie A - via de Custom JavaScript plugin (aanbevolen):**

1. Dashboard > **Plugins** > **Catalogus** > tandwiel-icoon (**Repositories**) > **+**
2. Geef een naam (bv. `Custom JS`) en plak als URL: `https://raw.githubusercontent.com/johnpc/jellyfin-plugin-custom-javascript/main/manifest.json`
3. Installeer **Custom JavaScript** uit de catalogus en herstart Jellyfin
4. Dashboard > **Plugins** > **Custom JavaScript**: plak daar de volledige inhoud van `extras/jellyfin-vhs-extras.js` en sla op
5. Harde refresh in je browser: **Ctrl + F5**

**Optie B - script-regel in index.html (geen plugin nodig):**

Voeg op de server, vlak voor `</body>` in het bestand `index.html` van de webclient, deze regel toe:

```html
<script src="https://cdn.jsdelivr.net/gh/janco-kdg-ict/jellyfin@main/extras/jellyfin-vhs-extras.js" defer></script>
```

Waar dat bestand staat: `/usr/share/jellyfin/web/index.html` (Debian/Ubuntu), `/jellyfin/jellyfin-web/index.html` (Docker), of `C:\Program Files\Jellyfin\Server\jellyfin-web\index.html` (Windows). Nadeel: een Jellyfin-update overschrijft dit bestand, dan moet de regel er opnieuw in. De plugin uit optie A overleeft updates wel.

De extra's zijn puur cosmetisch: het script luistert alleen mee met de videospeler en verandert niks aan het afspelen. Werkt het niet of wil je ervan af, verwijder dan de geplakte code (optie A) of de script-regel (optie B) en doe Ctrl + F5.

## Wat zit er in deze repo

| Bestand | Wat het is |
|---|---|
| `jellyfin-vhs-thema.css` | het thema zelf, dit is wat je linkt of plakt |
| `extras/jellyfin-vhs-extras.js` | optionele JavaScript-effecten (REC indicator, tape-laadanimatie), zie de sectie Animaties |
| `INSTALLATIE.md` | uitgebreid stappenplan met probleemoplossing |
| `prototype/jellyfin_vhs_prototype.html` | werkend interactief prototype van de look, opent gewoon in je browser (internet nodig voor de icoontjes) |

## Beperkingen, eerlijk gezegd

- Werkt in de **webinterface** (browser, desktop app, en mobiele apps die de web-UI inladen). Native apps zoals **Android TV** en **Swiftfin** hebben hun eigen interface en negeren custom CSS (en custom JavaScript) volledig
- Geschreven voor **Jellyfin 10.9/10.10**. Jellyfin updates kunnen class-namen wijzigen waardoor een detail kan wegvallen; meestal is dat een kleine fix
- De JavaScript-effecten (REC indicator, tape-laadanimatie) kunnen niet via het Custom CSS veld; daarvoor is de aparte installatiestap nodig uit de sectie Animaties

## Handige links

- Jellyfin documentatie over branding en custom CSS: https://jellyfin.org/docs/general/clients/css-customization/
- Hoe jsDelivr GitHub-links werken: https://www.jsdelivr.com/github (let op: de repo moet **Public** staan, anders kan jsDelivr er niet bij)
- Inspiratie van andere Jellyfin thema's: zoek op GitHub naar "jellyfin theme" (bv. Scyfin, Ultrachromic)

## Terugdraaien

Custom CSS veld leegmaken, opslaan, Ctrl + F5. Het thema verandert niks aan je bibliotheek of instellingen, het is puur uiterlijk.
