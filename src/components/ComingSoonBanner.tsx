import { motion } from "framer-motion";
import { Users } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const ComingSoonBanner = () => {
  const { t } = useLanguage();

  return (
    <section className="py-12 relative">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="glass-card-premium p-8 md:p-10 text-center relative overflow-hidden"
        >
          {/* Decorative glow */}
          <div className="absolute -top-20 -right-20 w-[200px] h-[200px] rounded-full bg-pastel-peach/30 blur-[60px] pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-[200px] h-[200px] rounded-full bg-pastel-lavender/20 blur-[60px] pointer-events-none" />

          <div className="relative z-10">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-button text-pastel-peach-strong text-sm font-semibold mb-4">
              {t("comingSoon.badge")}
            </span>

            <div className="flex items-center justify-center gap-3 mb-4">
              <Users className="w-7 h-7 text-primary" />
              <h2 className="text-2xl sm:text-3xl font-extrabold">
                {t("comingSoon.title")}
              </h2>
            </div>

            <p className="text-muted-foreground max-w-xl mx-auto text-base leading-relaxed">
              {t("comingSoon.text")}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ComingSoonBanner;
