import type { GuideLang, TopicId } from "./guidePaths";

export const FEATURE_IDS = [
  "sleep-tracking",
  "wake-windows",
  "reminders",
  "feeding",
  "solids",
  "growth",
  "quick-buttons",
  "parent-sync",
  "info-hub",
  "stories",
  "white-noise",
  "quality-time",
  "voices",
  "dark-mode",
  "three-am",
  "wellbeing",
] as const;

export type FeatureId = (typeof FEATURE_IDS)[number];

export const FEATURE_GROUPS = ["day", "together", "calm", "parents"] as const;

export type FeatureGroup = (typeof FEATURE_GROUPS)[number];

export const FEATURE_META: Record<FeatureId, { topic: TopicId; group: FeatureGroup }> = {
  "sleep-tracking": { topic: "wake-windows", group: "day" },
  "wake-windows": { topic: "wake-windows", group: "day" },
  reminders: { topic: "wake-windows", group: "day" },
  feeding: { topic: "feeding", group: "day" },
  solids: { topic: "solids", group: "day" },
  growth: { topic: "growth", group: "day" },
  "quick-buttons": { topic: "feeding", group: "day" },
  "parent-sync": { topic: "care-work", group: "together" },
  "info-hub": { topic: "sleep-routines", group: "together" },
  stories: { topic: "calm-screen", group: "calm" },
  "white-noise": { topic: "calm-screen", group: "calm" },
  "quality-time": { topic: "calm-screen", group: "calm" },
  voices: { topic: "calm-screen", group: "calm" },
  "dark-mode": { topic: "night-exhaustion", group: "parents" },
  "three-am": { topic: "night-exhaustion", group: "parents" },
  wellbeing: { topic: "night-exhaustion", group: "parents" },
};

type FeatureCopy = { title: string; text: string };
type GroupCopy = { title: string; intro: string };

export type OverviewCopy = {
  seoTitle: string;
  description: string;
  h1: string;
  intro: string;
  groups: Record<FeatureGroup, GroupCopy>;
  features: Record<FeatureId, FeatureCopy>;
};

const de: OverviewCopy = {
  seoTitle: "Alle Moonli Funktionen im Überblick | Moonli",
  description:
    "Schlaftracking, Wachfenster, Stillen, WHO-Kurven und Parent-Sync. Welche Moonli-Funktion den Alltag trägt und was dauerhaft kostenlos bleibt.",
  h1: "Alle Funktionen von Moonli",
  intro:
    "Moonli bündelt den Babyalltag an einem Ort: Schlaf, Mahlzeiten, Windeln, Wachstum und die Menschen, die das Kind gemeinsam tragen. Tracking bleibt kostenlos. Die Übersicht zeigt, welche Funktion welche Frage löst.",
  groups: {
    day: {
      title: "Schlaf, Essen und Wachstum",
      intro: "Der Tag wird sichtbar, ohne Tabelle und ohne Abo fürs Tracking.",
    },
    together: {
      title: "Beide Eltern, ein Stand",
      intro: "Was einer festhält, sieht der andere. Phasenwissen liegt daneben, nicht in einem zweiten Tab.",
    },
    calm: {
      title: "Ruhe ohne Bildschirm in der Hand",
      intro: "Klänge, Geschichten und kurze Rituale, wenn nichts mehr geht.",
    },
    parents: {
      title: "Für die, die nachts wach sind",
      intro: "Die App kann das Baby nicht schlafen legen. Sie kann die Nacht für euch leiser machen.",
    },
  },
  features: {
    "sleep-tracking": {
      title: "Schlaftracking",
      text: "Schlafbeginn und -ende mit einem Tipp. Am Abend siehst du, wann das letzte Schläfchen war.",
    },
    "wake-windows": {
      title: "Wachfenster",
      text: "Altersgerechte Orientierung, wann ein Baby wieder müde sein könnte. Ein Richtwert, kein Gesetz.",
    },
    reminders: {
      title: "Erinnerungen",
      text: "Push fürs nächste Schläfchen, Stillen oder Wickeln. Nur das, was ihr einschaltet.",
    },
    feeding: {
      title: "Stillen und Fläschchen",
      text: "Seite, Dauer oder Menge festgehalten, damit die Nacht nicht aus dem Gedächtnis rekonstruiert werden muss.",
    },
    solids: {
      title: "Beikost",
      text: "Den Teller aus über 100 Lebensmitteln füllen und merken, was drauf war. Ein Protokoll, kein Ernährungsplan.",
    },
    growth: {
      title: "WHO-Kurven",
      text: "Gewicht und Größe auf Perzentilen, neben Schlaf und Essen, nicht in einer eigenen Tabelle.",
    },
    "quick-buttons": {
      title: "Quick-Buttons",
      text: "Du legst fest, was ein Tipp erfasst. Der Alltag bestimmt die Leiste, nicht eine Vorlage.",
    },
    "parent-sync": {
      title: "Parent-Sync",
      text: "Beide Eltern sehen denselben Stand in Echtzeit. Care-Arbeit wird sichtbar, statt im Kopf einer Person zu bleiben.",
    },
    "info-hub": {
      title: "Info-Hub",
      text: "In welcher Phase das Baby gerade steckt, kurz erklärt, statt um drei Uhr zu suchen.",
    },
    stories: {
      title: "Gute-Nacht-Geschichten",
      text: "Kurze, reizarme Geschichten für den Abschluss des Tages.",
    },
    "white-noise": {
      title: "White Noise und Klänge",
      text: "Gleichmäßige Geräusche an einem Ort, wenn Stille zu unruhig ist.",
    },
    "quality-time": {
      title: "Handy weg",
      text: "Eine Erinnerung, das Telefon wegzulegen, und der Überblick bleibt trotzdem erhalten.",
    },
    voices: {
      title: "Stimmen von Oma und Opa",
      text: "Vertraute Stimmen aufnehmen und abspielen, wenn die Person nicht im Raum ist.",
    },
    "dark-mode": {
      title: "Dark Mode",
      text: "Ein dunkler Bildschirm für die Nachtfütterung, damit das Licht euch nicht wacher macht als nötig.",
    },
    "three-am": {
      title: "3-AM-Club",
      text: "Ein Blick darauf, dass andere Eltern gerade auch wach sind und tracken.",
    },
    wellbeing: {
      title: "Energie-Check und kurze Übungen",
      text: "Ein kurzer Check, wie es dir geht, plus Atem- und Ruheübungen. Entlastung, keine Therapie.",
    },
  },
};

const en: OverviewCopy = {
  seoTitle: "Every Moonli feature, in one list | Moonli",
  description:
    "Sleep tracking, wake windows, feeding, WHO curves and parent sync. What each Moonli feature is for, and what stays free.",
  h1: "Every Moonli feature",
  intro:
    "Moonli keeps the baby day in one place: sleep, feeds, diapers, growth and the two adults sharing the work. Tracking stays free. This page shows which feature answers which question.",
  groups: {
    day: {
      title: "Sleep, food and growth",
      intro: "The day becomes visible without a spreadsheet and without a subscription for tracking.",
    },
    together: {
      title: "Both parents, one record",
      intro: "What one person logs, the other sees. Phase notes sit next to it.",
    },
    calm: {
      title: "Calm without a screen in their hands",
      intro: "Sound, stories and short rituals when nothing else works.",
    },
    parents: {
      title: "For the adult who is awake",
      intro: "The app cannot put the baby to sleep. It can make the night quieter for you.",
    },
  },
  features: {
    "sleep-tracking": {
      title: "Sleep tracking",
      text: "Start and stop sleep with one tap. By evening you can see when the last nap ended.",
    },
    "wake-windows": {
      title: "Wake windows",
      text: "Age-based guidance for when a baby may be tired again. A range, not a rule.",
    },
    reminders: {
      title: "Reminders",
      text: "A nudge for the next nap, feed or diaper change. Only what you turn on.",
    },
    feeding: {
      title: "Breast and bottle",
      text: "Side, length or amount, so the night does not have to be rebuilt from memory.",
    },
    solids: {
      title: "Solids",
      text: "Fill the plate from more than 100 foods and keep what was on it. A log, not a meal plan.",
    },
    growth: {
      title: "WHO curves",
      text: "Weight and length on percentiles, next to sleep and feeds.",
    },
    "quick-buttons": {
      title: "Quick buttons",
      text: "You choose what one tap records. Your day sets the bar, not a template.",
    },
    "parent-sync": {
      title: "Parent sync",
      text: "Both parents see the same record in real time. Care work stops living in one person's head.",
    },
    "info-hub": {
      title: "Info hub",
      text: "Which phase the baby is in, explained briefly, instead of a search at 3 a.m.",
    },
    stories: {
      title: "Bedtime stories",
      text: "Short, low-stimulation stories to close the day.",
    },
    "white-noise": {
      title: "White noise and sounds",
      text: "Steady sound in one place when silence feels too busy.",
    },
    "quality-time": {
      title: "Phone down",
      text: "A prompt to put the phone away while the record of the day stays intact.",
    },
    voices: {
      title: "Grandparent voices",
      text: "Record a familiar voice and play it when that person is not in the room.",
    },
    "dark-mode": {
      title: "Dark mode",
      text: "A dark screen for night feeds, so the light does not wake you more than the baby did.",
    },
    "three-am": {
      title: "3 a.m. club",
      text: "A look at other parents who are awake and logging too.",
    },
    wellbeing: {
      title: "Energy check and short exercises",
      text: "A quick check on how you are, plus breathing and rest. Relief, not therapy.",
    },
  },
};

const es: OverviewCopy = {
  seoTitle: "Todas las funciones de Moonli | Moonli",
  description:
    "Seguimiento del sueño, ventanas de sueño, tomas, curvas OMS y sincronización entre padres. Qué hace cada función y qué sigue siendo gratis.",
  h1: "Todas las funciones de Moonli",
  intro:
    "Moonli junta el día del bebé en un solo lugar: sueño, tomas, pañales, crecimiento y las dos personas que cuidan. El seguimiento es gratis. Aquí ves qué función responde a qué pregunta.",
  groups: {
    day: {
      title: "Sueño, comida y crecimiento",
      intro: "El día se ve sin una hoja de cálculo y sin suscripción para el seguimiento.",
    },
    together: {
      title: "Los dos progenitores, un mismo registro",
      intro: "Lo que anota una persona lo ve la otra. La fase del bebé está al lado.",
    },
    calm: {
      title: "Calma sin una pantalla en las manos",
      intro: "Sonido, cuentos y rituales cortos cuando ya no queda nada más.",
    },
    parents: {
      title: "Para quien está despierto",
      intro: "La app no duerme al bebé. Puede hacer la noche más silenciosa para ti.",
    },
  },
  features: {
    "sleep-tracking": {
      title: "Seguimiento del sueño",
      text: "Inicio y fin del sueño con un toque. Por la tarde ves cuándo fue la última siesta.",
    },
    "wake-windows": {
      title: "Ventanas de sueño",
      text: "Una orientación por edad de cuándo puede volver el cansancio. Un rango, no una norma.",
    },
    reminders: {
      title: "Recordatorios",
      text: "Un aviso para la siguiente siesta, toma o pañal. Solo lo que activas.",
    },
    feeding: {
      title: "Pecho y biberón",
      text: "Lado, duración o cantidad, para no reconstruir la noche de memoria.",
    },
    solids: {
      title: "Alimentación complementaria",
      text: "Llena el plato con más de 100 alimentos y guarda lo que había. Un registro, no un menú.",
    },
    growth: {
      title: "Curvas OMS",
      text: "Peso y talla en percentiles, junto al sueño y las tomas.",
    },
    "quick-buttons": {
      title: "Botones rápidos",
      text: "Tú eliges qué guarda un toque. El día manda, no una plantilla.",
    },
    "parent-sync": {
      title: "Sincronización entre padres",
      text: "Las dos personas ven el mismo registro al momento. El cuidado deja de vivir en una sola cabeza.",
    },
    "info-hub": {
      title: "Info hub",
      text: "En qué fase está el bebé, en corto, en lugar de buscar a las tres de la mañana.",
    },
    stories: {
      title: "Cuentos para dormir",
      text: "Historias cortas y tranquilas para cerrar el día.",
    },
    "white-noise": {
      title: "Ruido blanco y sonidos",
      text: "Un sonido constante en un solo sitio, cuando el silencio inquieta.",
    },
    "quality-time": {
      title: "Móvil a un lado",
      text: "Un aviso para dejar el teléfono, sin perder el registro del día.",
    },
    voices: {
      title: "Voces de los abuelos",
      text: "Grabar una voz conocida y escucharla cuando esa persona no está.",
    },
    "dark-mode": {
      title: "Modo oscuro",
      text: "Una pantalla oscura para la toma nocturna, para que la luz no os despierte de más.",
    },
    "three-am": {
      title: "Club de las 3",
      text: "Ver que otras familias también están despiertas y registrando.",
    },
    wellbeing: {
      title: "Chequeo de energía y ejercicios cortos",
      text: "Un vistazo a cómo estás, más respiración y pausas. Alivio, no terapia.",
    },
  },
};

const fr: OverviewCopy = {
  seoTitle: "Toutes les fonctions Moonli | Moonli",
  description:
    "Suivi du sommeil, fenêtres d'éveil, tétées, courbes OMS et synchro parentale. À quoi sert chaque fonction, et ce qui reste gratuit.",
  h1: "Toutes les fonctions de Moonli",
  intro:
    "Moonli réunit la journée de bébé au même endroit : sommeil, repas, couches, croissance et les deux adultes qui portent le soin. Le suivi reste gratuit. Cette page dit quelle fonction répond à quelle question.",
  groups: {
    day: {
      title: "Sommeil, repas et croissance",
      intro: "La journée devient lisible sans tableur et sans abonnement pour le suivi.",
    },
    together: {
      title: "Les deux parents, un seul suivi",
      intro: "Ce que l'un note, l'autre le voit. La phase du bébé est à côté.",
    },
    calm: {
      title: "Du calme sans écran dans les mains",
      intro: "Sons, histoires et rituels courts quand plus rien ne marche.",
    },
    parents: {
      title: "Pour l'adulte qui est réveillé",
      intro: "L'app n'endort pas le bébé. Elle peut rendre la nuit plus silencieuse pour toi.",
    },
  },
  features: {
    "sleep-tracking": {
      title: "Suivi du sommeil",
      text: "Début et fin de sommeil en un toucher. Le soir, tu vois quand la dernière sieste s'est terminée.",
    },
    "wake-windows": {
      title: "Fenêtres d'éveil",
      text: "Un repère selon l'âge pour le prochain coup de fatigue. Une fourchette, pas une règle.",
    },
    reminders: {
      title: "Rappels",
      text: "Une alerte pour la prochaine sieste, tétée ou couche. Seulement ce que tu actives.",
    },
    feeding: {
      title: "Allaitement et biberon",
      text: "Côté, durée ou quantité, pour ne pas reconstruire la nuit de mémoire.",
    },
    solids: {
      title: "Diversification",
      text: "Remplir l'assiette parmi plus de 100 aliments et garder ce qu'il y avait. Un journal, pas un menu.",
    },
    growth: {
      title: "Courbes OMS",
      text: "Poids et taille en percentiles, à côté du sommeil et des repas.",
    },
    "quick-buttons": {
      title: "Boutons rapides",
      text: "Tu choisis ce qu'un toucher enregistre. La journée décide, pas un modèle.",
    },
    "parent-sync": {
      title: "Synchro parentale",
      text: "Les deux parents voient le même suivi en temps réel. Le soin ne reste plus dans une seule tête.",
    },
    "info-hub": {
      title: "Info hub",
      text: "La phase du bébé, en bref, au lieu d'une recherche à 3 heures.",
    },
    stories: {
      title: "Histoires du soir",
      text: "Des histoires courtes et calmes pour fermer la journée.",
    },
    "white-noise": {
      title: "Bruit blanc et sons",
      text: "Un son régulier au même endroit, quand le silence agite.",
    },
    "quality-time": {
      title: "Téléphone posé",
      text: "Une invitation à poser le téléphone, sans perdre le fil de la journée.",
    },
    voices: {
      title: "Voix des grands-parents",
      text: "Enregistrer une voix connue et la jouer quand la personne n'est pas là.",
    },
    "dark-mode": {
      title: "Mode sombre",
      text: "Un écran sombre pour la tétée de nuit, pour que la lumière ne vous réveille pas plus que bébé.",
    },
    "three-am": {
      title: "Club de 3 heures",
      text: "Voir que d'autres parents sont aussi réveillés et notent.",
    },
    wellbeing: {
      title: "Check d'énergie et exercices courts",
      text: "Un regard sur comment tu vas, plus respiration et pauses. Un soulagement, pas une thérapie.",
    },
  },
};

const ru: OverviewCopy = {
  seoTitle: "Все функции Moonli в одном списке | Moonli",
  description:
    "Трекинг сна, окна бодрствования, кормления, кривые ВОЗ и синхронизация родителей. Какая функция за что отвечает и что остаётся бесплатным.",
  h1: "Все функции Moonli",
  intro:
    "Moonli собирает день с малышом в одном месте: сон, кормления, подгузники, рост и двое взрослых, которые делят заботу. Трекинг бесплатный. Здесь видно, какая функция отвечает на какой вопрос.",
  groups: {
    day: {
      title: "Сон, еда и рост",
      intro: "День становится видимым без таблицы и без подписки на трекинг.",
    },
    together: {
      title: "Оба родителя, одна запись",
      intro: "Что отметил один, видит другой. Фаза малыша лежит рядом.",
    },
    calm: {
      title: "Спокойствие без экрана в руках",
      intro: "Звук, истории и короткие ритуалы, когда больше ничего не помогает.",
    },
    parents: {
      title: "Для того, кто не спит",
      intro: "Приложение не укладывает малыша. Оно может сделать ночь тише для вас.",
    },
  },
  features: {
    "sleep-tracking": {
      title: "Трекинг сна",
      text: "Начало и конец сна одним касанием. К вечеру видно, когда закончился последний сон.",
    },
    "wake-windows": {
      title: "Окна бодрствования",
      text: "Ориентир по возрасту, когда малыш снова может устать. Диапазон, не правило.",
    },
    reminders: {
      title: "Напоминания",
      text: "Сигнал к следующему сну, кормлению или подгузнику. Только то, что вы включили.",
    },
    feeding: {
      title: "Грудь и бутылочка",
      text: "Сторона, длительность или объём, чтобы не восстанавливать ночь по памяти.",
    },
    solids: {
      title: "Прикорм",
      text: "Собрать тарелку из более чем 100 продуктов и сохранить, что на ней было. Журнал, не меню.",
    },
    growth: {
      title: "Кривые ВОЗ",
      text: "Вес и рост в перцентилях, рядом со сном и кормлениями.",
    },
    "quick-buttons": {
      title: "Быстрые кнопки",
      text: "Вы сами решаете, что записывает одно касание. День задаёт панель, не шаблон.",
    },
    "parent-sync": {
      title: "Синхронизация родителей",
      text: "Оба родителя видят одну запись сразу. Забота перестаёт жить в одной голове.",
    },
    "info-hub": {
      title: "Инфо-хаб",
      text: "В какой фазе малыш, коротко, вместо поиска в три часа ночи.",
    },
    stories: {
      title: "Сказки на ночь",
      text: "Короткие спокойные истории, чтобы закрыть день.",
    },
    "white-noise": {
      title: "Белый шум и звуки",
      text: "Ровный звук в одном месте, когда тишина слишком беспокойная.",
    },
    "quality-time": {
      title: "Телефон в сторону",
      text: "Напоминание отложить телефон, не теряя картину дня.",
    },
    voices: {
      title: "Голоса бабушки и дедушки",
      text: "Записать знакомый голос и включить его, когда человека нет рядом.",
    },
    "dark-mode": {
      title: "Тёмная тема",
      text: "Тёмный экран для ночного кормления, чтобы свет не будил сильнее, чем малыш.",
    },
    "three-am": {
      title: "Клуб трёх часов",
      text: "Взгляд на других родителей, которые тоже не спят и отмечают.",
    },
    wellbeing: {
      title: "Проверка энергии и короткие упражнения",
      text: "Короткий взгляд, как вы себя чувствуете, плюс дыхание и паузы. Опора, не терапия.",
    },
  },
};

export const OVERVIEW: Record<GuideLang, OverviewCopy> = { de, en, es, fr, ru };

export function isFeatureId(value: string): value is FeatureId {
  return (FEATURE_IDS as readonly string[]).includes(value);
}
