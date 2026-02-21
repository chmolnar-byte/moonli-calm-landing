import { motion } from "framer-motion";
import { Apple, Play } from "lucide-react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import { useRef, Suspense, useState, useCallback } from "react";
import * as THREE from "three";
import { useLanguage } from "@/i18n/LanguageContext";

/* ─── Crescent Moon (frosted glass look) ─── */
const CrescentMoon = () => {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.08;
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.15) * 0.05;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.15} floatIntensity={0.8}>
      <group ref={groupRef}>
        {/* Main moon sphere */}
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[1.5, 64, 64]} />
          <MeshDistortMaterial
            color="#f5e6b8"
            emissive="#f5d990"
            emissiveIntensity={0.5}
            roughness={0.3}
            metalness={0.1}
            distort={0.08}
            speed={1.5}
          />
        </mesh>
        {/* Cutout sphere for crescent effect */}
        <mesh position={[0.7, 0.4, 0.8]}>
          <sphereGeometry args={[1.2, 64, 64]} />
          <meshStandardMaterial color="#fdfcfb" opacity={0.95} transparent />
        </mesh>
        {/* Glow ring */}
        <mesh position={[0, 0, -0.1]}>
          <ringGeometry args={[1.5, 1.8, 64]} />
          <meshBasicMaterial color="#f5e6b8" opacity={0.08} transparent side={THREE.DoubleSide} />
        </mesh>
      </group>
    </Float>
  );
};

/* ─── Orbiting Glass Icon ─── */
const OrbitingIcon = ({
  orbitRadius,
  speed,
  offset,
  color,
  emissive,
  shape,
  scale = 0.18,
}: {
  orbitRadius: number;
  speed: number;
  offset: number;
  color: string;
  emissive: string;
  shape: "book" | "heart" | "moon" | "trophy";
  scale?: number;
}) => {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.elapsedTime * speed + offset;
      ref.current.position.x = Math.cos(t) * orbitRadius;
      ref.current.position.z = Math.sin(t) * orbitRadius * 0.4;
      ref.current.position.y = Math.sin(t * 0.7) * 0.3 + Math.sin(t) * 0.15;
      ref.current.rotation.y = t;
      ref.current.rotation.x = Math.sin(t * 0.5) * 0.2;
    }
  });

  const getGeometry = () => {
    switch (shape) {
      case "book":
        return <boxGeometry args={[0.7, 0.9, 0.15]} />;
      case "heart":
        return <sphereGeometry args={[0.35, 32, 32]} />;
      case "moon":
        return <sphereGeometry args={[0.28, 32, 32]} />;
      case "trophy":
        return <cylinderGeometry args={[0.2, 0.3, 0.6, 16]} />;
    }
  };

  return (
    <group ref={ref} scale={scale}>
      <Float speed={3} floatIntensity={0.3}>
        <mesh>
          {getGeometry()}
          <meshPhysicalMaterial
            color={color}
            emissive={emissive}
            emissiveIntensity={0.4}
            roughness={0.1}
            metalness={0.05}
            transmission={0.6}
            thickness={0.5}
            ior={1.5}
            transparent
            opacity={0.85}
          />
        </mesh>
      </Float>
    </group>
  );
};

/* ─── Floating Particles ─── */
const Particles = () => {
  const count = 30;
  const ref = useRef<THREE.Points>(null);
  const positions = useRef(
    Float32Array.from({ length: count * 3 }, () => (Math.random() - 0.5) * 8)
  ).current;

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.02;
      const posArr = ref.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < count; i++) {
        posArr[i * 3 + 1] += Math.sin(state.clock.elapsedTime + i) * 0.001;
      }
      ref.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#f5e6b8" transparent opacity={0.6} sizeAttenuation />
    </points>
  );
};

/* ─── Mouse-responsive scene wrapper ─── */
const SceneContent = ({ mouse }: { mouse: { x: number; y: number } }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += (mouse.x * 0.3 - groupRef.current.rotation.y) * 0.05;
      groupRef.current.rotation.x += (mouse.y * 0.15 - groupRef.current.rotation.x) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      <CrescentMoon />

      {/* Orbiting feature icons */}
      <OrbitingIcon orbitRadius={2.5} speed={0.35} offset={0} color="#c4b5fd" emissive="#8b5cf6" shape="book" scale={0.22} />
      <OrbitingIcon orbitRadius={2.8} speed={0.28} offset={Math.PI * 0.5} color="#fca5a5" emissive="#ef4444" shape="heart" scale={0.25} />
      <OrbitingIcon orbitRadius={2.3} speed={0.4} offset={Math.PI} color="#93c5fd" emissive="#3b82f6" shape="moon" scale={0.2} />
      <OrbitingIcon orbitRadius={2.6} speed={0.32} offset={Math.PI * 1.5} color="#fcd34d" emissive="#f59e0b" shape="trophy" scale={0.22} />

      <Particles />
    </group>
  );
};

const HeroSection = () => {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const { t } = useLanguage();

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setMouse({ x, y });
  }, []);

  return (
    <section
      className="relative min-h-screen flex items-center pt-20 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Ambient background glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full bg-pastel-green/30 blur-[100px]" style={{ animation: 'pulseGlow 8s ease-in-out infinite' }} />
        <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full bg-pastel-peach/30 blur-[100px]" style={{ animation: 'pulseGlow 10s ease-in-out infinite 2s' }} />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-pastel-lavender/25 blur-[100px]" style={{ animation: 'pulseGlow 12s ease-in-out infinite 4s' }} />
        <div className="absolute top-2/3 right-1/4 w-[300px] h-[300px] rounded-full bg-pastel-yellow/20 blur-[80px]" />
      </div>

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-button text-pastel-green-strong text-sm font-semibold mb-6"
            >
              {t("hero.badge")}
            </motion.div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight mb-6 text-glow">
              {t("hero.headline1")}{" "}
              <span className="text-gradient">{t("hero.headline2")}</span>{" "}
              <br className="hidden sm:block" />
              {t("hero.headline3")}
            </h1>

            <p className="text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed">
              {t("hero.subheadline")}
            </p>

            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
              <a
                href="#"
                className="flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-foreground text-background font-semibold hover:opacity-90 transition-all shadow-soft-lg hover:shadow-soft-xl hover:scale-[1.02] duration-200"
              >
                <Apple className="w-5 h-5" />
                App Store
              </a>
              <a
                href="#"
                className="flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-all shadow-soft-lg hover:shadow-soft-xl hover:scale-[1.02] duration-200"
              >
                <Play className="w-5 h-5" />
                Google Play
              </a>
            </div>
          </motion.div>

          {/* 3D Moon World + Capybara */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="flex justify-center"
          >
            <div className="relative w-full max-w-lg aspect-square">
              {/* Glow behind moon */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-2/3 h-2/3 rounded-full bg-pastel-yellow/30 blur-[60px]" />
              </div>

              {/* 3D Canvas */}
              <Suspense fallback={<div className="w-full h-full" />}>
                <Canvas
                  camera={{ position: [0, 0, 5.5], fov: 40 }}
                  gl={{ alpha: true, antialias: true }}
                  style={{ background: "transparent" }}
                  className="!absolute inset-0"
                >
                  <ambientLight intensity={0.7} />
                  <directionalLight position={[5, 5, 5]} intensity={0.5} color="#fef3c7" />
                  <pointLight position={[-3, 2, 2]} intensity={0.3} color="#fbcfe8" />
                  <pointLight position={[3, -1, 3]} intensity={0.2} color="#c4b5fd" />
                  <SceneContent mouse={mouse} />
                </Canvas>
              </Suspense>

            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
