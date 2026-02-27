import { useLanguage } from "@/i18n/LanguageContext";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import CTAFooter from "@/components/CTAFooter";

const CookiePolicy = () => {
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
            {t("cookies.title")}
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground mb-6">
            {t("cookies.intro")}
          </p>

          <div className="space-y-4 text-sm sm:text-base text-muted-foreground">
            <p>{t("cookies.section1")}</p>
            <p>{t("cookies.section2")}</p>
            <p>{t("cookies.section3")}</p>
          </div>
        </motion.div>
      </main>

      <CTAFooter />
    </div>
  );
};

export default CookiePolicy;

