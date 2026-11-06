import { lazy, Suspense, useEffect, useRef, useState, type ReactNode } from "react";
import { useReducedMotion, type MotionValue } from "framer-motion";
import sleepImg from "@/assets/hero-sleep.png";
import weeklyImg from "@/assets/hero-wochenbericht.png";
import growthImg from "@/assets/hero-entwicklung.png";
import { assetUrl } from "@/lib/assetUrl";

const Hero3DScene = lazy(() => import("./Hero3DScene"));

const textures = {
  sleep: assetUrl(sleepImg),
  weekly: assetUrl(weeklyImg),
  growth: assetUrl(growthImg),
};

const supportsWebGL = () => {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
};

type Props = { progress: MotionValue<number>; fallback: ReactNode };

/** WebGL hero; falls back to the flat phone mockup for reduced motion or no WebGL. */
const Hero3D = ({ progress, fallback }: Props) => {
  const reduceMotion = useReducedMotion();
  const [webgl, setWebgl] = useState<boolean | null>(null);
  const [visible, setVisible] = useState(true);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setWebgl(supportsWebGL());
  }, []);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { rootMargin: "100px" });
    io.observe(el);
    return () => io.disconnect();
  }, [webgl, reduceMotion]);

  if (reduceMotion || webgl === null) return <>{fallback}</>;

  if (!webgl) {
    return (
      <video
        className="mx-auto block aspect-square w-full max-w-[520px] rounded-[2rem]"
        src={`${import.meta.env.BASE_URL}videos/hero-loop.mp4`}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label="Moonli App unter dem Mond"
      />
    );
  }

  return (
    <div
      ref={wrapRef}
      className="relative mx-auto h-[460px] w-full sm:-mx-16 sm:h-[700px] sm:w-[calc(100%+8rem)] [mask-image:radial-gradient(ellipse_at_center,black_52%,transparent_76%)]"
      role="img"
      aria-label="Moonli App unter dem Mond"
    >
      <Suspense fallback={fallback}>
        <Hero3DScene progress={progress} textures={textures} active={visible} />
      </Suspense>
    </div>
  );
};

export default Hero3D;
