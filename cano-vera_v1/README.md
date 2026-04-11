# CANO|VERA v1 — Deploy en Coolify

## Opción A: Desde GitHub (recomendado)

1. Sube esta carpeta a tu repo `0_ioon` (o crea uno nuevo):
```bash
cd cano-vera_v1
git init
git add .
git commit -m "CANO|VERA portfolio v1"
git remote add origin https://github.com/TU_USER/cano-vera_v1.git
git push -u origin main
```

2. En Coolify (coolify.ioon.mx):
   - **+ New Resource → Application**
   - Source: **GitHub** → selecciona el repo
   - Build Pack: **Dockerfile**
   - Port: **80**
   - Domain: `ioon.mx`
   - En **Advanced → Custom Labels** o en la config de Traefik, agrega el path prefix `/cano-vera_v1`

3. Deploy → Coolify construye el Docker y lo sirve.

## Opción B: Deploy directo con Docker

```bash
# En tu VPS (89.167.93.139)
scp -r cano-vera_v1/ root@89.167.93.139:/tmp/
ssh root@89.167.93.139

cd /tmp/cano-vera_v1
docker build -t canovera-v1 .
docker run -d --name canovera-v1 -p 3100:80 canovera-v1
```

Luego en Coolify, configura un proxy inverso apuntando `ioon.mx/cano-vera_v1` al puerto 3100.

## Opción C: Servir como estático en un sitio existente

```bash
cd cano-vera_v1
npm install
npm run build
# Copia dist/ al directorio público de tu server bajo /cano-vera_v1/
scp -r dist/* root@89.167.93.139:/var/www/ioon.mx/cano-vera_v1/
```

## Estructura
```
cano-vera_v1/
├── Dockerfile        ← Build multi-stage + nginx
├── nginx.conf        ← SPA routing bajo /cano-vera_v1/
├── vite.config.js    ← Base path configurado
├── package.json
├── index.html
└── src/
    ├── main.jsx
    └── App.jsx       ← Componente principal (galería + lightbox)
```
