import { CheckCircle2, Gift, HeartHandshake, Sparkles } from "lucide-react";
import { MagicCard } from "@/components/magic/MagicCard";
import MagneticCta from "@/components/MagneticCta";
import wakeWindowShot from "@/assets/shot-wake-window.webp";
import { assetUrl } from "@/lib/assetUrl";
import { useLanguage } from "@/i18n/LanguageContext";

const PricingFeatureRow = ({ featureKey, withDesc = false, className = "" }: { featureKey: string; withDesc?: boolean; className?: string }) => {
  const { t } = useLanguage();

  return (
    <li className={`flex items-start gap-3 py-2 ${className}`}>
      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
      <div className="min-w-0 flex-1">
        <p className="text-base font-medium leading-snug text-foreground">{t(`${featureKey}.title`)}</p>
        {withDesc && <p className="mt-0.5 text-sm leading-snug text-muted-foreground">{t(`${featureKey}.desc`)}</p>}
      </div>
    </li>
  );
};

const wakeWindowShotUrl = assetUrl(wakeWindowShot);

/** The flagship Premium feature, shown with the real app screen: next window, countdown and the forecast. */
const SmartWakeWindow = () => {
  const { t } = useLanguage();

  return (
    <div className="relative mt-6 overflow-hidden rounded-[1.25rem] border border-primary/35 bg-primary/10 p-5 sm:flex sm:items-stretch sm:gap-6">
      <div className="min-w-0 flex-1">
        <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-primary">
          <Sparkles className="h-4 w-4" aria-hidden />
          {t("pricing.premium.smart.badge")}
        </p>
        <h4 className="mt-2 text-[1.35rem] font-semibold leading-tight tracking-[-0.02em] text-foreground">
          {t("pricing.premium.smart.title")}
        </h4>
        <p className="mt-2 text-[15px] leading-relaxed text-foreground/80">{t("pricing.premium.smart.desc")}</p>
      </div>

      {/* Crop of the real app screen: the whole arc, the countdown and the two time boxes below it. */}
      <div className="-mb-5 mt-5 flex h-[240px] w-[220px] shrink-0 self-center overflow-hidden sm:-mr-1 sm:mt-0 sm:h-[284px] sm:w-[260px] sm:self-end max-sm:mx-auto [mask-image:linear-gradient(to_bottom,transparent,black_14%)]">
        <img
          src={wakeWindowShotUrl}
          alt={t("pricing.premium.smart.title")}
          width={480}
          height={995}
          loading="lazy"
          decoding="async"
          className="-mt-[138px] h-auto w-[220px] max-w-none select-none drop-shadow-xl sm:-mt-[163px] sm:w-[260px]"
        />
      </div>
    </div>
  );
};

/** Second Premium highlight, calmer than the flagship: the parents' own area. */
const ParentArea = () => {
  const { t } = useLanguage();
  const items = t("pricing.premium.parent.items")
    .split("|")
    .map((item) => item.trim())
    .filter(Boolean);

  return (
    <div className="mt-4 rounded-[1.25rem] border border-border bg-foreground/[0.04] p-5">
      <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
        <HeartHandshake className="h-4 w-4" aria-hidden />
        {t("pricing.premium.parent.badge")}
      </p>
      <h4 className="mt-2 text-[1.2rem] font-semibold leading-tight tracking-[-0.02em] text-foreground">
        {t("pricing.premium.parent.title")}
      </h4>
      <p className="mt-2 text-[15px] leading-relaxed text-foreground/75">{t("pricing.premium.parent.desc")}</p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {items.map((item) => (
          <li key={item} className="rounded-full border border-border bg-card px-3 py-1.5 text-[13px] font-semibold text-foreground/85">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

const PricingSection = () => {
  const { t } = useLanguage();

  const freeFeatureKeys = [
    "pricing.free.f1",
    "pricing.free.kb",
    "pricing.free.f2",
    "pricing.free.f3",
    "pricing.free.f5",
    "pricing.free.f4",
  ];

  const premiumFeatureKeys = [
    "pricing.premium.f1",
    "pricing.premium.f3",
    "pricing.premium.report",
    "pricing.premium.calendar",
  ];

  const alsoIncluded = [
    "pricing.premium.blw",
    "pricing.premium.recipes",
    "pricing.premium.teeth",
    "pricing.premium.tiles",
    "pricing.premium.f2",
    "pricing.premium.f4",
    "pricing.premium.f5",
    "pricing.premium.f6",
  ].map((key) => t(`${key}.title`));

  return (
    <section className="py-20 md:py-24">
      <div className="container">
        <div className="mb-12 max-w-xl">
          <h2 className="text-display-md mb-3 text-balance text-foreground">{t("pricing.title")}</h2>
          <p className="text-base text-muted-foreground max-w-[52ch]">{t("pricing.subtitle")}</p>
        </div>

        <div className="grid items-stretch gap-5 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
          <MagicCard className="h-full lg:h-auto lg:self-start">
            <div className="flex flex-1 flex-col p-7 sm:p-8">
              <p className="text-sm font-semibold text-muted-foreground">{t("pricing.free.label")}</p>
              <h3 className="mt-3 text-[30px] font-semibold leading-tight tracking-tight text-foreground">Moonli Free</h3>
              <div className="mt-2 flex items-end gap-1">
                <span className="text-[46px] leading-none font-semibold text-foreground">0 €</span>
                <span className="text-muted-foreground text-lg font-semibold">/{t("pricing.forever")}</span>
              </div>
              <p className="mt-3 text-[15px] text-muted-foreground">{t("pricing.free.tagline")}</p>
              <ul className="mt-6 space-y-1">
                {freeFeatureKeys.map((key) => (
                  <PricingFeatureRow key={key} featureKey={key} />
                ))}
              </ul>

              <div className="pt-8">
                <MagneticCta
                  href="/#download"
                  variant="ghost"
                  trackEventName="cta_click"
                  trackParams={{ cta: "download", location: "pricing_free" }}
                >
                  {t("hero.ctaDownload")}
                </MagneticCta>
              </div>
            </div>
          </MagicCard>

          <div className="relative h-full">
            <p className="pricing-flag">
              <span className="pricing-flag-body">{t("pricing.premium.trialLead")}</span>
            </p>
            <MagicCard beam className="h-full">
              <div className="flex flex-1 flex-col bg-[radial-gradient(120%_55%_at_100%_0%,hsl(var(--primary)/0.12),transparent_62%)] p-7 sm:p-8">
                <div>
                  <p className="inline-flex rounded-full bg-primary/15 px-3 py-1 text-xs font-bold uppercase tracking-[0.1em] text-primary">
                    {t("pricing.premium.mostSelected")}
                  </p>
                  <h3 className="mt-4 text-[30px] font-semibold leading-tight tracking-tight text-foreground">Moonli Premium</h3>
                  <div className="mt-2 flex items-end gap-1">
                    <span className="text-[46px] leading-none font-semibold text-foreground">5 €</span>
                    <span className="text-muted-foreground text-lg font-semibold">/{t("pricing.month")}*</span>
                  </div>
                  <p className="mt-1.5 text-[13px] text-muted-foreground">{t("pricing.premium.priceNote")}</p>
                </div>

                <SmartWakeWindow />
                <ParentArea />

                <ul className="mt-5 grid gap-x-8 sm:grid-cols-2">
                  {premiumFeatureKeys.map((key) => (
                    <PricingFeatureRow key={key} featureKey={key} />
                  ))}
                  <PricingFeatureRow featureKey="pricing.premium.media" withDesc className="sm:col-span-2" />
                </ul>

                <div className="mt-5 border-t border-border pt-4">
                  <p className="text-sm font-semibold text-foreground/80">{t("pricing.premium.also")}</p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {alsoIncluded.map((item) => (
                      <li key={item} className="rounded-full bg-foreground/[0.06] px-3 py-1.5 text-[13px] font-medium leading-tight text-foreground/80">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-auto pt-8">
                  <p className="flex items-start gap-3 rounded-[1.25rem] bg-primary/10 px-4 py-3.5 text-sm leading-relaxed text-foreground/85">
                    <Gift className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
                    <span>{t("pricing.premium.trialNote")}</span>
                  </p>
                </div>
              </div>
            </MagicCard>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
