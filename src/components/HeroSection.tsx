import { motion } from "framer-motion";
import { Apple, Play } from "lucide-react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import { useRef, Suspense } from "react";
import * as THREE from "three";
import logo from "@/assets/logo.png";

const HeroMoon = () => {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.12;
    }
  });
  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={1.2}>
      <mesh ref={ref}>
        <sphereGeometry args={[1.6, 64, 64]} />
        <MeshDistortMaterial
          color="#f5e6b8"
          emissive="#f5d990"
          emissiveIntensity={0.7}
          roughness={0.4}
          distort={0.12}
          speed={2}
        />
      </mesh>
    </Float>
  );
};

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Soft gradient bg blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-pastel-green/40 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-pastel-yellow/40 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-pastel-pink/30 blur-3xl" />
      </div>

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
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
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pastel-green text-pastel-green-strong text-sm font-semibold mb-6"
            >
              🌙 Dein smarter Eltern-Begleiter
            </motion.div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight mb-6">
              Echtes Leben.{" "}
              <span className="text-gradient">Echte Hilfe.</span>{" "}
              <br className="hidden sm:block" />
              Entspannte Eltern.
            </h1>

            <p className="text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed">
              Der erste smarte Begleiter, der nicht nur die Entwicklung deines
              Kindes trackt, sondern auch deinen eigenen Akku auflädt. Mit
              smarten Routinen, Achtsamkeit und sanfter Gamification.
            </p>

            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
              <a
                href="#"
                className="flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-foreground text-background font-semibold hover:opacity-90 transition-all shadow-soft-lg hover:shadow-soft-xl"
              >
                <Apple className="w-5 h-5" />
                App Store
              </a>
              <a
                href="#"
                className="flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-all shadow-soft-lg hover:shadow-soft-xl"
              >
                <Play className="w-5 h-5" />
                Google Play
              </a>
            </div>
          </motion.div>

          {/* 3D Moon + Capybara */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="flex justify-center"
          >
            <div className="relative w-full max-w-lg aspect-square">
              {/* 3D Canvas */}
              <Suspense fallback={<div className="w-full h-full" />}>
                <Canvas
                  camera={{ position: [0, 0, 4.5], fov: 45 }}
                  gl={{ alpha: true, antialias: true }}
                  style={{ background: "transparent" }}
                  className="!absolute inset-0"
                >
                  <ambientLight intensity={0.9} />
                  <directionalLight position={[5, 5, 5]} intensity={0.6} color="#fef3c7" />
                  <pointLight position={[-3, 2, 2]} intensity={0.4} color="#fbcfe8" />
                  <HeroMoon />
                </Canvas>
              </Suspense>
              {/* Capybara overlay */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <img
                  src={logo}
                  alt="Moonli Capybara auf dem Mond"
                  className="w-3/5 drop-shadow-2xl float-animation"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
