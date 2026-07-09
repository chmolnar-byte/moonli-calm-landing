import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import { motionInitial } from "@/lib/motion";

const FounderSection = () => {
  const { t } = useLanguage();

  return (
    <section className="py-10 sm:py-12 relative">
      <div className="container">
        <motion.div
          initial={motionInitial}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mx-auto max-w-6xl rounded-[1.75rem] border border-white/20 bg-white/8 backdrop-blur-xl p-7 sm:p-9 shadow-soft-2xl relative overflow-hidden"
        >
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-20 right-10 w-56 h-56 rounded-full bg-primary/15 blur-3xl" />
            <div className="absolute -bottom-24 left-8 w-52 h-52 rounded-full bg-pastel-blue/15 blur-3xl" />
          </div>

          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/15 text-primary text-xs font-semibold mb-4 relative z-10">
            Founder Story
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold mb-4 text-white relative z-10">{t("pricing.about.title")}</h3>
          <p className="text-base sm:text-lg text-white/85 leading-relaxed relative z-10 max-w-5xl">
            {t("pricing.about.text")}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default FounderSection;
