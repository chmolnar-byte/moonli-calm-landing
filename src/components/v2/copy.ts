import type { Language } from "@/i18n/translations";

export type StageBeat = {
  time: string;
  kicker: string;
  title: string;
  body: string;
  ghost: string;
};

type PageCopy = {
  navNight: string;
  navYou: string;
  navPrice: string;
  navLoad: string;
  eyebrow: string;
  h1a: string;
  h1b: string;
  h1c: string;
  lede: string;
  beats: StageBeat[];
  youTitle: string;
  youBody: string;
  facts: { label: string; text: string }[];
  freeKicker: string;
  freeTitle: string;
  freeBody: string;
  closeTitle: string;
  closeBody: string;
  priceTitle: string;
};

const de: PageCopy = {
  navNight: "Nacht",
  navYou: "Für dich",
  navPrice: "Preise",
  navLoad: "Laden",
  eyebrow: "Für Mütter. Ab der ersten Nacht.",
  h1a: "Es ist 4:40.",
  h1b: "Du musst dir",
  h1c: "nichts merken.",
  lede: "Schlaf, Stillen, Windeln. Ein Tipp. Dein Partner sieht denselben Stand, noch bevor du fragst.",
  beats: [
    {
      time: "04:40",
      kicker: "Stillen",
      title: "Die letzte Mahlzeit steht schon.",
      body: "Du schaust nur noch. Eingetragen, auch wenn du es nicht warst.",
      ghost: "STILLT",
    },
    {
      time: "07:15",
      kicker: "Die Woche",
      title: "Nichts zum Zusammenrechnen.",
      body: "Schlaf, Windeln, Stillen. Die Woche liegt da, ohne Tabelle.",
      ghost: "WOCHE",
    },
    {
      time: "Jetzt",
      kicker: "Dein Baby",
      title: "Du siehst, welche Phase gerade läuft.",
      body: "Nicht um drei Uhr suchen. Im Info-Hub, passend zum Alter.",
      ghost: "PHASE",
    },
  ],
  youTitle: "Halb fünf. Und du musst niemanden wecken, um zu fragen.",
  youBody: "Moonli ist für die Mutter, die den Überblick hat, auch wenn der Kopf voll ist.",
  facts: [
    { label: "Ein Tipp", text: "Schlaf, Stillen, Windeln. So, wie eure Nacht wirklich läuft." },
    { label: "Beide", text: "Dein Partner sieht denselben Stand. Live, auf seinem Handy." },
    { label: "0 €", text: "Das Tracking bleibt. Ohne Abo, ohne Kleingedrucktes am Schlaf." },
  ],
  freeKicker: "Für immer",
  freeTitle: "Tracking bleibt kostenlos.",
  freeBody: "Weil jede Mutter wissen darf, wann das Baby geschlafen hat. Ohne Monatspreis.",
  closeTitle: "Hol es dir, bevor die nächste Nacht kommt.",
  closeBody: "Kostenlos für iOS und Android. Gebaut in Wien.",
  priceTitle: "Zwei Modi. Ein klarer.",
};

const en: PageCopy = {
  navNight: "Night",
  navYou: "For you",
  navPrice: "Pricing",
  navLoad: "Get it",
  eyebrow: "For mothers. From the first night.",
  h1a: "It’s 4:40.",
  h1b: "You don’t have",
  h1c: "to remember.",
  lede: "Sleep, feeds, diapers. One tap. Your partner sees the same picture before you have to ask.",
  beats: [
    {
      time: "04:40",
      kicker: "Feeding",
      title: "The last feed is already there.",
      body: "You only look. Logged, even when you weren’t the one who did it.",
      ghost: "FEED",
    },
    {
      time: "07:15",
      kicker: "The week",
      title: "Nothing to add up.",
      body: "Sleep, diapers, feeds. The week is just there. No spreadsheet.",
      ghost: "WEEK",
    },
    {
      time: "Now",
      kicker: "Your baby",
      title: "You can see which phase this is.",
      body: "No searching at 3 a.m. The info hub matches their age.",
      ghost: "PHASE",
    },
  ],
  youTitle: "Half past four. And you don’t have to wake anyone to ask.",
  youBody: "Moonli is for the mother who still has the picture, even when her head is full.",
  facts: [
    { label: "One tap", text: "Sleep, feeds, diapers. The way your night actually goes." },
    { label: "Both", text: "Your partner sees the same picture. Live, on his phone." },
    { label: "€0", text: "Tracking stays. No subscription sitting on top of sleep." },
  ],
  freeKicker: "For good",
  freeTitle: "Tracking stays free.",
  freeBody: "Because every mother should know when the baby slept. Without a monthly fee.",
  closeTitle: "Get it before the next night.",
  closeBody: "Free on iOS and Android. Made in Vienna.",
  priceTitle: "Two modes. One clear choice.",
};

const es: PageCopy = {
  navNight: "Noche",
  navYou: "Para ti",
  navPrice: "Precios",
  navLoad: "Bajar",
  eyebrow: "Para madres. Desde la primera noche.",
  h1a: "Son las 4:40.",
  h1b: "No tienes que",
  h1c: "acordarte.",
  lede: "Sueño, tomas, pañales. Un toque. Tu pareja ve lo mismo antes de que preguntes.",
  beats: [
    {
      time: "04:40",
      kicker: "Toma",
      title: "La última toma ya está.",
      body: "Solo miras. Apuntada, aunque no la hayas puesto tú.",
      ghost: "TOMA",
    },
    {
      time: "07:15",
      kicker: "La semana",
      title: "Nada que sumar.",
      body: "Sueño, pañales, tomas. La semana está ahí, sin tabla.",
      ghost: "SEMANA",
    },
    {
      time: "Ahora",
      kicker: "Tu bebé",
      title: "Ves qué fase está pasando.",
      body: "Sin buscar a las tres. En el info-hub, según la edad.",
      ghost: "FASE",
    },
  ],
  youTitle: "Las cuatro y media. Y no tienes que despertar a nadie para preguntar.",
  youBody: "Moonli es para la madre que sigue teniendo el mapa, aunque la cabeza esté llena.",
  facts: [
    { label: "Un toque", text: "Sueño, tomas, pañales. Como va de verdad vuestra noche." },
    { label: "Los dos", text: "Tu pareja ve lo mismo. En directo, en su móvil." },
    { label: "0 €", text: "El seguimiento se queda. Sin suscripción sobre el sueño." },
  ],
  freeKicker: "Para siempre",
  freeTitle: "El seguimiento sigue siendo gratis.",
  freeBody: "Porque toda madre puede saber cuándo durmió el bebé. Sin cuota mensual.",
  closeTitle: "Bájala antes de la próxima noche.",
  closeBody: "Gratis en iOS y Android. Hecha en Viena.",
  priceTitle: "Dos modos. Una decisión clara.",
};

const fr: PageCopy = {
  navNight: "Nuit",
  navYou: "Pour toi",
  navPrice: "Prix",
  navLoad: "Obtenir",
  eyebrow: "Pour les mères. Dès la première nuit.",
  h1a: "Il est 4:40.",
  h1b: "Tu n’as rien",
  h1c: "à retenir.",
  lede: "Sommeil, tétées, couches. Une touche. Ton partenaire voit la même chose avant que tu demandes.",
  beats: [
    {
      time: "04:40",
      kicker: "Tétée",
      title: "Le dernier repas est déjà là.",
      body: "Tu regardes, c’est tout. Noté, même si ce n’était pas toi.",
      ghost: "TÉTÉE",
    },
    {
      time: "07:15",
      kicker: "La semaine",
      title: "Rien à additionner.",
      body: "Sommeil, couches, tétées. La semaine est là, sans tableau.",
      ghost: "SEMAINE",
    },
    {
      time: "Là",
      kicker: "Ton bébé",
      title: "Tu vois quelle phase est en cours.",
      body: "Pas de recherche à trois heures. Dans l’info-hub, selon l’âge.",
      ghost: "PHASE",
    },
  ],
  youTitle: "Quatre heures et demie. Et tu n’as personne à réveiller pour demander.",
  youBody: "Moonli est pour la mère qui garde le fil, même quand la tête est pleine.",
  facts: [
    { label: "Une touche", text: "Sommeil, tétées, couches. Comme votre nuit se passe vraiment." },
    { label: "Tous les deux", text: "Ton partenaire voit la même chose. En direct, sur son téléphone." },
    { label: "0 €", text: "Le suivi reste. Sans abonnement posé sur le sommeil." },
  ],
  freeKicker: "Pour toujours",
  freeTitle: "Le suivi reste gratuit.",
  freeBody: "Parce que chaque mère peut savoir quand le bébé a dormi. Sans mensualité.",
  closeTitle: "Prends-la avant la prochaine nuit.",
  closeBody: "Gratuite sur iOS et Android. Faite à Vienne.",
  priceTitle: "Deux modes. Un choix clair.",
};

const ru: PageCopy = {
  navNight: "Ночь",
  navYou: "Тебе",
  navPrice: "Цены",
  navLoad: "Скачать",
  eyebrow: "Для мам. С первой ночи.",
  h1a: "Сейчас 4:40.",
  h1b: "Тебе не нужно",
  h1c: "это помнить.",
  lede: "Сон, кормление, подгузники. Одно нажатие. Партнёр видит то же самое, ещё до вопроса.",
  beats: [
    {
      time: "04:40",
      kicker: "Кормление",
      title: "Последнее кормление уже записано.",
      body: "Ты только смотришь. Внесено, даже если это сделала не ты.",
      ghost: "КОРМ",
    },
    {
      time: "07:15",
      kicker: "Неделя",
      title: "Нечего складывать.",
      body: "Сон, подгузники, кормления. Неделя уже перед тобой, без таблицы.",
      ghost: "НЕДЕЛЯ",
    },
    {
      time: "Сейчас",
      kicker: "Малыш",
      title: "Ты видишь, какая сейчас фаза.",
      body: "Без поиска в три часа. В инфо-хабе, по возрасту.",
      ghost: "ФАЗА",
    },
  ],
  youTitle: "Половина пятого. И никого не нужно будить, чтобы спросить.",
  youBody: "Moonli для мамы, у которой картина дня остаётся, даже когда голова полная.",
  facts: [
    { label: "Одно нажатие", text: "Сон, кормление, подгузники. Как на самом деле проходит ваша ночь." },
    { label: "Оба", text: "Партнёр видит то же самое. Сразу, на своём телефоне." },
    { label: "0 €", text: "Трекинг остаётся. Без подписки поверх сна." },
  ],
  freeKicker: "Навсегда",
  freeTitle: "Трекинг остаётся бесплатным.",
  freeBody: "Потому что каждая мама может знать, когда малыш спал. Без ежемесячной платы.",
  closeTitle: "Забери её до следующей ночи.",
  closeBody: "Бесплатно на iOS и Android. Сделано в Вене.",
  priceTitle: "Два режима. Один ясный выбор.",
};

const pages: Record<Language, PageCopy> = { de, en, es, fr, ru };

export const pageCopy = (language: Language): PageCopy => pages[language] ?? de;
