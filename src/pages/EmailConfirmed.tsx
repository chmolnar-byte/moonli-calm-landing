import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import logo from "@/assets/logo.png";
import { useLanguage } from "@/i18n/LanguageContext";
import translations from "@/i18n/translations";

const EmailConfirmed = () => {
  const { t } = useLanguage();

  const de = translations.de;
  const en = translations.en;

  return (
    <div className="min-h-screen bg-gradient-page flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="glass-card-premium p-10 max-w-md w-full text-center relative overflow-hidden"
      >
        <div className="absolute -top-20 -right-20 w-[200px] h-[200px] rounded-full bg-pastel-green/30 blur-[60px] pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-[150px] h-[150px] rounded-full bg-pastel-lavender/20 blur-[50px] pointer-events-none" />

        <div className="relative z-10">
          <img src={logo} alt="Moonli" className="w-16 h-16 rounded-full object-cover mx-auto mb-6" />

          <div className="grid gap-4 text-left text-sm sm:text-base mb-6">
            <div className="p-3 rounded-2xl bg-background/60 border border-border/40">
              <p className="text-xs font-semibold text-muted-foreground mb-1">Deutsch</p>
              <p className="font-semibold mb-1">{de["emailConfirmed.title"]}</p>
              <p className="text-muted-foreground">{de["emailConfirmed.text"]}</p>
            </div>
            <div className="p-3 rounded-2xl bg-background/60 border border-border/40">
              <p className="text-xs font-semibold text-muted-foreground mb-1">English</p>
              <p className="font-semibold mb-1">{en["emailConfirmed.title"]}</p>
              <p className="text-muted-foreground">{en["emailConfirmed.text"]}</p>
            </div>
          </div>

          <a
            href="com.christian.moonli://login-callback"
            className="block mt-4 text-lg sm:text-xl font-extrabold text-primary"
          >
            go back to the app and login!
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default EmailConfirmed;
