import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { easeOut, motionInitial } from "@/lib/motion";
import { cn } from "@/lib/utils";

const ROWS = [1, 2, 3, 4, 5] as const;

const STORM = { src: "/clouds/storm.png", w: 1316, h: 1454 };
const CLEAR = { src: "/clouds/clear.png", w: 1629, h: 1632 };

const CLOUDS = [
  {
    storm: STORM,
    clear: CLEAR,
    layout: "md:col-start-1 md:col-span-6 md:-translate-y-2",
  },
  {
    storm: STORM,
    clear: CLEAR,
    layout: "md:col-start-7 md:col-span-6 md:translate-y-8",
  },
  {
    storm: STORM,
    clear: CLEAR,
    layout: "md:col-start-3 md:col-span-7 md:translate-y-2",
  },
  {
    storm: STORM,
    clear: CLEAR,
    layout: "md:col-start-1 md:col-span-5 md:translate-y-6",
  },
  {
    storm: STORM,
    clear: CLEAR,
    layout: "md:col-start-7 md:col-span-6 md:-translate-y-1",
  },
] as const;

const CompareCloud = ({
  row,
  index,
  pressed,
  onToggle,
}: {
  row: (typeof ROWS)[number];
  index: number;
  pressed: boolean;
  onToggle: () => void;
}) => {
  const { t } = useLanguage();
  const reduceMotion = useReducedMotion();
  const cloud = CLOUDS[index];
  const area = t(`compare.row${row}.area`);
  const before = t(`compare.row${row}.before`);
  const after = t(`compare.row${row}.after`);

  return (
    <motion.button
      type="button"
      initial={motionInitial}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-24px" }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: easeOut }}
      aria-pressed={pressed}
      aria-label={`${area}. ${t("compare.col.without")}: ${before}. ${t("compare.col.after")}: ${after}.`}
      onClick={onToggle}
      className={cn(
        "compare-cloud group relative w-full max-w-[15rem] justify-self-center md:max-w-[16.5rem]",
        cloud.layout,
      )}
    >
      <span className="compare-cloud__inner">
        <span
          className={cn("compare-cloud__art", !reduceMotion && "compare-cloud__art--drift")}
          style={{ animationDelay: `${index * -1.4}s` }}
        >
          <span className="compare-cloud__glow" aria-hidden />
          <img
            src={cloud.storm.src}
            alt=""
            width={cloud.storm.w}
            height={cloud.storm.h}
            className="compare-cloud__shape compare-cloud__shape--storm"
            loading="lazy"
            decoding="async"
            draggable={false}
          />
          <img
            src={cloud.clear.src}
            alt=""
            width={cloud.clear.w}
            height={cloud.clear.h}
            className="compare-cloud__shape compare-cloud__shape--clear"
            loading="lazy"
            decoding="async"
            draggable={false}
          />
        </span>

        <span className="compare-cloud__copy">
          <span className="compare-cloud__area">{area}</span>
          <span className="compare-cloud__swap">
            <span className="compare-cloud__state compare-cloud__state--before">
              <span className="compare-cloud__label">{t("compare.col.without")}</span>
              <span className="compare-cloud__text">{before}</span>
            </span>
            <span className="compare-cloud__state compare-cloud__state--after">
              <span className="compare-cloud__label">{t("compare.col.after")}</span>
              <span className="compare-cloud__text">{after}</span>
            </span>
          </span>
        </span>
      </span>
    </motion.button>
  );
};

const CompareSection = () => {
  const { t } = useLanguage();
  const [lit, setLit] = useState<number | null>(null);

  return (
    <section className="py-24 md:py-32">
      <div className="container relative z-10">
        <motion.div
          initial={motionInitial}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, ease: easeOut }}
          className="mb-12 max-w-[36ch] md:mb-16"
        >
          <h2 className="text-display-md text-foreground">{t("compare.title")}</h2>
          <p className="mt-3 text-base text-muted-foreground">{t("compare.hint")}</p>
        </motion.div>

        <div className="compare-sky">
          {ROWS.map((row, index) => (
            <CompareCloud
              key={row}
              row={row}
              index={index}
              pressed={lit === row}
              onToggle={() => setLit((current) => (current === row ? null : row))}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompareSection;
