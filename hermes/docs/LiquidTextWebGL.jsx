// LiquidTextWebGL.jsx
// Primer componente de la biblioteca interna `ioon-effects`.
// Texto con deformación tipográfica sutil vía OGL + shader (ruido simplex procedural).
// Renderiza el texto en un <canvas> WebGL con fallback automático a <h1> simple
// si WebGL no está disponible o si el usuario tiene `prefers-reduced-motion: reduce`.
//
// HISTÓRICO (mayo 11 2026): este componente usa OGL como backend WebGL.
// El Marco v4 del estudio (ioon_8-4-2_v20260511-1115 §1.14) canonizó R3F+drei
// como motor 3D/WebGL, lo que invalida este archivo en su forma actual.
// La acción correctiva (reescribir manteniendo API pública, migrar internals
// OGL → R3F+drei) está registrada en ioon_8-4-13_v20260511-1139 §6.1.
//
// Uso (cuando se reescriba, el consumo no cambia):
//   <LiquidTextWebGL
//     texts={[
//       "Sitios web listos para personalizar y lanzar",
//       "Hechos para tu marca, no para tu industria",
//       "Diseño de autor, ejecución automatizada",
//       "Sin plantillas. Puntos de partida.",
//     ]}
//   />
//
// Dependencia: `ogl` (npm i ogl). Bajo Marco v4 esto cambia a `three + @react-three/fiber + @react-three/drei`.

import { useEffect, useMemo, useRef, useState } from 'react';
import { Camera, Mesh, Plane, Program, Renderer, Texture, Vec2 } from 'ogl';

const VERT = /* glsl */ `
attribute vec2 uv;
attribute vec3 position;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 1.0);
}
`;

const FRAG = /* glsl */ `
precision highp float;

uniform float uTime;
uniform vec2  uResolution;
uniform sampler2D uTexture;
uniform float uIntensity;
uniform float uScale;
uniform float uSpeed;

varying vec2 vUv;

// Simplex noise 2D (Ashima Arts / Stefan Gustavson, dominio público).
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                     -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
                + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m = m * m; m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x  = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main() {
  vec2 uv = vUv;
  float t = uTime * uSpeed;

  // Dos octavas de ruido para movimiento orgánico.
  float nx = snoise(vec2(uv.x * uScale + t,        uv.y * uScale))        * 0.6
           + snoise(vec2(uv.x * uScale * 2.1 + t * 1.3, uv.y * uScale * 2.1)) * 0.3;
  float ny = snoise(vec2(uv.x * uScale + 13.7,     uv.y * uScale + t * 0.7)) * 0.6
           + snoise(vec2(uv.x * uScale * 2.1 + 13.7, uv.y * uScale * 2.1 + t * 0.9)) * 0.3;

  vec2 disp = vec2(nx, ny) * uIntensity;
  vec4 col = texture2D(uTexture, uv + disp);
  gl_FragColor = col;
}
`;

function buildTextTexture(gl, text, widthCss, heightCss, dpr, opts) {
  const c = document.createElement('canvas');
  c.width = Math.max(2, Math.round(widthCss * dpr));
  c.height = Math.max(2, Math.round(heightCss * dpr));
  const ctx = c.getContext('2d');
  ctx.scale(dpr, dpr);
  ctx.clearRect(0, 0, widthCss, heightCss);

  const fontSize = Math.min(56, Math.max(32, widthCss * 0.05));
  const lineHeight = fontSize * 1.1;
  ctx.font = `${opts.fontWeight} ${fontSize}px ${opts.fontFamily}`;
  ctx.fillStyle = opts.color;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';

  // Wrap por palabras al ancho del contenedor.
  const words = text.split(' ');
  const lines = [];
  let line = '';
  for (const w of words) {
    const test = line ? `${line} ${w}` : w;
    if (ctx.measureText(test).width > widthCss && line) {
      lines.push(line);
      line = w;
    } else {
      line = test;
    }
  }
  if (line) lines.push(line);

  // Centrado vertical dentro del contenedor.
  const totalH = lines.length * lineHeight;
  let y = Math.max(0, (heightCss - totalH) / 2);
  for (const ln of lines) {
    ctx.fillText(ln, 0, y);
    y += lineHeight;
  }

  return new Texture(gl, {
    image: c,
    generateMipmaps: false,
    minFilter: gl.LINEAR,
    magFilter: gl.LINEAR,
  });
}

export default function LiquidTextWebGL({
  texts,
  interval = 4500,
  intensity = 0.012,
  scale = 3.0,
  speed = 0.25,
  className,
  style,
  fontFamily = '"Space Grotesk", system-ui, sans-serif',
  fontWeight = 300,
  letterSpacing = '-1px',
  color = '#fafafa',
  containerHeight = 'clamp(96px, 12vw, 160px)',
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const stateRef = useRef({});
  const [activeIndex, setActiveIndex] = useState(0);
  const [unsupported, setUnsupported] = useState(false);

  const arr = useMemo(() => (Array.isArray(texts) ? texts : [texts]), [texts]);

  // Rotación de copy.
  useEffect(() => {
    if (arr.length <= 1) return;
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;
    const id = setInterval(() => {
      setActiveIndex((i) => (i + 1) % arr.length);
    }, interval);
    return () => clearInterval(id);
  }, [arr.length, interval]);

  // Init OGL una sola vez al montar.
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    let mounted = true;
    let raf = null;
    let onResize = null;
    let io = null;

    try {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const renderer = new Renderer({ canvas, alpha: true, dpr, antialias: true });
      const gl = renderer.gl;
      gl.clearColor(0, 0, 0, 0);

      const rect = container.getBoundingClientRect();
      renderer.setSize(rect.width, rect.height);

      const camera = new Camera(gl);
      camera.position.z = 1;

      const geometry = new Plane(gl, { width: 2, height: 2 });

      const initialTexture = buildTextTexture(gl, arr[0], rect.width, rect.height, dpr, {
        fontFamily, fontWeight, color,
      });

      const program = new Program(gl, {
        vertex: VERT,
        fragment: FRAG,
        transparent: true,
        uniforms: {
          uTime: { value: 0 },
          uResolution: { value: new Vec2(rect.width, rect.height) },
          uTexture: { value: initialTexture },
          uIntensity: { value: intensity },
          uScale: { value: scale },
          uSpeed: { value: speed },
        },
      });

      const mesh = new Mesh(gl, { geometry, program });

      const start = performance.now();
      const tick = () => {
        if (!mounted) return;
        program.uniforms.uTime.value = (performance.now() - start) / 1000;
        renderer.render({ scene: mesh, camera });
        raf = requestAnimationFrame(tick);
      };

      onResize = () => {
        const r = container.getBoundingClientRect();
        renderer.setSize(r.width, r.height);
        program.uniforms.uResolution.value.set(r.width, r.height);
        const tex = buildTextTexture(
          gl, arr[stateRef.current.activeIndex || 0], r.width, r.height, dpr,
          { fontFamily, fontWeight, color }
        );
        program.uniforms.uTexture.value = tex;
      };
      window.addEventListener('resize', onResize);

      io = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting && raf == null) tick();
        else if (!entry.isIntersecting && raf != null) {
          cancelAnimationFrame(raf);
          raf = null;
        }
      });
      io.observe(container);

      // Render inicial; el IntersectionObserver decide si sigue.
      tick();

      stateRef.current = {
        gl,
        program,
        dpr,
        rebuild: (text) => {
          const r = container.getBoundingClientRect();
          const tex = buildTextTexture(gl, text, r.width, r.height, dpr, {
            fontFamily, fontWeight, color,
          });
          program.uniforms.uTexture.value = tex;
        },
      };
    } catch (err) {
      // eslint-disable-next-line no-console
      console.warn('[LiquidTextWebGL] WebGL no disponible, fallback a texto plano.', err);
      setUnsupported(true);
      return;
    }

    return () => {
      mounted = false;
      if (raf) cancelAnimationFrame(raf);
      if (onResize) window.removeEventListener('resize', onResize);
      if (io) io.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Cuando rota el copy, sólo se reconstruye la textura.
  useEffect(() => {
    stateRef.current.activeIndex = activeIndex;
    if (stateRef.current.rebuild) {
      stateRef.current.rebuild(arr[activeIndex]);
    }
  }, [activeIndex, arr]);

  // Knobs en caliente.
  useEffect(() => {
    if (stateRef.current.program) {
      stateRef.current.program.uniforms.uIntensity.value = intensity;
      stateRef.current.program.uniforms.uScale.value = scale;
      stateRef.current.program.uniforms.uSpeed.value = speed;
    }
  }, [intensity, scale, speed]);

  const reducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Fallback accesible: WebGL caído o usuario con motion-reduce.
  if (unsupported || reducedMotion) {
    return (
      <h1
        ref={containerRef}
        className={className}
        aria-live={arr.length > 1 ? 'polite' : undefined}
        style={{
          fontFamily,
          fontWeight,
          letterSpacing,
          color,
          margin: 0,
          fontSize: 'clamp(32px, 5vw, 56px)',
          lineHeight: 1.1,
          ...style,
        }}
      >
        {arr[activeIndex]}
      </h1>
    );
  }

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        position: 'relative',
        height: containerHeight,
        ...style,
      }}
    >
      {/* H1 oculto pero accesible para lectores de pantalla. */}
      <h1
        aria-live={arr.length > 1 ? 'polite' : undefined}
        style={{
          position: 'absolute',
          inset: 0,
          margin: 0,
          fontFamily,
          fontWeight,
          letterSpacing,
          color,
          fontSize: 'clamp(32px, 5vw, 56px)',
          lineHeight: 1.1,
          opacity: 0,
          pointerEvents: 'none',
        }}
      >
        {arr[activeIndex]}
      </h1>
      <canvas
        ref={canvasRef}
        style={{ display: 'block', width: '100%', height: '100%' }}
      />
    </div>
  );
}
