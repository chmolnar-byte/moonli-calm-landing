import { motion } from "framer-motion";
import {
  Ban,
  BookOpen,
  Brain,
  CheckCircle2,
  FileText,
  Heart,
  MicVocal,
  Sparkles,
} from "lucide-react";

const PricingSection = () => {
  return (
    <section className="py-20 sm:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-pastel-green/15 via-transparent to-pastel-lavender/10 pointer-events-none" />
      <div className="container relative z-10">
        <div className="mx-auto grid max-w-6xl md:grid-cols-2 gap-4 sm:gap-5 items-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="relative rounded-[1.5rem] border border-border/70 bg-white/70 p-6 sm:p-7 shadow-soft-xl"
          >
            <div className="absolute top-0 left-0 rounded-br-2xl rounded-tl-[1.5rem] bg-muted px-4 py-1 text-[11px] font-bold tracking-wide text-primary">
              KOSTENLOS
            </div>

            <h3 className="mt-10 text-[38px] sm:text-[40px] font-bold leading-none tracking-tight">Moonli Free</h3>
            <div className="mt-2.5 flex items-end gap-1.5">
              <span className="text-[54px] leading-none font-extrabold">0 €</span>
              <span className="text-muted-foreground text-[30px] leading-none font-semibold">/</span>
              <span className="text-muted-foreground text-[30px] leading-none font-semibold">für immer</span>
            </div>

            <p className="mt-4 text-[18px] text-muted-foreground leading-relaxed">
              Alles, was du brauchst, um den Überblick zu behalten. Kostenlos - weil jede Unterstützung zählt.
            </p>

            <div className="mt-7 space-y-3.5">
              {[
                "Kostenloses Tracking von Schlaf, Stillen, Fläschchen, Windeln, Medikamente, etc.",
                "Baby-Hub: Welcher Entwicklungsschritt erwartet mich? Was kann ich tun?",
                "Einschlaf Routine: Jeden Abend einen geregelten Ablauf.",
                "Community Hacks: Teile Tipps mit der Community und finde die besten Ideen per Upvote.",
                "Wachstums-Check: WHO-Perzentilen-Kurven für eine sichere Entwicklung.",
                "Alle White Noises und Einschlaflieder mit 2 Notfall-Spielen.",
              ].map((feature) => (
                <div key={feature} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-[18px] w-[18px] shrink-0 text-primary" />
                  <p className="text-[17px] leading-[1.35]">{feature}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.08 }}
            className="relative overflow-hidden rounded-[1.5rem] border-2 border-[#f7dda0] bg-white/70 p-6 sm:p-7 shadow-soft-xl"
          >
            <div className="absolute top-0 left-0 rounded-br-3xl rounded-tl-[1.5rem] bg-[#f8e7b8] px-5 py-1 text-[11px] font-bold tracking-wide text-[#7a6530]">
              MEISTGEWÄHLT
            </div>

            <div className="absolute top-0 right-3 sm:right-4">
              <div className="bg-[#f8e7b8] px-4 py-2 text-center text-[11px] leading-tight font-extrabold tracking-wide text-[#7a6530]">
                <div>30 TAGE</div>
                <div>KOSTENLOS</div>
                <div>TESTEN</div>
              </div>
              <div className="mx-auto h-0 w-0 border-l-[52px] border-r-[52px] border-t-[12px] border-l-transparent border-r-transparent border-t-[#f8e7b8]" />
            </div>

            <h3 className="mt-10 text-[38px] sm:text-[40px] font-bold leading-none tracking-tight">Moonli Premium</h3>
            <div className="mt-2.5 flex items-end gap-1.5">
              <span className="text-[62px] leading-none font-extrabold">5 €</span>
              <span className="text-muted-foreground text-[34px] leading-none font-semibold">/Monat*</span>
            </div>
            <p className="mt-1.5 text-[13px] text-muted-foreground">
              *5 € / Monat im Jahresabo (12 Monate). 7 € / Monat bei monatlicher Kündigung.
            </p>

            <p className="mt-5 text-[18px] leading-relaxed text-muted-foreground">
              Moonli Premium schenkt dir die Freiheit, dich ganz auf die kostbaren Momente mit deinem Kind zu konzentrieren - für mehr Gelassenheit und gemeinsame Augenblicke, die bleiben.
            </p>

            <div className="mt-7 space-y-3.5">
              {[
                { icon: Ban, text: "100% werbefrei: Keine Ablenkung - pure Fokuszeit für dich und dein Kind." },
                { icon: Brain, text: "Intelligente Schlafanalyse: Erkenne Muster und optimiere eure Routinen." },
                { icon: FileText, text: "Arzt/Hebammen Wochen Report zum Exportieren" },
                { icon: Sparkles, text: "Die 500-Tage-Begleitung: Jeden Tag ein Tipp, exakt passend zum Alter deines Babys." },
                { icon: BookOpen, text: "Unlimitierter Content: Voller Zugriff auf Geschichten, Spiele und die gesamte Wissensbibliothek." },
                { icon: Heart, text: "Wellbeing & Selbstfürsorge: Meditation, Dehnung, Atmung und Eltern-Tagebuch." },
                { icon: MicVocal, text: "Premium Archiv & Recorder: Speichere Stimmen von Oma und Opa in unbegrenzter Qualität." },
              ].map((feature) => (
                <div key={feature.text} className="flex items-start gap-3">
                  <feature.icon className="mt-0.5 h-[18px] w-[18px] shrink-0 text-[#8a7340]" />
                  <p className="text-[17px] leading-[1.35]">{feature.text}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
