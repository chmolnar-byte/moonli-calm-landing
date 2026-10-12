import PhoneDemoVideo from "@/components/PhoneDemoVideo";
import { useLanguage } from "@/i18n/LanguageContext";
import { cn } from "@/lib/utils";
import { useState } from "react";

type StageVideo = {
  poster: string;
  webm: string;
  mp4: string;
  maskClass: string;
};

type Stage = {
  id: string;
  title: string;
  kicker: string;
  desc: string;
  notes?: string[];
  video: StageVideo;
};

const FeaturesSection = () => {
  const { t } = useLanguage();
  const [active, setActive] = useState(0);

  const notes = t("features.tracking.items")
    .split("|")
    .map((item) => item.trim())
    .filter(Boolean);

  const stages: Stage[] = [
    {
      id: "tracking",
      title: t("features.tracking.title"),
      kicker: t("features.tracking.focus"),
      desc: t("features.tracking.desc"),
      notes,
      video: {
        poster: "/videos/tracking-poster.webp",
        webm: "/videos/tracking-loop.webm",
        mp4: "/videos/tracking-loop.mp4",
        maskClass: "demo-phone--tracking",
      },
    },
    {
      id: "knowledge",
      title: t("features.groups.knowledge.title"),
      kicker: t("features.groups.knowledge.subtitle"),
      desc: t("features.groups.knowledge.desc"),
      video: {
        poster: "/videos/knowledge-poster.webp",
        webm: "/videos/knowledge-loop.webm",
        mp4: "/videos/knowledge-loop.mp4",
        maskClass: "demo-phone--knowledge",
      },
    },
    {
      id: "sync",
      title: t("features.sync.title"),
      kicker: t("features.sync.focus"),
      desc: t("features.sync.desc"),
      video: {
        poster: "/videos/partner-poster.webp",
        webm: "/videos/partner-loop.webm",
        mp4: "/videos/partner-loop.mp4",
        maskClass: "demo-phone--partner",
      },
    },
    {
      id: "media",
      title: t("features.groups.entertainment.title"),
      kicker: t("features.groups.entertainment.subtitle"),
      desc: t("features.groups.entertainment.desc"),
      video: {
        poster: "/videos/media-poster.webp",
        webm: "/videos/media-loop.webm",
        mp4: "/videos/media-loop.mp4",
        maskClass: "demo-phone--media",
      },
    },
    {
      id: "parent",
      title: t("features.groups.parent.title"),
      kicker: t("features.groups.parent.subtitle"),
      desc: t("features.groups.parent.desc"),
      video: {
        poster: "/videos/parent-poster.webp",
        webm: "/videos/parent-loop.webm",
        mp4: "/videos/parent-loop.mp4",
        maskClass: "demo-phone--parent",
      },
    },
  ];

  const current = stages[active];

  return (
    <section className="relative py-14 md:py-20">
      <div className="container">
        <h2 className="mb-6 text-display-md text-foreground md:mb-8">{t("features.title")}</h2>

        <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-16 xl:gap-24">
          <div className="order-2 lg:order-1" role="tablist" aria-label={t("features.title")}>
            {stages.map((stage, index) => {
              const selected = index === active;
              return (
                <button
                  key={stage.id}
                  type="button"
                  role="tab"
                  id={`feature-tab-${stage.id}`}
                  aria-selected={selected}
                  aria-controls="feature-stage"
                  onClick={() => setActive(index)}
                  className={cn(
                    "feature-topic group block w-full border-t border-border py-3.5 text-left sm:py-4",
                    index === stages.length - 1 && "border-b",
                    selected && "feature-topic--active border-foreground",
                  )}
                >
                  <span
                    className={cn(
                      "feature-topic-title block font-semibold tracking-[-0.035em]",
                      selected
                        ? "text-[1.7rem] leading-[1.05] text-foreground sm:text-[2.15rem]"
                        : "text-xl text-foreground/40 sm:text-2xl",
                    )}
                  >
                    {stage.title}
                  </span>
                  {selected && (
                    <span className="mt-3 block max-w-[46ch]">
                      <span className="block text-sm font-semibold text-primary">{stage.kicker}</span>
                      <span className="mt-1.5 block text-[15px] leading-relaxed text-muted-foreground">
                        {stage.desc}
                      </span>
                      {stage.notes && (
                        <span className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm font-semibold text-foreground/75">
                          {stage.notes.map((note) => (
                            <span key={note}>{note}</span>
                          ))}
                        </span>
                      )}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div
            id="feature-stage"
            role="tabpanel"
            aria-labelledby={`feature-tab-${current.id}`}
            className="order-1 flex justify-center lg:order-2"
          >
            <div key={current.id} className="feature-swap relative">
              <div
                aria-hidden
                className="pointer-events-none absolute left-1/2 top-1/2 h-[108%] w-[108%] -translate-x-1/2 -translate-y-1/2 opacity-70 [background-image:radial-gradient(hsl(var(--foreground)/0.18)_0.7px,transparent_0.7px)] [background-size:14px_14px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_72%)]"
              />
              <PhoneDemoVideo
                label={current.title}
                poster={current.video.poster}
                webm={current.video.webm}
                mp4={current.video.mp4}
                className={cn("demo-phone feature-stage-phone relative", current.video.maskClass)}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
