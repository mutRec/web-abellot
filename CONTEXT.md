# Projecte: web-abellot
Web d'Abellot (ABELLOT.net) amb selector de llengua. Landing d'una sola pàgina, sense build ni framework: només HTML, CSS i JS vanilla servits com són.

## Stack
- HTML5, CSS3, JavaScript vanilla (ES5, sense build)
- Tailwind via CDN (`<script src="https://cdn.tailwindcss.com">`) per al layout
- `css/styles.css` propi per als efectes i components visuals
- Tipografies: DM Sans (text) i Space Grotesk (display), via Google Fonts
- Sense imatges de build: tot es distribueix tal qual

## Estructura de fitxers
- `index.html` — única pàgina: header + hero (`#inici`) + footer (`#contacte`)
- `css/styles.css` — estil propi i totes les animacions
- `js/main.js` — script únic, una IIFE amb 'use strict'
- `images/abella-01.png` … `abella-09.png` i `abellot-10.png` … `abellot-12.png` — il·lustracions per al slideshow del hero; fons netejat a transparent (es conserven els blancs interiors amb contorn fosc; `abellot-11/12` conserven l'ombra fosca)
- `images/abellot.jpg` — imatge antiga (497x412), ja no s'usa

## Estat actual
- **Header**: barra fixa superior amb barra de grain de fons i el selector d'idioma CAT/ESP/ENG alineat a la dreta
- **Hero** (`#inici`, línia 39): fons decoratiu (`grain`, dos `blob`, `grid-bg`) + columna de text (tagline, h1 de 3 línies, descripció, CTA de WhatsApp) + columna dreta amb el slideshow de l'abella (`.bee-slideshow`, 8 il·lustracions en crossfade)
- **Footer** (`#contacte`): logotip ABELLOT.net, contactes (telèfon, email, WhatsApp) i © any dinàmic
- **Selector de llengua**: `ca` / `es` / `en` amb diccionari `translations` a `js/main.js` i atributs `data-i18n` al HTML (inclou `lang` del `<html>`)
- **Tipografia**: h1 amb `leading-[0.95]`, `whitespace-nowrap` i una línia amb text contornat (`.text-outline`)
- **Paleta**: cream `#FDF3E7` (fons), ink `#141210` (text), orange `#FF6B1A` (accent), yellow `#FFC93C` (highlight), honey `#E8A87C` (blob secundari)

## Efectes i animacions
- `grain` + `grain-shift` (8s, steps) — textura de gra sobre tot
- `blob-1` i `blob-2` — bomboles de fons amb `blob-morph-1/2` (16s / 20s) i `blob-pulse` (saturació + brillantor, 5,5s i 7s desfasats)
- `grid-bg` — quadrícula amb mascara radial i highlight que segueix el ratolí (`--mx` / `--my` des de JS)
- `reveal` — entrada suau en scroll amb `IntersectionObserver` (fallback: els marca tots com a visibles)
- `.bee-slideshow` / `.bee-slide` — crossfade automàtic entre les il·lustracions de l'abella: canvi cada 3,5 s amb fade de 1,2 s, contenidor d'aspecte fix 6/5 i sense moviment propi (s'ha eliminat `bee-float`)
- `parallax` als blobs segons `data-speed`
- `btn-primary` — esborrat diagonal en hover
- Bloques: desktop `#main-content` és `100vh` sense scroll; a ≤768px passa a `auto` i permet fer scroll

## Responsive
- Mobile (≤768px): columna, text centrat, footer apilat, header i botons més grans
- Tablet (≤1024px): slideshow de l'abella (màx. 380px) i header ajustats; a mobile (≤768px) màx. 300px
- `prefers-reduced-motion`: desactiva `grain`, `blob`, el `reveal`, el `transition` i el cicle de l'abella i el `scroll-behavior` (es mostra només la primera il·lustració)

## Últims canvis
- Resolts els marcadors de merge de Git que hi havia commitejats a `js/main.js` (el fitxer no era JavaScript vàlid i el selector d'idioma no funcionava); es manté `footer_desc` i es descarta la clau `marquee`, que ja no existeix al HTML
- Marquesina eliminada del tot (HTML, CSS, JS i traduccions)
- Nou efecte `blob-pulse` als blobs del fons: saturació i brillantor pujan i baixen cíclicament
- Eliminada la declaració duplicada de `reduceMotion` a `js/main.js`
- La imatge única de l'abella (`abellot.jpg`) es reemplaça per un slideshow de 6 il·lustracions (`abella-01` … `abella-06`) amb crossfade automàtic cada 3,5 s; eliminada l'animació `bee-float`
- Fons blanc dels 6 PNGs netejat a transparent (flood fill des de les vores amb tolerància + suavitzat d'alpha); verificat amb Edge headless (contenidor estable, cicle correcte i halo residual <30 px)
- Element de la imatge reescrit: contenidor `.bee-slideshow` d'aspecte fix 6/5 (sense salt de layout entre imatges) i sense les classes duplicades `lg:w-72 lg:w-96`
- `abella-07/08/09` afegides al repo i el slideshow reordenat (arrenca amb `abella-07`); `abellot-10/11/12` afegides al final (10 → 11 → 12)
- `abellot-11/12` venien en JPG amb fons gris i ombra; passats a PNG amb el fons clar fet transparent i l'ombra fosca conservada
- `abella-13.png` tenia fons blanc opac; netejat a transparent amb flood fill des de les vores (tolerància 28) + suavitzat d'alpha i verificat amb Edge headless (cantonades transparents, blancs interiors conservats)
- Slideshow ampliat: desktop 560px (abans efectiu 384px per `lg:w-96`), tablet 460px i mòbil 360px; afegida una base/ombra el·líptica sota la il·lustració (`.bee-slideshow::after`); l'amplada de desktop es limita segons l'alçada del viewport (`min(560px, calc((100vh - 300px) * 1.2))`) per no retallar el hero
- El slideshow ara arrenca amb `active` a la primera imatge (abans no es veia cap il·lustració fins al primer canvi, i amb `prefers-reduced-motion` no se'n veia cap)
- Escriptoris estrets (769–1023px): `#inici` passa a `overflow-y: auto` amb `align-items: flex-start` i marge automàtic perquè el hero no quedi escapsat

## Problemes detectats
- Contradicció: aquest document diu "CSS pur, sense frameworks" però `index.html` carrega Tailwind CDN (línia 12); el CSS propi només complementa el layout
- El selector d'idioma no persisteix: no hi ha `localStorage`, sempre torna a català en recarregar
- El JS aplica `transform` inline als `.parallax` (blobs), cosa que competeix amb el `transform` de les keyframes `blob-morph`
- En viewports d'alçada curta, el hero encara es pot retallar: a 769–1023px d'amplada ja no (la secció fa scroll), però a partir de 1024px d'amplada i amb poca alçada la columna de text pot excedir el `100vh` i `#main-content` (`overflow: hidden`) la retalla

## Decisions/Regles
- Fer servir CSS pur, sense frameworks (pendent de resoldre: Tailwind CDN present)
- Codi en anglès, comentaris i text de la web en català
- Respondre sempre en català (.cursorrules)
- Mai commitejar marcadors de merge de Git (`<<<<<<<`, `=======`, `>>>>>>>`) al repositori
- No escriure fitxers amb PowerShell `Set-Content`/`Out-File`: corrompen l'encoding UTF-8 (perden accents i caràcters com `→ ✆ ❯`); usar l'editor o una línia de comandos amb UTF-8
- Abans de donar per bo un canvi d'animació, verificar-ho amb Edge/Chrome headless (`--dump-dom` mesurant `getBoundingClientRect`) i no només llegint el codi