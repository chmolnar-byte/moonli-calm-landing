import { Canvas, useFrame } from "@react-three/fiber";
import { useScroll } from "framer-motion";
import { useRef, useEffect, useState, useMemo } from "react";
import * as THREE from "three";

const SleepingCapybara = ({ scrollProgress }: { scrollProgress: number }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = scrollProgress * Math.PI * 4;
    groupRef.current.rotation.x = Math.sin(scrollProgress * Math.PI * 2) * 0.08;
    // Gentle breathing float
    groupRef.current.position.y = Math.sin(Date.now() * 0.0006) * 0.03;
  });

  // Colors matching the logo
  const furMain = useMemo(() => new THREE.Color("#B8874B"), []);
  const furDark = useMemo(() => new THREE.Color("#8B6535"), []);
  const furLight = useMemo(() => new THREE.Color("#C9995E"), []);
  const furBelly = useMemo(() => new THREE.Color("#D4AA70"), []);
  const noseDark = useMemo(() => new THREE.Color("#5A4030"), []);
  const eyeClosed = useMemo(() => new THREE.Color("#3A2A1A"), []);
  const moonColor = useMemo(() => new THREE.Color("#FFF8DC"), []);
  const moonGlow = useMemo(() => new THREE.Color("#FFFACD"), []);
  const outlineColor = useMemo(() => new THREE.Color("#D4A050"), []);

  return (
    <group ref={groupRef} scale={1.1} position={[0, 0, 0]}>
      {/* === CRESCENT MOON === */}
      <group position={[0, -0.6, 0]} rotation={[0, 0, 0.3]}>
        {/* Moon main sphere */}
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[1.1, 48, 48]} />
          <meshStandardMaterial color={moonColor} roughness={0.3} metalness={0.1} emissive={moonGlow} emissiveIntensity={0.15} />
        </mesh>
        {/* Moon cutout (dark sphere to create crescent) */}
        <mesh position={[0.5, 0.35, -0.1]}>
          <sphereGeometry args={[0.95, 48, 48]} />
          <meshStandardMaterial color="#F5F0E0" roughness={0.3} metalness={0.1} emissive={moonGlow} emissiveIntensity={0.08} transparent opacity={0.97} />
        </mesh>
      </group>

      {/* === GOLDEN RING around everything === */}
      <mesh position={[0, -0.1, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.8, 0.02, 16, 100]} />
        <meshStandardMaterial color={outlineColor} roughness={0.3} metalness={0.5} emissive={outlineColor} emissiveIntensity={0.2} />
      </mesh>

      {/* === SLEEPING CAPYBARA (curled up on the moon) === */}
      <group position={[-0.1, 0.15, 0.3]} rotation={[0, 0.2, -0.15]}>
        
        {/* Body - compact round ball (curled sleeping pose) */}
        <mesh position={[0, 0, 0]} scale={[0.65, 0.5, 0.55]}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial color={furMain} roughness={0.85} metalness={0.02} />
        </mesh>
        {/* Back hump (darker fur on top) */}
        <mesh position={[0, 0.15, -0.05]} scale={[0.55, 0.35, 0.5]}>
          <sphereGeometry args={[0.85, 32, 32]} />
          <meshStandardMaterial color={furDark} roughness={0.9} metalness={0.01} />
        </mesh>
        {/* Belly */}
        <mesh position={[0.05, -0.15, 0.1]} scale={[0.5, 0.3, 0.4]}>
          <sphereGeometry args={[0.7, 32, 32]} />
          <meshStandardMaterial color={furBelly} roughness={0.9} metalness={0.01} />
        </mesh>

        {/* === HEAD === */}
        {/* Large round head (capybara trademark) */}
        <mesh position={[0.45, 0.15, 0.15]} scale={[0.5, 0.45, 0.45]}>
          <sphereGeometry args={[0.55, 32, 32]} />
          <meshStandardMaterial color={furMain} roughness={0.85} metalness={0.02} />
        </mesh>
        {/* Top of head */}
        <mesh position={[0.42, 0.3, 0.12]} scale={[0.4, 0.25, 0.35]}>
          <sphereGeometry args={[0.4, 32, 32]} />
          <meshStandardMaterial color={furDark} roughness={0.85} metalness={0.02} />
        </mesh>
        
        {/* Snout - blunt and round */}
        <mesh position={[0.7, 0.05, 0.15]} scale={[0.28, 0.22, 0.25]}>
          <sphereGeometry args={[0.35, 32, 32]} />
          <meshStandardMaterial color={furLight} roughness={0.85} metalness={0.02} />
        </mesh>
        {/* Nose */}
        <mesh position={[0.8, 0.08, 0.15]} scale={[0.12, 0.08, 0.1]}>
          <sphereGeometry args={[0.15, 20, 20]} />
          <meshStandardMaterial color={noseDark} roughness={0.6} metalness={0.05} />
        </mesh>

        {/* === CLOSED EYES (sleeping!) === */}
        {/* Left eye - closed line */}
        <mesh position={[0.58, 0.2, 0.33]} rotation={[0, 0.3, -0.1]} scale={[0.08, 0.015, 0.03]}>
          <sphereGeometry args={[1, 16, 8]} />
          <meshStandardMaterial color={eyeClosed} roughness={0.5} />
        </mesh>
        {/* Right eye - closed line */}
        <mesh position={[0.58, 0.2, -0.02]} rotation={[0, -0.3, -0.1]} scale={[0.08, 0.015, 0.03]}>
          <sphereGeometry args={[1, 16, 8]} />
          <meshStandardMaterial color={eyeClosed} roughness={0.5} />
        </mesh>

        {/* === EARS - tiny and round === */}
        <mesh position={[0.35, 0.4, 0.28]} scale={[0.07, 0.1, 0.06]}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshStandardMaterial color={furDark} roughness={0.8} />
        </mesh>
        <mesh position={[0.35, 0.4, 0.02]} scale={[0.07, 0.1, 0.06]}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshStandardMaterial color={furDark} roughness={0.8} />
        </mesh>

        {/* === FRONT PAWS (tucked under chin, sleeping pose) === */}
        <mesh position={[0.6, -0.12, 0.2]} rotation={[0.2, 0.3, 0.5]} scale={[0.12, 0.1, 0.08]}>
          <capsuleGeometry args={[1, 1.5, 8, 8]} />
          <meshStandardMaterial color={furLight} roughness={0.85} />
        </mesh>
        <mesh position={[0.6, -0.12, 0.05]} rotation={[0.2, -0.1, 0.4]} scale={[0.12, 0.1, 0.08]}>
          <capsuleGeometry args={[1, 1.5, 8, 8]} />
          <meshStandardMaterial color={furLight} roughness={0.85} />
        </mesh>

        {/* === BACK LEGS (tucked under body) === */}
        <mesh position={[-0.35, -0.2, 0.2]} rotation={[0.3, 0, -0.3]} scale={[0.13, 0.1, 0.1]}>
          <capsuleGeometry args={[1, 1.2, 8, 8]} />
          <meshStandardMaterial color={furDark} roughness={0.85} />
        </mesh>
        <mesh position={[-0.35, -0.2, 0.0]} rotation={[-0.2, 0, -0.3]} scale={[0.13, 0.1, 0.1]}>
          <capsuleGeometry args={[1, 1.2, 8, 8]} />
          <meshStandardMaterial color={furDark} roughness={0.85} />
        </mesh>
      </group>
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
      <Canvas camera={{ position: [0, 0.3, 4.5], fov: 28 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[3, 5, 4]} intensity={0.9} color="#fff5e6" />
        <directionalLight position={[-2, 2, -1]} intensity={0.2} color="#ffe8cc" />
        <pointLight position={[0, -1, 2]} intensity={0.3} color="#fffacd" />
        <SleepingCapybara scrollProgress={progress} />
      </Canvas>
    </div>
  );
};

export default CapybaraScene;
