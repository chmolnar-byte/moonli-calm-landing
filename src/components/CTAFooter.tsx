import { motion } from "framer-motion";
import { Apple, Play } from "lucide-react";
import logo from "@/assets/logo.png";
import { useLanguage } from "@/i18n/LanguageContext";

const CTAFooter = () => {
  const { t } = useLanguage();

  return (
    <>
      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-pastel-green/25 blur-[100px]" />
          <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full bg-pastel-peach/20 blur-[80px]" />
        </div>

        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-2xl mx-auto"
          >
            <div className="w-16 h-16 rounded-full glass-button flex items-center justify-center mx-auto mb-6">
              <img src={logo} alt="Moonli" className="w-10 h-10 rounded-full object-cover" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 text-glow">
              {t("cta.title")}
            </h2>
            <p className="text-muted-foreground mb-8 text-base sm:text-lg">
              {t("cta.subtitle")}
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center">
              <a
                href="#"
                className="relative flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-foreground text-background font-bold text-base sm:text-lg hover:opacity-90 transition-all shadow-soft-lg hover:shadow-soft-xl hover:scale-[1.02] duration-200 w-full sm:w-auto"
              >
                <Apple className="w-6 h-6" />
                {t("nav.appStore")}
                <span className="absolute -top-2.5 -right-3 px-2 py-0.5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold leading-none shadow-sm">
                  {t("nav.comingSoon")}
                </span>
              </a>
              <a
                href="#"
                className="flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-primary text-primary-foreground font-bold text-base sm:text-lg hover:opacity-90 transition-all shadow-soft-lg hover:shadow-soft-xl hover:scale-[1.02] duration-200 w-full sm:w-auto"
              >
                <Play className="w-6 h-6" />
                {t("nav.googlePlay")}
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/30 py-8">
        <div className="container">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <img src={logo} alt="Moonli" className="w-5 h-5 rounded-full object-cover" />
              <span className="font-semibold text-foreground">MOONLI</span>
              <span>© {new Date().getFullYear()}</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <a href="/cookies" className="hover:text-foreground transition-colors">{t("footer.cookies")}</a>
              <a href="/terms" className="hover:text-foreground transition-colors">{t("footer.terms")}</a>
              <a href="/privacy" className="hover:text-foreground transition-colors">{t("footer.privacy")}</a>
              <a href="/imprint" className="hover:text-foreground transition-colors">{t("footer.imprint")}</a>
              <a href="mailto:hello@moonli.net" className="hover:text-foreground transition-colors">{t("footer.contact")}</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default CTAFooter;
