import { Moon } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import type { Language } from "@/i18n/translations";

/**
 * Everyday situations and the feature that helps, deliberately without invented names or quotes:
 * fake customer reviews are unlawful in Austria and the EU. Add real reviews here only once they exist.
 */
type Moment = { when: string; text: string; feature: string; premium: boolean };
type Copy = { heading: string; moments: Moment[] };

const copy: Record<Language, Copy> = {
  de: {
    heading: "Gebaut für Momente wie diese.",
    moments: [
      { when: "04:30 Uhr", text: "Wann war die letzte Stillzeit? Dein Partner hat sie schon eingetragen. Du schaust nur nach.", feature: "Eltern-Team", premium: true },
      { when: "Die Nachtflasche", text: "Wer steht auf? Das Ehren-Rad entscheidet fair. Ein Kompliment danach tut gut.", feature: "Ehren-Rad", premium: true },
      { when: "Vor dem Mittagsschlaf", text: "Ist mein Baby schon müde? Moonli lernt aus jedem Schläfchen und zeigt dir, wann das Fenster zugeht.", feature: "Schlaffenster", premium: true },
      { when: "Vor dem Arzttermin", text: "Termin im Kalender, Wachstum und Fieberverlauf griffbereit. Kein Zettelsuchen im Wartezimmer.", feature: "Kalender & Tracking", premium: true },
      { when: "Gute Nacht", text: "Eine ruhige Geschichte, ein Schlaflied, gedimmtes Licht. Das Abendritual in einer App.", feature: "Geschichten & Lieder", premium: false },
      { when: "Wenn alles zu viel wird", text: "Zwei Minuten Atemübung oder ein kurzer Energiecheck. Auch Mama und Papa verdienen Entlastung.", feature: "Elternbereich", premium: true },
    ],
  },
  en: {
    heading: "Built for moments like these.",
    moments: [
      { when: "4:30 am", text: "When was the last feed? Your partner already logged it. You just check.", feature: "Parent team", premium: true },
      { when: "The night bottle", text: "Whose turn is it? The wheel of honor decides fairly. A compliment afterwards helps.", feature: "Wheel of honor", premium: true },
      { when: "Before the nap", text: "Is my baby tired yet? Moonli learns from every nap and shows when the window is closing.", feature: "Wake window", premium: true },
      { when: "Before the check-up", text: "Appointment in the calendar, growth and fever history at hand. No hunting for notes in the waiting room.", feature: "Calendar & tracking", premium: true },
      { when: "Goodnight", text: "A calm story, a lullaby, dimmed light. The bedtime routine in one app.", feature: "Stories & songs", premium: false },
      { when: "When it all gets too much", text: "A two-minute breathing exercise or a quick energy check. Mom and dad deserve relief too.", feature: "Parents' space", premium: true },
    ],
  },
  es: {
    heading: "Hecha para momentos como estos.",
    moments: [
      { when: "4:30 de la mañana", text: "¿Cuándo fue la última toma? Tu pareja ya la anotó. Tú solo miras.", feature: "Equipo de padres", premium: true },
      { when: "El biberón de la noche", text: "¿A quién le toca? La rueda de honor decide con justicia. Un cumplido después sienta bien.", feature: "Rueda de honor", premium: true },
      { when: "Antes de la siesta", text: "¿Ya tiene sueño? Moonli aprende de cada siesta y te muestra cuándo se cierra la ventana.", feature: "Ventana de vigilia", premium: true },
      { when: "Antes de la revisión", text: "La cita en el calendario, crecimiento y fiebre a mano. Sin buscar apuntes en la sala de espera.", feature: "Calendario y registro", premium: true },
      { when: "Buenas noches", text: "Un cuento tranquilo, una nana, luz tenue. La rutina de dormir en una sola app.", feature: "Cuentos y canciones", premium: false },
      { when: "Cuando todo es demasiado", text: "Dos minutos de respiración o un chequeo rápido de energía. Mamá y papá también merecen alivio.", feature: "Espacio para padres", premium: true },
    ],
  },
  fr: {
    heading: "Pensée pour des moments comme ceux-ci.",
    moments: [
      { when: "4 h 30 du matin", text: "C’était quand, le dernier repas ? Ton partenaire l’a déjà noté. Tu n’as qu’à regarder.", feature: "Équipe de parents", premium: true },
      { when: "Le biberon de nuit", text: "À qui le tour ? La roue d’honneur tranche équitablement. Un compliment ensuite fait du bien.", feature: "Roue d’honneur", premium: true },
      { when: "Avant la sieste", text: "Mon bébé est-il déjà fatigué ? Moonli apprend de chaque sieste et montre quand la fenêtre se referme.", feature: "Fenêtre d’éveil", premium: true },
      { when: "Avant le rendez-vous médical", text: "Le rendez-vous dans l’agenda, croissance et fièvre à portée de main. Plus de notes à chercher en salle d’attente.", feature: "Agenda et suivi", premium: true },
      { when: "Bonne nuit", text: "Une histoire calme, une berceuse, une lumière douce. Le rituel du coucher dans une seule app.", feature: "Histoires et chansons", premium: false },
      { when: "Quand tout devient trop", text: "Deux minutes de respiration ou un petit bilan d’énergie. Maman et papa méritent aussi du répit.", feature: "Espace parents", premium: true },
    ],
  },
  ru: {
    heading: "Создано для таких моментов.",
    moments: [
      { when: "4:30 утра", text: "Когда было последнее кормление? Партнёр уже записал. Ты просто смотришь.", feature: "Команда родителей", premium: true },
      { when: "Ночная бутылочка", text: "Чья очередь? Колесо почёта решает справедливо. Комплимент после этого приятен.", feature: "Колесо почёта", premium: true },
      { when: "Перед дневным сном", text: "Малыш уже устал? Moonli учится на каждом сне и показывает, когда окно закрывается.", feature: "Окно бодрствования", premium: true },
      { when: "Перед визитом к врачу", text: "Приём в календаре, рост и температура под рукой. Не нужно искать записи в очереди.", feature: "Календарь и трекинг", premium: true },
      { when: "Спокойной ночи", text: "Тихая сказка, колыбельная, приглушённый свет. Вечерний ритуал в одном приложении.", feature: "Сказки и песни", premium: false },
      { when: "Когда всего слишком много", text: "Две минуты дыхательных упражнений или быстрый чек энергии. Маме и папе тоже нужна разгрузка.", feature: "Пространство для родителей", premium: true },
    ],
  },
};

const Testimonials = () => {
  const { language } = useLanguage();
  const c = copy[language] ?? copy.en;

  return (
    <section className="relative overflow-x-clip py-16 md:py-24">
      <div className="container relative z-10">
        <div className="mb-8 flex items-center gap-3 md:mb-12">
          <Moon className="h-7 w-7 shrink-0 fill-primary text-primary md:h-9 md:w-9" aria-hidden />
          <h2 className="text-display-md text-balance text-foreground">{c.heading}</h2>
        </div>

        <ul className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-2 md:gap-5 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-3 [&::-webkit-scrollbar]:hidden">
          {c.moments.map((moment) => (
            <li key={moment.when} className="flex w-[84%] shrink-0 snap-center sm:w-[60%] md:w-auto md:shrink">
              <article className="quote-card flex w-full flex-col rounded-[1.75rem] border border-border bg-card p-6 sm:p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">{moment.when}</p>
                <p className="mt-4 text-[1.2rem] font-medium leading-[1.35] tracking-[-0.02em] text-foreground sm:text-[1.28rem]">
                  {moment.text}
                </p>
                <div className="mt-auto flex flex-wrap items-center gap-2 pt-7">
                  <span className="rounded-full bg-foreground/[0.06] px-3 py-1.5 text-[13px] font-semibold text-foreground/80">
                    {moment.feature}
                  </span>
                  {moment.premium && (
                    <span className="rounded-full bg-primary/15 px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.1em] text-primary">
                      Premium
                    </span>
                  )}
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Testimonials;
