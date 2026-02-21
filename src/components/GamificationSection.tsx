import { motion } from "framer-motion";
import { Star, Zap, Crown } from "lucide-react";

const levels = [
  { label: "Müder Zombie", emoji: "🧟", progress: 0 },
  { label: "Kaffee-Held", emoji: "☕", progress: 25 },
  { label: "Routine-Ninja", emoji: "⚡", progress: 50 },
  { label: "Zen-Meister", emoji: "🧘", progress: 75 },
  { label: "Moonli Gott", emoji: "👑", progress: 100 },
];

const GamificationSection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] rounded-full bg-pastel-orange/25 blur-[100px]" />
        <div className="absolute top-0 right-1/4 w-[300px] h-[300px] rounded-full bg-pastel-yellow/20 blur-[80px]" />
      </div>

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="glass-card-premium p-8 md:p-12"
        >
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-button text-pastel-orange-strong text-sm font-semibold mb-4">
              <Zap className="w-4 h-4" /> Level Up!
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-3 text-glow">
              Werde zur Eltern-Legende
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Erledige tägliche Routinen, sammle XP und steige vom müden Zombie zum Moonli Gott auf.
            </p>
          </div>

          {/* Progress Bar */}
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <div className="h-4 rounded-full bg-muted/60 overflow-hidden" style={{ boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.04)' }}>
                <motion.div
                  initial={{ width: "0%" }}
                  whileInView={{ width: "68%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
                  className="h-full rounded-full bg-gradient-to-r from-primary to-pastel-green-strong"
                  style={{ boxShadow: '0 0 20px rgba(112, 151, 138, 0.3)' }}
                />
              </div>

              <div className="flex justify-between mt-4">
                {levels.map((level, i) => (
                  <motion.div
                    key={level.label}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + i * 0.1, duration: 0.4 }}
                    className="flex flex-col items-center text-center"
                  >
                    <span className="text-xl mb-1">{level.emoji}</span>
                    <span className="text-xs font-semibold text-muted-foreground hidden sm:block whitespace-nowrap">
                      {level.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-4 mt-10">
              {[
                { icon: Star, label: "XP gesammelt", value: "2,450", color: "text-pastel-yellow-strong" },
                { icon: Zap, label: "Tage-Streak", value: "12", color: "text-pastel-orange-strong" },
                { icon: Crown, label: "Aktuelles Level", value: "Level 3", color: "text-primary" },
              ].map((stat) => (
                <div key={stat.label} className="text-center p-4 rounded-2xl glass-button">
                  <stat.icon className={`w-5 h-5 mx-auto mb-2 ${stat.color}`} />
                  <div className="text-xl font-extrabold">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default GamificationSection;
