import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Apple, Play } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { type MouseEvent, useState } from "react";
import dashboardWeekly from "@/assets/hero-dashboard-weekly.png";
import dashboardDark from "@/assets/hero-dashboard-dark.png";
import dashboardGrowth from "@/assets/hero-dashboard-growth.png";

const PhoneMockup = () => {
  const [activeImage, setActiveImage] = useState<{
    src: string;
    alt: string;
  } | null>(null);
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const springX = useSpring(cursorX, { stiffness: 120, damping: 22 });
  const springY = useSpring(cursorY, { stiffness: 120, damping: 22 });
  const rotateY = useTransform(springX, [-18, 18], [-3.5, 3.5]);
  const rotateX = useTransform(springY, [-18, 18], [3.5, -3.5]);
  const groupX = useTransform(springX, [-18, 18], [-5, 5]);
  const groupY = useTransform(springY, [-18, 18], [-4, 4]);

  const handlePointerMove = (event: MouseEvent<HTMLDivElement>) => {
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
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.9, delay: 0.25, ease: "easeOut" }}
      onMouseMove={handlePointerMove}
      onMouseLeave={resetPointer}
      className="relative mx-auto w-[320px] sm:w-[430px]"
      style={{ perspective: "1200px" }}
    >
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="h-[82%] w-[82%] rounded-full bg-pastel-green/35 blur-[85px]" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="h-[60%] w-[60%] rounded-full bg-pastel-lavender/25 blur-[80px] translate-y-12" />
      </div>

      <motion.div
        className="relative mx-auto h-[520px] sm:h-[620px] w-full"
        style={{
          rotateX,
          rotateY,
          x: groupX,
          y: groupY,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Hinten links — symmetrisch zur rechten Karte, wenig Rotation */}
        <button
          type="button"
          onClick={() =>
            setActiveImage({
              src: dashboardWeekly,
              alt: "Wochenbericht der Moonli App",
            })
          }
          className="absolute left-[4%] bottom-[13%] z-[1] h-[68%] w-[46%] rounded-[1.75rem] border border-white/35 bg-white/20 p-1 shadow-[0_16px_45px_rgba(0,0,0,0.16)] -rotate-[3deg] transition-transform duration-300 hover:scale-[1.015]"
          aria-label="Wochenbericht vergrößern"
        >
          <img
            src={dashboardWeekly}
            alt="Wochenbericht der Moonli App"
            className="h-full w-full rounded-[1.45rem] object-contain"
            loading="lazy"
          />
        </button>

        {/* Hinten rechts */}
        <button
          type="button"
          onClick={() =>
            setActiveImage({
              src: dashboardGrowth,
              alt: "Wachstumsverlauf der Moonli App",
            })
          }
          className="absolute right-[4%] bottom-[13%] z-[2] h-[68%] w-[46%] rounded-[1.75rem] border border-white/35 bg-white/20 p-1 shadow-[0_16px_45px_rgba(0,0,0,0.16)] rotate-[3deg] transition-transform duration-300 hover:scale-[1.015]"
          aria-label="Wachstumsverlauf vergrößern"
        >
          <img
            src={dashboardGrowth}
            alt="Wachstumsverlauf der Moonli App"
            className="h-full w-full rounded-[1.45rem] object-contain"
            loading="lazy"
          />
        </button>

        {/* Vorne — klarer Fokus, exakt zentriert */}
        <div className="absolute left-1/2 bottom-[8%] z-20 h-[84%] w-[54%] -translate-x-1/2">
          <motion.div
            whileHover={{ scale: 1.015 }}
            transition={{ type: "spring", stiffness: 400, damping: 28 }}
            className="h-full w-full rounded-[1.9rem] border border-white/45 bg-white/15 p-1 shadow-[0_22px_60px_rgba(0,0,0,0.24)]"
          >
            <button
              type="button"
              onClick={() =>
                setActiveImage({
                  src: dashboardDark,
                  alt: "Moonli Dashboard im Dark Mode",
                })
              }
              className="h-full w-full rounded-[1.55rem] overflow-hidden"
              aria-label="Dark Mode Dashboard vergrößern"
            >
              <img
                src={dashboardDark}
                alt="Moonli Dashboard im Dark Mode"
                className="h-full w-full rounded-[1.55rem] object-contain"
                loading="eager"
              />
            </button>
          </motion.div>
        </div>
      </motion.div>

      <AnimatePresence>
        {activeImage && (
          <motion.div
            className="fixed inset-0 z-[90] bg-black/72 backdrop-blur-md p-4 sm:p-8 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              type="button"
              onClick={() => setActiveImage(null)}
              className="absolute inset-0 cursor-zoom-out"
              aria-label="Bild schließen"
            />
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="relative z-10 w-full max-w-[560px] rounded-[2rem] border border-white/30 bg-black/10 p-2 shadow-[0_30px_90px_rgba(0,0,0,0.45)]"
            >
              <img
                src={activeImage.src}
                alt={activeImage.alt}
                className="max-h-[88vh] w-full rounded-[1.6rem] object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center pt-20 pb-12 overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full bg-pastel-green/30 blur-[100px]" style={{ animation: 'pulseGlow 8s ease-in-out infinite' }} />
        <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full bg-pastel-peach/30 blur-[100px]" style={{ animation: 'pulseGlow 10s ease-in-out infinite 2s' }} />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-pastel-lavender/25 blur-[100px]" style={{ animation: 'pulseGlow 12s ease-in-out infinite 4s' }} />
      </div>

      {/* Floating decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[15%] left-[10%] w-3 h-3 rounded-full bg-pastel-pink-strong/30" style={{ animation: 'float-decorative 8s ease-in-out infinite' }} />
        <div className="absolute top-[25%] right-[15%] w-2 h-2 rounded-full bg-pastel-blue-strong/25" style={{ animation: 'float-decorative 10s ease-in-out infinite 1s' }} />
        <div className="absolute bottom-[30%] left-[20%] w-4 h-4 rounded-full bg-pastel-lavender-strong/20" style={{ animation: 'float-decorative 12s ease-in-out infinite 2s' }} />
        <div className="absolute top-[40%] right-[25%] w-2.5 h-2.5 rounded-full bg-pastel-yellow-strong/25" style={{ animation: 'float-decorative 9s ease-in-out infinite 3s' }} />
        <div className="absolute bottom-[20%] right-[10%] w-3 h-3 rounded-full bg-pastel-green-strong/20" style={{ animation: 'float-decorative 11s ease-in-out infinite 4s' }} />
      </div>

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-center lg:text-left"
          >
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold leading-tight tracking-tight mb-6">
              <span className="text-foreground">{t("hero.headline1")}</span>{" "}
              <span className="text-gradient-animated">{t("hero.headline2")}</span>
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed">
              {t("hero.subheadline")}
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap gap-3 justify-center lg:justify-start">
              <a
                href="#"
                className="relative flex items-center justify-center gap-2.5 px-6 py-3 rounded-full bg-foreground text-background font-semibold hover:opacity-90 transition-all shadow-soft-lg hover:shadow-soft-xl hover:scale-[1.02] duration-200 w-full sm:w-auto"
              >
                <Apple className="w-5 h-5" />
                App Store
                <span className="absolute -top-2.5 -right-3 px-2 py-0.5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold leading-none shadow-sm">
                  Coming Soon
                </span>
              </a>
              <a
                href="#"
                className="flex items-center justify-center gap-2.5 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-all shadow-soft-lg hover:shadow-soft-xl hover:scale-[1.02] duration-200 w-full sm:w-auto"
              >
                <Play className="w-5 h-5" />
                Google Play
              </a>
            </div>
          </motion.div>

          {/* Phone Mockup */}
          <div className="flex justify-center">
            <PhoneMockup />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
