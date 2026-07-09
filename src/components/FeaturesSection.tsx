import { motion } from "framer-motion";
import ImageLightbox from "@/components/ImageLightbox";
import {
  Baby,
  HeartHandshake,
  BookOpen,
  Music2,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import trackingScreenshot from "@/assets/Startseite1.webp";
import sleepPredictionScreenshot from "@/assets/sleep-prognose.webp";
import parentAreaScreenshot from "@/assets/elternbereich.webp";
import knowledgeScreenshot from "@/assets/wissen.webp";
import entertainmentScreenshot from "@/assets/entertainment.webp";
import { assetUrl } from "@/lib/assetUrl";
import { motionInitial } from "@/lib/motion";
import { useState } from "react";

const trackingScreenshotUrl = assetUrl(trackingScreenshot);
const sleepPredictionScreenshotUrl = assetUrl(sleepPredictionScreenshot);
const parentAreaScreenshotUrl = assetUrl(parentAreaScreenshot);
const knowledgeScreenshotUrl = assetUrl(knowledgeScreenshot);
const entertainmentScreenshotUrl = assetUrl(entertainmentScreenshot);

const splitItems = (raw: string) =>
  raw
    .split("|")
    .map((item) => item.trim())
    .filter(Boolean);

const FeaturesSection = () => {
  const { t } = useLanguage();
  const [activeImage, setActiveImage] = useState<{ src: string; alt: string } | null>(null);

  const groupedFeatures = [
    {
      icon: HeartHandshake,
      titleKey: "features.groups.parent.title",
      subtitleKey: "features.groups.parent.subtitle",
      descKey: "features.groups.parent.desc",
      itemsKey: "features.groups.parent.items",
      image: parentAreaScreenshotUrl,
      accent: "from-rose-400/20 to-transparent",
      iconBorder: "border-rose-300/30",
      iconBg: "bg-rose-300/15",
      iconColor: "text-rose-200",
    },
    {
      icon: BookOpen,
      titleKey: "features.groups.knowledge.title",
      subtitleKey: "features.groups.knowledge.subtitle",
      descKey: "features.groups.knowledge.desc",
      itemsKey: "features.groups.knowledge.items",
      image: knowledgeScreenshotUrl,
      accent: "from-amber-300/20 to-transparent",
      iconBorder: "border-amber-200/30",
      iconBg: "bg-amber-200/15",
      iconColor: "text-amber-100",
    },
    {
      icon: Music2,
      titleKey: "features.groups.entertainment.title",
      subtitleKey: "features.groups.entertainment.subtitle",
      descKey: "features.groups.entertainment.desc",
      itemsKey: "features.groups.entertainment.items",
      image: entertainmentScreenshotUrl,
      accent: "from-purple-400/20 to-transparent",
      iconBorder: "border-purple-300/30",
      iconBg: "bg-purple-300/15",
      iconColor: "text-purple-200",
    },
  ];

  const trackingItems = splitItems(t("features.tracking.items"));

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-pastel-blue/10 pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-[420px] h-[420px] rounded-full bg-pastel-blue/20 blur-[110px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[320px] h-[320px] rounded-full bg-pastel-peach/15 blur-[90px] pointer-events-none" />

      <div className="container relative z-10">
        <motion.div
          initial={motionInitial}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 max-w-3xl mx-auto"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-button text-primary text-sm font-semibold mb-4">
            {t("features.badge")}
          </span>
          <h2 className="text-display-md font-extrabold text-glow text-white mb-3">
            {t("features.title")}
          </h2>
          <p className="text-base sm:text-lg text-white/75 leading-relaxed">
            {t("features.subtitle")}
          </p>
        </motion.div>

        {/* Haupt-Feature: Tracking */}
        <motion.article
          initial={motionInitial}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
          className="relative mb-14 overflow-hidden rounded-[1.5rem] border border-primary/40 bg-white/[0.07] p-6 sm:p-8 lg:p-10 shadow-soft-2xl backdrop-blur-2xl"
        >
          <div className="absolute -top-20 -right-10 h-56 w-56 rounded-full bg-primary/25 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 left-0 h-48 w-48 rounded-full bg-pastel-green/30 blur-3xl pointer-events-none" />

          <div className="relative">
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span className="inline-flex items-center rounded-br-2xl rounded-tl-xl bg-[#f6d87a] px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider text-[#5f4a15] shadow-[0_8px_20px_rgba(246,216,122,0.35)]">
                {t("features.primaryLabel")}
              </span>
              <span className="text-sm font-medium text-white/60">{t("features.primaryHint")}</span>
            </div>

            <div className="flex flex-col gap-6 lg:gap-8 lg:grid lg:grid-cols-[1fr_minmax(280px,360px)] lg:items-start">
              <div className="min-w-0">
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-primary/40 bg-primary/15 shadow-[0_8px_24px_rgba(0,0,0,0.25)]">
                    <Baby className="h-7 w-7 text-primary" />
                  </div>
                  <div className="min-w-0 pt-0.5">
                    <h3 className="text-[28px] sm:text-[32px] font-extrabold leading-tight tracking-tight text-white">
                      {t("features.tracking.title")}
                    </h3>
                    <p className="mt-2 text-base sm:text-lg text-white/80 leading-relaxed">
                      {t("features.tracking.desc")}
                    </p>
                  </div>
                </div>

                <p className="text-sm font-bold uppercase tracking-widest text-primary mb-3">
                  {t("features.tracking.lead")}
                </p>
                <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-2.5 mb-6">
                  {trackingItems.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-medium text-white/90"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-primary" />
                      <span className="truncate">{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="space-y-3">
                  <div className="flex gap-3 rounded-xl border border-primary/30 bg-primary/10 px-4 py-3.5">
                    <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <p className="text-sm sm:text-base font-medium text-white leading-relaxed">
                      {t("features.tracking.sleepPrediction")}
                    </p>
                  </div>
                  <p className="text-sm sm:text-base text-white/75 leading-relaxed pl-1">
                    {t("features.tracking.story2")}
                  </p>
                </div>

                <div className="mt-5">
                  <span className="inline-flex items-center rounded-full border border-primary/60 bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(0,0,0,0.2)]">
                    {t("features.tracking.freeWidget")}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 min-w-0">
                <button
                  type="button"
                  onClick={() => setActiveImage({ src: sleepPredictionScreenshotUrl, alt: "Schlafprognose" })}
                  className="group rounded-xl border border-white/20 bg-slate-950/40 p-2 transition hover:border-primary/50 hover:shadow-soft"
                >
                  <img
                    src={sleepPredictionScreenshotUrl}
                    alt="Schlafprognose"
                    className="mx-auto h-[200px] w-full object-contain object-center sm:h-[220px]"
                    loading="lazy"
                  />
                  <p className="mt-2 px-2 text-center text-xs font-medium text-white/50 group-hover:text-white/70">
                    {t("features.hoverHint")}
                  </p>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveImage({ src: trackingScreenshotUrl, alt: "Tracking" })}
                  className="group rounded-xl border border-white/20 bg-slate-950/40 p-2 transition hover:border-primary/50 hover:shadow-soft"
                >
                  <img
                    src={trackingScreenshotUrl}
                    alt="Tracking"
                    className="mx-auto h-[200px] w-full object-contain object-center sm:h-[220px]"
                    loading="lazy"
                  />
                  <p className="mt-2 px-2 text-center text-xs text-white/70 leading-snug">
                    {t("features.tracking.weeklyReportPremium")}
                  </p>
                </button>
              </div>
            </div>
          </div>
        </motion.article>

        {/* Add-on Bereiche */}
        <motion.div
          initial={motionInitial}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mb-8 text-center"
        >
          <span className="inline-flex items-center rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider text-white/70 mb-4">
            {t("features.addonLabel")}
          </span>
          <h3 className="text-[26px] sm:text-[30px] font-extrabold leading-tight text-white">
            {t("features.groupsTitle")}
          </h3>
          <p className="mt-2 text-base text-white/70 max-w-2xl mx-auto">
            {t("features.groupsSubtitle")}
          </p>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-3 md:gap-6">
          {groupedFeatures.map((group, i) => (
            <motion.article
              key={group.titleKey}
              initial={motionInitial}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.45, delay: i * 0.07 }}
              whileHover={{ y: -4 }}
              className="group relative flex flex-col overflow-hidden rounded-[1.25rem] border border-white/15 bg-white/[0.06] p-5 sm:p-6 shadow-soft backdrop-blur-xl transition hover:border-primary/35 hover:shadow-soft-2xl"
            >
              <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${group.accent} opacity-0 transition group-hover:opacity-100`} />

              <div className="relative flex flex-col flex-1">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl border ${group.iconBorder} ${group.iconBg}`}
                  >
                    <group.icon className={`h-6 w-6 ${group.iconColor}`} />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-white/45">
                    {t("features.addonLabel")}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveImage({ src: group.image, alt: t(group.titleKey) })}
                  className="mb-5 overflow-hidden rounded-xl border border-white/20 bg-slate-950/40 p-2 transition group-hover:border-primary/40"
                >
                  <img
                    src={group.image}
                    alt={t(group.titleKey)}
                    className="mx-auto h-[200px] w-full object-contain object-center transition group-hover:scale-[1.02]"
                    loading="lazy"
                  />
                </button>

                <h4 className="text-[22px] font-extrabold leading-tight text-white mb-1">
                  {t(group.titleKey)}
                </h4>
                <p className="text-sm font-semibold text-primary mb-2">{t(group.subtitleKey)}</p>
                <p className="text-sm text-white/75 leading-relaxed mb-4">{t(group.descKey)}</p>

                <ul className="mt-auto space-y-2.5 border-t border-white/10 pt-4">
                  {splitItems(t(group.itemsKey)).map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-[15px] leading-snug text-white/90">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.p
          initial={motionInitial}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-10 text-center text-sm text-white/60"
        >
          {t("features.adNote")}
        </motion.p>

        {activeImage && (
          <ImageLightbox
            src={activeImage.src}
            alt={activeImage.alt}
            onClose={() => setActiveImage(null)}
          />
        )}
      </div>
    </section>
  );
};

export default FeaturesSection;
