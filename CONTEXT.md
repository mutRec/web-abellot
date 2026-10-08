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
- `images/abellot.jpg` — imatge de l'abella (497x412), usada com a decoració del hero

## Estat actual
- **Header**: barra fixa superior amb barra de grain de fons i el selector d'idioma CAT/ESP/ENG alineat a la dreta
- **Hero** (`#inici`, línia 39): fons decoratiu (`grain`, dos `blob`, `grid-bg`) + columna de text (tagline, h1 de 3 línies, descripció, CTA de WhatsApp) + columna dreta amb la imatge de l'abella
- **Footer** (`#contacte`): logotip ABELLOT.net, contactes (telèfon, email, WhatsApp) i © any dinàmic
- **Selector de llengua**: `ca` / `es` / `en` amb diccionari `translations` a `js/main.js` i atributs `data-i18n` al HTML (inclou `lang` del `<html>`)
- **Tipografia**: h1 amb `leading-[0.95]`, `whitespace-nowrap` i una línia amb text contornat (`.text-outline`)
- **Paleta**: cream `#FDF3E7` (fons), ink `#141210` (text), orange `#FF6B1A` (accent), yellow `#FFC93C` (highlight), honey `#E8A87C` (blob secundari)

## Efectes i animacions
- `grain` + `grain-shift` (8s, steps) — textura de gra sobre tot
- `blob-1` i `blob-2` — bomboles de fons amb `blob-morph-1/2` (16s / 20s) i `blob-pulse` (saturació + brillantor, 5,5s i 7s desfasats)
- `grid-bg` — quadrícula amb mascara radial i highlight que segueix el ratolí (`--mx` / `--my` des de JS)
- `reveal` — entrada suau en scroll amb `IntersectionObserver` (fallback: els marca tots com a visibles)
- `bee-float` (6s) — l'abella flota i s'inclina suaument; és l'únic moviment que té
- `parallax` als blobs segons `data-speed`
- `btn-primary` — esborrat diagonal en hover
- Bloques: desktop `#main-content` és `100vh` sense scroll; a ≤768px passa a `auto` i permet fer scroll

## Responsive
- Mobile (≤768px): columna, text centrat, footer apilat, header i botons més grans
- Tablet (≤1024px): imatge de l'abella i header ajustats
- `prefers-reduced-motion`: desactiva `grain`, `blob`, `bee-float`, el `reveal` i el `scroll-behavior`

## Últims canvis
- Resolts els marcadors de merge de Git que hi havia commitejats a `js/main.js` (el fitxer no era JavaScript vàlid i el selector d'idioma no funcionava); es manté `footer_desc` i es descarta la clau `marquee`, que ja no existeix al HTML
- Marquesina eliminada del tot (HTML, CSS, JS i traduccions)
- Nou efecte `blob-pulse` als blobs del fons: saturació i brillantor pujan i baixen cíclicament
- Eliminada la declaració duplicada de `reduceMotion` a `js/main.js`

## Problemes detectats
- Contradicció: aquest document diu "CSS pur, sense frameworks" però `index.html` carrega Tailwind CDN (línia 12); el CSS propi només complementa el layout
- El selector d'idioma no persisteix: no hi ha `localStorage`, sempre torna a català en recarregar
- `index.html:63` té classes duplicades: `lg:w-72 lg:w-96` (duplicades pel mateix breakpoint, Tailwind ignora la primera)
- L'abella no té moviment propi més enllà del `bee-float` vertical; no hi ha cap vol ni òrbita
- El JS aplica `transform` inline als `.parallax` (blobs), cosa que competeix amb el `transform` de les keyframes `blob-morph`
- En viewports d'alçada curta (768–1023px), `#main-content` és `100vh` amb `overflow: hidden` i el contingut es retalla en lloc de fer scroll

## Decisions/Regles
- Fer servir CSS pur, sense frameworks (pendent de resoldre: Tailwind CDN present)
- Codi en anglès, comentaris i text de la web en català
- Respondre sempre en català (.cursorrules)
- Mai commitejar marcadors de merge de Git (`<<<<<<<`, `=======`, `>>>>>>>`) al repositori
- No escriure fitxers amb PowerShell `Set-Content`/`Out-File`: corrompen l'encoding UTF-8 (perden accents i caràcters com `→ ✆ ❯`); usar l'editor o una línia de comandos amb UTF-8
- Abans de donar per bo un canvi d'animació, verificar-ho amb Edge/Chrome headless (`--dump-dom` mesurant `getBoundingClientRect`) i no només llegint el codi