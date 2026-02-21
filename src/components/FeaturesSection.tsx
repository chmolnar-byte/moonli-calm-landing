import { motion } from "framer-motion";
import { Heart, BatteryCharging, Moon, Sparkles, BookOpen, Trophy } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  badge: string;
  bgColor: string;
  iconColor: string;
  badgeColor: string;
}

const features: Feature[] = [
  {
    icon: Heart,
    title: "Quality Time & Digital Detox",
    description: "Fokus-Modus starten, Handy bewusst weglegen und Punkte für echte Familienzeit sammeln.",
    badge: "Familienzeit",
    bgColor: "bg-pastel-pink/60",
    iconColor: "text-pastel-pink-strong",
    badgeColor: "bg-pastel-pink/80 text-pastel-pink-strong",
  },
  {
    icon: BatteryCharging,
    title: "Parent Wellbeing",
    description: "Achte auf deine eigene Batterie. Mit integrierten Meditationen und kurzen Stretch-Übungen für Eltern.",
    badge: "Achtsamkeit",
    bgColor: "bg-pastel-green/60",
    iconColor: "text-pastel-green-strong",
    badgeColor: "bg-pastel-green/80 text-pastel-green-strong",
  },
  {
    icon: Moon,
    title: "Smart Sleep & Routinen",
    description: "Konsistenz für gute Nächte. Nutze den Bedtime-Builder, Dark Mode und das digitale Nachtlicht.",
    badge: "Schlaf",
    bgColor: "bg-pastel-blue/60",
    iconColor: "text-pastel-blue-strong",
    badgeColor: "bg-pastel-blue/80 text-pastel-blue-strong",
  },
  {
    icon: Sparkles,
    title: "Der Notfall-Joker",
    description: "Guilt-Free Screentime. Ruhige Zen-Spiele für Wartezimmer oder Meltdowns im Restaurant.",
    badge: "Notfall",
    bgColor: "bg-pastel-yellow/60",
    iconColor: "text-pastel-yellow-strong",
    badgeColor: "bg-pastel-yellow/80 text-pastel-yellow-strong",
  },
  {
    icon: BookOpen,
    title: "Digitale Schatztruhe",
    description: "Generiere altersgerechte Geschichten und nimm sie mit deiner eigenen Stimme auf.",
    badge: "Geschichten",
    bgColor: "bg-pastel-purple/60",
    iconColor: "text-pastel-purple-strong",
    badgeColor: "bg-pastel-purple/80 text-pastel-purple-strong",
  },
  {
    icon: Trophy,
    title: "Vom Zombie zur Legende",
    description: "Gamification im Alltag! Erledige Routinen, sammle XP und steige im Eltern-Level auf.",
    badge: "Gamification",
    bgColor: "bg-pastel-orange/60",
    iconColor: "text-pastel-orange-strong",
    badgeColor: "bg-pastel-orange/80 text-pastel-orange-strong",
  },
];

const FeatureCard = ({ feature, index }: { feature: Feature; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5, delay: index * 0.08 }}
    whileHover={{ y: -8, scale: 1.02 }}
    className="glass-card-premium p-6 group cursor-default transition-shadow duration-300 hover:shadow-soft-xl"
  >
    <div className={`w-12 h-12 rounded-2xl ${feature.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
      <feature.icon className={`w-6 h-6 ${feature.iconColor}`} />
    </div>

    <span className={`inline-block px-3 py-1 rounded-full ${feature.badgeColor} text-xs font-semibold mb-3`}>
      {feature.badge}
    </span>

    <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
    <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
  </motion.div>
);

const FeaturesSection = () => {
  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[400px] h-[400px] rounded-full bg-pastel-lavender/25 blur-[100px]" />
        <div className="absolute bottom-0 left-1/4 w-[300px] h-[300px] rounded-full bg-pastel-peach/20 blur-[80px]" />
      </div>

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-button text-pastel-yellow-strong text-sm font-semibold mb-4">
            ✨ Features
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 text-glow">
            Alles, was moderne Eltern brauchen
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Moonli vereint die wichtigsten Tools für entspanntes Elternsein in einer wunderschönen App.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
