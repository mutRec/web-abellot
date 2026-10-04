# Projecte: web-abellot
Web d'Abellot amb selector de llengua.

## Stack
- HTML5, CSS3, JavaScript vanilla

## Estat actual
- Landing d'una sola pàgina: header (selector CAT/ESP/ENG), hero, footer
- Selector de llengua implementat a js/main.js (ca/es/en) amb data-i18n
- Disseny responsive bàsic (mobile/tablet/desktop) + prefers-reduced-motion
- Efectes: grain, blobs morphing + pulsació d'intensitat de color, grid amb highlight de cursor, reveal, parallax

## Últims canvis
- Marquesina eliminada del tot (HTML, CSS, JS i traduccions)
- Nou efecte blob-pulse als blobs del fons: saturació i brillantor dels taronja/grocs puja i baixa cíclicament (5,5s blob-1, 7s blob-2 desfasats)
- Eliminada declaració duplicada de `reduceMotion` a js/main.js

## Problemes detectats
- Contradicció: CONTEXT.md diu "CSS pur, sense frameworks" però index.html carrega Tailwind CDN (línia 12); el CSS propi només complementa
- Selector d'idioma no persisteix (sense localStorage)
- Bug: index.html:63 té classes duplicades lg:w-72 lg:w-96

## Pròxims passos
- Millorar el disseny del header
- Millorar moviment logotip abella
- Resolver la contradicció Tailwind vs CSS pur
- Persistir l'idioma amb localStorage

## Decisions/Regles
- Fer servir CSS pur, sense frameworks (pendent de resoldre: Tailwind CDN present)
- Codi en anglès, comentaris en català
- Respondre sempre en català (.cursorrules)