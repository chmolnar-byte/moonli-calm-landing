import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Users, Star, Zap } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const useCountUp = (end: number, duration: number, inView: boolean, decimals = 0) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const startTime = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - startTime) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(parseFloat((start + (end - start) * eased).toFixed(decimals)));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [end, duration, inView, decimals]);
  return count;
};

const StatsCounter = () => {
  const { t } = useLanguage();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const families = useCountUp(10000, 2, inView);
  const rating = useCountUp(4.9, 2, inView, 1);
  const free = useCountUp(100, 1.5, inView);

  const stats = [
    { icon: Users, value: `${families.toLocaleString()}+`, label: t("stats.families"), color: "text-pastel-blue-strong", bg: "bg-pastel-blue/60" },
    { icon: Star, value: rating.toFixed(1), label: t("stats.rating"), color: "text-pastel-yellow-strong", bg: "bg-pastel-yellow/60" },
    { icon: Zap, value: `${free}%`, label: t("stats.free"), color: "text-pastel-green-strong", bg: "bg-pastel-green/60" },
  ];

  return (
    <section ref={ref} className="py-16 relative">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="glass-card-premium p-6 text-center group"
            >
              <div className={`w-12 h-12 rounded-2xl ${stat.bg} flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <p className="text-3xl sm:text-4xl font-extrabold mb-1">{stat.value}</p>
              <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsCounter;
