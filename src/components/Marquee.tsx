import { useLanguage } from "@/i18n/LanguageContext";

const Marquee = () => {
  const { t } = useLanguage();
  const items = [
    t("marquee.sleep"), t("marquee.gamification"), t("marquee.zen"),
    t("marquee.ai"), t("marquee.stories"), t("marquee.qualityTime"),
    t("marquee.coparenting"), t("marquee.tracking"),
  ];

  const row = items.map((item, i) => (
    <span key={i} className="flex items-center gap-3 px-4">
      <span className="w-1.5 h-1.5 rounded-full bg-primary/60" />
      <span className="text-sm sm:text-base font-semibold text-muted-foreground whitespace-nowrap">
        {item}
      </span>
    </span>
  ));

  return (
    <div className="py-8 overflow-hidden relative">
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />
      <div className="flex animate-marquee">
        <div className="flex shrink-0">{row}</div>
        <div className="flex shrink-0">{row}</div>
      </div>
    </div>
  );
};

export default Marquee;
