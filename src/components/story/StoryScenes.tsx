import { useEffect, useRef, type ComponentType } from "react";
import { Player, type PlayerRef } from "@remotion/player";
import { useReducedMotion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import type { Language } from "@/i18n/translations";
import { cn } from "@/lib/utils";
import {
  OverviewScene,
  ParentSyncScene,
  SCENE_FPS,
  SCENE_FRAMES,
  SCENE_SIZE,
  WakeWindowScene,
  type OverviewCopy,
  type SyncCopy,
  type WakeCopy,
} from "./scenes";

type Row<T> = { scene: T; kicker: string; paragraphs: string[]; bullets: string[] };
type Copy = { wake: Row<WakeCopy>; overview: Row<OverviewCopy>; sync: Row<SyncCopy> };

const copy: Record<Language, Copy> = {
  de: {
    wake: {
      scene: { title: "Wachfenster nach Alter", sub: "Richtwerte, Monat für Monat", weeks: "Wo", months: "Mo", minutes: "Minuten wach", regression: "4-Monats-Regression", regressionNote: "Der Schlaf verändert sich. Völlig normal." },
      kicker: "Wachfenster",
      paragraphs: [
        "Moonli zeigt dir, wie lange ein Baby in seinem Alter ungefähr wach sein mag, damit du den nächsten Schlaf nicht verpasst.",
        "Rund um den 4. Monat wird der Schlaf oft unruhiger. Das ist die bekannte 4-Monats-Regression: kein Fehler von euch, sondern ein Entwicklungsschritt. Moonli macht das Muster sichtbar, damit du nicht rätseln musst.",
      ],
      bullets: ["Richtwerte von 0 bis 12 Monaten", "Muster statt Rätselraten"],
    },
    overview: {
      scene: { title: "Alles im Blick", sub: "Drei Dinge, ein Tipp pro Eintrag", more: "… und noch vieles mehr", chips: ["Wachstum", "Zahnen", "Krankheiten", "Abpumpen", "Beikost", "Vitamine", "Aktivitäten", "BLW", "Rezepte"], sleep: "Schlaf", sleepUnit: "heute", food: "Ernährung", foodUnit: "Mahlzeiten", diapers: "Windeln", diapersUnit: "gewechselt" },
      kicker: "Tracking",
      paragraphs: ["Schlaf, Ernährung und Windeln erfasst du mit einem Tipp. Der Tag wird ein Bild, das ihr abends ansehen könnt, statt fünf Listen im Kopf."],
      bullets: ["Schlaf: Nacht und Schläfchen", "Ernährung: Stillen, Flasche, Beikost", "Windeln: jeder Wechsel zählt"],
    },
    sync: {
      scene: { title: "1× bezahlen", sub: "Mama und Papa tracken gleichzeitig", parent1: "Mama", parent2: "Papa", evt1: "Schlaf gestartet", evt2: "Windel gewechselt" },
      kicker: "Eltern-Team",
      paragraphs: ["Ihr bezahlt Premium einmal. Mama und Papa tracken jeweils auf dem eigenen Handy, in Echtzeit, ohne Nachfragen um 22 Uhr."],
      bullets: ["Echtzeit auf beiden Handys", "Care-Arbeit fair teilen"],
    },
  },
  en: {
    wake: {
      scene: { title: "Wake windows by age", sub: "Guide values, month by month", weeks: "wk", months: "mo", minutes: "minutes awake", regression: "4-month regression", regressionNote: "Sleep changes. Totally normal." },
      kicker: "Wake windows",
      paragraphs: [
        "Moonli shows how long a baby of their age is usually happy to stay awake, so the next nap doesn't catch you off guard.",
        "Around month 4, sleep often gets restless. That's the well-known 4-month regression: not your fault, just a developmental step. Moonli makes the pattern visible so you don't have to guess.",
      ],
      bullets: ["Guide values from 0 to 12 months", "Patterns instead of guesswork"],
    },
    overview: {
      scene: { title: "Everything at a glance", sub: "Three things, one tap per entry", more: "…and so much more", chips: ["Growth", "Teething", "Illness", "Pumping", "Solids", "Vitamins", "Activities", "BLW", "Recipes"], sleep: "Sleep", sleepUnit: "today", food: "Feeding", foodUnit: "feeds", diapers: "Diapers", diapersUnit: "changed" },
      kicker: "Tracking",
      paragraphs: ["Log sleep, feeding and diapers with one tap. The day becomes a picture you can look at in the evening instead of five lists in your head."],
      bullets: ["Sleep: night and naps", "Feeding: breast, bottle, solids", "Diapers: every change counts"],
    },
    sync: {
      scene: { title: "Pay once", sub: "Mom and Dad track at the same time", parent1: "Mom", parent2: "Dad", evt1: "Sleep started", evt2: "Diaper changed" },
      kicker: "Parent team",
      paragraphs: ["You pay for Premium once. Mom and Dad each track on their own phone, in real time, with no \"when was the last feed?\" at 10 pm."],
      bullets: ["Real time on both phones", "Share care work fairly"],
    },
  },
  es: {
    wake: {
      scene: { title: "Ventanas de vigilia por edad", sub: "Valores orientativos, mes a mes", weeks: "sem", months: "m", minutes: "minutos despierto", regression: "Regresión de los 4 meses", regressionNote: "El sueño cambia. Es normal." },
      kicker: "Ventanas de vigilia",
      paragraphs: [
        "Moonli muestra cuánto tiempo suele aguantar despierto un bebé de su edad, para que la próxima siesta no te pille por sorpresa.",
        "Hacia el cuarto mes el sueño suele volverse más inquieto. Es la conocida regresión de los 4 meses: no es culpa vuestra, es una etapa del desarrollo. Moonli hace visible el patrón para que no tengas que adivinar.",
      ],
      bullets: ["Valores de 0 a 12 meses", "Patrones en vez de adivinanzas"],
    },
    overview: {
      scene: { title: "Todo de un vistazo", sub: "Tres cosas, un toque por registro", more: "…y mucho más", chips: ["Crecimiento", "Dentición", "Enfermedades", "Sacaleches", "Sólidos", "Vitaminas", "Actividades", "BLW", "Recetas"], sleep: "Sueño", sleepUnit: "hoy", food: "Comida", foodUnit: "tomas", diapers: "Pañales", diapersUnit: "cambiados" },
      kicker: "Registro",
      paragraphs: ["Registra sueño, comida y pañales con un toque. El día se convierte en una imagen que puedes mirar por la noche, en vez de cinco listas en la cabeza."],
      bullets: ["Sueño: noche y siestas", "Comida: pecho, biberón, sólidos", "Pañales: cada cambio cuenta"],
    },
    sync: {
      scene: { title: "Paga una vez", sub: "Mamá y papá registran a la vez", parent1: "Mamá", parent2: "Papá", evt1: "Sueño iniciado", evt2: "Pañal cambiado" },
      kicker: "Equipo de padres",
      paragraphs: ["Pagáis Premium una sola vez. Mamá y papá registran cada uno en su móvil, en tiempo real, sin preguntar a las 22:00 cuándo fue la última toma."],
      bullets: ["Tiempo real en ambos móviles", "Reparto justo de cuidados"],
    },
  },
  fr: {
    wake: {
      scene: { title: "Fenêtres d'éveil par âge", sub: "Repères, mois après mois", weeks: "sem", months: "mois", minutes: "minutes d'éveil", regression: "Régression des 4 mois", regressionNote: "Le sommeil change. C'est normal." },
      kicker: "Fenêtres d'éveil",
      paragraphs: [
        "Moonli montre combien de temps un bébé de cet âge reste en général éveillé, pour que la prochaine sieste ne vous surprenne pas.",
        "Vers le 4e mois, le sommeil devient souvent plus agité. C'est la fameuse régression des 4 mois : pas votre faute, simplement une étape du développement. Moonli rend le schéma visible pour que vous n'ayez plus à deviner.",
      ],
      bullets: ["Repères de 0 à 12 mois", "Des schémas plutôt que des devinettes"],
    },
    overview: {
      scene: { title: "Tout en un coup d'œil", sub: "Trois choses, un geste par entrée", more: "… et bien plus encore", chips: ["Croissance", "Poussées dentaires", "Maladies", "Tire-lait", "Diversification", "Vitamines", "Activités", "DME", "Recettes"], sleep: "Sommeil", sleepUnit: "aujourd'hui", food: "Repas", foodUnit: "repas", diapers: "Couches", diapersUnit: "changées" },
      kicker: "Suivi",
      paragraphs: ["Notez sommeil, repas et couches en un geste. La journée devient une image à regarder le soir, au lieu de cinq listes dans la tête."],
      bullets: ["Sommeil : nuit et siestes", "Repas : sein, biberon, diversification", "Couches : chaque change compte"],
    },
    sync: {
      scene: { title: "Payez une fois", sub: "Maman et papa notent en même temps", parent1: "Maman", parent2: "Papa", evt1: "Sommeil démarré", evt2: "Couche changée" },
      kicker: "Équipe de parents",
      paragraphs: ["Vous payez Premium une seule fois. Maman et papa notent chacun sur leur téléphone, en temps réel, sans demander à 22 h quand était le dernier repas."],
      bullets: ["Temps réel sur les deux téléphones", "Partager équitablement les soins"],
    },
  },
  ru: {
    wake: {
      scene: { title: "Окна бодрствования по возрасту", sub: "Ориентиры, месяц за месяцем", weeks: "нед", months: "мес", minutes: "минут бодрствования", regression: "Регресс 4 месяцев", regressionNote: "Сон меняется. Это нормально." },
      kicker: "Окна бодрствования",
      paragraphs: [
        "Moonli показывает, сколько малыш своего возраста обычно бодрствует, чтобы следующий сон не застал вас врасплох.",
        "Около 4-го месяца сон часто становится беспокойнее. Это известный регресс 4 месяцев: не ваша вина, а этап развития. Moonli делает закономерность видимой, чтобы не приходилось гадать.",
      ],
      bullets: ["Ориентиры от 0 до 12 месяцев", "Закономерности вместо догадок"],
    },
    overview: {
      scene: { title: "Всё на виду", sub: "Три вещи, одно касание на запись", more: "… и многое другое", chips: ["Рост", "Зубки", "Болезни", "Сцеживание", "Прикорм", "Витамины", "Занятия", "BLW", "Рецепты"], sleep: "Сон", sleepUnit: "сегодня", food: "Питание", foodUnit: "кормлений", diapers: "Подгузники", diapersUnit: "сменено" },
      kicker: "Трекинг",
      paragraphs: ["Записывайте сон, питание и подгузники одним касанием. День превращается в картинку, которую можно посмотреть вечером, вместо пяти списков в голове."],
      bullets: ["Сон: ночь и дневные сны", "Питание: грудь, бутылочка, прикорм", "Подгузники: каждая смена на счету"],
    },
    sync: {
      scene: { title: "Платите один раз", sub: "Мама и папа ведут записи одновременно", parent1: "Мама", parent2: "Папа", evt1: "Сон начался", evt2: "Подгузник сменён" },
      kicker: "Команда родителей",
      paragraphs: ["Вы платите за Premium один раз. Мама и папа ведут записи каждый на своём телефоне, в реальном времени, без вопросов в 22:00."],
      bullets: ["Реальное время на обоих телефонах", "Справедливо делить заботу"],
    },
  },
};

const ScenePlayer = ({ component, inputProps, label }: { component: ComponentType<any>; inputProps: object; label: string }) => {
  const ref = useRef<PlayerRef>(null);
  const wrap = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const el = wrap.current;
    if (!el || reduceMotion) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) ref.current?.play();
        else ref.current?.pause();
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduceMotion]);

  return (
    <div
      ref={wrap}
      role="img"
      aria-label={label}
      className="overflow-hidden rounded-[2rem] border border-border/60 shadow-[0_24px_60px_-28px_hsl(var(--foreground)/0.5)]"
    >
      <Player
        ref={ref}
        component={component}
        inputProps={inputProps}
        durationInFrames={SCENE_FRAMES}
        fps={SCENE_FPS}
        compositionWidth={SCENE_SIZE}
        compositionHeight={SCENE_SIZE}
        loop
        controls={false}
        clickToPlay={false}
        initialFrame={reduceMotion ? SCENE_FRAMES - 1 : 0}
        style={{ width: "100%", aspectRatio: "1 / 1" }}
      />
    </div>
  );
};

const StoryRow = <T,>({ row, component, flip }: { row: Row<T>; component: ComponentType<any>; flip?: boolean }) => (
  <div className="grid items-center gap-8 md:grid-cols-2 md:gap-14">
    <div className={cn("mx-auto w-full max-w-[560px]", flip && "md:order-2")}>
      <ScenePlayer component={component} inputProps={{ copy: row.scene }} label={(row.scene as { title: string }).title} />
    </div>
    <div className={cn("max-w-[48ch]", flip && "md:order-1 md:justify-self-end")}>
      <p className="text-sm font-semibold uppercase tracking-[0.12em] text-primary">{row.kicker}</p>
      <h2 className="mt-3 text-balance text-[1.9rem] font-semibold leading-[1.1] tracking-[-0.03em] text-foreground sm:text-[2.3rem]">
        {(row.scene as { title: string }).title}
      </h2>
      {row.paragraphs.map((p) => (
        <p key={p} className="mt-4 text-[1.0625rem] leading-relaxed text-muted-foreground">
          {p}
        </p>
      ))}
      <ul className="mt-6 flex flex-wrap gap-2">
        {row.bullets.map((b) => (
          <li key={b} className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground/85">
            {b}
          </li>
        ))}
      </ul>
    </div>
  </div>
);

const StoryScenes = () => {
  const { language } = useLanguage();
  const c = copy[language] ?? copy.en;

  return (
    <section className="relative py-16 sm:py-24">
      <div className="container">
        <div className="space-y-16 sm:space-y-24">
          <StoryRow row={c.wake} component={WakeWindowScene} />
          <StoryRow row={c.overview} component={OverviewScene} flip />
          <StoryRow row={c.sync} component={ParentSyncScene} />
        </div>
      </div>
    </section>
  );
};

export default StoryScenes;
