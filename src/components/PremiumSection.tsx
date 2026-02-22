import { motion } from "framer-motion";
import { Brain, Moon, Flower2, GraduationCap, Mic, BookOpen, Gamepad2, Check } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

interface PremiumFeature {
  icon: LucideIcon;
  titleKey: string;
  descKey: string;
}

const premiumFeatures: PremiumFeature[] = [
  { icon: Brain, titleKey: "premium.feature1.title", descKey: "premium.feature1.desc" },
  { icon: Moon, titleKey: "premium.feature2.title", descKey: "premium.feature2.desc" },
  { icon: Flower2, titleKey: "premium.feature3.title", descKey: "premium.feature3.desc" },
  { icon: GraduationCap, titleKey: "premium.feature4.title", descKey: "premium.feature4.desc" },
  { icon: Mic, titleKey: "premium.feature5.title", descKey: "premium.feature5.desc" },
  { icon: BookOpen, titleKey: "premium.feature6.title", descKey: "premium.feature6.desc" },
  { icon: Gamepad2, titleKey: "premium.feature7.title", descKey: "premium.feature7.desc" },
];

const PremiumSection = () => {
  const { t } = useLanguage();

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Sage green background tint */}
      <div className="absolute inset-0 bg-gradient-to-b from-pastel-green/20 via-pastel-green/10 to-transparent pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-[400px] h-[400px] rounded-full bg-pastel-yellow/15 blur-[100px]" />
        <div className="absolute bottom-0 left-1/4 w-[300px] h-[300px] rounded-full bg-pastel-lavender/15 blur-[80px]" />
      </div>

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-button text-pastel-yellow-strong text-sm font-semibold mb-4">
            {t("premium.badge")}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 text-glow">
            {t("premium.title")}
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            {t("premium.subtitle")}
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass-card-premium p-8 md:p-10"
          >
            <div className="space-y-5">
              {premiumFeatures.map((feature, i) => (
                <motion.div
                  key={feature.titleKey}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.15 + i * 0.06 }}
                  className="flex items-start gap-4 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-200">
                    <feature.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-base">{t(feature.titleKey)}</h3>
                      <Check className="w-4 h-4 text-primary shrink-0" />
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{t(feature.descKey)}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PremiumSection;
