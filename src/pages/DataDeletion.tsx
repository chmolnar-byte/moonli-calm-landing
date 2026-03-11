import { useLanguage } from "@/i18n/LanguageContext";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import CTAFooter from "@/components/CTAFooter";

const DataDeletion = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-page flex flex-col">
      <Navbar />

      <main className="flex-1 flex items-center justify-center px-4 py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="glass-card-premium max-w-3xl w-full p-6 sm:p-10 text-left"
        >
          <h1 className="text-2xl sm:text-3xl font-extrabold mb-4 text-glow">
            {t("dataDeletion.title")}
          </h1>

          <p className="text-sm sm:text-base text-muted-foreground mb-4">
            {t("dataDeletion.intro")}
          </p>

          <p className="text-sm sm:text-base text-muted-foreground mb-3">
            {t("dataDeletion.emailInstruction")}
          </p>

          <ul className="list-disc pl-5 space-y-1 text-sm sm:text-base text-muted-foreground mb-4">
            <li>{t("dataDeletion.item.subject")}</li>
            <li>{t("dataDeletion.item.email")}</li>
            <li>{t("dataDeletion.item.childName")}</li>
          </ul>

          <p className="text-sm sm:text-base text-muted-foreground">
            {t("dataDeletion.processingTime")}
          </p>
        </motion.div>
      </main>

      <CTAFooter />
    </div>
  );
};

export default DataDeletion;

