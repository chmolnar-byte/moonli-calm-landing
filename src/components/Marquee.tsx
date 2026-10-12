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

  const row = items.map((item, index) => (
    <span key={`${item}-${index}`} className="inline-flex items-center">
      <span className="whitespace-nowrap px-7 text-[15px] font-medium text-foreground/70">
        {item}
      </span>
      <span className="h-3 w-px bg-border" aria-hidden />
    </span>
  ));

  return (
    <div className="relative shrink-0 overflow-hidden overflow-x-clip py-5 md:py-6 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <div className="marquee-track flex w-max">
        <div className="flex shrink-0">{row}</div>
        <div className="flex shrink-0" aria-hidden="true">
          {row}
        </div>
      </div>
    </div>
  );
};

export default Marquee;
