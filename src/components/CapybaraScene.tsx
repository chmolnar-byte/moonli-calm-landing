import { Canvas, useFrame } from "@react-three/fiber";
import { useScroll } from "framer-motion";
import { useRef, useEffect, useState, useMemo } from "react";
import * as THREE from "three";

const Capybara = ({ scrollProgress }: { scrollProgress: number }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = scrollProgress * Math.PI * 4;
    groupRef.current.rotation.x = Math.sin(scrollProgress * Math.PI * 2) * 0.1;
    groupRef.current.position.y = Math.sin(Date.now() * 0.0008) * 0.05;
  });

  // Realistic capybara colors
  const furMain = useMemo(() => new THREE.Color("#7A6040"), []);
  const furDark = useMemo(() => new THREE.Color("#5C4830"), []);
  const furLight = useMemo(() => new THREE.Color("#9B8060"), []);
  const furBelly = useMemo(() => new THREE.Color("#A89070"), []);
  const nosePink = useMemo(() => new THREE.Color("#4A3A2A"), []);
  const eyeBlack = useMemo(() => new THREE.Color("#111111"), []);
  const eyeShine = useMemo(() => new THREE.Color("#ffffff"), []);
  const earColor = useMemo(() => new THREE.Color("#5A4530"), []);

  return (
    <group ref={groupRef} scale={0.9} position={[0, -0.5, 0]}>
      {/* === BODY === */}
      {/* Main body - elongated barrel shape (capybaras are long & round) */}
      <mesh position={[0, 0, 0]} scale={[1, 0.75, 1.4]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color={furMain} roughness={0.85} metalness={0.02} />
      </mesh>
      {/* Rump - slightly wider */}
      <mesh position={[0, 0.05, -0.6]} scale={[0.95, 0.7, 0.9]}>
        <sphereGeometry args={[0.9, 32, 32]} />
        <meshStandardMaterial color={furMain} roughness={0.85} metalness={0.02} />
      </mesh>
      {/* Belly underside */}
      <mesh position={[0, -0.3, 0]} scale={[0.8, 0.5, 1.2]}>
        <sphereGeometry args={[0.85, 32, 32]} />
        <meshStandardMaterial color={furBelly} roughness={0.9} metalness={0.01} />
      </mesh>

      {/* === HEAD === */}
      {/* Capybara head is boxy/rectangular, not round */}
      <mesh position={[0, 0.3, 1.1]} scale={[0.7, 0.6, 0.75]}>
        <sphereGeometry args={[0.55, 32, 32]} />
        <meshStandardMaterial color={furMain} roughness={0.85} metalness={0.02} />
      </mesh>
      {/* Top of head - flat */}
      <mesh position={[0, 0.5, 0.95]} scale={[0.6, 0.3, 0.6]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color={furMain} roughness={0.85} metalness={0.02} />
      </mesh>

      {/* === SNOUT === */}
      {/* Capybara snout is large, blunt, squared-off */}
      <mesh position={[0, 0.15, 1.55]} scale={[0.55, 0.45, 0.5]}>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshStandardMaterial color={furLight} roughness={0.85} metalness={0.02} />
      </mesh>
      {/* Nose pad - large and dark */}
      <mesh position={[0, 0.22, 1.73]} scale={[0.35, 0.2, 0.15]}>
        <sphereGeometry args={[0.15, 24, 24]} />
        <meshStandardMaterial color={nosePink} roughness={0.6} metalness={0.05} />
      </mesh>
      {/* Nostrils */}
      <mesh position={[-0.03, 0.21, 1.78]}>
        <sphereGeometry args={[0.02, 12, 12]} />
        <meshStandardMaterial color={eyeBlack} roughness={0.9} />
      </mesh>
      <mesh position={[0.03, 0.21, 1.78]}>
        <sphereGeometry args={[0.02, 12, 12]} />
        <meshStandardMaterial color={eyeBlack} roughness={0.9} />
      </mesh>

      {/* === EYES - small and set high on the head (capybara trait) === */}
      <mesh position={[-0.2, 0.45, 1.35]}>
        <sphereGeometry args={[0.055, 20, 20]} />
        <meshStandardMaterial color={eyeBlack} roughness={0.15} metalness={0.4} />
      </mesh>
      <mesh position={[-0.19, 0.46, 1.4]}>
        <sphereGeometry args={[0.015, 12, 12]} />
        <meshStandardMaterial color={eyeShine} emissive={eyeShine} emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[0.2, 0.45, 1.35]}>
        <sphereGeometry args={[0.055, 20, 20]} />
        <meshStandardMaterial color={eyeBlack} roughness={0.15} metalness={0.4} />
      </mesh>
      <mesh position={[0.21, 0.46, 1.4]}>
        <sphereGeometry args={[0.015, 12, 12]} />
        <meshStandardMaterial color={eyeShine} emissive={eyeShine} emissiveIntensity={0.3} />
      </mesh>

      {/* === EARS - tiny and rounded (key capybara feature) === */}
      <mesh position={[-0.25, 0.6, 0.9]} scale={[0.6, 1, 0.5]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color={earColor} roughness={0.8} />
      </mesh>
      <mesh position={[0.25, 0.6, 0.9]} scale={[0.6, 1, 0.5]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color={earColor} roughness={0.8} />
      </mesh>

      {/* === LEGS - short and stubby (capybara signature) === */}
      {/* Front legs */}
      <mesh position={[-0.4, -0.55, 0.5]}>
        <capsuleGeometry args={[0.13, 0.35, 12, 12]} />
        <meshStandardMaterial color={furDark} roughness={0.85} />
      </mesh>
      <mesh position={[0.4, -0.55, 0.5]}>
        <capsuleGeometry args={[0.13, 0.35, 12, 12]} />
        <meshStandardMaterial color={furDark} roughness={0.85} />
      </mesh>
      {/* Back legs - slightly thicker */}
      <mesh position={[-0.38, -0.5, -0.55]}>
        <capsuleGeometry args={[0.15, 0.35, 12, 12]} />
        <meshStandardMaterial color={furDark} roughness={0.85} />
      </mesh>
      <mesh position={[0.38, -0.5, -0.55]}>
        <capsuleGeometry args={[0.15, 0.35, 12, 12]} />
        <meshStandardMaterial color={furDark} roughness={0.85} />
      </mesh>

      {/* Feet - slightly webbed look */}
      <mesh position={[-0.4, -0.8, 0.55]} scale={[1, 0.5, 1.3]}>
        <sphereGeometry args={[0.1, 12, 12]} />
        <meshStandardMaterial color={furDark} roughness={0.9} />
      </mesh>
      <mesh position={[0.4, -0.8, 0.55]} scale={[1, 0.5, 1.3]}>
        <sphereGeometry args={[0.1, 12, 12]} />
        <meshStandardMaterial color={furDark} roughness={0.9} />
      </mesh>
      <mesh position={[-0.38, -0.75, -0.5]} scale={[1, 0.5, 1.3]}>
        <sphereGeometry args={[0.11, 12, 12]} />
        <meshStandardMaterial color={furDark} roughness={0.9} />
      </mesh>
      <mesh position={[0.38, -0.75, -0.5]} scale={[1, 0.5, 1.3]}>
        <sphereGeometry args={[0.11, 12, 12]} />
        <meshStandardMaterial color={furDark} roughness={0.9} />
      </mesh>
    </group>
  );
};

const CapybaraScene = () => {
  const { scrollYProgress } = useScroll();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (v) => setProgress(v));
    return unsubscribe;
  }, [scrollYProgress]);

  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] md:w-[360px] md:h-[360px] z-0 pointer-events-none opacity-15">
      <Canvas camera={{ position: [0, 0.3, 4], fov: 30 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[3, 5, 4]} intensity={0.8} color="#fff5e6" />
        <directionalLight position={[-2, 3, -1]} intensity={0.25} color="#e6e0ff" />
        <Capybara scrollProgress={progress} />
      </Canvas>
    </div>
  );
};

export default CapybaraScene;
