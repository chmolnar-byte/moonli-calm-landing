import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import { Mail } from "lucide-react";

const ContactSection = () => {
  const { t } = useLanguage();

  return (
    <section className="py-16">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="glass-card-premium max-w-md mx-auto p-6 sm:p-7 text-center"
        >
          <div className="inline-flex items-center justify-center w-11 h-11 rounded-2xl bg-pastel-blue/60 mb-4 shadow-soft">
            <Mail className="w-5 h-5 text-pastel-blue-strong" />
          </div>

          <h2 className="text-lg sm:text-xl font-extrabold mb-5">
            {t("contact.title")}
          </h2>

          <div className="flex justify-center">
            <a
              href="mailto:hello@moonli.net"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-pastel-green-strong text-white text-lg sm:text-xl font-semibold shadow-soft-lg hover:shadow-soft-xl hover:scale-[1.02] transition-all duration-200"
            >
              <Mail className="w-5 h-5" />
              <span>hello@moonli.net</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;

