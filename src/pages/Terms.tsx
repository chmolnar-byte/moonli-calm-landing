import { useLanguage } from "@/i18n/LanguageContext";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import CTAFooter from "@/components/CTAFooter";

const Terms = () => {
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
            {t("terms.title")}
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground mb-6">
            {t("terms.intro")}
          </p>

          <div className="space-y-5 text-sm sm:text-base text-muted-foreground">
            <section>
              <h2 className="font-semibold text-foreground mb-1">
                {t("terms.scope.title")}
              </h2>
              <p>{t("terms.scope.text")}</p>
            </section>

            <section>
              <h2 className="font-semibold text-foreground mb-1">
                {t("terms.medical.title")}
              </h2>
              <p className="mb-2">{t("terms.medical.text1")}</p>
              <p className="mb-2">{t("terms.medical.text2")}</p>
              <p>{t("terms.medical.text3")}</p>
            </section>

            <section>
              <h2 className="font-semibold text-foreground mb-1">
                {t("terms.content.title")}
              </h2>
              <p className="mb-2">{t("terms.content.text1")}</p>
              <p className="mb-2">{t("terms.content.text2")}</p>
              <p>{t("terms.content.text3")}</p>
            </section>

            <section>
              <h2 className="font-semibold text-foreground mb-1">
                {t("terms.ai.title")}
              </h2>
              <p>{t("terms.ai.text")}</p>
            </section>

            <section>
              <h2 className="font-semibold text-foreground mb-1">
                {t("terms.liability.title")}
              </h2>
              <p className="mb-2">{t("terms.liability.text1")}</p>
              <p>{t("terms.liability.text2")}</p>
            </section>

            <section>
              <h2 className="font-semibold text-foreground mb-1">
                {t("terms.ip.title")}
              </h2>
              <p>{t("terms.ip.text")}</p>
            </section>

            <section>
              <h2 className="font-semibold text-foreground mb-1">
                {t("terms.final.title")}
              </h2>
              <p>{t("terms.final.text")}</p>
            </section>

            <section>
              <h2 className="font-semibold text-foreground mb-1">
                {t("terms.premium.title")}
              </h2>
              <p className="mb-2">{t("terms.premium.text1")}</p>
              <p className="mb-2">{t("terms.premium.text2")}</p>
              <p className="mb-1">{t("terms.premium.text3")}</p>
              <p className="mb-2">{t("terms.premium.text4")}</p>
              <p className="mb-2">{t("terms.premium.text5")}</p>
              <p className="mb-2">{t("terms.premium.text6")}</p>
              <p className="mb-2">{t("terms.premium.text7")}</p>
              <p>{t("terms.premium.text8")}</p>
            </section>

            <section>
              <h2 className="font-semibold text-foreground mb-1">
                {t("terms.withdrawal.title")}
              </h2>
              <p className="mb-2">{t("terms.withdrawal.text1")}</p>
              <p className="mb-2">{t("terms.withdrawal.text2")}</p>
              <p className="mb-2">{t("terms.withdrawal.text3")}</p>
              <p className="mb-2">{t("terms.withdrawal.text4")}</p>
              <p>{t("terms.withdrawal.text5")}</p>
            </section>

            <section>
              <h2 className="font-semibold text-foreground mb-1">
                {t("terms.cancel.title")}
              </h2>
              <p className="mb-2">{t("terms.cancel.text1")}</p>
              <p className="mb-2">{t("terms.cancel.text2")}</p>
              <p>{t("terms.cancel.text3")}</p>
            </section>
          </div>
        </motion.div>
      </main>

      <CTAFooter />
    </div>
  );
};

export default Terms;

