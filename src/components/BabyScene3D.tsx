import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Stars, MeshDistortMaterial } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";

const GlowingMoon = () => {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });
  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={1.5}>
      <mesh ref={ref} position={[0, 0.3, 0]}>
        <sphereGeometry args={[1.4, 64, 64]} />
        <MeshDistortMaterial
          color="#f5e6b8"
          emissive="#f5d990"
          emissiveIntensity={0.6}
          roughness={0.5}
          distort={0.15}
          speed={2}
        />
      </mesh>
    </Float>
  );
};

const BabyCloud = ({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) => {
  return (
    <Float speed={1.5} rotationIntensity={0.1} floatIntensity={1}>
      <group position={position} scale={scale}>
        <mesh>
          <sphereGeometry args={[0.4, 32, 32]} />
          <meshPhysicalMaterial color="#ffffff" roughness={0.8} opacity={0.7} transparent transmission={0.3} />
        </mesh>
        <mesh position={[0.35, 0.05, 0]}>
          <sphereGeometry args={[0.3, 32, 32]} />
          <meshPhysicalMaterial color="#ffffff" roughness={0.8} opacity={0.7} transparent transmission={0.3} />
        </mesh>
        <mesh position={[-0.3, 0.08, 0]}>
          <sphereGeometry args={[0.28, 32, 32]} />
          <meshPhysicalMaterial color="#ffffff" roughness={0.8} opacity={0.7} transparent transmission={0.3} />
        </mesh>
      </group>
    </Float>
  );
};

const TinyStar = ({ position }: { position: [number, number, number] }) => {
  const ref = useRef<THREE.Mesh>(null);
  const speed = useMemo(() => 0.5 + Math.random() * 2, []);
  useFrame((state) => {
    if (ref.current) {
      ref.current.scale.setScalar(0.8 + Math.sin(state.clock.elapsedTime * speed) * 0.3);
    }
  });
  return (
    <Float speed={1} floatIntensity={0.5}>
      <mesh ref={ref} position={position}>
        <octahedronGeometry args={[0.08, 0]} />
        <meshStandardMaterial color="#fde68a" emissive="#fbbf24" emissiveIntensity={1.5} />
      </mesh>
    </Float>
  );
};

const BabyScene3D = () => {
  return (
    <div className="w-full h-[420px] md:h-[500px] relative">
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at center, hsl(210 50% 92% / 0.2) 0%, transparent 70%)',
        borderRadius: '1.5rem'
      }} />
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={0.6} color="#fef3c7" />
        <pointLight position={[-3, 2, 2]} intensity={0.4} color="#fbcfe8" />

        <GlowingMoon />
        <BabyCloud position={[-2.2, 1.2, -1]} scale={0.9} />
        <BabyCloud position={[2.5, 0.8, -1.5]} scale={0.7} />
        <BabyCloud position={[-1.5, -1.3, -0.5]} scale={0.6} />

        <TinyStar position={[-1.8, 1.8, 0]} />
        <TinyStar position={[2.0, 1.5, -0.5]} />
        <TinyStar position={[1.2, -1.0, 0.5]} />
        <TinyStar position={[-2.5, -0.5, -0.3]} />
        <TinyStar position={[0.5, 2.0, -1]} />
        <TinyStar position={[-0.8, -1.8, 0.2]} />
        <TinyStar position={[2.8, -0.2, -0.8]} />

        <Stars radius={8} depth={3} count={80} factor={2} saturation={0} fade speed={1} />
      </Canvas>
    </div>
  );
};

export default BabyScene3D;
