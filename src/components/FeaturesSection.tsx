import { motion, AnimatePresence } from "framer-motion";
import ImageLightbox from "@/components/ImageLightbox";
import { useLanguage } from "@/i18n/LanguageContext";
import trackingScreenshot from "@/assets/tracking-tagesplan.png";
import weeklyReportScreenshot from "@/assets/hero-wochenbericht.png";
import soundsScreenshot from "@/assets/app-sounds.png";
import complimentsScreenshot from "@/assets/app-compliments.png";
import ParentSyncSection from "@/components/ParentSyncSection";
import LeafAccent from "@/components/LeafAccent";
import PhoneDemoVideo from "@/components/PhoneDemoVideo";
import { assetUrl } from "@/lib/assetUrl";
import { easeOut, motionInitial } from "@/lib/motion";
import { useState } from "react";

const trackingScreenshotUrl = assetUrl(trackingScreenshot);
const weeklyReportScreenshotUrl = assetUrl(weeklyReportScreenshot);
const soundsScreenshotUrl = assetUrl(soundsScreenshot);
const complimentsScreenshotUrl = assetUrl(complimentsScreenshot);

const splitItems = (raw: string) =>
  raw
    .split("|")
    .map((item) => item.trim())
    .filter(Boolean);

type LightboxMedia = {
  alt: string;
  src?: string;
  video?: {
    poster: string;
    webm: string;
    mp4: string;
    maskClass: string;
  };
};

const FeaturesSection = () => {
  const { t } = useLanguage();
  const [lightbox, setLightbox] = useState<LightboxMedia | null>(null);
  const trackingItems = splitItems(t("features.tracking.items"));

  return (
    <section className="py-20 md:py-24 relative overflow-visible">
      <LeafAccent
        src="/leaves/sprigs-left.png"
        className="page-leaf top-8 -left-6 z-0 w-[150px] sm:w-[190px]"
      />
      <div className="container relative z-10">
        <motion.div
          initial={motionInitial}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, ease: easeOut }}
          className="mb-12 max-w-[36ch]"
        >
          <h2 className="text-display-md text-foreground">{t("features.title")}</h2>
        </motion.div>

        <motion.div
          initial={motionInitial}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: easeOut }}
          className="grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-10 lg:gap-14 items-center"
        >
          <div>
            <p className="mb-3 text-sm font-semibold text-primary">
              {t("features.tracking.focus")}
            </p>
            <h3 className="text-title-lg text-foreground">
              {t("features.tracking.title")}
            </h3>
            <p className="mt-3 text-base text-muted-foreground leading-relaxed max-w-[48ch]">
              {t("features.tracking.desc")}
            </p>
            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold text-foreground/75">
              {trackingItems.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[520px] overflow-visible px-5 sm:px-8">
            <div className="absolute inset-[12%] rounded-full bg-primary/12 blur-[70px] pointer-events-none" />
            <div className="relative flex items-end justify-center pt-3">
              <button
                type="button"
                onClick={() =>
                  setLightbox({
                    src: trackingScreenshotUrl,
                    alt: t("features.tracking.scheduleAlt"),
                  })
                }
                className="feature-shot relative z-[1] w-[36%] shrink-0 -mr-[6%] translate-y-3 cursor-zoom-in -rotate-[8deg]"
                aria-label={t("features.tracking.scheduleAlt")}
              >
                <img
                  src={trackingScreenshotUrl}
                  alt={t("features.tracking.scheduleAlt")}
                  className="shot-crisp block w-full h-auto select-none pointer-events-none"
                  loading="lazy"
                />
              </button>
              <PhoneDemoVideo
                label={t("features.tracking.title")}
                poster="/videos/tracking-poster.webp"
                webm="/videos/tracking-loop.webm"
                mp4="/videos/tracking-loop.mp4"
                className="demo-phone demo-phone--tracking relative z-[3] w-[38%] shrink-0"
                onOpen={() =>
                  setLightbox({
                    alt: t("features.tracking.title"),
                    video: {
                      poster: "/videos/tracking-poster.webp",
                      webm: "/videos/tracking-loop.webm",
                      mp4: "/videos/tracking-loop.mp4",
                      maskClass: "demo-phone--tracking",
                    },
                  })
                }
              />
              <button
                type="button"
                onClick={() =>
                  setLightbox({
                    src: weeklyReportScreenshotUrl,
                    alt: t("features.tracking.weeklyAlt"),
                  })
                }
                className="feature-shot relative z-[1] w-[36%] shrink-0 -ml-[6%] translate-y-3 cursor-zoom-in rotate-[7deg]"
                aria-label={t("features.tracking.weeklyAlt")}
              >
                <img
                  src={weeklyReportScreenshotUrl}
                  alt={t("features.tracking.weeklyAlt")}
                  className="shot-crisp block w-full h-auto select-none pointer-events-none"
                  loading="lazy"
                />
              </button>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={motionInitial}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.45, ease: easeOut }}
          className="mt-20 md:mt-24 grid lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] gap-10 lg:gap-14 items-center"
        >
          <PhoneDemoVideo
            label={t("features.groups.knowledge.title")}
            poster="/videos/knowledge-poster.webp"
            webm="/videos/knowledge-loop.webm"
            mp4="/videos/knowledge-loop.mp4"
            className="demo-phone demo-phone--knowledge mx-auto w-[176px] md:w-[196px] max-w-full lg:order-1"
            onOpen={() =>
              setLightbox({
                alt: t("features.groups.knowledge.title"),
                video: {
                  poster: "/videos/knowledge-poster.webp",
                  webm: "/videos/knowledge-loop.webm",
                  mp4: "/videos/knowledge-loop.mp4",
                  maskClass: "demo-phone--knowledge",
                },
              })
            }
          />
          <div className="lg:order-2">
            <p className="mb-3 text-sm font-semibold text-primary">
              {t("features.groups.knowledge.subtitle")}
            </p>
            <h3 className="text-title-lg text-foreground">
              {t("features.groups.knowledge.title")}
            </h3>
            <p className="mt-3 text-base text-muted-foreground leading-relaxed max-w-[42ch]">
              {t("features.groups.knowledge.desc")}
            </p>
          </div>
        </motion.div>

        <div className="mt-20 md:mt-24">
          <ParentSyncSection
            imageSrc={complimentsScreenshotUrl}
            onOpenImage={(src, alt) => setLightbox({ src, alt })}
            onOpenVideo={() =>
              setLightbox({
                alt: t("features.sync.title"),
                video: {
                  poster: "/videos/partner-poster.webp",
                  webm: "/videos/partner-loop.webm",
                  mp4: "/videos/partner-loop.mp4",
                  maskClass: "demo-phone--partner",
                },
              })
            }
          />
        </div>

        <motion.div
          initial={motionInitial}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.45, ease: easeOut }}
          className="mt-20 md:mt-24 grid lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] gap-10 lg:gap-14 items-center"
        >
          <div className="lg:order-2">
            <p className="mb-3 text-sm font-semibold text-primary">
              {t("features.groups.entertainment.subtitle")}
            </p>
            <h3 className="text-title-lg text-foreground">
              {t("features.groups.entertainment.title")}
            </h3>
            <p className="mt-3 text-base text-muted-foreground leading-relaxed max-w-[42ch]">
              {t("features.groups.entertainment.desc")}
            </p>
          </div>
          <div className="relative mx-auto w-full max-w-[420px] overflow-visible px-5 sm:px-8 lg:order-1">
            <div className="absolute inset-[12%] rounded-full bg-primary/12 blur-[70px] pointer-events-none" />
            <div className="relative flex items-end justify-center pt-3">
              <button
                type="button"
                onClick={() =>
                  setLightbox({
                    src: soundsScreenshotUrl,
                    alt: t("features.groups.entertainment.title"),
                  })
                }
                className="feature-shot relative z-[1] w-[36%] shrink-0 -mr-[8%] translate-y-3 cursor-zoom-in -rotate-[8deg]"
                aria-label={t("features.groups.entertainment.title")}
              >
                <img
                  src={soundsScreenshotUrl}
                  alt={t("features.groups.entertainment.title")}
                  className="shot-crisp block w-full h-auto select-none pointer-events-none"
                  loading="lazy"
                />
              </button>
              <PhoneDemoVideo
                label={t("features.groups.entertainment.title")}
                poster="/videos/media-poster.webp"
                webm="/videos/media-loop.webm"
                mp4="/videos/media-loop.mp4"
                className="demo-phone demo-phone--media relative z-[3] w-[38%] shrink-0"
                onOpen={() =>
                  setLightbox({
                    alt: t("features.groups.entertainment.title"),
                    video: {
                      poster: "/videos/media-poster.webp",
                      webm: "/videos/media-loop.webm",
                      mp4: "/videos/media-loop.mp4",
                      maskClass: "demo-phone--media",
                    },
                  })
                }
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={motionInitial}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.45, ease: easeOut }}
          className="mt-20 md:mt-24 grid lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] gap-10 lg:gap-14 items-center"
        >
          <div>
            <p className="mb-3 text-sm font-semibold text-primary">
              {t("features.groups.parent.subtitle")}
            </p>
            <h3 className="text-title-lg text-foreground">
              {t("features.groups.parent.title")}
            </h3>
            <p className="mt-3 text-base text-muted-foreground leading-relaxed max-w-[42ch]">
              {t("features.groups.parent.desc")}
            </p>
          </div>
          <PhoneDemoVideo
            label={t("features.groups.parent.title")}
            poster="/videos/parent-poster.webp"
            webm="/videos/parent-loop.webm"
            mp4="/videos/parent-loop.mp4"
            className="demo-phone demo-phone--parent mx-auto w-[176px] md:w-[196px] max-w-full"
            onOpen={() =>
              setLightbox({
                alt: t("features.groups.parent.title"),
                video: {
                  poster: "/videos/parent-poster.webp",
                  webm: "/videos/parent-loop.webm",
                  mp4: "/videos/parent-loop.mp4",
                  maskClass: "demo-phone--parent",
                },
              })
            }
          />
        </motion.div>

        <AnimatePresence>
          {lightbox && (
            <ImageLightbox
              key={lightbox.video?.webm ?? lightbox.src}
              src={lightbox.src}
              video={lightbox.video}
              alt={lightbox.alt}
              onClose={() => setLightbox(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default FeaturesSection;
