# Jellyfin VHS Videotheek Thema - Installatie

Deze repository bevat:

- `jellyfin-vhs-thema.css` - het thema zelf, klaar om te plakken in Jellyfin
- `prototype/jellyfin_vhs_prototype.html` - het werkende prototype als referentie voor de look
- dit stappenplan

## Stap 1: thema installeren (hele server)

1. Open de Jellyfin webinterface in je browser en log in als beheerder
2. Klik op het hamburgermenu linksboven en ga naar **Dashboard**
3. Ga naar **Algemeen** (General)
4. Scroll naar het veld **Aangepaste CSS** (Custom CSS code)
5. Open `jellyfin-vhs-thema.css` in een teksteditor, kopieer de volledige inhoud en plak die in het veld
6. Klik op **Opslaan** onderaan
7. Doe een harde refresh in je browser: **Ctrl + F5** (of Ctrl + Shift + R)

Het thema staat nu aan voor iedereen die de webinterface gebruikt.

## Stap 2: testen

Test in deze volgorde, dan weet je meteen waar een eventueel probleem zit:

1. **Browser op je PC** - hier moet alles werken: scheve kaarten, bounce hover, rode play sticker, glitch op de titel
2. **Browser op je telefoon** - zelfde interface, compacter
3. **TV** - open de webinterface in de browser van de TV, of gebruik een app die de web-UI inlaadt

Let op: **native apps tonen het thema niet**. De Android TV app en Swiftfin (Apple TV) hebben hun eigen interface en negeren custom CSS volledig. De gewone Android/iOS app laadt wel de web-UI en toont het thema dus wel. Wil je de VHS look op je TV, gebruik dan de TV-browser of cast vanaf je telefoon.

## Stap 3: kleuren aanpassen

Alle kleuren staan bovenaan het CSS-bestand bij elkaar in het `:root` blok. Wil je bijvoorbeeld een ander hover-accent, verander dan alleen `--vhs-pink` en sla opnieuw op. Je hoeft nergens anders in het bestand te zijn.

## Alternatief: thema alleen voor jezelf

Wil je het eerst testen zonder dat je huisgenoten het zien:

1. Klik rechtsboven op je profielicoon en ga naar **Weergave** (Display)
2. Plak de CSS daar in het veld **Aangepaste CSS**
3. Vink eventueel **Aangepaste CSS van de server uitschakelen** aan of uit naargelang wat je wil zien

Dit geldt dan alleen voor jouw account.

## Alternatief: CSS hosten in plaats van plakken

Het thema staat in deze GitHub-repository, dus je kan in het Custom CSS veld volstaan met enkel deze regel (de repo moet wel op **Public** staan):

```css
@import url("https://cdn.jsdelivr.net/gh/janco-kdg-ict/jellyfin@main/jellyfin-vhs-thema.css");
```

Gebruik bewust jsDelivr en niet de raw.githubusercontent.com link: GitHub serveert raw bestanden als platte tekst met een beveiligingsheader waardoor browsers de @import vaak blokkeren. jsDelivr is een gratis CDN dat automatisch voor elke publieke GitHub repo werkt, je hoeft er niks voor aan te maken. Let op: jsDelivr cachet bestanden tot zo'n 12 uur, dus na een update op GitHub kan het even duren voor clients de nieuwe versie zien. Tijdens het ontwikkelen dus beter rechtstreeks plakken, en pas naar de link verhuizen als het thema stabiel is.

## Iets kapot? Zo zet je het terug

Maak het Custom CSS veld leeg, klik Opslaan en doe Ctrl + F5. Jellyfin staat dan meteen weer in de standaard look. Het thema verandert niks aan je bibliotheek, gebruikers of instellingen, het is puur uiterlijk.

## Goed om te weten

- Jellyfin updates kunnen class-namen in de webinterface wijzigen, waardoor een onderdeel van het thema kan wegvallen. Meestal is dat met een kleine aanpassing gefixt
- De animaties (glitch, bounce) zijn pure CSS en kosten nauwelijks iets qua prestaties
- Effecten die JavaScript nodig hebben uit het prototype (de REC teller, de tape-in-VCR laadanimatie) zitten niet in dit CSS-pakket, want het Custom CSS veld accepteert alleen CSS. Die kunnen later via een eigen webclient (route B) als je dat wil
