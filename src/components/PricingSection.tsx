import { motion } from "framer-motion";
import { Check, X, Crown, Rocket, Users, FileText } from "lucide-react";
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
  ];

  const premiumFeatures = [
    "pricing.premium.f1",
    "pricing.premium.f2",
    "pricing.premium.f3",
    "pricing.premium.f4",
    "pricing.premium.f5",
  ];

  const comparisonRows = [
    { key: "pricing.compare.r1", free: "check", premium: "check" },
    { key: "pricing.compare.r2", free: "check", premium: "check" },
    { key: "pricing.compare.r3", free: "check", premium: "check" },
    { key: "pricing.compare.r4", free: "check", premium: "check" },
    { key: "pricing.compare.r5", free: "14days", premium: "check" },
    { key: "pricing.compare.r6", free: "no", premium: "check" },
    { key: "pricing.compare.r7", free: "no", premium: "check" },
    { key: "pricing.compare.r8", free: "no", premium: "check" },
    { key: "pricing.compare.r9", free: "basis", premium: "check" },
    { key: "pricing.compare.r10", free: "no", premium: "soon" },
    { key: "pricing.compare.r11", free: "no", premium: "soon" },
  ];

  const renderCell = (value: string) => {
    switch (value) {
      case "check":
        return <Check className="w-5 h-5 text-pastel-green-strong mx-auto" />;
      case "no":
        return <X className="w-5 h-5 text-muted-foreground/40 mx-auto" />;
      case "14days":
        return <span className="text-xs font-medium text-pastel-yellow-strong">{t("pricing.compare.14days")}</span>;
      case "basis":
        return <span className="text-xs font-medium text-muted-foreground">{t("pricing.compare.basis")}</span>;
      case "soon":
        return <span className="text-xs font-medium text-pastel-peach-strong">🚀 {t("pricing.compare.soon")}</span>;
      default:
        return value;
    }
  };

  return (
    <section className="py-24 relative overflow-hidden">
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
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-20">
          {/* Free Plan */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass-card-premium p-8 relative"
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
            <div className="flex items-baseline gap-1 mb-4 mt-4">
              <span className="text-4xl font-extrabold">0 €</span>
              <span className="text-muted-foreground text-sm">/ {t("pricing.forever")}</span>
            </div>
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">{t("pricing.free.desc")}</p>
            <div className="space-y-3">
              {freeFeatures.map((key) => (
                <div key={key} className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-pastel-green-strong shrink-0 mt-0.5" />
                  <span className="text-sm">{t(key)}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-6 italic">{t("pricing.free.adNote")}</p>
          </motion.div>

          {/* Premium Plan */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass-card-premium p-8 relative overflow-hidden"
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
              <div className="flex items-baseline gap-1 mb-4 mt-4">
                <span className="text-4xl font-extrabold">5 €</span>
                <span className="text-muted-foreground text-sm">/ {t("pricing.month")}</span>
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
            </div>
          </motion.div>
        </div>

        {/* Coming Soon */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="glass-card-premium p-8 md:p-10 max-w-4xl mx-auto mb-20 relative overflow-hidden"
        >
          <div className="absolute -top-20 -right-20 w-[200px] h-[200px] rounded-full bg-pastel-peach/30 blur-[60px] pointer-events-none" />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <Rocket className="w-6 h-6 text-pastel-peach-strong" />
              <h3 className="text-xl font-extrabold">{t("pricing.comingSoon.title")}</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-6">{t("pricing.comingSoon.subtitle")}</p>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-pastel-blue/60 flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5 text-pastel-blue-strong" />
                </div>
                <div>
                  <h4 className="font-bold text-sm mb-1">{t("pricing.comingSoon.coparenting.title")}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{t("pricing.comingSoon.coparenting.desc")}</p>
                </div>
              </div>
              <div className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-pastel-purple/60 flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5 text-pastel-purple-strong" />
                </div>
                <div>
                  <h4 className="font-bold text-sm mb-1">{t("pricing.comingSoon.report.title")}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{t("pricing.comingSoon.report.desc")}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <h3 className="text-xl font-extrabold text-center mb-8">📊 {t("pricing.compare.title")}</h3>
          <div className="glass-card-premium overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/50">
                    <th className="text-left p-4 font-semibold">Feature</th>
                    <th className="p-4 font-semibold text-center">Free</th>
                    <th className="p-4 font-semibold text-center">
                      <span className="inline-flex items-center gap-1">
                        <Crown className="w-4 h-4 text-pastel-yellow-strong" />
                        Premium
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-background/30" : ""}>
                      <td className="p-4 font-medium">{t(row.key)}</td>
                      <td className="p-4 text-center">{renderCell(row.free)}</td>
                      <td className="p-4 text-center">{renderCell(row.premium)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
