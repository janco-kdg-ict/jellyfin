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
| `--vhs-red` | play knoppen | VHS rood |
| `--vhs-pink` | hover accent | roze |
| `--vhs-green` | voortgangsbalken | VCR groen |
| `--vhs-amber` | tags en badges | amber |

Een variabele aanpassen verandert het overal tegelijk.

## Wat zit er in deze repo

| Bestand | Wat het is |
|---|---|
| `jellyfin-vhs-thema.css` | het thema zelf, dit is wat je linkt of plakt |
| `INSTALLATIE.md` | uitgebreid stappenplan met probleemoplossing |
| `prototype/jellyfin_vhs_prototype.html` | werkend interactief prototype van de look, opent gewoon in je browser (internet nodig voor de icoontjes). Bevat extra's zoals de tape-laadanimatie en REC teller die JavaScript vereisen en dus niet in het CSS-thema zitten |

## Beperkingen, eerlijk gezegd

- Werkt in de **webinterface** (browser, desktop app, en mobiele apps die de web-UI inladen). Native apps zoals **Android TV** en **Swiftfin** hebben hun eigen interface en negeren custom CSS volledig
- Geschreven voor **Jellyfin 10.9/10.10**. Jellyfin updates kunnen class-namen wijzigen waardoor een detail kan wegvallen; meestal is dat een kleine fix
- De JavaScript-effecten uit het prototype (REC teller, tape-in-VCR laadanimatie) kunnen niet via custom CSS. Die vereisen ofwel het injecteren van een script in de webclient, ofwel een eigen webclient op de Jellyfin API (waarvan het prototype de basis is)

## Handige links

- Jellyfin documentatie over branding en custom CSS: https://jellyfin.org/docs/general/clients/css-customization/
- Hoe jsDelivr GitHub-links werken: https://www.jsdelivr.com/github (let op: de repo moet **Public** staan, anders kan jsDelivr er niet bij)
- Inspiratie van andere Jellyfin thema's: zoek op GitHub naar "jellyfin theme" (bv. Scyfin, Ultrachromic)

## Terugdraaien

Custom CSS veld leegmaken, opslaan, Ctrl + F5. Het thema verandert niks aan je bibliotheek of instellingen, het is puur uiterlijk.
