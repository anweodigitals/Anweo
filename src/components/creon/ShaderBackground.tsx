import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

// Flowing molten gradient — soft warm ember meets deep ink
const fragmentShader = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec2 uResolution;

  // Simplex-ish noise
  vec3 mod289(vec3 x){return x - floor(x*(1.0/289.0))*289.0;}
  vec2 mod289(vec2 x){return x - floor(x*(1.0/289.0))*289.0;}
  vec3 permute(vec3 x){return mod289(((x*34.0)+1.0)*x);}
  float snoise(vec2 v){
    const vec4 C = vec4(0.211324865405187,0.366025403784439,-0.577350269189626,0.024390243902439);
    vec2 i = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x>x0.y) ? vec2(1.0,0.0) : vec2(0.0,1.0);
    vec4 x12 = x0.xyxy + C.xxzz; x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y+vec3(0.0,i1.y,1.0))+i.x+vec3(0.0,i1.x,1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m; m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    vec2 uv = vUv;
    vec2 p = uv * 2.0 - 1.0;
    p.x *= uResolution.x / uResolution.y;

    float t = uTime * 0.08;
    // layered flowing noise
    float n1 = snoise(p * 1.2 + vec2(t, -t * 0.6));
    float n2 = snoise(p * 2.4 - vec2(t * 0.7, t));
    float n3 = snoise(p * 4.0 + vec2(-t * 0.5, t * 0.3));
    float n = n1 * 0.55 + n2 * 0.3 + n3 * 0.15;

    // mouse-driven warm bloom
    vec2 m = uMouse * 2.0 - 1.0;
    m.x *= uResolution.x / uResolution.y;
    float d = distance(p, m);
    float bloom = smoothstep(1.2, 0.0, d) * 0.55;

    // palette: ink → plum → ember → bone hint
    vec3 ink   = vec3(0.043, 0.043, 0.051);
    vec3 plum  = vec3(0.102, 0.086, 0.125);
    vec3 ember = vec3(1.000, 0.357, 0.137);
    vec3 gold  = vec3(0.949, 0.737, 0.435);

    float k = smoothstep(-0.4, 0.9, n + bloom * 1.2);
    vec3 col = mix(ink, plum, smoothstep(0.0, 0.5, k));
    col = mix(col, ember * 0.85, smoothstep(0.55, 0.85, k));
    col = mix(col, gold, smoothstep(0.85, 1.0, k) * 0.6);

    // vignette
    float v = smoothstep(1.4, 0.4, length(uv - 0.5));
    col *= mix(0.55, 1.0, v);

    // film grain
    float grain = fract(sin(dot(uv * uResolution, vec2(12.9898,78.233))) * 43758.5453);
    col += (grain - 0.5) * 0.025;

    gl_FragColor = vec4(col, 1.0);
  }
`;

function Plane() {
  const mat = useRef<THREE.ShaderMaterial>(null);
  const mouse = useRef(new THREE.Vector2(0.5, 0.5));
  const target = useRef(new THREE.Vector2(0.5, 0.5));

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uResolution: { value: new THREE.Vector2(1, 1) },
    }),
    [],
  );

  useFrame(({ size, pointer, clock }) => {
    if (!mat.current) return;
    uniforms.uTime.value = clock.getElapsedTime();
    uniforms.uResolution.value.set(size.width, size.height);
    // pointer: -1..1 → 0..1
    target.current.set((pointer.x + 1) * 0.5, (pointer.y + 1) * 0.5);
    mouse.current.lerp(target.current, 0.04);
    uniforms.uMouse.value.copy(mouse.current);
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={mat}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}

export function ShaderBackground({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute inset-0 ${className}`} aria-hidden>
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: false, powerPreference: "high-performance", alpha: false }}
        camera={{ position: [0, 0, 1] }}
      >
        <Plane />
      </Canvas>
    </div>
  );
}
