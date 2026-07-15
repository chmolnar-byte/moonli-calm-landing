import { useLanguage } from "@/i18n/LanguageContext";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import CTAFooter from "@/components/CTAFooter";
import AppProviders from "@/components/react/AppProviders";
import { motionInitial } from "@/lib/motion";

const CookiePolicyPage = () => {
  const { t } = useLanguage();

  return (
    <AppProviders>
      <div className="night-sky min-h-screen bg-gradient-page overflow-x-hidden text-foreground flex flex-col">
        <div className="night-sky-stars fixed inset-0 z-0 pointer-events-none" />
        <Navbar />

        <main className="relative z-10 flex-1 px-4 py-28 md:py-32">
          <motion.div
            initial={motionInitial}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="glass-card-premium max-w-3xl w-full mx-auto p-6 sm:p-10 text-left"
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
    </AppProviders>
  );
};

export default CookiePolicyPage;
