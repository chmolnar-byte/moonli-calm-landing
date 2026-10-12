import { CheckCircle2 } from "lucide-react";
import { MagicCard } from "@/components/magic/MagicCard";
import { useLanguage } from "@/i18n/LanguageContext";

const PricingFeatureRow = ({ featureKey }: { featureKey: string }) => {
  const { t } = useLanguage();
  const title = t(`${featureKey}.title`);
  const desc = t(`${featureKey}.desc`);

  return (
    <li className="flex items-start gap-3 py-2">
      <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-primary" aria-hidden />
      <div className="min-w-0 flex-1">
        <p className="text-[15px] font-medium leading-snug text-foreground">{title}</p>
        {desc ? (
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{desc}</p>
        ) : null}
      </div>
    </li>
  );
};

const PricingSection = () => {
  const { t } = useLanguage();

  const freeFeatureKeys = [
    "pricing.free.f1",
    "pricing.free.f3",
    "pricing.free.f2",
    "pricing.free.f6",
    "pricing.free.f5",
    "pricing.free.f4",
  ];

  const premiumFeatureKeys = [
    "pricing.premium.f1",
    "pricing.premium.f2",
    "pricing.premium.f3",
    "pricing.premium.f3a",
    "pricing.premium.f4",
    "pricing.premium.f5",
    "pricing.premium.f6",
  ];

  return (
    <section className="py-20 md:py-24">
      <div className="container">
        <div className="mb-12 max-w-xl">
          <h2 className="text-display-md mb-3 text-balance text-foreground">{t("pricing.title")}</h2>
          <p className="text-base text-muted-foreground max-w-[52ch]">{t("pricing.subtitle")}</p>
        </div>

        <div className="grid items-stretch gap-5 lg:grid-cols-2">
          <MagicCard className="h-full">
            <div className="p-7 sm:p-8">
              <p className="text-sm font-semibold text-muted-foreground">{t("pricing.free.label")}</p>
              <h3 className="mt-3 text-[30px] font-semibold leading-tight tracking-tight text-foreground">Moonli Free</h3>
              <div className="mt-2 flex items-end gap-1">
                <span className="text-[46px] leading-none font-semibold text-foreground">0 €</span>
                <span className="text-muted-foreground text-lg font-semibold">/{t("pricing.forever")}</span>
              </div>
              <p className="mt-4 text-base text-muted-foreground leading-relaxed">{t("pricing.free.desc")}</p>
              <ul className="mt-7 space-y-1">
                {freeFeatureKeys.map((key) => (
                  <PricingFeatureRow key={key} featureKey={key} />
                ))}
              </ul>
            </div>
          </MagicCard>

          <div className="relative h-full">
            <p className="pricing-flag">
              <span className="pricing-flag-body">{t("pricing.premium.trialLead")}</span>
            </p>
            <MagicCard beam className="h-full">
            <div className="p-7 sm:p-8">
              <div>
                <p className="pr-36 text-sm font-semibold lowercase text-primary first-letter:uppercase sm:pr-40">{t("pricing.premium.mostSelected")}</p>
                <h3 className="mt-4 text-[30px] font-semibold leading-tight tracking-tight text-foreground">Moonli Premium</h3>
                <div className="mt-2 flex items-end gap-1">
                  <span className="text-[46px] leading-none font-semibold text-foreground">5 €</span>
                  <span className="text-muted-foreground text-lg font-semibold">/{t("pricing.month")}*</span>
                </div>
                <p className="mt-1.5 text-[13px] text-muted-foreground">{t("pricing.premium.priceNote")}</p>
              </div>
              <p className="mt-5 text-base leading-relaxed text-muted-foreground">{t("pricing.premium.desc")}</p>
              <ul className="mt-7 space-y-1">
                {premiumFeatureKeys.map((key) => (
                  <PricingFeatureRow key={key} featureKey={key} />
                ))}
              </ul>
            </div>
            </MagicCard>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
