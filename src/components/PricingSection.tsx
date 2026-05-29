import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const PricingFeatureRow = ({ featureKey }: { featureKey: string }) => {
  const { t } = useLanguage();
  const title = t(`${featureKey}.title`);
  const desc = t(`${featureKey}.desc`);

  return (
    <li className="flex items-start gap-3 py-3.5">
      <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-primary" aria-hidden />
      <div className="min-w-0 flex-1">
        <p className="text-[15px] font-medium leading-snug text-white">{title}</p>
        {desc ? (
          <p className="mt-1 text-sm leading-relaxed text-white/60">{desc}</p>
        ) : null}
      </div>
    </li>
  );
};

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

  const premiumFeatureKeys = [
    "pricing.premium.f1",
    "pricing.premium.f2",
    "pricing.premium.f3",
    "pricing.premium.f3a",
    "pricing.premium.f4",
    "pricing.premium.f5",
    "pricing.premium.f6",
    "pricing.premium.f7",
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/12 via-transparent to-pastel-green/10 pointer-events-none" />
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="text-center mb-10"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-button text-primary text-sm font-semibold mb-4">
            {t("pricing.badge")}
          </span>
          <h2 className="text-display-md font-extrabold mb-3 text-glow text-white">{t("pricing.title")}</h2>
          <p className="text-base text-white/70 max-w-2xl mx-auto">{t("pricing.subtitle")}</p>
        </motion.div>

        <div className="mx-auto grid max-w-6xl md:grid-cols-2 gap-4 sm:gap-6 items-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="relative rounded-[1.5rem] border border-white/15 bg-white/5 p-7 sm:p-8 shadow-soft-2xl"
          >
            <div className="absolute top-0 left-0 rounded-br-2xl rounded-tl-[1.5rem] bg-[#f6d87a] px-4 py-1 text-[11px] font-bold tracking-wide text-[#5f4a15] shadow-[0_8px_20px_rgba(246,216,122,0.35)]">
              {t("pricing.free.label")}
            </div>

            <h3 className="mt-10 text-[30px] font-semibold leading-tight tracking-tight text-white">Moonli Free</h3>
            <div className="mt-2 flex items-end gap-1">
              <span className="text-[46px] leading-none font-semibold text-white">0 €</span>
              <span className="text-white/60 text-[24px] leading-none font-semibold">/</span>
              <span className="text-white/60 text-[24px] leading-none font-semibold">{t("pricing.forever")}</span>
            </div>

            <p className="mt-4 text-base text-white/75 leading-relaxed">{t("pricing.free.desc")}</p>

            <ul className="mt-7 divide-y divide-white/10 border-t border-white/10">
              {freeFeatureKeys.map((key) => (
                <PricingFeatureRow key={key} featureKey={key} />
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.08 }}
            className="relative overflow-hidden rounded-[1.5rem] border border-primary/35 bg-white/5 p-7 sm:p-8 shadow-soft-2xl"
          >
            <div className="absolute top-0 left-0 rounded-br-3xl rounded-tl-[1.5rem] bg-[#f6d87a] px-5 py-1 text-[11px] font-bold tracking-wide text-[#5f4a15] shadow-[0_8px_20px_rgba(246,216,122,0.35)]">
              {t("pricing.premium.mostSelected")}
            </div>

            <div className="absolute top-0 right-3 sm:right-4">
              <div className="bg-[#f6d87a] px-4 py-2 text-center text-[11px] leading-tight font-extrabold tracking-wide text-[#5f4a15] shadow-[0_8px_20px_rgba(246,216,122,0.35)]">
                <div>{t("pricing.premium.trialLine1")}</div>
                <div>{t("pricing.premium.trialLine2")}</div>
                <div>{t("pricing.premium.trialLine3")}</div>
              </div>
              <div className="mx-auto h-0 w-0 border-l-[52px] border-r-[52px] border-t-[12px] border-l-transparent border-r-transparent border-t-[#f6d87a]" />
            </div>

            <h3 className="mt-10 text-[30px] font-semibold leading-tight tracking-tight text-white">Moonli Premium</h3>
            <div className="mt-2 flex items-end gap-1">
              <span className="text-[46px] leading-none font-semibold text-white">5 €</span>
              <span className="text-white/60 text-[24px] leading-none font-semibold">/{t("pricing.month")}*</span>
            </div>
            <p className="mt-1.5 text-[13px] text-white/60">{t("pricing.premium.priceNote")}</p>

            <p className="mt-5 text-base leading-relaxed text-white/75">{t("pricing.premium.desc")}</p>

            <ul className="mt-7 divide-y divide-white/10 border-t border-white/10">
              {premiumFeatureKeys.map((key) => (
                <PricingFeatureRow key={key} featureKey={key} />
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
