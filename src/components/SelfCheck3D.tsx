"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Float, Line, Html, Environment, ContactShadows } from "@react-three/drei";
import { useMemo, useRef, useState, Suspense } from "react";
import * as THREE from "three";

const ROSE = "#f43f5e";
const PINK = "#ec4899";
const GLOW = "#fb7185";

// Which anatomical zone / behaviour each of the 7 BSE steps maps to.
// mode: "inspect" = look at the form, "spiral" = circular palpation, "clock" = clock-method, "pit" = underarm/lymph
type StepSpec = { mode: "inspect" | "spiral" | "clock" | "pit"; side: -1 | 1; label: string };
const STEP_SPECS: StepSpec[] = [
  { mode: "inspect", side: 1, label: "Visual inspection" },
  { mode: "inspect", side: 1, label: "Arms raised" },
  { mode: "inspect", side: 1, label: "Hands on hips" },
  { mode: "spiral", side: -1, label: "Lying down — left" },
  { mode: "spiral", side: 1, label: "Circular palpation" },
  { mode: "clock", side: 1, label: "Clock method" },
  { mode: "pit", side: 1, label: "Underarm / lymph nodes" },
];

function clamp(n: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, n));
}

/* ---------- Holographic torso bust (abstract, clinical) ---------- */
function Torso({ pulse }: { pulse: number }) {
  const matProps = {
    color: "#ffe4ec",
    transparent: true,
    opacity: 0.22,
    roughness: 0.15,
    metalness: 0.1,
    transmission: 0.6,
    thickness: 1.2,
    emissive: ROSE,
    emissiveIntensity: 0.12 + pulse * 0.05,
  } as const;

  return (
    <group position={[0, -0.1, 0]}>
      {/* chest slab */}
      <mesh position={[0, 0, 0]} scale={[1.55, 1.85, 0.85]}>
        <sphereGeometry args={[1, 48, 48]} />
        <meshPhysicalMaterial {...matProps} />
      </mesh>
      {/* neck */}
      <mesh position={[0, 1.55, 0.1]} scale={[0.32, 0.55, 0.32]}>
        <cylinderGeometry args={[1, 1.15, 1, 24]} />
        <meshPhysicalMaterial {...matProps} />
      </mesh>
      {/* shoulders */}
      <mesh position={[-1.15, 0.95, 0]} scale={[0.55, 0.45, 0.6]}>
        <sphereGeometry args={[1, 24, 24]} />
        <meshPhysicalMaterial {...matProps} />
      </mesh>
      <mesh position={[1.15, 0.95, 0]} scale={[0.55, 0.45, 0.6]}>
        <sphereGeometry args={[1, 24, 24]} />
        <meshPhysicalMaterial {...matProps} />
      </mesh>
      {/* wireframe overlay for the "scan" look */}
      <mesh position={[0, 0, 0]} scale={[1.56, 1.86, 0.86]}>
        <sphereGeometry args={[1, 24, 18]} />
        <meshBasicMaterial color={GLOW} wireframe transparent opacity={0.07} />
      </mesh>
    </group>
  );
}

/* ---------- Concentric inward-spiral palpation path ---------- */
function SpiralGuide({ active }: { active: boolean }) {
  const points = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    const turns = 3.2;
    const steps = 260;
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const r = 0.62 * (1 - t * 0.86);
      const a = t * turns * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(a) * r, Math.sin(a) * r, 0.04));
    }
    return pts;
  }, []);

  const markerRef = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!markerRef.current) return;
    const t = (clock.getElapsedTime() * 0.18) % 1;
    const idx = Math.floor(t * (points.length - 1));
    const p = points[idx];
    markerRef.current.position.set(p.x, p.y, p.z + 0.06);
    const s = 0.07 + Math.sin(clock.getElapsedTime() * 6) * 0.012;
    markerRef.current.scale.setScalar(s);
  });

  return (
    <group>
      <Line points={points} color={active ? ROSE : "#fda4af"} lineWidth={active ? 2.4 : 1.2} transparent opacity={active ? 0.95 : 0.4} />
      {active && (
        <mesh ref={markerRef}>
          <sphereGeometry args={[1, 20, 20]} />
          <meshStandardMaterial color="#ffffff" emissive={ROSE} emissiveIntensity={2.2} toneMapped={false} />
        </mesh>
      )}
    </group>
  );
}

/* ---------- Clock-method ring with 12 markers ---------- */
function ClockGuide({ active }: { active: boolean }) {
  const ringRef = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (ringRef.current && active) ringRef.current.rotation.z = -clock.getElapsedTime() * 0.5;
  });
  const ticks = useMemo(() => Array.from({ length: 12 }, (_, i) => i), []);
  const R = 0.66;

  return (
    <group>
      <mesh rotation={[0, 0, 0]}>
        <torusGeometry args={[R, 0.012, 12, 80]} />
        <meshStandardMaterial color={active ? ROSE : "#fecdd3"} emissive={ROSE} emissiveIntensity={active ? 1.2 : 0.2} toneMapped={false} />
      </mesh>
      {ticks.map((i) => {
        const a = (i / 12) * Math.PI * 2 + Math.PI / 2;
        const x = Math.cos(a) * R;
        const y = Math.sin(a) * R;
        return (
          <group key={i} position={[x, y, 0.02]}>
            <mesh>
              <sphereGeometry args={[i % 3 === 0 ? 0.035 : 0.02, 12, 12]} />
              <meshStandardMaterial color="#ffffff" emissive={PINK} emissiveIntensity={1.6} toneMapped={false} />
            </mesh>
            {active && i % 3 === 0 && (
              <Html center distanceFactor={6} position={[0, 0, 0.1]}>
                <span style={{ fontSize: 11, color: "#9f1239", fontWeight: 700, fontFamily: "system-ui", userSelect: "none" }}>
                  {i === 0 ? 12 : i}
                </span>
              </Html>
            )}
          </group>
        );
      })}
      <group ref={ringRef}>
        <mesh position={[0, R, 0.03]}>
          <coneGeometry args={[0.05, 0.14, 16]} />
          <meshStandardMaterial color="#ffffff" emissive={ROSE} emissiveIntensity={2.4} toneMapped={false} />
        </mesh>
      </group>
    </group>
  );
}

/* ---------- Pulsing focus zone on the active side ---------- */
function FocusZone({ spec }: { spec: StepSpec }) {
  const groupRef = useRef<THREE.Group>(null);
  const pulseRef = useRef(0);

  useFrame(({ clock }, delta) => {
    pulseRef.current = (Math.sin(clock.getElapsedTime() * 2) + 1) / 2;
    if (groupRef.current) {
      // ease the zone toward its target position when the side changes
      const targetX = spec.side * 0.5;
      const targetY = spec.mode === "pit" ? 0.75 : 0.15;
      groupRef.current.position.x += (targetX - groupRef.current.position.x) * clamp(delta * 4, 0, 1);
      groupRef.current.position.y += (targetY - groupRef.current.position.y) * clamp(delta * 4, 0, 1);
    }
  });

  const showSpiral = spec.mode === "spiral";
  const showClock = spec.mode === "clock";
  const showHalo = spec.mode === "inspect" || spec.mode === "pit";

  return (
    <group ref={groupRef} position={[spec.side * 0.5, 0.15, 0.55]}>
      {showHalo && (
        <Float speed={3} rotationIntensity={0} floatIntensity={0.4}>
          <mesh>
            <ringGeometry args={[0.34, 0.4, 48]} />
            <meshBasicMaterial color={ROSE} transparent opacity={0.8} side={THREE.DoubleSide} />
          </mesh>
          <mesh>
            <circleGeometry args={[0.34, 48]} />
            <meshBasicMaterial color={GLOW} transparent opacity={0.15} side={THREE.DoubleSide} />
          </mesh>
        </Float>
      )}
      <SpiralGuide active={showSpiral} />
      <ClockGuide active={showClock} />
    </group>
  );
}

/* ---------- Camera that gently frames the active side ---------- */
function CameraRig({ side }: { side: -1 | 1 }) {
  const { camera } = useThree();
  useFrame((_, delta) => {
    const targetX = side * 0.9;
    camera.position.x += (targetX - camera.position.x) * clamp(delta * 1.5, 0, 1);
    camera.lookAt(0, 0.1, 0);
  });
  return null;
}

function Scene({ step }: { step: number }) {
  const spec = STEP_SPECS[clamp(step, 0, STEP_SPECS.length - 1)] ?? STEP_SPECS[0];
  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 4, 5]} intensity={1.1} />
      <directionalLight position={[-4, 2, -3]} intensity={0.5} color={PINK} />
      <pointLight position={[0, 1, 3]} intensity={1.2} color={GLOW} />
      <Suspense fallback={null}>
        <Environment preset="studio" />
      </Suspense>

      <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.25}>
        <Torso pulse={0.5} />
        <FocusZone spec={spec} />
      </Float>

      <ContactShadows position={[0, -2.1, 0]} opacity={0.25} scale={8} blur={2.6} far={4} color={ROSE} />
      <CameraRig side={spec.side} />
      <OrbitControls
        enablePan={false}
        minDistance={3}
        maxDistance={7}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 1.7}
        autoRotate
        autoRotateSpeed={0.6}
        enableDamping
      />
    </>
  );
}

export function SelfCheck3D({ step, caption }: { step: number; caption?: string }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="w-full h-full min-h-[320px] rounded-2xl bg-gradient-to-br from-rose-100 to-pink-100 dark:from-rose-950/40 dark:to-zinc-900 flex items-center justify-center text-rose-400 text-sm">
        3D guide unavailable on this device
      </div>
    );
  }

  return (
    <div className="relative w-full h-full min-h-[340px] rounded-2xl overflow-hidden bg-gradient-to-b from-rose-50/60 via-white to-pink-50/50 dark:from-zinc-900 dark:via-black dark:to-zinc-950 border border-rose-100 dark:border-rose-950 shadow-inner">
      <Canvas
        camera={{ position: [0, 0.2, 5], fov: 42 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        onCreated={({ gl }) => {
          gl.toneMappingExposure = 1.1;
        }}
        onError={() => setFailed(true)}
      >
        <Scene step={step} />
      </Canvas>

      {/* HUD overlay — the "research instrument" frame */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-3 left-3 flex items-center gap-2 text-[10px] font-mono tracking-widest text-rose-500/80 uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
          BSE · 3D Guidance
        </div>
        <div className="absolute top-3 right-3 text-[10px] font-mono text-rose-400/70">
          {String(clamp(step, 0, 6) + 1).padStart(2, "0")} / 07
        </div>
        {caption && (
          <div className="absolute bottom-3 left-3 right-3 text-center">
            <span className="inline-block px-3 py-1 rounded-full bg-white/80 dark:bg-zinc-900/80 backdrop-blur text-xs font-medium text-rose-700 dark:text-rose-200 border border-rose-100 dark:border-rose-900">
              {caption}
            </span>
          </div>
        )}
        <div className="absolute bottom-3 right-3 text-[9px] font-mono text-rose-400/50">drag to rotate</div>
      </div>
    </div>
  );
}

export default SelfCheck3D;
