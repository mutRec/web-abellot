
## Estado actual del proyecto

El proyecto consiste en una página web estática diseñada por ABELLOT.net. La página incluye funcionalidades como un selector de idiomas, efectos de revelación al desplazar, paralaje suave en elementos del hero y desplazamiento suave para anclas.

## Tecnologías y stack utilizados

- **HTML**: Estructura básica de la página.
- **CSS**: Estilos utilizando Tailwind CSS.
- **JavaScript**: Interactividad y funcionalidades dinámicas.

## Últimos cambios realizados

- Implementación del selector de idiomas con tres opciones: catalán (ca), español (es) y inglés (en).
- Adición de efectos de revelación al desplazar utilizando `IntersectionObserver`.
- Implementación de paralaje suave en elementos del hero.
- Adición de desplazamiento suave para anclas.
- Actualización del año en el pie de página dinámicamente.

## Próximos pasos pendientes

- Optimización de rendimiento de la página.
- Mejora de la accesibilidad.
- Adición de más secciones y contenido a la página.
- Implementación de pruebas unitarias para el código JavaScript.

## Reglas importantes aprendidas sobre el código

- Se utiliza Tailwind CSS para estilizar la página, lo que facilita la creación de diseños responsivos y personalizados.
- El código JavaScript está encapsulado en una función inmediatamente invocada (IIFE) para evitar contaminación del espacio global.
- Se utiliza `IntersectionObserver` para mejorar el rendimiento al aplicar efectos de revelación solo cuando los elementos son visibles en el viewport.
- Se implementa el paralaje suave solo si el usuario no ha activado la opción de reducir el movimiento en sus preferencias de sistema.
- Se utiliza `scrollIntoView` para el desplazamiento suave hacia anclas, mejorando la experiencia del usuario.
