import { useLanguage } from "@/i18n/LanguageContext";

const FounderSection = () => {
  const { t } = useLanguage();

  return (
    <section className="relative py-20 md:py-24">
      <div className="container relative z-10">
        <div className="max-w-3xl">
          <h2 className="text-display-md text-foreground mb-5">{t("pricing.about.title")}</h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            {t("pricing.about.text")}
          </p>
        </div>
      </div>
    </section>
  );
};

export default FounderSection;
