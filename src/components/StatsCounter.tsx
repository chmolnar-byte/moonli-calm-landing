import { motion } from "framer-motion";
import { Shield, Heart, Sparkles } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { easeOut, motionInitial } from "@/lib/motion";

const StatsCounter = () => {
  const { t } = useLanguage();

  const stats = [
    { icon: Heart, labelKey: "promise.stat1" },
    { icon: Sparkles, labelKey: "promise.stat2" },
    { icon: Shield, labelKey: "promise.stat3" },
  ];

  return (
    <section className="py-8 md:py-10">
      <div className="container">
        <motion.div
          initial={motionInitial}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, ease: easeOut }}
          className="grid sm:grid-cols-3 gap-6 border-y border-border py-6"
        >
          {stats.map((stat) => (
            <div key={stat.labelKey} className="flex items-start gap-3">
              <stat.icon className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
              <p className="text-sm font-semibold leading-snug text-foreground">
                {t(stat.labelKey)}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default StatsCounter;
