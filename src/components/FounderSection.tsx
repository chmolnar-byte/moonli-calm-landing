import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import LeafAccent from "@/components/LeafAccent";
import { easeOut, motionInitial } from "@/lib/motion";

const FounderSection = () => {
  const { t } = useLanguage();

  return (
    <section className="relative py-20 md:py-24">
      <LeafAccent
        src="/leaves/frond.png"
        className="page-leaf page-leaf-fade-bl bottom-0 left-0 z-0 w-[240px] sm:w-[300px]"
      />
      <div className="container relative z-10">
        <motion.div
          initial={motionInitial}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, ease: easeOut }}
          className="max-w-3xl"
        >
          <h2 className="text-display-md text-foreground mb-5">{t("pricing.about.title")}</h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            {t("pricing.about.text")}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default FounderSection;
