#!/usr/bin/env node
/**
 * Crea una nueva presentación.
 * Uso: npm run new-deck -- mi-cliente
 */
import fs from 'node:fs';
import path from 'node:path';

const slug = process.argv[2];
if (!slug) {
  console.error('Uso: npm run new-deck -- <slug>\nEjemplo: npm run new-deck -- casa-monte');
  process.exit(1);
}

const dir = path.resolve('src/content/presentaciones', slug);
const pubDir = path.resolve('public/presentaciones', slug);

if (fs.existsSync(dir)) {
  console.error(`Ya existe: ${dir}`);
  process.exit(1);
}

fs.mkdirSync(dir, { recursive: true });
fs.mkdirSync(pubDir, { recursive: true });

const config = {
  title: slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
  client: '',
  date: new Date().toISOString().slice(0, 10),
  password: '',
  slides: [
    {
      type: 'title',
      overline: 'ioon',
      heading: 'Título de la presentación',
      subheading: 'Subtítulo — fecha'
    },
    {
      type: 'text',
      heading: 'Contenido',
      body: 'Escribe aquí el contenido de esta diapositiva.'
    },
    {
      type: 'title',
      heading: 'Gracias',
      subheading: 'hola@ioon.mx'
    }
  ]
};

fs.writeFileSync(path.join(dir, 'config.json'), JSON.stringify(config, null, 2));

console.log(`✓ Presentación creada: ${dir}`);
console.log(`  Edita: src/content/presentaciones/${slug}/config.json`);
console.log(`  Imágenes: public/presentaciones/${slug}/`);
console.log(`  URL: https://ioon.mx/presentaciones/${slug}`);
