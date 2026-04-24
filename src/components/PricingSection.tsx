import { motion } from "framer-motion";
import {
  Ban,
  BookOpen,
  Brain,
  CheckCircle2,
  FileText,
  Heart,
  MicVocal,
  Sparkles,
} from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const PricingSection = () => {
  const { t } = useLanguage();

  const freeFeatureKeys = [
    "pricing.free.f1",
    "pricing.free.f2",
    "pricing.free.f3",
    "pricing.free.f4",
    "pricing.free.f5",
    "pricing.free.f6",
    "pricing.free.f7",
  ];

  const premiumFeatures = [
    { icon: Ban, key: "pricing.premium.f2" },
    { icon: Brain, key: "pricing.premium.f3" },
    { icon: FileText, key: "pricing.premium.f4" },
    { icon: Sparkles, key: "pricing.premium.f1" },
    { icon: BookOpen, key: "pricing.premium.f5" },
    { icon: Heart, key: "pricing.premium.f6" },
    { icon: MicVocal, key: "pricing.premium.f7" },
  ];

  return (
    <section className="py-20 sm:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-pastel-green/15 via-transparent to-pastel-lavender/10 pointer-events-none" />
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="text-center mb-10"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-button text-primary text-sm font-semibold mb-4">
            {t("pricing.badge")}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-3 text-glow">{t("pricing.title")}</h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">{t("pricing.subtitle")}</p>
        </motion.div>

        <div className="mx-auto grid max-w-6xl md:grid-cols-2 gap-4 sm:gap-5 items-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="relative rounded-[1.5rem] border border-border/70 bg-white/80 p-6 sm:p-7 shadow-soft-xl"
          >
            <div className="absolute top-0 left-0 rounded-br-2xl rounded-tl-[1.5rem] bg-muted px-4 py-1 text-[11px] font-bold tracking-wide text-primary">
              {t("pricing.free.label")}
            </div>

            <h3 className="mt-10 text-[26px] sm:text-[28px] font-bold leading-tight tracking-tight">Moonli Free</h3>
            <div className="mt-2 flex items-end gap-1">
              <span className="text-[42px] leading-none font-extrabold">0 €</span>
              <span className="text-muted-foreground text-[24px] leading-none font-semibold">/</span>
              <span className="text-muted-foreground text-[24px] leading-none font-semibold">{t("pricing.forever")}</span>
            </div>

            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              {t("pricing.free.desc")}
            </p>

            <div className="mt-7 space-y-3.5">
              {freeFeatureKeys.map((key) => (
                <div key={key} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <p className="text-sm leading-relaxed font-normal text-muted-foreground">{t(key)}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.08 }}
            className="relative overflow-hidden rounded-[1.5rem] border-2 border-[#f7dda0] bg-white/80 p-6 sm:p-7 shadow-soft-xl"
          >
            <div className="absolute top-0 left-0 rounded-br-3xl rounded-tl-[1.5rem] bg-[#f8e7b8] px-5 py-1 text-[11px] font-bold tracking-wide text-[#7a6530]">
              {t("pricing.premium.mostSelected")}
            </div>

            <div className="absolute top-0 right-3 sm:right-4">
              <div className="bg-[#f8e7b8] px-4 py-2 text-center text-[11px] leading-tight font-extrabold tracking-wide text-[#7a6530]">
                <div>{t("pricing.premium.trialLine1")}</div>
                <div>{t("pricing.premium.trialLine2")}</div>
                <div>{t("pricing.premium.trialLine3")}</div>
              </div>
              <div className="mx-auto h-0 w-0 border-l-[52px] border-r-[52px] border-t-[12px] border-l-transparent border-r-transparent border-t-[#f8e7b8]" />
            </div>

            <h3 className="mt-10 text-[26px] sm:text-[28px] font-bold leading-tight tracking-tight">Moonli Premium</h3>
            <div className="mt-2 flex items-end gap-1">
              <span className="text-[42px] leading-none font-extrabold">5 €</span>
              <span className="text-muted-foreground text-[24px] leading-none font-semibold">/{t("pricing.month")}*</span>
            </div>
            <p className="mt-1.5 text-[13px] text-muted-foreground">
              {t("pricing.premium.priceNote")}
            </p>

            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              {t("pricing.premium.desc")}
            </p>

            <div className="mt-7 space-y-3.5">
              {premiumFeatures.map((feature) => (
                <div key={feature.key} className="flex items-start gap-3">
                  <feature.icon className="mt-0.5 h-4 w-4 shrink-0 text-[#8a7340]" />
                  <p className="text-sm leading-relaxed font-normal text-muted-foreground">{t(feature.key)}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
