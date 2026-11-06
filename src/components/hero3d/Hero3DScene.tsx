import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, RoundedBox, Sparkles, useTexture } from "@react-three/drei";
import * as THREE from "three";
import type { MotionValue } from "framer-motion";

type SceneProps = {
  progress: MotionValue<number>;
  /** When false the render loop stops, so an off-screen hero costs no GPU time. */
  active?: boolean;
  textures: { sleep: string; weekly: string; growth: string };
};

const PHONE_W = 1;
const PHONE_H = 921 / 447;

const Moon = () => {
  const glow = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = c.height = 256;
    const g = c.getContext("2d")!;
    const grad = g.createRadialGradient(128, 128, 20, 128, 128, 128);
    grad.addColorStop(0, "rgba(255,244,214,0.55)");
    grad.addColorStop(0.45, "rgba(255,230,180,0.16)");
    grad.addColorStop(1, "rgba(255,230,180,0)");
    g.fillStyle = grad;
    g.fillRect(0, 0, 256, 256);
    return new THREE.CanvasTexture(c);
  }, []);

  return (
    <group position={[0.9, 2.2, -3.4]}>
      <mesh>
        <sphereGeometry args={[0.9, 64, 64]} />
        <meshStandardMaterial color="#fff1cf" emissive="#f6d79b" emissiveIntensity={0.9} roughness={0.9} />
      </mesh>
      {[
        [0.25, 0.2, 0.86, 0.18],
        [-0.3, -0.25, 0.84, 0.12],
        [0.35, -0.4, 0.8, 0.09],
      ].map(([x, y, z, r], i) => (
        <mesh key={i} position={[x, y, z]}>
          <circleGeometry args={[r, 32]} />
          <meshBasicMaterial color="#e9c98b" transparent opacity={0.45} />
        </mesh>
      ))}
      <sprite scale={[5.4, 5.4, 1]}>
        <spriteMaterial map={glow} transparent depthWrite={false} />
      </sprite>
    </group>
  );
};

const Cloud = ({ position, scale = 1, speed = 0.15 }: { position: [number, number, number]; scale?: number; speed?: number }) => {
  const ref = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.position.x = position[0] + Math.sin(clock.elapsedTime * speed) * 0.5;
  });
  return (
    <group ref={ref} position={position} scale={scale}>
      {[
        [0, 0, 0, 0.55],
        [0.55, -0.08, 0.1, 0.42],
        [-0.55, -0.1, 0, 0.4],
        [0.2, 0.28, -0.1, 0.38],
        [-0.25, 0.2, 0.1, 0.34],
      ].map(([x, y, z, r], i) => (
        <mesh key={i} position={[x, y, z]}>
          <sphereGeometry args={[r, 24, 24]} />
          <meshStandardMaterial color="#f4f1ff" roughness={1} transparent opacity={0.88} emissive="#b9b4ff" emissiveIntensity={0.12} />
        </mesh>
      ))}
    </group>
  );
};

const Phone = ({
  texture,
  position,
  rotation,
  scale = 1,
}: {
  texture: THREE.Texture;
  position: [number, number, number];
  rotation: [number, number, number];
  scale?: number;
}) => (
  <group position={position} rotation={rotation} scale={scale}>
    <RoundedBox args={[PHONE_W * 0.97, PHONE_H * 0.985, 0.07]} radius={0.13} smoothness={6} position={[0, 0, -0.045]}>
      <meshStandardMaterial color="#14172d" metalness={0.7} roughness={0.3} />
    </RoundedBox>
    <mesh>
      <planeGeometry args={[PHONE_W, PHONE_H]} />
      <meshBasicMaterial map={texture} transparent toneMapped={false} />
    </mesh>
  </group>
);

const Rig = ({ progress, textures }: SceneProps) => {
  const group = useRef<THREE.Group>(null);
  const left = useRef<THREE.Group>(null);
  const right = useRef<THREE.Group>(null);

  const tex = useTexture(
    [textures.sleep, textures.weekly, textures.growth],
    (loaded) => {
      (Array.isArray(loaded) ? loaded : [loaded]).forEach((t) => {
        t.colorSpace = THREE.SRGBColorSpace;
        t.anisotropy = 8;
      });
    },
  ) as THREE.Texture[];
  const [sleepTex, weeklyTex, growthTex] = tex;

  useFrame((state, delta) => {
    const p = progress.get();
    const px = state.pointer.x;
    const py = state.pointer.y;
    if (group.current) {
      group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, px * 0.35 + p * 1.4, 3, delta);
      group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, -py * 0.18, 3, delta);
      group.current.position.y = THREE.MathUtils.damp(group.current.position.y, -p * 1.2, 3, delta);
    }
    if (left.current) left.current.position.x = THREE.MathUtils.damp(left.current.position.x, -1.15 - p * 0.9, 3, delta);
    if (right.current) right.current.position.x = THREE.MathUtils.damp(right.current.position.x, 1.15 + p * 0.9, 3, delta);
  });

  return (
    <>
      <group ref={group}>
        <group ref={left} position={[-1.15, -0.2, -0.5]}>
          <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.5}>
            <Phone texture={weeklyTex} position={[0, 0, 0]} rotation={[0, 0.35, 0.08]} scale={0.85} />
          </Float>
        </group>
        <group ref={right} position={[1.15, -0.2, -0.5]}>
          <Float speed={1.4} rotationIntensity={0.15} floatIntensity={0.5}>
            <Phone texture={growthTex} position={[0, 0, 0]} rotation={[0, -0.35, -0.08]} scale={0.85} />
          </Float>
        </group>
        <Float speed={1.6} rotationIntensity={0.1} floatIntensity={0.7}>
          <Phone texture={sleepTex} position={[0, 0.05, 0.4]} rotation={[0, 0, 0]} scale={1.1} />
        </Float>
      </group>
    </>
  );
};

const Hero3DScene = ({ progress, textures, active = true }: SceneProps) => (
  <Canvas
    frameloop={active ? "always" : "never"}
    dpr={[1, 1.5]}
    camera={{ position: [0, 0, 6.2], fov: 38 }}
    gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
    style={{ background: "transparent" }}
  >
    <ambientLight intensity={0.9} />
    <directionalLight position={[3, 4, 5]} intensity={1.6} color="#fff0d6" />
    <pointLight position={[-4, 3, -2]} intensity={14} color="#f6d79b" />
    <Moon />
    <Cloud position={[-2.4, 1.5, -2.4]} scale={0.8} speed={0.12} />
    <Cloud position={[-2.9, -0.6, -2]} scale={0.65} speed={0.18} />
    <Cloud position={[1.6, -2.3, -1.2]} scale={0.55} speed={0.1} />
    <Sparkles count={50} scale={[7, 6, 3]} size={3} speed={0.3} color="#ffe9b8" opacity={0.8} />
    <Suspense fallback={null}>
      <Rig progress={progress} textures={textures} />
    </Suspense>
  </Canvas>
);

export default Hero3DScene;
