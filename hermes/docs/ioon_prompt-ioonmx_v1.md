# Contexto para nuevo chat — Website ioon.mx

## Quién soy
Soy Francisco León, Director de Arte y Fotógrafo. Dirijo **iioon**, un estudio de diseño en Oaxaca, México. Mi filosofía es "Diseño de Autor + Ejecución Automatizada" — combino estética de autor con soberanía tecnológica (herramientas open source).

## Qué necesito
Un website para **ioon.mx** donde pueda subir y compartir presentaciones en línea con mis clientes. Requisitos:

### Funcionalidad
- Landing page del estudio (branding, sobre mí, contacto)
- Sección de presentaciones: cada presentación tiene su URL única que puedo compartir con un cliente
- Las presentaciones deben verse como slides navegables (tipo pitch deck)
- Posibilidad de subir contenido (imágenes, texto) para cada presentación
- Opcionalmente: proteger presentaciones con contraseña

### Stack técnico
- **Astro** como framework
- **Tailwind CSS 4.x** para estilos
- Estética minimalista, tipografía editorial, identidad de autor
- El sitio se desplegará en un VPS Hetzner (`89.167.93.139`) usando **Coolify** (Docker + Traefik)
- Dominio: `ioon.mx` (DNS en GoDaddy, ya apunta al VPS)
- Ya tengo corriendo otros servicios en el mismo servidor: Coolify, n8n, II-Agent

### Estética
- Minimalista, mucho espacio en blanco
- Tipografía editorial (serif para títulos, sans para cuerpo)
- Colores: principalmente blanco/negro con un acento sutil
- Inspiración: portfolios de arquitectura, galerías de arte contemporáneo
- Sin elementos genéricos de template — debe sentirse como diseño de autor

### Entregable
Necesito el código del proyecto Astro listo para desplegar. Empecemos por la estructura del proyecto y la landing page, luego iteramos sobre la funcionalidad de presentaciones.
