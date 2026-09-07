import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
  AnimatePresence,
  useReducedMotion,
  useScroll,
  type MotionValue,
} from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import { type MouseEvent, useRef, useState } from "react";
import ImageLightbox from "@/components/ImageLightbox";
import MagneticCta from "@/components/MagneticCta";
import LeafAccent from "@/components/LeafAccent";
import dashboardWeekly from "@/assets/hero-wochenbericht.png";
import dashboardGrowth from "@/assets/hero-entwicklung.png";
import dashboardHome from "@/assets/hero-sleep.png";
import { assetUrl } from "@/lib/assetUrl";
import { easeOut, motionInitial, scrollSpring } from "@/lib/motion";

const dashboardWeeklyUrl = assetUrl(dashboardWeekly);
const dashboardGrowthUrl = assetUrl(dashboardGrowth);
const dashboardHomeUrl = assetUrl(dashboardHome);

const PHONE_W = 447;
const PHONE_H = 921;

const as2d = ({ x, y }: { x?: string; y?: string }) =>
  `translate(${x ?? 0}, ${y ?? 0})`;

const PhoneMockup = ({ progress }: { progress: MotionValue<number> }) => {
  const reduceMotion = useReducedMotion();
  const [activeImage, setActiveImage] = useState<{
    src: string;
    alt: string;
  } | null>(null);
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const springX = useSpring(cursorX, { stiffness: 120, damping: 22 });
  const springY = useSpring(cursorY, { stiffness: 120, damping: 22 });
  const groupX = useTransform(springX, [-18, 18], [-5, 5]);
  const groupY = useTransform(springY, [-18, 18], [-4, 4]);
  const backLeftX = useTransform(springX, [-18, 18], [-7, 7]);
  const backLeftY = useTransform(springY, [-18, 18], [-4, 4]);
  const backRightX = useTransform(springX, [-18, 18], [7, -7]);
  const backRightY = useTransform(springY, [-18, 18], [4, -4]);
  const frontLift = useTransform(springY, [-18, 18], [4, -4]);

  const leftSpread = useTransform(progress, (p) => Math.round(p * -12));
  const rightSpread = useTransform(progress, (p) => Math.round(p * 12));
  const clusterY = useTransform(progress, (p) => Math.round(p * 72));
  const clusterOpacity = useTransform(progress, [0, 0.72, 1], [1, 1, 0.62]);
  const clusterTransform = useMotionTemplate`translate(0, ${clusterY}px)`;

  const handlePointerMove = (event: MouseEvent<HTMLDivElement>) => {
    if (reduceMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    cursorX.set(((x - centerX) / centerX) * 18);
    cursorY.set(((y - centerY) / centerY) * 18);
  };

  const resetPointer = () => {
    cursorX.set(0);
    cursorY.set(0);
  };

  return (
    <motion.div
      initial={motionInitial}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.85, delay: 0.2, ease: easeOut }}
      onMouseMove={handlePointerMove}
      onMouseLeave={resetPointer}
      className="relative mx-auto w-full max-w-[380px] sm:max-w-[580px] overflow-visible"
    >
      <motion.div
        className="relative"
        style={reduceMotion ? undefined : { transform: clusterTransform, opacity: clusterOpacity }}
      >
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="h-[48%] w-[48%] rounded-full bg-primary/8 blur-[70px] translate-y-6" />
      </div>

      <motion.div
        className="relative mx-auto w-full min-h-[300px] sm:min-h-[min(460px,46dvh)] px-9 py-4 sm:px-12"
        style={{ x: groupX, y: groupY }}
        transformTemplate={as2d}
      >
        <div className="relative flex items-end justify-center w-full max-w-[520px] mx-auto min-h-[280px] sm:min-h-[min(420px,42dvh)]">
          <motion.div
            className="absolute left-0 bottom-[8%] z-[1] w-[34%] sm:w-[32%]"
            style={reduceMotion ? undefined : { x: leftSpread }}
            transformTemplate={as2d}
          >
            <motion.div style={{ x: backLeftX, y: backLeftY }} transformTemplate={as2d}>
            <motion.button
              type="button"
              onClick={() =>
                setActiveImage({
                  src: dashboardWeeklyUrl,
                  alt: "Wochenbericht der Moonli App",
                })
              }
              className="block w-full cursor-zoom-in -rotate-[6deg]"
              aria-label="Wochenbericht vergrößern"
            >
              <img
                src={dashboardWeeklyUrl}
                alt="Wochenbericht der Moonli App"
                width={PHONE_W}
                height={PHONE_H}
                className="shot-crisp block w-full h-auto select-none pointer-events-none"
                loading="eager"
                decoding="async"
                draggable={false}
              />
            </motion.button>
            </motion.div>
          </motion.div>

          <motion.div
            className="absolute right-0 bottom-[8%] z-[2] w-[34%] sm:w-[32%]"
            style={reduceMotion ? undefined : { x: rightSpread }}
            transformTemplate={as2d}
          >
            <motion.div style={{ x: backRightX, y: backRightY }} transformTemplate={as2d}>
            <motion.button
              type="button"
              onClick={() =>
                setActiveImage({
                  src: dashboardGrowthUrl,
                  alt: "Entwicklung und Phasen in der Moonli App",
                })
              }
              className="block w-full cursor-zoom-in rotate-[6deg]"
              aria-label="Entwicklung vergrößern"
            >
              <img
                src={dashboardGrowthUrl}
                alt="Entwicklung und Phasen in der Moonli App"
                width={PHONE_W}
                height={PHONE_H}
                className="shot-crisp block w-full h-auto select-none pointer-events-none"
                loading="eager"
                decoding="async"
                draggable={false}
              />
            </motion.button>
            </motion.div>
          </motion.div>

          <motion.div className="relative z-20 w-[60%] sm:w-[56%] mx-auto">
            <motion.div style={{ y: frontLift }} transformTemplate={as2d}>
            <motion.div className="relative">
              <button
                type="button"
                onClick={() =>
                  setActiveImage({
                    src: dashboardHomeUrl,
                    alt: "Moonli Smart Sleep",
                  })
                }
                className="relative block w-full cursor-zoom-in"
                aria-label="Moonli Smart Sleep vergrößern"
              >
                <img
                  src={dashboardHomeUrl}
                  alt="Moonli Smart Sleep"
                  width={PHONE_W}
                  height={PHONE_H}
                  className="shot-crisp block w-full h-auto select-none pointer-events-none"
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  draggable={false}
                />
              </button>
            </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
      </motion.div>

      <AnimatePresence>
        {activeImage && (
          <ImageLightbox
            key={activeImage.src}
            src={activeImage.src}
            alt={activeImage.alt}
            onClose={() => setActiveImage(null)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const HeroSection = () => {
  const { t, language } = useLanguage();
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const progress = useSpring(scrollYProgress, scrollSpring);
  const glowOpacity = useTransform(progress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative flex flex-1 flex-col justify-center overflow-visible pb-3 pt-[8.5rem] lg:pt-24"
    >
      <motion.div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        style={reduceMotion ? undefined : { opacity: glowOpacity }}
      >
        <div className="absolute -top-40 -right-40 w-[560px] h-[560px] rounded-full bg-primary/15 blur-[100px]" />
        <div className="absolute -bottom-40 -left-40 w-[420px] h-[420px] rounded-full bg-pastel-peach/25 blur-[100px]" />
      </motion.div>
      <LeafAccent
        src="/leaves/hanging.png"
        className="page-leaf page-leaf-fade-top -left-12 top-8 z-0 hidden w-[200px] sm:block sm:w-[240px]"
      />

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] gap-10 lg:gap-14 items-center">
          <motion.div
            initial={motionInitial}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.55, ease: easeOut }}
            className="text-left max-w-xl"
          >
            <h1 className="text-display-lg mb-3 text-foreground">
              {t("hero.headline1")}
              <br />
              {t("hero.headline2")}
              <br />
              {t("hero.headline3")}
            </h1>

            <p className="mb-8 text-lg font-semibold leading-snug text-foreground sm:text-xl">
              {t("hero.tagline")}
            </p>

            {language !== "de" && (
              <p className="mb-6 max-w-[42ch] text-sm leading-relaxed text-muted-foreground">
                {t("lang.mediaNote")}
              </p>
            )}

            <div className="flex flex-col sm:flex-row flex-wrap gap-3">
              <MagneticCta href="/#download" variant="primary">
                {t("hero.ctaDownload")}
              </MagneticCta>
              <MagneticCta href="/#funktionen" variant="ghost">
                {t("hero.ctaFeatures")}
              </MagneticCta>
            </div>
          </motion.div>

          <div className="relative z-10 w-full max-w-[380px] sm:max-w-[580px] lg:ml-auto overflow-visible">
            <PhoneMockup progress={progress} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
