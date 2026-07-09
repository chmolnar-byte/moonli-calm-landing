import { motion } from "framer-motion";
import { Apple, Play } from "lucide-react";
import logo from "@/assets/logo.webp";
import { assetUrl } from "@/lib/assetUrl";
import { useLanguage } from "@/i18n/LanguageContext";
import { APP_STORE_URL, GOOGLE_PLAY_URL } from "@/constants/storeUrls";
import { motionInitial } from "@/lib/motion";

const CTAFooter = () => {
  const { t } = useLanguage();

  return (
    <>
      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-pastel-green/25 blur-[100px]" />
          <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full bg-pastel-peach/20 blur-[80px]" />
        </div>

        <div className="container relative z-10">
          <motion.div
            initial={motionInitial}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <img
              src={assetUrl(logo)}
              alt="Moonli"
              className="w-28 h-28 sm:w-36 sm:h-36 rounded-full object-cover mx-auto mb-6"
            />
            <h2 className="text-display-md font-extrabold mb-4 text-glow text-white">
              {t("cta.title")}
            </h2>
            <p className="text-white/75 mb-8 text-body-lg">
              {t("cta.subtitle")}
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center">
              <a
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-white text-slate-900 font-bold text-base sm:text-lg hover:opacity-90 transition-all shadow-soft-lg hover:shadow-soft-xl hover:scale-[1.02] duration-200 w-full sm:w-auto"
              >
                <Apple className="w-6 h-6" />
                {t("nav.appStore")}
              </a>
              <a
                href={GOOGLE_PLAY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-primary text-white font-bold text-base sm:text-lg hover:opacity-90 transition-all shadow-soft-lg hover:shadow-soft-xl hover:scale-[1.02] duration-200 w-full sm:w-auto"
              >
                <Play className="w-6 h-6 text-white" />
                {t("nav.googlePlay")}
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="pb-10">
        <div className="container">
          <p className="mx-auto max-w-4xl rounded-2xl border border-white/20 bg-white/8 px-5 py-4 text-center text-base font-medium text-white/85 backdrop-blur-md">
            {t("testimonials.trust").replace("🇦🇹 ", "")}
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8">
        <div className="container">
          <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
            <div className="flex items-center gap-2 text-sm text-white/65 shrink-0">
              <img src={assetUrl(logo)} alt="Moonli" className="w-5 h-5 rounded-full object-cover" />
              <span className="font-semibold text-white">MOONLI</span>
              <span>© {new Date().getFullYear()}</span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2.5 text-sm text-white/65 sm:justify-end">
              <a href="/cookies" className="hover:text-white transition-colors whitespace-nowrap">{t("footer.cookies")}</a>
              <a href="/terms" className="hover:text-white transition-colors whitespace-nowrap">{t("footer.terms")}</a>
              <a href="/privacy" className="hover:text-white transition-colors whitespace-nowrap">{t("footer.privacy")}</a>
              <a href="/imprint" className="hover:text-white transition-colors whitespace-nowrap">{t("footer.imprint")}</a>
              <a href="mailto:hello@moonli.net" className="hover:text-white transition-colors whitespace-nowrap">hello@moonli.net</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default CTAFooter;
