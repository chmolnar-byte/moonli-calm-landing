import { useLanguage } from "@/i18n/LanguageContext";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import CTAFooter from "@/components/CTAFooter";

import AppProviders from "@/components/react/AppProviders";
import { motionInitial } from "@/lib/motion";

const PrivacyPage = () => {
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
            {t("privacy.title")}
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground mb-6">
            {t("privacy.intro")}
          </p>

          <div className="space-y-5 text-sm sm:text-base text-muted-foreground">
            {/* 1. Verantwortlicher */}
            <section>
              <h2 className="font-semibold text-foreground mb-1">
                {t("privacy.controller.title")}
              </h2>
              <p className="mb-2">{t("privacy.controller.text1")}</p>
              <p className="mb-1">{t("privacy.controller.brand")}</p>
              <p>{t("privacy.controller.name")}</p>
              <p>{t("privacy.controller.address")}</p>
              <p className="mb-2">{t("privacy.controller.email")}</p>
              <p>{t("privacy.controller.weUs")}</p>
            </section>

            {/* 2. Geltungsbereich */}
            <section>
              <h2 className="font-semibold text-foreground mb-1">
                {t("privacy.scope.title")}
              </h2>
              <p className="mb-2">{t("privacy.scope.text1")}</p>
              <p>{t("privacy.scope.text2")}</p>
            </section>

            {/* 3. Welche Daten wir verarbeiten */}
            <section>
              <h2 className="font-semibold text-foreground mb-1">
                {t("privacy.data.title")}
              </h2>
              <p className="mb-2">{t("privacy.data.intro")}</p>

              <div className="space-y-3">
                <div>
                  <p className="font-semibold text-foreground">{t("privacy.data.a.title")}</p>
                  <p>{t("privacy.data.a.text")}</p>
                </div>
                <div>
                  <p className="font-semibold text-foreground">{t("privacy.data.b.title")}</p>
                  <p>{t("privacy.data.b.text")}</p>
                </div>
                <div>
                  <p className="font-semibold text-foreground">{t("privacy.data.c.title")}</p>
                  <p>{t("privacy.data.c.text")}</p>
                </div>
                <div>
                  <p className="font-semibold text-foreground">{t("privacy.data.d.title")}</p>
                  <p>{t("privacy.data.d.text1")}</p>
                  <p>{t("privacy.data.d.text2")}</p>
                </div>
                <div>
                  <p className="font-semibold text-foreground">{t("privacy.data.e.title")}</p>
                  <p>{t("privacy.data.e.text")}</p>
                </div>
                <div>
                  <p className="font-semibold text-foreground">{t("privacy.data.f.title")}</p>
                  <p>{t("privacy.data.f.text")}</p>
                </div>
              </div>
            </section>

            {/* 4. Zwecke der Datenverarbeitung */}
            <section>
              <h2 className="font-semibold text-foreground mb-1">
                {t("privacy.purpose.title")}
              </h2>
              <p className="mb-2">{t("privacy.purpose.intro")}</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>{t("privacy.purpose.li1")}</li>
                <li>{t("privacy.purpose.li2")}</li>
                <li>{t("privacy.purpose.li3")}</li>
                <li>{t("privacy.purpose.li4")}</li>
                <li>{t("privacy.purpose.li5")}</li>
                <li>{t("privacy.purpose.li6")}</li>
              </ul>
            </section>

            {/* 5. 3 a.m. Club / NightGlobe (optional) */}
            <section>
              <h2 className="font-semibold text-foreground mb-1">
                {t("privacy.nightglobe.title")}
              </h2>
              <p className="mb-2">{t("privacy.nightglobe.text1")}</p>
              <p>{t("privacy.nightglobe.text2")}</p>
            </section>

            {/* 6. Dienstleister (Auftragsverarbeiter) */}
            <section>
              <h2 className="font-semibold text-foreground mb-1">
                {t("privacy.processors.title")}
              </h2>
              <p className="mb-2">{t("privacy.processors.intro")}</p>
              <ul className="list-disc pl-5 space-y-1 mb-2">
                <li>{t("privacy.processors.supabase")}</li>
                <li>{t("privacy.processors.render")}</li>
                <li>{t("privacy.processors.netlify")}</li>
                <li>{t("privacy.processors.revenuecat")}</li>
                <li>{t("privacy.processors.googlePlay")}</li>
                <li>{t("privacy.processors.emailProvider")}</li>
              </ul>
              <p>{t("privacy.processors.transfers")}</p>
            </section>

            {/* 7. Rechtsgrundlagen */}
            <section>
              <h2 className="font-semibold text-foreground mb-1">
                {t("privacy.legal.title")}
              </h2>
              <p className="mb-2">{t("privacy.legal.intro")}</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>{t("privacy.legal.li1")}</li>
                <li>{t("privacy.legal.li2")}</li>
                <li>{t("privacy.legal.li3")}</li>
                <li>{t("privacy.legal.li4")}</li>
              </ul>
            </section>

            {/* 8. Speicherdauer & Sicherheit */}
            <section>
              <h2 className="font-semibold text-foreground mb-1">
                {t("privacy.retention.title")}
              </h2>
              <p className="mb-2">{t("privacy.retention.text1")}</p>
              <p>{t("privacy.retention.text2")}</p>
            </section>

            {/* 9. Internationale Datenübermittlungen */}
            <section>
              <h2 className="font-semibold text-foreground mb-1">
                {t("privacy.transfers.title")}
              </h2>
              <p>{t("privacy.transfers.text1")}</p>
            </section>

            {/* 10. Deine Rechte */}
            <section>
              <h2 className="font-semibold text-foreground mb-1">
                {t("privacy.rights.title")}
              </h2>
              <p className="mb-2">{t("privacy.rights.intro")}</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>{t("privacy.rights.li1")}</li>
                <li>{t("privacy.rights.li2")}</li>
                <li>{t("privacy.rights.li3")}</li>
                <li>{t("privacy.rights.li4")}</li>
                <li>{t("privacy.rights.li5")}</li>
              </ul>
            </section>

            {/* 11. Änderungen der Datenschutzerklärung */}
            <section>
              <h2 className="font-semibold text-foreground mb-1">
                {t("privacy.changes.title")}
              </h2>
              <p>{t("privacy.changes.text1")}</p>
            </section>
          </div>
        </motion.div>
      </main>

      <CTAFooter />
    </div>
    </AppProviders>
  );
};

export default PrivacyPage;

