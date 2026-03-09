import { useLanguage } from "@/i18n/LanguageContext";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import CTAFooter from "@/components/CTAFooter";

const Privacy = () => {
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
            {t("privacy.title")}
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground mb-6">
            {t("privacy.intro")}
          </p>

          <div className="space-y-5 text-sm sm:text-base text-muted-foreground">
            {/* 1. Verantwortlicher */}
            <section>
              <h2 className="font-semibold text-foreground mb-1">
                {t("privacy.scope.title")}
              </h2>
              <p className="mb-2">{t("privacy.scope.text1")}</p>
              <p className="mb-1">{t("privacy.scope.text2")}</p>
              <p>{t("privacy.scope.name")}</p>
              <p>{t("privacy.scope.street")}</p>
              <p>{t("privacy.scope.email")}</p>
            </section>

            {/* 2. Geltungsbereich der Verarbeitung */}
            <section>
              <h2 className="font-semibold text-foreground mb-1">
                {t("privacy.scope2.title")}
              </h2>
              <p>{t("privacy.scope2.text1")}</p>
            </section>

            {/* 3. Welche Daten wir verarbeiten */}
            <section>
              <h2 className="font-semibold text-foreground mb-1">
                {t("privacy.data.title")}
              </h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>{t("privacy.data.usage")}</li>
                <li>{t("privacy.data.input")}</li>
                <li>{t("privacy.data.tech")}</li>
                <li>{t("privacy.data.recorder")}</li>
              </ul>
            </section>

            {/* 4. Zwecke der Datenverarbeitung */}
            <section>
              <h2 className="font-semibold text-foreground mb-1">
                {t("privacy.purpose.title")}
              </h2>
              <p className="mb-2">{t("privacy.purpose.text1")}</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>{t("privacy.purpose.li1")}</li>
                <li>{t("privacy.purpose.li2")}</li>
                <li>{t("privacy.purpose.li3")}</li>
                <li>{t("privacy.purpose.li4")}</li>
              </ul>
            </section>

            {/* 5. Dienstleister / Auftragsverarbeiter */}
            <section>
              <h2 className="font-semibold text-foreground mb-1">
                {t("privacy.processors.title")}
              </h2>
              <p className="mb-2">{t("privacy.processors.text1")}</p>
              <ul className="list-disc pl-5 space-y-1 mb-2">
                <li>{t("privacy.processors.supabase")}</li>
                <li>{t("privacy.processors.gemini")}</li>
              </ul>
              <p>{t("privacy.processors.text2")}</p>
            </section>

            {/* 6. Rechtsgrundlagen */}
            <section>
              <h2 className="font-semibold text-foreground mb-1">
                {t("privacy.legal.title")}
              </h2>
              <p className="mb-2">{t("privacy.legal.text1")}</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>{t("privacy.legal.li1")}</li>
                <li>{t("privacy.legal.li2")}</li>
                <li>{t("privacy.legal.li3")}</li>
                <li>{t("privacy.legal.li4")}</li>
              </ul>
            </section>

            {/* 7. Cookies & ähnliche Technologien */}
            <section>
              <h2 className="font-semibold text-foreground mb-1">
                {t("privacy.cookies.title")}
              </h2>
              <p className="mb-2">{t("privacy.cookies.text1")}</p>
              <p>{t("privacy.cookies.text2")}</p>
            </section>

            {/* 8. Daten von Kindern, Sicherheit & Speicherdauer */}
            <section>
              <h2 className="font-semibold text-foreground mb-1">
                {t("privacy.security.title")}
              </h2>
              <p className="mb-2">{t("privacy.security.text1")}</p>
              <p>{t("privacy.security.text2")}</p>
            </section>

            {/* 9. Internationale Datenübermittlungen */}
            <section>
              <h2 className="font-semibold text-foreground mb-1">
                {t("privacy.transfers.title")}
              </h2>
              <p className="mb-2">{t("privacy.transfers.text1")}</p>
              <p>{t("privacy.transfers.text2")}</p>
            </section>

            {/* 10. Deine Rechte */}
            <section>
              <h2 className="font-semibold text-foreground mb-1">
                {t("privacy.rights.title")}
              </h2>
              <p className="mb-2">{t("privacy.rights.text1")}</p>
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
              <p className="mb-2">{t("privacy.changes.text1")}</p>
              <p>{t("privacy.changes.text2")}</p>
            </section>
          </div>
        </motion.div>
      </main>

      <CTAFooter />
    </div>
  );
};

export default Privacy;

