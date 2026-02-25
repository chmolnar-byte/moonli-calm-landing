import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import logo from "@/assets/logo.png";
import { useLanguage } from "@/i18n/LanguageContext";

const EmailConfirmed = () => {
  const { t } = useLanguage();

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

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          >
            <CheckCircle className="w-16 h-16 text-pastel-green-strong mx-auto mb-4" />
          </motion.div>

          <h1 className="text-2xl font-extrabold mb-4">{t("emailConfirmed.title")}</h1>
          <p className="text-muted-foreground leading-relaxed">{t("emailConfirmed.text")}</p>
        </div>
      </motion.div>
    </div>
  );
};

export default EmailConfirmed;
