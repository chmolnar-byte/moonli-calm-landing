import { useLanguage } from "@/i18n/LanguageContext";

const Marquee = () => {
  const { t } = useLanguage();
  const items = [
    t("marquee.sleep"),
    t("marquee.qualityTime"),
    t("marquee.stories"),
    t("marquee.gamification"),
    t("marquee.zen"),
    t("marquee.ai"),
    t("marquee.coparenting"),
    t("marquee.tracking"),
  ];

  const row = items.map((item) => (
    <span key={item} className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 shadow-[0_8px_22px_rgba(0,0,0,0.12)]">
      <span className="h-1.5 w-1.5 rounded-full bg-primary/70 shadow-[0_0_12px_hsl(var(--primary))]" />
      <span className="whitespace-nowrap text-sm font-semibold text-white/72 sm:text-base">
        {item}
      </span>
    </span>
  ));

  return (
    <div className="relative overflow-hidden py-8 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
      <div className="marquee-track flex w-max gap-3">
        <div className="flex shrink-0 gap-3">{row}</div>
        <div className="flex shrink-0 gap-3" aria-hidden="true">{row}</div>
      </div>
    </div>
  );
};

export default Marquee;
