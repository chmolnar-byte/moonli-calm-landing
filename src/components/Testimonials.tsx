import { useLanguage } from "@/i18n/LanguageContext";

const testimonials = [
  { nameKey: "testimonials.1.name", quoteKey: "testimonials.1.quote", roleKey: "testimonials.1.role" },
  { nameKey: "testimonials.2.name", quoteKey: "testimonials.2.quote", roleKey: "testimonials.2.role" },
  { nameKey: "testimonials.3.name", quoteKey: "testimonials.3.quote", roleKey: "testimonials.3.role" },
  { nameKey: "testimonials.4.name", quoteKey: "testimonials.4.quote", roleKey: "testimonials.4.role" },
  { nameKey: "testimonials.5.name", quoteKey: "testimonials.5.quote", roleKey: "testimonials.5.role" },
  { nameKey: "testimonials.6.name", quoteKey: "testimonials.6.quote", roleKey: "testimonials.6.role" },
];

const Testimonials = () => {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-x-clip py-16 md:py-24">
      <div className="container relative z-10">
        <h2 className="mb-6 max-w-[14ch] text-display-md text-balance text-foreground md:mb-8">
          {t("testimonials.title")}
        </h2>

        <ul className="grid gap-3 md:grid-cols-2 md:gap-4">
          {testimonials.map((item) => (
            <li key={item.quoteKey} className="flex">
              <figure className="quote-card flex w-full flex-1 flex-col rounded-[1.5rem] border border-border bg-card px-6 py-6 sm:px-7 sm:py-7">
                <blockquote className="text-[1.28rem] font-medium leading-[1.3] tracking-[-0.022em] text-foreground sm:text-[1.4rem]">
                  {t(item.quoteKey)}
                </blockquote>
                <figcaption className="mt-auto pt-7">
                  <p className="text-[0.95rem] font-semibold text-foreground">{t(item.nameKey)}</p>
                  <p className="text-sm font-medium text-[hsl(14_46%_36%)] dark:text-[hsl(165_28%_74%)]">{t(item.roleKey)}</p>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Testimonials;
