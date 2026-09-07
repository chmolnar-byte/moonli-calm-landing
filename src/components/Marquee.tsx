import { useLanguage } from "@/i18n/LanguageContext";

const Marquee = () => {
  const { t } = useLanguage();
  const items = [
    t("marquee.parentSync"),
    t("marquee.quickButtons"),
    t("marquee.infoHub"),
    t("marquee.stories"),
    t("marquee.gamification"),
    t("marquee.trophies"),
    t("marquee.sleep"),
    t("marquee.tracking"),
  ];

  const row = items.map((item) => (
    <span key={item} className="inline-flex items-center rounded-full border border-border bg-card px-4 py-2">
      <span className="whitespace-nowrap text-sm font-semibold text-muted-foreground sm:text-base">
        {item}
      </span>
    </span>
  ));

  return (
    <div className="relative shrink-0 overflow-hidden overflow-x-clip py-3 md:py-4 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
      <div className="marquee-track flex w-max gap-3">
        <div className="flex shrink-0 gap-3">{row}</div>
        <div className="flex shrink-0 gap-3" aria-hidden="true">{row}</div>
      </div>
    </div>
  );
};

export default Marquee;
