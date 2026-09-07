import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import LeafAccent from "@/components/LeafAccent";
import { easeOut, motionInitial } from "@/lib/motion";

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
    <section className="relative overflow-x-clip py-20 md:py-24">
      <LeafAccent
        src="/leaves/sprigs-right.png"
        className="page-leaf -right-4 top-0 z-0 w-[170px] sm:w-[210px]"
      />
      <div className="container relative z-10">
        <motion.div
          initial={motionInitial}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, ease: easeOut }}
          className="mb-12 max-w-[28ch]"
        >
          <h2 className="text-display-md text-foreground">
            {t("testimonials.title")}
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {testimonials.map((item) => (
            <article
              key={item.quoteKey}
              className="rounded-[1.5rem] border border-border bg-card p-6 sm:p-7"
            >
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} className="w-3.5 h-3.5 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-base text-foreground leading-relaxed mb-5">
                {t(item.quoteKey)}
              </p>
              <p className="text-sm font-bold text-foreground">{t(item.nameKey)}</p>
              <p className="text-sm text-muted-foreground">{t(item.roleKey)}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
