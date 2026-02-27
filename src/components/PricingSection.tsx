import { motion } from "framer-motion";
import { Check, Crown, Rocket, Users, FileText, Clapperboard, Feather } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const PricingSection = () => {
  const { t } = useLanguage();

  const freeFeatures = [
    "pricing.free.f1",
    "pricing.free.f2",
    "pricing.free.f3",
    "pricing.free.f4",
    "pricing.free.f5",
    "pricing.free.f6",
    "pricing.free.f7",
    "pricing.free.f8",
    "pricing.free.f9",
    "pricing.free.f10",
    "pricing.free.f11",
    "pricing.free.f12",
  ];

  const premiumFeatures = [
    "pricing.premium.f1",
    "pricing.premium.f2",
    "pricing.premium.f3",
    "pricing.premium.f4",
    "pricing.premium.f5",
    "pricing.premium.f6",
    "pricing.premium.f8",
    "pricing.premium.f9",
    "pricing.premium.f10",
    "pricing.premium.f11",
  ];

  return (
    <section className="py-20 sm:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-pastel-green/15 via-transparent to-pastel-lavender/10 pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-[400px] h-[400px] rounded-full bg-pastel-yellow/15 blur-[100px]" />
        <div className="absolute bottom-0 left-1/4 w-[300px] h-[300px] rounded-full bg-pastel-lavender/15 blur-[80px]" />
      </div>

      <div className="container relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-button text-primary text-sm font-semibold mb-4">
            💰 {t("pricing.badge")}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 text-glow">
            {t("pricing.title")}
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            {t("pricing.subtitle")}
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto mb-16 sm:mb-20">
          {/* Free Plan */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass-card-premium p-6 sm:p-8 relative"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-pastel-green/60 flex items-center justify-center">
                <span className="text-lg">🟢</span>
              </div>
              <div>
                <h3 className="text-xl font-extrabold">Moonli Free</h3>
                <p className="text-sm text-muted-foreground">{t("pricing.free.tagline")}</p>
              </div>
            </div>
            <div className="flex items-baseline gap-1 mb-3 mt-4">
              <span className="text-4xl font-extrabold">0 €</span>
              <span className="text-muted-foreground text-sm">/ {t("pricing.forever")}</span>
            </div>
            <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
              {t("pricing.free.desc")}
            </p>
            <p className="text-sm font-semibold text-foreground mb-5">
              {t("pricing.free.adNote")}
            </p>
            <div className="space-y-3">
              {freeFeatures.map((key) => (
                <div key={key} className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-pastel-green-strong shrink-0 mt-0.5" />
                  <span className="text-sm">{t(key)}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Premium Plan */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass-card-premium p-6 sm:p-8 relative overflow-hidden"
          >
            {/* Premium highlight border */}
            <div className="absolute inset-0 rounded-[1.5rem] border-2 border-pastel-yellow-strong/30 pointer-events-none" />
            <div className="absolute -top-16 -right-16 w-[150px] h-[150px] rounded-full bg-pastel-yellow/30 blur-[50px] pointer-events-none" />

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-pastel-yellow/60 flex items-center justify-center">
                  <Crown className="w-5 h-5 text-pastel-yellow-strong" />
                </div>
                <div>
                  <h3 className="text-xl font-extrabold">Moonli Premium</h3>
                  <p className="text-sm text-muted-foreground">{t("pricing.premium.tagline")}</p>
                </div>
              </div>
              <div className="mb-4 mt-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-extrabold">5 €</span>
                  <span className="text-muted-foreground text-sm">/ {t("pricing.month")}*</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-6 leading-relaxed">{t("pricing.premium.desc")}</p>
              <div className="space-y-3">
                {premiumFeatures.map((key) => (
                  <div key={key} className="flex items-start gap-3">
                    <span className="text-sm shrink-0 mt-0.5">✨</span>
                    <span className="text-sm">{t(key)}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-6">
                {t("pricing.premium.priceNote")}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Coming Soon */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="glass-card-premium p-6 sm:p-8 md:p-10 max-w-4xl mx-auto mb-16 sm:mb-20 relative overflow-hidden group"
        >
          <div className="absolute -top-20 -right-20 w-[200px] h-[200px] rounded-full bg-pastel-peach/30 blur-[60px] pointer-events-none" />
          <div className="relative z-10">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
              <div className="flex items-center gap-3">
                <Rocket className="w-6 h-6 text-pastel-peach-strong" />
                <h3 className="text-xl font-extrabold">{t("pricing.comingSoon.title")}</h3>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-6 max-w-2xl mx-auto">
              {t("pricing.comingSoon.subtitle")}
            </p>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-pastel-blue/60 flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5 text-pastel-blue-strong" />
                </div>
                <div>
                  <h4 className="font-bold text-sm mb-1">{t("pricing.comingSoon.coparenting.title")}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {t("pricing.comingSoon.coparenting.desc")}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-pastel-purple/60 flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5 text-pastel-purple-strong" />
                </div>
                <div>
                  <h4 className="font-bold text-sm mb-1">{t("pricing.comingSoon.report.title")}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {t("pricing.comingSoon.report.desc")}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-pastel-green/60 flex items-center justify-center shrink-0">
                  <Clapperboard className="w-5 h-5 text-pastel-green-strong" />
                </div>
                <div>
                  <h4 className="font-bold text-sm mb-1">{t("pricing.comingSoon.clips.title")}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {t("pricing.comingSoon.clips.desc")}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-pastel-pink/60 flex items-center justify-center shrink-0">
                  <Feather className="w-5 h-5 text-pastel-pink-strong" />
                </div>
                <div>
                  <h4 className="font-bold text-sm mb-1">{t("pricing.comingSoon.whisper.title")}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {t("pricing.comingSoon.whisper.desc")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default PricingSection;
