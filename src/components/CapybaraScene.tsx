import { Canvas, useFrame } from "@react-three/fiber";
import { useScroll, useSpring } from "framer-motion";
import { useRef, useEffect, useState, useMemo } from "react";
import * as THREE from "three";

// Stylized capybara built from primitives
const Capybara = ({ scrollProgress }: { scrollProgress: number }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = scrollProgress * Math.PI * 4;
    groupRef.current.rotation.x = Math.sin(scrollProgress * Math.PI * 2) * 0.15;
    groupRef.current.position.y = Math.sin(Date.now() * 0.001) * 0.1;
  });

  const brownMain = useMemo(() => new THREE.Color("#8B6914"), []);
  const brownDark = useMemo(() => new THREE.Color("#6B4E0A"), []);
  const brownLight = useMemo(() => new THREE.Color("#A0782A"), []);
  const pinkNose = useMemo(() => new THREE.Color("#D4928A"), []);
  const eyeBlack = useMemo(() => new THREE.Color("#1a1a1a"), []);
  const eyeWhite = useMemo(() => new THREE.Color("#f5f5f0"), []);
  const earInner = useMemo(() => new THREE.Color("#C4956E"), []);

  return (
    <group ref={groupRef} scale={1.3} position={[0, -0.3, 0]}>
      {/* Body - main ellipsoid */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color={brownMain} roughness={0.7} metalness={0.05} />
      </mesh>
      {/* Body stretch back */}
      <mesh position={[0, -0.1, -0.3]}>
        <sphereGeometry args={[0.85, 32, 32]} />
        <meshStandardMaterial color={brownMain} roughness={0.7} metalness={0.05} />
      </mesh>
      {/* Belly */}
      <mesh position={[0, -0.35, 0.15]}>
        <sphereGeometry args={[0.75, 32, 32]} />
        <meshStandardMaterial color={brownLight} roughness={0.8} metalness={0.02} />
      </mesh>

      {/* Head */}
      <mesh position={[0, 0.55, 0.7]}>
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshStandardMaterial color={brownMain} roughness={0.7} metalness={0.05} />
      </mesh>
      {/* Snout - big rounded rectangle shape */}
      <mesh position={[0, 0.35, 1.15]}>
        <sphereGeometry args={[0.38, 32, 32]} />
        <meshStandardMaterial color={brownLight} roughness={0.75} metalness={0.03} />
      </mesh>
      {/* Nose */}
      <mesh position={[0, 0.42, 1.48]}>
        <sphereGeometry args={[0.12, 24, 24]} />
        <meshStandardMaterial color={pinkNose} roughness={0.5} metalness={0.1} />
      </mesh>
      {/* Nostrils */}
      <mesh position={[-0.05, 0.41, 1.55]}>
        <sphereGeometry args={[0.03, 16, 16]} />
        <meshStandardMaterial color={brownDark} roughness={0.9} />
      </mesh>
      <mesh position={[0.05, 0.41, 1.55]}>
        <sphereGeometry args={[0.03, 16, 16]} />
        <meshStandardMaterial color={brownDark} roughness={0.9} />
      </mesh>

      {/* Eyes */}
      {/* Left eye white */}
      <mesh position={[-0.22, 0.65, 1.1]}>
        <sphereGeometry args={[0.1, 24, 24]} />
        <meshStandardMaterial color={eyeWhite} roughness={0.3} metalness={0.1} />
      </mesh>
      {/* Left eye pupil */}
      <mesh position={[-0.22, 0.65, 1.19]}>
        <sphereGeometry args={[0.06, 24, 24]} />
        <meshStandardMaterial color={eyeBlack} roughness={0.2} metalness={0.3} />
      </mesh>
      {/* Left eye shine */}
      <mesh position={[-0.2, 0.67, 1.24]}>
        <sphereGeometry args={[0.02, 16, 16]} />
        <meshStandardMaterial color={eyeWhite} emissive={eyeWhite} emissiveIntensity={0.5} />
      </mesh>
      {/* Right eye white */}
      <mesh position={[0.22, 0.65, 1.1]}>
        <sphereGeometry args={[0.1, 24, 24]} />
        <meshStandardMaterial color={eyeWhite} roughness={0.3} metalness={0.1} />
      </mesh>
      {/* Right eye pupil */}
      <mesh position={[0.22, 0.65, 1.19]}>
        <sphereGeometry args={[0.06, 24, 24]} />
        <meshStandardMaterial color={eyeBlack} roughness={0.2} metalness={0.3} />
      </mesh>
      {/* Right eye shine */}
      <mesh position={[0.24, 0.67, 1.24]}>
        <sphereGeometry args={[0.02, 16, 16]} />
        <meshStandardMaterial color={eyeWhite} emissive={eyeWhite} emissiveIntensity={0.5} />
      </mesh>

      {/* Ears */}
      {/* Left ear */}
      <mesh position={[-0.35, 0.95, 0.55]} rotation={[0.3, -0.3, -0.4]}>
        <sphereGeometry args={[0.12, 24, 24]} />
        <meshStandardMaterial color={brownDark} roughness={0.7} />
      </mesh>
      <mesh position={[-0.33, 0.94, 0.58]} rotation={[0.3, -0.3, -0.4]}>
        <sphereGeometry args={[0.07, 24, 24]} />
        <meshStandardMaterial color={earInner} roughness={0.6} />
      </mesh>
      {/* Right ear */}
      <mesh position={[0.35, 0.95, 0.55]} rotation={[0.3, 0.3, 0.4]}>
        <sphereGeometry args={[0.12, 24, 24]} />
        <meshStandardMaterial color={brownDark} roughness={0.7} />
      </mesh>
      <mesh position={[0.33, 0.94, 0.58]} rotation={[0.3, 0.3, 0.4]}>
        <sphereGeometry args={[0.07, 24, 24]} />
        <meshStandardMaterial color={earInner} roughness={0.6} />
      </mesh>

      {/* Front legs */}
      <mesh position={[-0.4, -0.8, 0.4]} rotation={[0.1, 0, 0.1]}>
        <capsuleGeometry args={[0.15, 0.5, 16, 16]} />
        <meshStandardMaterial color={brownDark} roughness={0.7} />
      </mesh>
      <mesh position={[0.4, -0.8, 0.4]} rotation={[0.1, 0, -0.1]}>
        <capsuleGeometry args={[0.15, 0.5, 16, 16]} />
        <meshStandardMaterial color={brownDark} roughness={0.7} />
      </mesh>
      {/* Back legs */}
      <mesh position={[-0.4, -0.8, -0.4]} rotation={[-0.1, 0, 0.1]}>
        <capsuleGeometry args={[0.17, 0.45, 16, 16]} />
        <meshStandardMaterial color={brownDark} roughness={0.7} />
      </mesh>
      <mesh position={[0.4, -0.8, -0.4]} rotation={[-0.1, 0, -0.1]}>
        <capsuleGeometry args={[0.17, 0.45, 16, 16]} />
        <meshStandardMaterial color={brownDark} roughness={0.7} />
      </mesh>

      {/* Feet */}
      <mesh position={[-0.4, -1.15, 0.5]}>
        <sphereGeometry args={[0.13, 16, 16]} />
        <meshStandardMaterial color={brownDark} roughness={0.8} />
      </mesh>
      <mesh position={[0.4, -1.15, 0.5]}>
        <sphereGeometry args={[0.13, 16, 16]} />
        <meshStandardMaterial color={brownDark} roughness={0.8} />
      </mesh>
      <mesh position={[-0.4, -1.12, -0.35]}>
        <sphereGeometry args={[0.14, 16, 16]} />
        <meshStandardMaterial color={brownDark} roughness={0.8} />
      </mesh>
      <mesh position={[0.4, -1.12, -0.35]}>
        <sphereGeometry args={[0.14, 16, 16]} />
        <meshStandardMaterial color={brownDark} roughness={0.8} />
      </mesh>

      {/* Whisker dots on snout */}
      {[-0.12, -0.08, -0.15].map((x, i) => (
        <mesh key={`wl${i}`} position={[x, 0.3 + i * 0.04, 1.45]}>
          <sphereGeometry args={[0.015, 8, 8]} />
          <meshStandardMaterial color={brownDark} roughness={0.9} />
        </mesh>
      ))}
      {[0.12, 0.08, 0.15].map((x, i) => (
        <mesh key={`wr${i}`} position={[x, 0.3 + i * 0.04, 1.45]}>
          <sphereGeometry args={[0.015, 8, 8]} />
          <meshStandardMaterial color={brownDark} roughness={0.9} />
        </mesh>
      ))}
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
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] md:w-[700px] md:h-[700px] z-0 pointer-events-none opacity-30">
      <Canvas camera={{ position: [0, 0.5, 4.5], fov: 35 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 5, 4]} intensity={1} color="#fff5e6" />
        <directionalLight position={[-2, 3, -1]} intensity={0.3} color="#e6e0ff" />
        <pointLight position={[0, 2, 3]} intensity={0.4} color="#ffeedd" />
        <Capybara scrollProgress={progress} />
      </Canvas>
    </div>
  );
};

export default CapybaraScene;
