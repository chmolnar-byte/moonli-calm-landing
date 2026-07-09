import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Apple, Play } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { type MouseEvent, useState } from "react";
import { APP_STORE_URL, GOOGLE_PLAY_URL } from "@/constants/storeUrls";
import ImageLightbox from "@/components/ImageLightbox";
import dashboardWeekly from "@/assets/Startseite1.webp";
import dashboardDark from "@/assets/Startseite3.webp";
import dashboardGrowth from "@/assets/Startseite2.webp";
import { assetUrl } from "@/lib/assetUrl";
import { motionInitial } from "@/lib/motion";

const dashboardWeeklyUrl = assetUrl(dashboardWeekly);
const dashboardDarkUrl = assetUrl(dashboardDark);
const dashboardGrowthUrl = assetUrl(dashboardGrowth);

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
      initial={motionInitial}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.85, delay: 0.2, ease: "easeOut" }}
      onMouseMove={handlePointerMove}
      onMouseLeave={resetPointer}
      className="relative mx-auto w-full max-w-[360px] sm:max-w-[540px]"
      style={{ perspective: "1400px" }}
    >
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="h-[86%] w-[86%] rounded-full bg-pastel-green/30 blur-[95px]" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="h-[62%] w-[62%] rounded-full bg-pastel-blue/22 blur-[90px] translate-y-12" />
      </div>

      <motion.div
        className="relative mx-auto w-full min-h-[420px] sm:min-h-[520px] py-4"
        style={{
          rotateX,
          rotateY,
          x: groupX,
          y: groupY,
          transformStyle: "preserve-3d",
        }}
      >
        <div className="relative flex items-end justify-center w-full max-w-[520px] mx-auto min-h-[380px] sm:min-h-[480px]">
          {/* Hinten links */}
          <motion.div
            className="absolute left-0 sm:left-[2%] bottom-[8%] z-[1] w-[34%] sm:w-[32%]"
            style={{ x: backLeftX, y: backLeftY }}
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5.4, repeat: Infinity, ease: "easeInOut" }}
          >
            <motion.button
              type="button"
              onClick={() =>
                setActiveImage({
                  src: dashboardWeeklyUrl,
                  alt: "Wochenbericht der Moonli App",
                })
              }
              whileHover={{ scale: 1.03, y: -4 }}
              className="block w-full -rotate-[6deg] opacity-90 transition-transform duration-300 drop-shadow-[0_20px_50px_rgba(0,0,0,0.4)]"
              aria-label="Wochenbericht vergrößern"
            >
              <img
                src={dashboardWeeklyUrl}
                alt="Wochenbericht der Moonli App"
                className="block w-full h-auto select-none"
                loading="lazy"
                draggable={false}
              />
            </motion.button>
          </motion.div>

          {/* Hinten rechts */}
          <motion.div
            className="absolute right-0 sm:right-[2%] bottom-[8%] z-[2] w-[34%] sm:w-[32%]"
            style={{ x: backRightX, y: backRightY }}
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 5.8, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
          >
            <motion.button
              type="button"
              onClick={() =>
                setActiveImage({
                  src: dashboardDarkUrl,
                  alt: "Wachstumsverlauf der Moonli App",
                })
              }
              whileHover={{ scale: 1.03, y: -4 }}
              className="block w-full rotate-[6deg] opacity-90 transition-transform duration-300 drop-shadow-[0_20px_50px_rgba(0,0,0,0.4)]"
              aria-label="Wachstumsverlauf vergrößern"
            >
              <img
                src={dashboardDarkUrl}
                alt="Wachstumsverlauf der Moonli App"
                className="block w-full h-auto select-none"
                loading="lazy"
                draggable={false}
              />
            </motion.button>
          </motion.div>

          {/* Vorne — Mitte */}
          <motion.div
            className="relative z-20 w-[52%] sm:w-[48%] mx-auto"
            style={{ y: frontLift }}
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 28 }}
              className="relative drop-shadow-[0_34px_85px_rgba(0,0,0,0.45)]"
            >
              <button
                type="button"
                onClick={() =>
                  setActiveImage({
                    src: dashboardGrowthUrl,
                    alt: "Moonli Elternbereich – Home",
                  })
                }
                className="relative block w-full"
                aria-label="Elternbereich vergrößern"
              >
                <img
                  src={dashboardGrowthUrl}
                  alt="Moonli Elternbereich – Home"
                  className="block w-full h-auto select-none"
                  loading="eager"
                  draggable={false}
                />
              </button>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {activeImage && (
        <ImageLightbox
          src={activeImage.src}
          alt={activeImage.alt}
          onClose={() => setActiveImage(null)}
        />
      )}
    </motion.div>
  );
};

const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-[94vh] flex items-center pt-44 md:pt-36 pb-16 overflow-x-hidden">
      {/* Ambient background glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full bg-pastel-green/30 blur-[100px]" style={{ animation: 'pulseGlow 8s ease-in-out infinite' }} />
        <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full bg-pastel-peach/30 blur-[100px]" style={{ animation: 'pulseGlow 10s ease-in-out infinite 2s' }} />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-pastel-blue/25 blur-[100px]" style={{ animation: 'pulseGlow 12s ease-in-out infinite 4s' }} />
      </div>

      {/* Stars + shooting star */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Funkelnde Sterne */}
        <div className="hero-star" style={{ top: '12%', left: '8%',  animationDelay: '0s',   width: 2, height: 2 }} />
        <div className="hero-star" style={{ top: '22%', left: '32%', animationDelay: '1.2s', width: 1.5, height: 1.5 }} />
        <div className="hero-star" style={{ top: '8%',  left: '55%', animationDelay: '2.4s', width: 2.5, height: 2.5 }} />
        <div className="hero-star" style={{ top: '18%', right: '12%',animationDelay: '0.6s', width: 2, height: 2 }} />
        <div className="hero-star" style={{ top: '35%', right: '28%',animationDelay: '3.1s', width: 1.5, height: 1.5 }} />
        <div className="hero-star" style={{ top: '5%',  right: '40%',animationDelay: '1.8s', width: 2, height: 2 }} />
        <div className="hero-star" style={{ top: '45%', left: '14%', animationDelay: '4.0s', width: 1.5, height: 1.5 }} />
        <div className="hero-star" style={{ top: '55%', right: '8%', animationDelay: '2.7s', width: 2, height: 2 }} />
        <div className="hero-star" style={{ top: '28%', left: '72%', animationDelay: '0.3s', width: 1, height: 1 }} />
        <div className="hero-star" style={{ top: '62%', left: '42%', animationDelay: '5.2s', width: 1.5, height: 1.5 }} />
      </div>

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text */}
          <motion.div
            initial={motionInitial}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-center lg:text-left max-w-2xl"
          >
            <span className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-white/95 border border-white/20 bg-white/10 backdrop-blur-md shadow-soft mb-5">
              Smart Parenting App
            </span>

            <h1 className="text-display-lg mb-7">
              <span className="text-foreground">{t("hero.headline1")}</span>{" "}
              <span className="text-gradient-animated">{t("hero.headline2")}</span>
            </h1>

            <p className="text-body-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-9 leading-relaxed">
              {t("hero.subheadline")}
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center lg:justify-start">
              <a
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-white text-slate-900 font-bold hover:opacity-95 transition-all shadow-soft-lg hover:shadow-soft-xl hover:scale-[1.02] duration-200 w-full sm:w-auto"
              >
                <Apple className="w-5 h-5" />
                {t("nav.appStore")}
              </a>
              <a
                href={GOOGLE_PLAY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-primary text-white font-bold hover:opacity-90 transition-all shadow-soft-lg hover:shadow-soft-xl hover:scale-[1.02] duration-200 w-full sm:w-auto"
              >
                <Play className="w-5 h-5 text-white" />
                Google Play
              </a>
            </div>
          </motion.div>

          {/* Phone Mockup */}
          <div className="flex justify-center lg:justify-end relative overflow-visible py-6 sm:py-8">
            <PhoneMockup />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
