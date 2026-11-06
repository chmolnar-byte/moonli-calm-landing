import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { CloudRain, Sun } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import StatsCounter from "@/components/StatsCounter";
import { useLanguage } from "@/i18n/LanguageContext";
import { easeOut, motionInitial } from "@/lib/motion";
import { cn } from "@/lib/utils";

const ROWS = [1, 2, 3, 4, 5] as const;

const STORM = { src: "/clouds/storm.webp", w: 640, h: 707 };
const CLEAR = { src: "/clouds/clear.webp", w: 640, h: 641 };

const CompareSection = () => {
  const { t } = useLanguage();
  const reduceMotion = useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);
  const inView = useInView(stageRef, { once: true, margin: "0px 0px -30% 0px" });
  const [after, setAfter] = useState(false);
  const touched = useRef(false);

  // First time it scrolls into view the sky clears up on its own; any tap on the switch takes over.
  useEffect(() => {
    if (!inView || touched.current) return;
    const id = window.setTimeout(() => {
      if (!touched.current) setAfter(true);
    }, reduceMotion ? 0 : 1500);
    return () => window.clearTimeout(id);
  }, [inView, reduceMotion]);

  const choose = (value: boolean) => {
    touched.current = true;
    setAfter(value);
  };

  const options = [
    { value: false, label: t("compare.col.without"), Icon: CloudRain },
    { value: true, label: t("compare.col.after"), Icon: Sun },
  ];

  return (
    <section className="pb-20 pt-16 md:pb-28 md:pt-20">
      <div className="container relative z-10">
        <StatsCounter />
        <motion.h2
          initial={motionInitial}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, ease: easeOut }}
          className="mb-10 max-w-[20ch] text-display-md text-foreground md:mb-14"
        >
          {t("compare.title")}
        </motion.h2>

        <div ref={stageRef} className="grid items-start gap-8 md:grid-cols-[minmax(0,300px)_minmax(0,1fr)] md:gap-14">
          <div className="md:sticky md:top-28">
            <div className="relative mx-auto aspect-square w-44 max-w-full md:w-full md:max-w-[300px]">
              <div
                aria-hidden
                className={cn(
                  "absolute inset-[-10%] rounded-full blur-3xl transition-colors duration-700",
                  after ? "bg-[hsl(42_95%_65%/0.4)]" : "bg-[hsl(215_35%_55%/0.28)]",
                )}
              />
              <img
                src={STORM.src}
                alt=""
                width={STORM.w}
                height={STORM.h}
                className={cn(
                  "absolute inset-0 h-full w-full object-contain transition-all duration-700 ease-out",
                  after ? "scale-90 opacity-0" : "scale-100 opacity-100",
                  !reduceMotion && !after && "animate-pulse [animation-duration:4s]",
                )}
                loading="lazy"
                decoding="async"
                draggable={false}
              />
              <img
                src={CLEAR.src}
                alt=""
                width={CLEAR.w}
                height={CLEAR.h}
                className={cn(
                  "absolute inset-0 h-full w-full object-contain transition-all duration-700 ease-out",
                  after ? "scale-100 opacity-100" : "scale-75 opacity-0",
                )}
                loading="lazy"
                decoding="async"
                draggable={false}
              />
            </div>

            <div role="group" className="mx-auto mt-6 flex w-full max-w-[340px] rounded-full bg-foreground/[0.07] p-1">
              {options.map(({ value, label, Icon }) => (
                <button
                  key={label}
                  type="button"
                  aria-pressed={after === value}
                  onClick={() => choose(value)}
                  className={cn(
                    "flex flex-1 items-center justify-center gap-2 rounded-full px-3 py-2.5 text-sm font-semibold transition-all duration-300",
                    after === value ? "bg-card text-foreground shadow-sm" : "text-foreground/55",
                  )}
                >
                  <Icon className="h-4 w-4 shrink-0" aria-hidden />
                  {label}
                </button>
              ))}
            </div>
          </div>

          <ul className="grid gap-3" aria-live="polite">
            {ROWS.map((row) => (
              <li key={row} className="rounded-[1.5rem] border border-border bg-card px-5 py-4 sm:px-6">
                <p className="text-xs font-semibold uppercase tracking-[0.1em] text-primary">{t(`compare.row${row}.area`)}</p>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.p
                    key={after ? "after" : "before"}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                    className={cn(
                      "mt-1.5 text-[1.0625rem] leading-snug",
                      after ? "font-medium text-foreground" : "text-muted-foreground",
                    )}
                  >
                    {t(after ? `compare.row${row}.after` : `compare.row${row}.before`)}
                  </motion.p>
                </AnimatePresence>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default CompareSection;
