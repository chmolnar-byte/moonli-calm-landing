import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";

const FounderSection = () => {
  const { t } = useLanguage();

  return (
    <section className="py-8 sm:py-10 relative">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mx-auto max-w-6xl rounded-[1.5rem] border border-border/70 bg-white/80 p-6 sm:p-7 shadow-soft-xl"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 text-primary text-xs font-semibold mb-3">
            Founder Story
          </span>
          <h3 className="text-xl sm:text-2xl font-extrabold mb-3">{t("pricing.about.title")}</h3>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            {t("pricing.about.text")}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default FounderSection;
