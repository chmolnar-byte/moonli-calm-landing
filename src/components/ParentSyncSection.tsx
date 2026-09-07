import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import { easeOut, motionInitial } from "@/lib/motion";
import PhoneDemoVideo from "@/components/PhoneDemoVideo";

type ParentSyncSectionProps = {
  imageSrc: string;
  onOpenImage: (src: string, alt: string) => void;
  onOpenVideo: () => void;
};

const ParentSyncSection = ({ imageSrc, onOpenImage, onOpenVideo }: ParentSyncSectionProps) => {
  const { t } = useLanguage();
  const title = t("features.sync.title");

  return (
    <motion.div
      initial={motionInitial}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: easeOut }}
      className="rounded-[1.75rem] bg-primary/12 px-6 py-10 sm:px-10 lg:px-12"
    >
      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-14 items-center">
        <div>
          <span className="mb-4 inline-flex items-center rounded-full border border-primary/35 bg-primary/15 px-3 py-1 text-xs font-semibold tracking-wide text-primary">
            {t("features.sync.flag")}
          </span>
          <p className="mb-3 text-sm font-semibold text-primary">
            {t("features.sync.focus")}
          </p>
          <h3 className="text-title-lg text-foreground">
            {title}
          </h3>
          <p className="mt-3 text-base text-muted-foreground leading-relaxed max-w-[42ch]">
            {t("features.sync.desc")}
          </p>
        </div>

        <div className="relative mx-auto w-full max-w-[420px] overflow-visible px-5 sm:px-8">
          <div className="relative flex items-end justify-center pt-3">
            <button
              type="button"
              onClick={() => onOpenImage(imageSrc, title)}
              className="feature-shot relative z-[1] w-[36%] shrink-0 -mr-[8%] translate-y-3 cursor-zoom-in -rotate-[8deg]"
              aria-label={title}
            >
              <img
                src={imageSrc}
                alt={title}
                className="shot-crisp block w-full h-auto select-none pointer-events-none"
                loading="lazy"
              />
            </button>
            <PhoneDemoVideo
              label={title}
              poster="/videos/partner-poster.webp"
              webm="/videos/partner-loop.webm"
              mp4="/videos/partner-loop.mp4"
              className="demo-phone demo-phone--partner relative z-[3] w-[38%] shrink-0"
              onOpen={onOpenVideo}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ParentSyncSection;
