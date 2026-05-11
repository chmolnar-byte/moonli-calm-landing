import { AnimatePresence, motion } from "framer-motion";
import {
  Baby,
  HeartHandshake,
  BookOpen,
  Music2,
  CheckCircle2,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import trackingScreenshot from "@/assets/Startseite1.png";
import sleepPredictionScreenshot from "@/assets/sleep-prognose.png";
import parentAreaScreenshot from "@/assets/elternbereich.png";
import knowledgeScreenshot from "@/assets/wissen.png";
import entertainmentScreenshot from "@/assets/entertainment.png";
import { useState } from "react";

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
];

const FeatureCard = ({
  feature,
  index,
  isPrimary = false,
  onOpenImage,
}: {
  feature: Feature;
  index: number;
  isPrimary?: boolean;
  onOpenImage: (src: string, alt: string) => void;
}) => {
  const { t } = useLanguage();
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -6 }}
      className={`group relative overflow-hidden rounded-2xl border border-white/15 bg-white/5 backdrop-blur-xl cursor-default transition-all duration-300 hover:border-primary/45 hover:shadow-soft-2xl flex flex-col ${
        isPrimary ? "p-4 sm:p-6 lg:p-8 min-h-0 sm:min-h-[320px] lg:min-h-[360px]" : "p-6 sm:p-7 min-h-[230px]"
      }`}
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-primary/8 via-transparent to-transparent pointer-events-none" />
      <div
        className={`mb-4 ${
          isPrimary
            ? "flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4"
            : "flex items-center justify-between gap-3"
        }`}
      >
        <div className={`flex flex-wrap items-center gap-2 sm:gap-3 min-w-0 ${isPrimary ? "flex-1" : ""}`}>
          <div className="w-[48px] h-[48px] sm:w-[52px] sm:h-[52px] rounded-2xl border border-primary/35 bg-primary/12 flex items-center justify-center group-hover:scale-105 transition-transform duration-300 shadow-[0_8px_24px_rgba(0,0,0,0.25)] shrink-0">
            <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary drop-shadow-[0_1px_4px_rgba(0,0,0,0.35)]" />
          </div>
          {isPrimary && (
            <span className="inline-block px-3 py-1.5 sm:px-3.5 sm:py-1.5 rounded-full bg-primary text-white text-[11px] sm:text-xs font-semibold border border-primary/70 shadow-[0_8px_18px_rgba(0,0,0,0.22)] max-w-full text-center sm:text-left">
              {t(feature.badgeKey)}
            </span>
          )}
        </div>
        {isPrimary ? (
          <div className="rounded-full border border-primary/70 bg-primary px-2.5 py-1.5 sm:px-3 sm:py-1 text-[10px] sm:text-xs font-bold text-white text-balance shadow-[0_8px_18px_rgba(0,0,0,0.22)] w-full sm:w-auto sm:max-w-[14rem] sm:text-right shrink-0">
            {t("features.tracking.freeWidget")}
          </div>
        ) : (
          <span className="text-[11px] font-semibold text-white/50">{t("features.groupLabel")}</span>
        )}
      </div>

      <h3 className={`${isPrimary ? "text-title-lg" : "text-xl"} font-bold mb-2 tracking-tight text-white`}>{t(feature.titleKey)}</h3>
      {isPrimary ? (
        null
      ) : (
        <p className="text-base text-white/75 leading-relaxed">{t(feature.descKey)}</p>
      )}

      {isPrimary && (
        <div className="mt-4 sm:mt-5 rounded-2xl border border-primary/25 bg-white/8 p-3 sm:p-5 shadow-soft min-w-0">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.95fr)] gap-4 sm:gap-5 lg:gap-6">
            <div className="min-w-0">
              <p className="text-base sm:text-lg lg:text-xl text-white leading-snug sm:leading-relaxed font-bold mb-3">
                {t("features.tracking.lead")}
              </p>
              <ul className="grid grid-cols-1 min-[400px]:grid-cols-2 gap-x-4 sm:gap-x-6 gap-y-2.5 sm:gap-y-3 mb-4">
                {t("features.tracking.items")
                  .split("|")
                  .map((item) => item.trim())
                  .filter(Boolean)
                  .map((item) => (
                    <li key={item} className="flex items-center gap-2 sm:gap-2.5 text-sm sm:text-base lg:text-lg text-white/90 font-medium min-w-0">
                      <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary shrink-0" />
                      <span className="break-words">{item}</span>
                    </li>
                  ))}
              </ul>

              <div className="rounded-xl border border-primary/25 bg-primary/10 px-3 py-2.5 sm:px-4 sm:py-3 mb-2">
                <p className="text-xs sm:text-sm lg:text-base text-white/90 leading-relaxed font-medium">
                  {t("features.tracking.sleepPrediction")}
                </p>
              </div>
              <div className="rounded-xl border border-white/20 bg-white/5 px-3 py-2.5 sm:px-4 sm:py-3">
                <p className="text-xs sm:text-sm lg:text-base text-white/85 leading-relaxed">
                  {t("features.tracking.story2")}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 min-[420px]:grid-cols-2 lg:grid-cols-1 gap-3 min-w-0">
              <div className="rounded-xl border border-white/25 bg-slate-950/35 min-h-0 overflow-hidden p-1.5 sm:p-2 flex flex-col">
                <button type="button" onClick={() => onOpenImage(sleepPredictionScreenshot, "Schlafprognose Screenshot")} className="w-full block min-w-0">
                  <img
                    src={sleepPredictionScreenshot}
                    alt="Schlafprognose Screenshot"
                    className="w-full h-[min(42vw,200px)] min-[420px]:h-[180px] sm:h-[200px] lg:h-[240px] object-contain object-center mx-auto"
                    loading="lazy"
                  />
                </button>
              </div>
              <div className="rounded-xl border border-white/25 bg-slate-950/35 min-h-0 overflow-hidden p-1.5 sm:p-2 flex flex-col min-[420px]:min-h-0">
                <button type="button" onClick={() => onOpenImage(trackingScreenshot, "Tracking Screenshot")} className="w-full block min-w-0">
                  <img
                    src={trackingScreenshot}
                    alt="Tracking Screenshot"
                    className="w-full h-[min(42vw,200px)] min-[420px]:h-[180px] sm:h-[200px] lg:h-[240px] object-contain object-center mx-auto"
                    loading="lazy"
                  />
                </button>
                <p className="mt-2 px-1 text-[11px] sm:text-xs lg:text-sm text-white/80 font-medium leading-snug text-center min-[420px]:text-left">
                  {t("features.tracking.weeklyReportPremium")}
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
  const [activeImage, setActiveImage] = useState<{ src: string; alt: string } | null>(null);
  const primaryFeature = features[0];
  const groupedFeatures = [
    {
      icon: HeartHandshake,
      titleKey: "features.groups.parent.title",
      subtitleKey: "features.groups.parent.subtitle",
      itemsKey: "features.groups.parent.items",
      image: parentAreaScreenshot,
    },
    {
      icon: BookOpen,
      titleKey: "features.groups.knowledge.title",
      subtitleKey: "features.groups.knowledge.subtitle",
      itemsKey: "features.groups.knowledge.items",
      image: knowledgeScreenshot,
    },
    {
      icon: Music2,
      titleKey: "features.groups.entertainment.title",
      subtitleKey: "features.groups.entertainment.subtitle",
      itemsKey: "features.groups.entertainment.items",
      image: entertainmentScreenshot,
    },
  ];

  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[400px] h-[400px] rounded-full bg-pastel-blue/25 blur-[100px]" />
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
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-button text-primary text-sm font-semibold mb-4">
            {t("features.badge")}
          </span>
          <h2 className="text-display-md text-glow">
            {t("features.title")}
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-4xl border border-white/15 bg-white/5 backdrop-blur-2xl p-4 sm:p-5 mb-10 shadow-soft-2xl"
        >
          <div className="absolute -top-24 -right-8 w-64 h-64 rounded-full bg-pastel-blue/25 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 left-0 w-52 h-52 rounded-full bg-pastel-green/35 blur-3xl pointer-events-none" />

          <div className="relative">
            <FeatureCard
              feature={primaryFeature}
              index={0}
              isPrimary
              onOpenImage={(src, alt) => setActiveImage({ src, alt })}
            />
          </div>
        </motion.div>

        <div className="mb-6 text-center">
          <h3 className="text-title-lg font-bold text-white">{t("features.groupsTitle")}</h3>
          <p className="text-base text-white/70 mt-2">{t("features.groupsSubtitle")}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {groupedFeatures.map((group, i) => (
            <motion.div
              key={group.titleKey}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="rounded-2xl border border-white/15 bg-white/5 backdrop-blur-xl p-5"
            >
              <div className="w-[50px] h-[50px] rounded-2xl border border-primary/35 bg-primary/12 flex items-center justify-center mb-4 shadow-[0_8px_24px_rgba(0,0,0,0.2)]">
                <group.icon className="w-6 h-6 text-primary" />
              </div>
              <div className="rounded-xl border border-white/20 bg-slate-950/35 overflow-hidden mb-4 p-2">
                <button type="button" onClick={() => setActiveImage({ src: group.image, alt: t(group.titleKey) })} className="w-full block">
                  <img
                    src={group.image}
                    alt={t(group.titleKey)}
                    className="w-full h-[220px] object-contain object-center"
                    loading="lazy"
                  />
                </button>
              </div>
              <h4 className="text-xl font-bold text-white mb-1">{t(group.titleKey)}</h4>
              <p className="text-sm text-primary mb-3">{t(group.subtitleKey)}</p>
              <ul className="space-y-2">
                {t(group.itemsKey)
                  .split("|")
                  .map((item) => item.trim())
                  .filter(Boolean)
                  .map((item) => (
                    <li key={item} className="flex items-start gap-2 text-white/85 text-sm">
                      <span className="h-2 w-2 rounded-full bg-primary mt-1.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center text-base text-white/70 mt-8"
        >
          {t("features.adNote")}
        </motion.p>

        <AnimatePresence>
          {activeImage && (
            <motion.div
              className="fixed inset-0 z-[70] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
              onClick={() => setActiveImage(null)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.img
                src={activeImage.src}
                alt={activeImage.alt}
                className="max-w-[92vw] max-h-[88vh] object-contain rounded-2xl border border-white/20 shadow-soft-2xl"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={(event) => event.stopPropagation()}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default FeaturesSection;
