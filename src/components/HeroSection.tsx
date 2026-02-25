import { motion } from "framer-motion";
import { Apple, Play } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const PhoneMockup = () => (
  <motion.div
    initial={{ opacity: 0, y: 40, rotateY: -8 }}
    animate={{ opacity: 1, y: 0, rotateY: 0 }}
    transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
    className="relative"
    style={{ perspective: "1200px" }}
  >
    {/* Glow behind phone */}
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div className="w-3/4 h-3/4 rounded-full bg-pastel-green/40 blur-[80px]" />
    </div>
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div className="w-1/2 h-1/2 rounded-full bg-pastel-lavender/30 blur-[60px] translate-y-8" />
    </div>

    {/* Phone frame */}
    <div className="relative mx-auto w-[260px] sm:w-[280px] rounded-[2.5rem] border-[6px] border-foreground/10 bg-background shadow-soft-xl overflow-hidden float-animation">
      {/* Status bar */}
      <div className="flex items-center justify-between px-6 pt-3 pb-2">
        <span className="text-[10px] font-semibold text-muted-foreground">9:41</span>
        <div className="w-20 h-5 rounded-full bg-foreground/10" />
        <div className="flex gap-0.5">
          <div className="w-3 h-3 rounded-sm bg-foreground/15" />
          <div className="w-3 h-3 rounded-sm bg-foreground/15" />
        </div>
      </div>

      {/* App content */}
      <div className="px-4 pb-6 space-y-3">
        {/* Greeting */}
        <div className="pt-2">
          <p className="text-[11px] text-muted-foreground">Guten Morgen 👋</p>
          <p className="text-sm font-bold">Sarah's Dashboard</p>
        </div>

        {/* Parent Energy Bar */}
        <div className="glass-card-premium p-3 rounded-2xl">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-semibold text-primary">Parent Energy</span>
            <span className="text-[10px] font-bold text-primary">78%</span>
          </div>
          <div className="h-2 rounded-full bg-muted/60 overflow-hidden">
            <div className="h-full w-[78%] rounded-full bg-gradient-to-r from-primary to-pastel-green-strong" />
          </div>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-2 gap-2">
          <div className="glass-button rounded-xl p-2.5">
            <p className="text-[9px] text-muted-foreground">Schlaf</p>
            <p className="text-sm font-bold">7h 23m</p>
            <p className="text-[9px] text-pastel-green-strong">✓ Gut</p>
          </div>
          <div className="glass-button rounded-xl p-2.5">
            <p className="text-[9px] text-muted-foreground">Fläschchen</p>
            <p className="text-sm font-bold">4x</p>
            <p className="text-[9px] text-pastel-blue-strong">180ml ø</p>
          </div>
        </div>

        {/* Level badge */}
        <div className="flex items-center gap-2 glass-button rounded-xl p-2.5">
          <span className="text-lg">⚡</span>
          <div>
            <p className="text-[10px] font-bold">Level 3 — Routine Ninja</p>
            <p className="text-[9px] text-muted-foreground">2,450 XP</p>
          </div>
        </div>
      </div>
    </div>
  </motion.div>
);

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
