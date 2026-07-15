import { useLanguage } from "@/i18n/LanguageContext";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import CTAFooter from "@/components/CTAFooter";

import AppProviders from "@/components/react/AppProviders";
import { motionInitial } from "@/lib/motion";

const TermsPage = () => {
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
            {t("terms.title")}
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground mb-6">
            {t("terms.intro")}
          </p>

          <div className="space-y-5 text-sm sm:text-base text-muted-foreground">
            <section>
              <h2 className="font-semibold text-foreground mb-1">
                {t("terms.section1.title")}
              </h2>
              <p className="mb-2">{t("terms.section1.p1")}</p>
              <p className="mb-2">{t("terms.section1.p2")}</p>
              <p>{t("terms.section1.p3")}</p>
            </section>

            <section>
              <h2 className="font-semibold text-foreground mb-1">
                {t("terms.section2.title")}
              </h2>
              <p className="mb-2">{t("terms.section2.p1")}</p>
              <p>{t("terms.section2.p2")}</p>
            </section>

            <section>
              <h2 className="font-semibold text-foreground mb-1">
                {t("terms.section3.title")}
              </h2>
              <p className="mb-2">{t("terms.section3.p1")}</p>
              <p className="mb-2">{t("terms.section3.p2")}</p>
              <p>{t("terms.section3.p3")}</p>
            </section>

            <section>
              <h2 className="font-semibold text-foreground mb-1">
                {t("terms.section4.title")}
              </h2>
              <p className="mb-2">{t("terms.section4.p1")}</p>
              <p className="mb-2">{t("terms.section4.p2")}</p>
              <p>{t("terms.section4.p3")}</p>
            </section>

            <section>
              <h2 className="font-semibold text-foreground mb-1">
                {t("terms.section5.title")}
              </h2>
              <p>{t("terms.section5.text")}</p>
            </section>

            <section>
              <h2 className="font-semibold text-foreground mb-1">
                {t("terms.section6.title")}
              </h2>
              <p className="mb-2">{t("terms.section6.p1")}</p>
              <p className="mb-2">{t("terms.section6.p2")}</p>
              <p>{t("terms.section6.p3")}</p>
            </section>

            <section>
              <h2 className="font-semibold text-foreground mb-1">
                {t("terms.section7.title")}
              </h2>
              <p>{t("terms.section7.text")}</p>
            </section>

            <section>
              <h2 className="font-semibold text-foreground mb-1">
                {t("terms.section8.title")}
              </h2>
              <p className="mb-2">{t("terms.section8.p1")}</p>
              <p>{t("terms.section8.p2")}</p>
            </section>

            <section>
              <h2 className="font-semibold text-foreground mb-1">
                {t("terms.section9.title")}
              </h2>
              <p className="mb-2">{t("terms.section9.p1")}</p>
              <p className="mb-2">{t("terms.section9.p2")}</p>
              <p>{t("terms.section9.p3")}</p>
            </section>

            <section>
              <h2 className="font-semibold text-foreground mb-1">
                {t("terms.section10.title")}
              </h2>
              <p>{t("terms.section10.text")}</p>
            </section>

            <section>
              <h2 className="font-semibold text-foreground mb-1">
                {t("terms.section11.title")}
              </h2>
              <p className="mb-2">{t("terms.section11.p1")}</p>
              <p className="mb-2">{t("terms.section11.p2")}</p>
              <p>{t("terms.section11.p3")}</p>
            </section>

            <section>
              <h2 className="font-semibold text-foreground mb-1">
                {t("terms.section12.title")}
              </h2>
              <p className="mb-2">{t("terms.section12.p1")}</p>
              <p className="mb-2">{t("terms.section12.p2")}</p>
              <p>{t("terms.section12.p3")}</p>
            </section>

            <section>
              <h2 className="font-semibold text-foreground mb-1">
                {t("terms.section13.title")}
              </h2>
              <p className="mb-2">{t("terms.section13.p1")}</p>
              <p className="mb-2">{t("terms.section13.p2")}</p>
              <p>{t("terms.section13.p3")}</p>
            </section>

            <section>
              <h2 className="font-semibold text-foreground mb-1">
                {t("terms.section14.title")}
              </h2>
              <p className="mb-2">{t("terms.section14.p1")}</p>
              <p>{t("terms.section14.p2")}</p>
            </section>

            <p className="pt-2 text-xs sm:text-sm text-muted-foreground">
              {t("terms.stand")}
            </p>
          </div>
        </motion.div>
      </main>

      <CTAFooter />
    </div>
    </AppProviders>
  );
};

export default TermsPage;

