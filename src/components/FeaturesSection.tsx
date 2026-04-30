import { motion } from "framer-motion";
import {
  Baby,
  Activity,
  Bell,
  Battery,
  Globe,
  Gamepad2,
  HeartHandshake,
  BookOpen,
  MoonStar,
  Mic,
  Music2,
  Sparkles,
} from "lucide-react";
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
  {
    icon: HeartHandshake,
    titleKey: "features.qualityTime.title",
    descKey: "features.qualityTime.desc",
    badgeKey: "features.qualityTime.badge",
    bgColor: "bg-pastel-red/60",
    iconColor: "text-pastel-red-strong",
    badgeColor: "bg-pastel-red/80 text-pastel-red-strong",
  },
  {
    icon: BookOpen,
    titleKey: "features.library.title",
    descKey: "features.library.desc",
    badgeKey: "features.library.badge",
    bgColor: "bg-pastel-brown/60",
    iconColor: "text-pastel-brown-strong",
    badgeColor: "bg-pastel-brown/80 text-pastel-brown-strong",
  },
  {
    icon: MoonStar,
    titleKey: "features.bedtime.title",
    descKey: "features.bedtime.desc",
    badgeKey: "features.bedtime.badge",
    bgColor: "bg-pastel-indigo/60",
    iconColor: "text-pastel-indigo-strong",
    badgeColor: "bg-pastel-indigo/80 text-pastel-indigo-strong",
  },
  {
    icon: Mic,
    titleKey: "features.voice.title",
    descKey: "features.voice.desc",
    badgeKey: "features.voice.badge",
    bgColor: "bg-pastel-teal/60",
    iconColor: "text-pastel-teal-strong",
    badgeColor: "bg-pastel-teal/80 text-pastel-teal-strong",
  },
  {
    icon: Music2,
    titleKey: "features.sounds.title",
    descKey: "features.sounds.desc",
    badgeKey: "features.sounds.badge",
    bgColor: "bg-pastel-yellow/40",
    iconColor: "text-pastel-yellow-strong",
    badgeColor: "bg-pastel-yellow/70 text-pastel-yellow-strong",
  },
  {
    icon: Sparkles,
    titleKey: "features.gamification.title",
    descKey: "features.gamification.desc",
    badgeKey: "features.gamification.badge",
    bgColor: "bg-pastel-purple/50",
    iconColor: "text-pastel-purple-strong",
    badgeColor: "bg-pastel-purple/80 text-pastel-purple-strong",
  },
];

const FeatureCard = ({
  feature,
  index,
  isPrimary = false,
}: {
  feature: Feature;
  index: number;
  isPrimary?: boolean;
}) => {
  const { t } = useLanguage();
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -6 }}
      className={`group relative overflow-hidden rounded-2xl border border-white/60 bg-white/75 backdrop-blur-xl cursor-default transition-all duration-300 hover:border-primary/30 hover:shadow-soft-xl flex flex-col ${
        isPrimary ? "p-6 sm:p-7 min-h-[320px]" : "p-5 sm:p-6 min-h-[210px]"
      }`}
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-primary/10 via-transparent to-transparent pointer-events-none" />
      <div className={`w-11 h-11 rounded-xl ${feature.bgColor} flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-300`}>
        <feature.icon className={`w-6 h-6 ${feature.iconColor}`} />
      </div>

      <div className="flex items-center justify-between gap-3 mb-3">
        <span className={`inline-block px-3 py-1 rounded-full ${feature.badgeColor} text-xs font-semibold`}>
          {t(feature.badgeKey)}
        </span>
        {!isPrimary && (
          <span className="text-[11px] font-semibold text-muted-foreground group-hover:text-primary transition-colors">
            {t("features.addonLabel")}
          </span>
        )}
      </div>

      <h3 className={`${isPrimary ? "text-2xl sm:text-3xl" : "text-lg"} font-bold mb-2 tracking-tight`}>{t(feature.titleKey)}</h3>
      {isPrimary ? (
        <div className="mt-1 rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/15 via-white to-white px-5 py-4">
          <p className="text-base sm:text-lg text-foreground/90 leading-relaxed font-semibold">{t(feature.descKey)}</p>
        </div>
      ) : (
        <p className="text-sm text-muted-foreground leading-relaxed">{t(feature.descKey)}</p>
      )}

      {isPrimary && (
        <div className="mt-5 rounded-2xl border border-primary/20 bg-white p-5 shadow-sm">
          <div className="space-y-4">
            <div>
              <p className="text-base sm:text-lg text-foreground leading-relaxed font-bold mb-3">
                {t("features.tracking.lead")}
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                {t("features.tracking.items")
                  .split("|")
                  .map((item) => item.trim())
                  .filter(Boolean)
                  .map((item) => (
                    <li key={item} className="flex items-center gap-3 text-base sm:text-lg text-foreground font-medium">
                      <span className="h-2.5 w-2.5 rounded-full bg-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
              </ul>
            </div>
            <div className="space-y-2 pt-1">
              <div className="rounded-xl border border-primary/15 bg-primary/5 px-4 py-3">
                <p className="text-sm sm:text-base text-foreground/90 leading-relaxed font-medium">
                  {t("features.tracking.sleepPrediction")}
                </p>
              </div>
              <div className="rounded-xl border border-primary/15 bg-white px-4 py-3">
                <p className="text-sm sm:text-base text-foreground/90 leading-relaxed">
                  {t("features.tracking.story2")}
                </p>
              </div>
              <div className="rounded-xl border border-primary/20 bg-primary/10 px-4 py-3">
                <p className="text-base sm:text-lg text-primary font-bold leading-relaxed">
                  {t("features.tracking.story3")}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {!isPrimary && (
        <div className="mt-auto pt-4" />
      )}
    </motion.div>
  );
};

const FeaturesSection = () => {
  const { t } = useLanguage();
  const primaryFeature = features[0];
  const addonFeatures = features.slice(1);

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
          <h2 className="text-3xl sm:text-4xl font-extrabold text-glow">
            {t("features.title")}
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl border border-white/60 bg-white/75 backdrop-blur-2xl p-4 sm:p-5 mb-8 shadow-soft-xl"
        >
          <div className="absolute -top-24 -right-8 w-64 h-64 rounded-full bg-pastel-blue/45 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 left-0 w-52 h-52 rounded-full bg-pastel-lavender/35 blur-3xl pointer-events-none" />

          <div className="relative">
            <FeatureCard feature={primaryFeature} index={0} isPrimary />
          </div>
        </motion.div>

        <div className="mb-6 text-center">
          <h3 className="text-xl sm:text-2xl font-bold">{t("features.addonsTitle")}</h3>
          <p className="text-sm text-muted-foreground mt-1">{t("features.addonsSubtitle")}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {addonFeatures.map((feature, i) => (
            <FeatureCard key={feature.titleKey} feature={feature} index={i + 1} />
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
