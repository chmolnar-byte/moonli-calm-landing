import type { GuideLang } from "./guidePaths";

export type GuideUi = {
  kicker: string;
  home: string;
  updated: string;
  authorLine: string;
  faqHeading: string;
  moreHeading: string;
  moreIntro: string;
  relatedHeading: string;
  readGuide: string;
  storeTitle: string;
  storeLead: string;
  storeSleepAlt: string;
  storeWeeklyAlt: string;
  imageCredit: string;
  appStore: string;
  playStore: string;
  disclaimer: string;
  sources: string;
  languages: string;
  indexSeoTitle: string;
  indexDescription: string;
  indexTitle: string;
};

export const GUIDE_UI: Record<GuideLang, GuideUi> = {
  de: {
    kicker: "Ratgeber",
    home: "Start",
    updated: "Zuletzt aktualisiert",
    authorLine: "Christian Molnar, Vater und Entwickler aus Wien",
    faqHeading: "Häufige Fragen",
    moreHeading: "Das kann Moonli noch",
    moreIntro: "Dieselbe App, mehr Ruhe im Alltag. Jede Funktion bleibt über die Übersicht erreichbar.",
    relatedHeading: "Weiterlesen",
    readGuide: "Zum Ratgeber",
    storeTitle: "GRATIS DOWNLOADEN",
    storeLead: "Schlaf, Essen und der Blick zu zweit. Für iOS und Android.",
    storeSleepAlt: "Schlafbildschirm der Moonli App",
    storeWeeklyAlt: "Wochenbericht der Moonli App",
    imageCredit: "Illustration: KI-generiert",
    appStore: "App Store",
    playStore: "Google Play",
    disclaimer:
      "Dieser Text ersetzt keine Beratung durch Kinderärztin, Kinderarzt oder Hebamme. Bei Atemproblemen, kaum Trinken, ungewöhnlichem Schreien oder wenn du dir Sorgen machst, hol dir medizinische Hilfe.",
    sources: "Quellen",
    languages: "Sprachen",
    indexSeoTitle: "Ratgeber für Eltern: Schlaf und Alltag | Moonli",
    indexDescription:
      "Wachfenster, Schlafroutinen und was den Tag leichter macht. Kurze Antworten, in Moonli kostenlos umsetzbar.",
    indexTitle: "Ratgeber für den Babyalltag",
  },
  en: {
    kicker: "Guide",
    home: "Home",
    updated: "Last updated",
    authorLine: "Christian Molnar, father and developer in Vienna",
    faqHeading: "Common questions",
    moreHeading: "What else Moonli does",
    moreIntro: "The same app, more calm in the day. Every feature is listed on the overview.",
    relatedHeading: "Read next",
    readGuide: "Read the guide",
    storeTitle: "Download free",
    storeLead: "Sleep, feeding and the shared view. For iOS and Android.",
    storeSleepAlt: "Sleep screen in the Moonli app",
    storeWeeklyAlt: "Weekly report in the Moonli app",
    imageCredit: "Illustration: AI-generated",
    appStore: "App Store",
    playStore: "Google Play",
    disclaimer:
      "This is not medical advice. If breathing, feeding or crying worries you, contact your paediatrician or midwife.",
    sources: "Sources",
    languages: "Languages",
    indexSeoTitle: "Parent guides: sleep and everyday care | Moonli",
    indexDescription:
      "Wake windows, sleep routines and what lightens the day. Short answers you can use in Moonli for free.",
    indexTitle: "Guides for everyday baby care",
  },
  es: {
    kicker: "Guía",
    home: "Inicio",
    updated: "Última actualización",
    authorLine: "Christian Molnar, padre y desarrollador en Viena",
    faqHeading: "Preguntas frecuentes",
    moreHeading: "Qué más hace Moonli",
    moreIntro: "La misma app, más calma en el día. Todas las funciones están en la vista general.",
    relatedHeading: "Sigue leyendo",
    readGuide: "Leer la guía",
    storeTitle: "Descargar gratis",
    storeLead: "Sueño, tomas y la vista en común. Para iOS y Android.",
    storeSleepAlt: "Pantalla de sueño en la app Moonli",
    storeWeeklyAlt: "Informe semanal en la app Moonli",
    imageCredit: "Ilustración: generada con IA",
    appStore: "App Store",
    playStore: "Google Play",
    disclaimer:
      "Esto no es consejo médico. Si te preocupan la respiración, la toma o el llanto, habla con pediatría o con la matrona.",
    sources: "Fuentes",
    languages: "Idiomas",
    indexSeoTitle: "Guías para padres: sueño y día a día | Moonli",
    indexDescription:
      "Ventanas de sueño, rutinas y lo que aligera el día. Respuestas cortas, gratis de aplicar en Moonli.",
    indexTitle: "Guías para el día a día con el bebé",
  },
  fr: {
    kicker: "Guide",
    home: "Accueil",
    updated: "Dernière mise à jour",
    authorLine: "Christian Molnar, père et développeur à Vienne",
    faqHeading: "Questions fréquentes",
    moreHeading: "Ce que Moonli fait aussi",
    moreIntro: "La même app, plus de calme dans la journée. Toutes les fonctions sont sur la vue d'ensemble.",
    relatedHeading: "À lire ensuite",
    readGuide: "Lire le guide",
    storeTitle: "Télécharger gratuitement",
    storeLead: "Sommeil, repas et la vue à deux. Pour iOS et Android.",
    storeSleepAlt: "Écran de sommeil dans l’app Moonli",
    storeWeeklyAlt: "Rapport de la semaine dans l’app Moonli",
    imageCredit: "Illustration : générée par IA",
    appStore: "App Store",
    playStore: "Google Play",
    disclaimer:
      "Ce texte ne remplace pas un avis médical. Si la respiration, les prises ou les pleurs t'inquiètent, contacte le pédiatre ou la sage-femme.",
    sources: "Sources",
    languages: "Langues",
    indexSeoTitle: "Guides parents : sommeil et quotidien | Moonli",
    indexDescription:
      "Fenêtres d'éveil, routines de sommeil et ce qui allège la journée. Réponses courtes, gratuites dans Moonli.",
    indexTitle: "Guides pour le quotidien avec bébé",
  },
  ru: {
    kicker: "Справочник",
    home: "Главная",
    updated: "Обновлено",
    authorLine: "Кристиан Мольнар, отец и разработчик из Вены",
    faqHeading: "Частые вопросы",
    moreHeading: "Что ещё умеет Moonli",
    moreIntro: "То же приложение и больше спокойствия в быту. Все функции собраны на обзоре.",
    relatedHeading: "Дальше по теме",
    readGuide: "К справочнику",
    storeTitle: "Скачать бесплатно",
    storeLead: "Сон, кормление и общий взгляд. Для iOS и Android.",
    storeSleepAlt: "Экран сна в приложении Moonli",
    storeWeeklyAlt: "Недельный отчёт в приложении Moonli",
    imageCredit: "Иллюстрация: создана ИИ",
    appStore: "App Store",
    playStore: "Google Play",
    disclaimer:
      "Это не медицинская рекомендация. Если вас беспокоят дыхание, кормление или плач, обратитесь к педиатру или акушерке.",
    sources: "Источники",
    languages: "Языки",
    indexSeoTitle: "Справочник для родителей: сон и быт | Moonli",
    indexDescription:
      "Окна бодрствования, режим сна и то, что облегчает день. Короткие ответы, бесплатно в Moonli.",
    indexTitle: "Справочник для каждого дня с малышом",
  },
};
