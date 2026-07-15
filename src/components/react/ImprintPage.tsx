import { useLanguage } from "@/i18n/LanguageContext";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import CTAFooter from "@/components/CTAFooter";
import AppProviders from "@/components/react/AppProviders";
import { motionInitial } from "@/lib/motion";

const ImprintPage = () => {
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
            {t("imprint.title")}
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground mb-6">
            {t("imprint.subtitle")}
          </p>

          <div className="space-y-5 text-sm sm:text-base text-muted-foreground">
            <section>
              <h2 className="font-semibold text-foreground mb-1">
                {t("imprint.operatorTitle")}
              </h2>
              <p>{t("imprint.operatorBrand")}</p>
              <p>{t("imprint.operatorName")}</p>
              <p>{t("imprint.operatorStreet")}</p>
              <p>
                {t("imprint.operatorCity")}, {t("imprint.operatorCountry")}
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-foreground mb-1">
                {t("imprint.contactTitle")}
              </h2>
              <p>
                {t("imprint.contactEmailLabel")}:{" "}
                <a
                  href={`mailto:${t("imprint.contactEmailValue")}`}
                  className="text-primary hover:underline"
                >
                  {t("imprint.contactEmailValue")}
                </a>
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-foreground mb-1">
                {t("imprint.responsibleTitle")}
              </h2>
              <p>{t("imprint.responsibleText")}</p>
            </section>

            <section>
              <h2 className="font-semibold text-foreground mb-1">
                {t("imprint.disclaimerTitle")}
              </h2>
              <p className="mb-2">{t("imprint.disclaimerText1")}</p>
              <p>{t("imprint.disclaimerText2")}</p>
            </section>

            <section>
              <h2 className="font-semibold text-foreground mb-1">
                {t("imprint.copyrightTitle")}
              </h2>
              <p>{t("imprint.copyrightText")}</p>
            </section>

            <section>
              <h2 className="font-semibold text-foreground mb-1">
                {t("imprint.euTitle")}
              </h2>
              <p className="mb-2">{t("imprint.euText1")}</p>
              <p>{t("imprint.euText2")}</p>
            </section>

            <section>
              <h2 className="font-semibold text-foreground mb-1">
                {t("imprint.privacyTitle")}
              </h2>
              <p>
                {t("imprint.privacyLabel")}:{" "}
                <a
                  href={t("imprint.privacyUrl")}
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary hover:underline"
                >
                  {t("imprint.privacyUrl")}
                </a>
              </p>
            </section>
          </div>
        </motion.div>
      </main>

      <CTAFooter />
    </div>
    </AppProviders>
  );
};

export default ImprintPage;

