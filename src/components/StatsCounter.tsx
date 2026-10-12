import { NoiseTexture } from "@/components/magic/NoiseTexture";
import { useLanguage } from "@/i18n/LanguageContext";

const STAT_KEYS = ["promise.stat1", "promise.stat2", "promise.stat3"] as const;

const StatsCounter = () => {
  const { t } = useLanguage();

  return (
    <div className="promise-band mb-12 md:mb-16">
      <div className="promise-band-surface">
        <NoiseTexture className="opacity-[0.16] mix-blend-multiply dark:opacity-25 dark:mix-blend-soft-light" />
        <ul className="container relative grid gap-8 py-8 md:grid-cols-3 md:gap-10 md:py-10">
          {STAT_KEYS.map((key) => (
            <li key={key}>
              <span className="promise-mark" aria-hidden />
              <p className="text-balance text-[clamp(1.2rem,1.7vw,1.45rem)] font-semibold leading-[1.2] tracking-[-0.024em] text-foreground">
                {t(key)}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StatsCounter;
