import { motion } from "framer-motion";
import { Shield, Heart, Sparkles } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const StatsCounter = () => {
  const { t } = useLanguage();

  return (
    <section className="py-16 relative">
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
                { icon: Heart, labelKey: "promise.stat1", color: "text-pastel-pink-strong", bg: "bg-pastel-pink/60" },
                { icon: Sparkles, labelKey: "promise.stat2", color: "text-pastel-yellow-strong", bg: "bg-pastel-yellow/60" },
                { icon: Shield, labelKey: "promise.stat3", color: "text-pastel-green-strong", bg: "bg-pastel-green/60" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                  className="glass-button rounded-xl p-4 text-center"
                >
                  <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center mx-auto mb-2`}>
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                  <p className="text-sm font-semibold">{t(stat.labelKey)}</p>
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
