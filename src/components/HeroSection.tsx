import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Apple, Play } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { toast } from "@/components/ui/sonner";
import { type MouseEvent, useState } from "react";
import dashboardWeekly from "@/assets/hero-dashboard-weekly.png";
import dashboardDark from "@/assets/hero-dashboard-dark.png";
import dashboardGrowth from "@/assets/hero-dashboard-growth.png";

const GOOGLE_PLAY_URL = "https://play.google.com/store/apps/details?id=com.christian.moonli&hl=en";
const IOS_SOON_TEXT = "Wir arbeiten mit Hochdruck an der iPhone-Version. Sie ist bald fuer dich verfuegbar.";

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
  const backLeftX = useTransform(springX, [-18, 18], [-7, 7]);
  const backLeftY = useTransform(springY, [-18, 18], [-4, 4]);
  const backRightX = useTransform(springX, [-18, 18], [7, -7]);
  const backRightY = useTransform(springY, [-18, 18], [4, -4]);
  const frontLift = useTransform(springY, [-18, 18], [4, -4]);

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
      transition={{ duration: 0.85, delay: 0.2, ease: "easeOut" }}
      onMouseMove={handlePointerMove}
      onMouseLeave={resetPointer}
      className="relative mx-auto w-[330px] sm:w-[480px]"
      style={{ perspective: "1400px" }}
    >
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="h-[86%] w-[86%] rounded-full bg-pastel-green/30 blur-[95px]" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="h-[62%] w-[62%] rounded-full bg-pastel-lavender/22 blur-[90px] translate-y-12" />
      </div>

      <motion.div
        className="relative mx-auto h-[520px] sm:h-[650px] w-full"
        style={{
          rotateX,
          rotateY,
          x: groupX,
          y: groupY,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Hinten links — symmetrisch zur rechten Karte, wenig Rotation */}
        <motion.div
          className="absolute left-[8%] bottom-[16%] z-[1] w-[34%] aspect-[9/19.5]"
          style={{ x: backLeftX, y: backLeftY }}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 5.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.button
            type="button"
            onClick={() =>
              setActiveImage({
                src: dashboardWeekly,
                alt: "Wochenbericht der Moonli App",
              })
            }
            whileHover={{ scale: 1.03, y: -4, rotate: -4.5 }}
            className="h-full w-full rounded-[1.85rem] bg-transparent p-0 opacity-75 shadow-[0_16px_38px_rgba(0,0,0,0.2)] -rotate-[6deg] transition-transform duration-300"
            aria-label="Wochenbericht vergrößern"
          >
            <img
              src={dashboardWeekly}
              alt="Wochenbericht der Moonli App"
              className="h-full w-full rounded-[1.85rem] object-cover object-center"
              loading="lazy"
            />
          </motion.button>
        </motion.div>

        {/* Hinten rechts */}
        <motion.div
          className="absolute right-[8%] bottom-[16%] z-[2] w-[34%] aspect-[9/19.5]"
          style={{ x: backRightX, y: backRightY }}
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 5.8, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
        >
          <motion.button
            type="button"
            onClick={() =>
              setActiveImage({
                src: dashboardGrowth,
                alt: "Wachstumsverlauf der Moonli App",
              })
            }
            whileHover={{ scale: 1.03, y: -4, rotate: 4.5 }}
            className="h-full w-full rounded-[1.85rem] bg-transparent p-0 opacity-75 shadow-[0_16px_38px_rgba(0,0,0,0.2)] rotate-[6deg] transition-transform duration-300"
            aria-label="Wachstumsverlauf vergrößern"
          >
            <img
              src={dashboardGrowth}
              alt="Wachstumsverlauf der Moonli App"
              className="h-full w-full rounded-[1.85rem] object-cover object-center"
              loading="lazy"
            />
          </motion.button>
        </motion.div>

        {/* Vorne — klarer Fokus, exakt zentriert */}
        <div className="absolute left-1/2 bottom-[6%] z-20 w-[49%] aspect-[9/19.5] -translate-x-1/2">
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 28 }}
            className="h-full w-full rounded-[1.95rem] bg-transparent p-0 shadow-[0_34px_85px_rgba(0,0,0,0.32)]"
            style={{ y: frontLift }}
            animate={{ y: [0, -6, 0] }}
            >
            <motion.div
              className="absolute inset-0 rounded-[1.95rem] bg-pastel-lavender/20 blur-xl pointer-events-none"
              animate={{ opacity: [0.12, 0.28, 0.12] }}
              transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
          >
            </motion.div>
            <button
              type="button"
              onClick={() =>
                setActiveImage({
                  src: dashboardDark,
                  alt: "Moonli Dashboard im Dark Mode",
                })
              }
              className="h-full w-full rounded-[1.95rem] overflow-hidden"
              aria-label="Dark Mode Dashboard vergrößern"
            >
              <img
                src={dashboardDark}
                alt="Moonli Dashboard im Dark Mode"
                className="h-full w-full rounded-[1.95rem] object-cover object-center"
                loading="eager"
              />
            </button>
          </motion.div>
        </div>
      </motion.div>

      <AnimatePresence>
        {activeImage && (
          <motion.div
            onClick={() => setActiveImage(null)}
            className="fixed inset-x-0 top-16 md:top-20 bottom-0 z-40 bg-black/72 backdrop-blur-md flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="button"
            tabIndex={0}
            aria-label="Bild schließen"
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                setActiveImage(null);
              }
            }}
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="relative z-10 flex h-full w-full items-center justify-center p-4 sm:p-8 cursor-zoom-out"
            >
              <img
                src={activeImage.src}
                alt={activeImage.alt}
                className="h-auto w-auto max-h-[78vh] max-w-[82vw] rounded-[1.4rem] object-contain shadow-[0_24px_70px_rgba(0,0,0,0.45)]"
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
    <section className="relative min-h-[92vh] flex items-center pt-24 pb-14 overflow-hidden">
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
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-center lg:text-left max-w-2xl"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-1.5 text-xs sm:text-sm font-semibold text-primary shadow-soft mb-4">
              Smart Parenting
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-[4.1rem] font-extrabold leading-[1.02] tracking-tight mb-6">
              <span className="text-foreground">{t("hero.headline1")}</span>{" "}
              <span className="text-gradient-animated">{t("hero.headline2")}</span>
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed">
              {t("hero.subheadline")}
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap gap-3 justify-center lg:justify-start">
              <a
                href="#"
                onClick={(event) => {
                  event.preventDefault();
                  toast(IOS_SOON_TEXT);
                }}
                className="relative flex items-center justify-center gap-2.5 px-6 py-3 rounded-full bg-foreground text-background font-semibold hover:opacity-90 transition-all shadow-soft-lg hover:shadow-soft-xl hover:scale-[1.02] duration-200 w-full sm:w-auto"
              >
                <Apple className="w-5 h-5" />
                App Store
                <span className="absolute -top-2.5 -right-3 px-2 py-0.5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold leading-none shadow-sm">
                  Coming Soon
                </span>
              </a>
              <a
                href={GOOGLE_PLAY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-all shadow-soft-lg hover:shadow-soft-xl hover:scale-[1.02] duration-200 w-full sm:w-auto"
              >
                <Play className="w-5 h-5" />
                Google Play
              </a>
            </div>
          </motion.div>

          {/* Phone Mockup */}
          <div className="flex justify-center lg:justify-end">
            <PhoneMockup />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
