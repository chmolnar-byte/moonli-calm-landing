import { motion } from "framer-motion";
import { Shield, Heart, Sparkles } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const StatsCounter = () => {
  const { t } = useLanguage();

  return (
    <section className="pt-10 pb-16 sm:py-16 relative">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="glass-card-premium p-8 md:p-10 text-center relative overflow-hidden max-w-3xl mx-auto"
        >
          <div className="absolute -top-20 -right-20 w-[200px] h-[200px] rounded-full bg-pastel-green/30 blur-[60px] pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-[200px] h-[200px] rounded-full bg-pastel-lavender/20 blur-[60px] pointer-events-none" />

          <div className="relative z-10">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-button text-primary text-sm font-semibold mb-4">
              <Shield className="w-4 h-4" />
              {t("promise.badge")}
            </span>

            <h2 className="text-2xl sm:text-3xl font-extrabold mb-4">
              {t("promise.title")}
            </h2>

            <p className="text-muted-foreground max-w-xl mx-auto text-base leading-relaxed mb-6">
              {t("promise.text")}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { icon: Heart, labelKey: "promise.stat1" },
                { icon: Sparkles, labelKey: "promise.stat2" },
                { icon: Shield, labelKey: "promise.stat3" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                  className="glass-button rounded-xl p-4 text-center border border-white/20"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/12 border border-primary/35 flex items-center justify-center mx-auto mb-3 shadow-[0_8px_22px_rgba(0,0,0,0.2)]">
                    <stat.icon className="w-5 h-5 text-primary drop-shadow-[0_1px_3px_rgba(0,0,0,0.35)]" />
                  </div>
                  <p className="text-sm font-semibold text-white">{t(stat.labelKey)}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default StatsCounter;
