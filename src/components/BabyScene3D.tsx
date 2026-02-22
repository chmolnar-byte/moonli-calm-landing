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
          speed={2} />

      </mesh>
    </Float>);

};

const BabyCloud = ({ position, scale = 1 }: {position: [number, number, number];scale?: number;}) => {
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
    </Float>);

};

const TinyStar = ({ position }: {position: [number, number, number];}) => {
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
    </Float>);

};

const BabyScene3D = () => {
  return;































};

export default BabyScene3D;