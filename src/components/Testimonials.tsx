import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const testimonials = [
  { nameKey: "testimonials.1.name", quoteKey: "testimonials.1.quote", initials: "SK", stars: 5, bg: "bg-pastel-pink/60" },
  { nameKey: "testimonials.2.name", quoteKey: "testimonials.2.quote", initials: "MR", stars: 5, bg: "bg-pastel-blue/60" },
  { nameKey: "testimonials.3.name", quoteKey: "testimonials.3.quote", initials: "LW", stars: 5, bg: "bg-pastel-green/60" },
  { nameKey: "testimonials.4.name", quoteKey: "testimonials.4.quote", initials: "JT", stars: 5, bg: "bg-pastel-green/60" },
  { nameKey: "testimonials.5.name", quoteKey: "testimonials.5.quote", initials: "AM", stars: 5, bg: "bg-pastel-yellow/60" },
  { nameKey: "testimonials.6.name", quoteKey: "testimonials.6.quote", initials: "FB", stars: 5, bg: "bg-pastel-green/40" },
];

const Testimonials = () => {
  const { t } = useLanguage();

  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-pastel-peach/20 blur-[100px]" />
      </div>
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-button text-primary text-sm font-semibold mb-4">
            {t("testimonials.badge")}
          </span>
          <h2 className="text-display-md font-extrabold mb-3 text-glow text-white">
            {t("testimonials.title")}
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card-premium p-7 text-center border border-white/15"
            >
              <div className={`w-14 h-14 rounded-full ${item.bg} border border-white/35 flex items-center justify-center mx-auto mb-4 shadow-[0_6px_18px_rgba(0,0,0,0.22)]`}>
                <span className="text-lg font-bold text-slate-900/80">{item.initials}</span>
              </div>
              <div className="flex justify-center gap-0.5 mb-3">
                {Array.from({ length: item.stars }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-pastel-yellow-strong text-pastel-yellow-strong" />
                ))}
              </div>
              <p className="text-base text-white/80 italic mb-3 leading-relaxed">
                "{t(item.quoteKey)}"
              </p>
              <p className="text-base font-bold text-white">{t(item.nameKey)}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Testimonials;
