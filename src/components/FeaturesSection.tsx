import { motion } from "framer-motion";
import { Baby, Activity, Bell, Battery, Globe, Gamepad2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

interface Feature {
  icon: LucideIcon;
  titleKey: string;
  descKey: string;
  badgeKey: string;
  bgColor: string;
  iconColor: string;
  badgeColor: string;
}

const features: Feature[] = [
  {
    icon: Baby,
    titleKey: "features.tracking.title",
    descKey: "features.tracking.desc",
    badgeKey: "features.tracking.badge",
    bgColor: "bg-pastel-blue/60",
    iconColor: "text-pastel-blue-strong",
    badgeColor: "bg-pastel-blue/80 text-pastel-blue-strong",
  },
  {
    icon: Activity,
    titleKey: "features.health.title",
    descKey: "features.health.desc",
    badgeKey: "features.health.badge",
    bgColor: "bg-pastel-green/60",
    iconColor: "text-pastel-green-strong",
    badgeColor: "bg-pastel-green/80 text-pastel-green-strong",
  },
  {
    icon: Bell,
    titleKey: "features.reminders.title",
    descKey: "features.reminders.desc",
    badgeKey: "features.reminders.badge",
    bgColor: "bg-pastel-yellow/60",
    iconColor: "text-pastel-yellow-strong",
    badgeColor: "bg-pastel-yellow/80 text-pastel-yellow-strong",
  },
  {
    icon: Battery,
    titleKey: "features.battery.title",
    descKey: "features.battery.desc",
    badgeKey: "features.battery.badge",
    bgColor: "bg-pastel-pink/60",
    iconColor: "text-pastel-pink-strong",
    badgeColor: "bg-pastel-pink/80 text-pastel-pink-strong",
  },
  {
    icon: Globe,
    titleKey: "features.amClub.title",
    descKey: "features.amClub.desc",
    badgeKey: "features.amClub.badge",
    bgColor: "bg-pastel-purple/60",
    iconColor: "text-pastel-purple-strong",
    badgeColor: "bg-pastel-purple/80 text-pastel-purple-strong",
  },
  {
    icon: Gamepad2,
    titleKey: "features.emergency.title",
    descKey: "features.emergency.desc",
    badgeKey: "features.emergency.badge",
    bgColor: "bg-pastel-orange/60",
    iconColor: "text-pastel-orange-strong",
    badgeColor: "bg-pastel-orange/80 text-pastel-orange-strong",
  },
];

const FeatureCard = ({ feature, index }: { feature: Feature; index: number }) => {
  const { t } = useLanguage();
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="glass-card-premium gradient-border-card p-6 group cursor-default transition-shadow duration-300 hover:shadow-soft-xl"
    >
      <div className={`w-12 h-12 rounded-2xl ${feature.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
        <feature.icon className={`w-6 h-6 ${feature.iconColor}`} />
      </div>

      <span className={`inline-block px-3 py-1 rounded-full ${feature.badgeColor} text-xs font-semibold mb-3`}>
        {t(feature.badgeKey)}
      </span>

      <h3 className="text-lg font-bold mb-2">{t(feature.titleKey)}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed">{t(feature.descKey)}</p>
    </motion.div>
  );
};

const FeaturesSection = () => {
  const { t } = useLanguage();
  return (
    <section className="py-20 relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[400px] h-[400px] rounded-full bg-pastel-lavender/25 blur-[100px]" />
        <div className="absolute bottom-0 left-1/4 w-[300px] h-[300px] rounded-full bg-pastel-peach/20 blur-[80px]" />
      </div>

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-button text-primary text-sm font-semibold mb-4">
            {t("features.badge")}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 text-glow">
            {t("features.title")}
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            {t("features.subtitle")}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <FeatureCard key={feature.titleKey} feature={feature} index={i} />
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center text-sm text-muted-foreground mt-8"
        >
          {t("features.adNote")}
        </motion.p>
      </div>
    </section>
  );
};

export default FeaturesSection;
