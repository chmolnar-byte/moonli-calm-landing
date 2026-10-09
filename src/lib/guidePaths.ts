export const GUIDE_LANGS = ["de", "en", "es", "fr", "ru"] as const;

export type GuideLang = (typeof GUIDE_LANGS)[number];

export const TOPIC_IDS = [
  "wake-windows",
  "sleep-routines",
  "feeding",
  "solids",
  "growth",
  "care-work",
  "night-exhaustion",
  "calm-screen",
] as const;

export type TopicId = (typeof TOPIC_IDS)[number];

export const PUBLISHED_TOPICS = new Set<TopicId>(TOPIC_IDS);

export const GUIDE_SECTION: Record<GuideLang, string> = {
  de: "ratgeber",
  en: "guides",
  es: "guias",
  fr: "guides",
  ru: "gid",
};

export const FEATURES_SLUG: Record<GuideLang, string> = {
  de: "funktionen",
  en: "features",
  es: "funciones",
  fr: "fonctions",
  ru: "funktsii",
};

export const GUIDE_LOCALE: Record<GuideLang, string> = {
  de: "de-AT",
  en: "en-US",
  es: "es-ES",
  fr: "fr-FR",
  ru: "ru-RU",
};

export const OG_LOCALE: Record<GuideLang, string> = {
  de: "de_AT",
  en: "en_US",
  es: "es_ES",
  fr: "fr_FR",
  ru: "ru_RU",
};

export const TOPIC_SLUGS: Record<TopicId, Record<GuideLang, string>> = {
  "wake-windows": {
    de: "wachfenster-baby",
    en: "baby-wake-windows",
    es: "ventanas-de-sueno-bebe",
    fr: "fenetres-d-eveil-bebe",
    ru: "okna-bodrstvovaniya",
  },
  "sleep-routines": {
    de: "babyschlaf-routinen",
    en: "baby-sleep-routine",
    es: "rutina-de-sueno-bebe",
    fr: "routine-sommeil-bebe",
    ru: "rezhim-sna-malysha",
  },
  feeding: {
    de: "stillen-flaschchen-tracken",
    en: "track-breastfeeding-bottles",
    es: "seguimiento-lactancia-biberon",
    fr: "suivi-allaitement-biberon",
    ru: "grudnoe-vskarmlivanie-butilochka",
  },
  solids: {
    de: "beikost-starten",
    en: "starting-solids",
    es: "empezar-alimentacion-complementaria",
    fr: "diversification-alimentaire",
    ru: "prikorm",
  },
  growth: {
    de: "who-perzentile-baby",
    en: "who-baby-growth-percentiles",
    es: "percentiles-oms-bebe",
    fr: "percentiles-oms-bebe",
    ru: "percentili-voz-rebenok",
  },
  "care-work": {
    de: "care-arbeit-teilen",
    en: "share-care-work",
    es: "repartir-cuidados",
    fr: "partager-la-charge-mentale",
    ru: "delit-zabotu",
  },
  "night-exhaustion": {
    de: "nachts-wach-erschoepft",
    en: "awake-at-night-exhausted",
    es: "despierto-de-noche-agotado",
    fr: "reveil-nocturne-epuisement",
    ru: "nochyu-bez-sna",
  },
  "calm-screen": {
    de: "beruhigen-ohne-handy",
    en: "soothe-without-a-screen",
    es: "calmar-sin-pantalla",
    fr: "apaiser-sans-ecran",
    ru: "uspokoit-bez-ekrana",
  },
};

/** Anchor text. Matches the search phrase in the target H1. */
export const TOPIC_ANCHOR: Record<TopicId, Record<GuideLang, string>> = {
  "wake-windows": {
    de: "Wachfenster nach Alter",
    en: "Wake windows by age",
    es: "Ventanas de sueño por edad",
    fr: "Fenêtres d'éveil par âge",
    ru: "Окна бодрствования по возрасту",
  },
  "sleep-routines": {
    de: "Babyschlaf",
    en: "Baby sleep routines",
    es: "Rutinas de sueño del bebé",
    fr: "Routines de sommeil de bébé",
    ru: "Режим сна малыша",
  },
  feeding: {
    de: "Stillprotokoll",
    en: "Track breastfeeding and bottles",
    es: "Seguimiento de lactancia y biberón",
    fr: "Suivi allaitement et biberon",
    ru: "Грудное вскармливание и бутылочка",
  },
  solids: {
    de: "Beikost starten",
    en: "Starting solids",
    es: "Empezar la alimentación complementaria",
    fr: "Commencer la diversification",
    ru: "Начало прикорма",
  },
  growth: {
    de: "WHO-Perzentile verstehen",
    en: "WHO growth percentiles",
    es: "Percentiles OMS del bebé",
    fr: "Percentiles OMS du bébé",
    ru: "Перцентили ВОЗ",
  },
  "care-work": {
    de: "Care-Arbeit zu zweit teilen",
    en: "Share the care work",
    es: "Repartir los cuidados",
    fr: "Partager la charge mentale",
    ru: "Делить заботу вдвоём",
  },
  "night-exhaustion": {
    de: "Nachts wach und erschöpft",
    en: "Awake at night and exhausted",
    es: "Despierto de noche y agotado",
    fr: "Réveil nocturne et épuisement",
    ru: "Ночью без сна и без сил",
  },
  "calm-screen": {
    de: "Beruhigen ohne Handy",
    en: "Soothe without a screen",
    es: "Calmar sin pantalla",
    fr: "Apaiser sans écran",
    ru: "Успокоить без экрана",
  },
};

export function isGuideLang(value: string): value is GuideLang {
  return (GUIDE_LANGS as readonly string[]).includes(value);
}

export function isTopicId(value: string): value is TopicId {
  return (TOPIC_IDS as readonly string[]).includes(value);
}

function withSlash(path: string): string {
  if (path === "/") return "/";
  return path.endsWith("/") ? path : `${path}/`;
}

export function guidePath(lang: GuideLang, slug: string): string {
  return withSlash(`/${lang}/${GUIDE_SECTION[lang]}/${slug}`);
}

export function topicPath(lang: GuideLang, topic: TopicId): string {
  return guidePath(lang, TOPIC_SLUGS[topic][lang]);
}

export function featuresPath(lang: GuideLang): string {
  return withSlash(`/${lang}/${FEATURES_SLUG[lang]}`);
}

export function guidesIndexPath(lang: GuideLang): string {
  return withSlash(`/${lang}/${GUIDE_SECTION[lang]}`);
}

export function publishedTopicPath(lang: GuideLang, topic: TopicId): string | null {
  if (!PUBLISHED_TOPICS.has(topic)) return null;
  return topicPath(lang, topic);
}

const FEATURES_LABEL: Record<GuideLang, string> = {
  de: "Alle Funktionen",
  en: "All features",
  es: "Todas las funciones",
  fr: "Toutes les fonctions",
  ru: "Все функции",
};

export function pointerFor(
  lang: GuideLang,
  topic: TopicId | "features",
): { href: string; label: string } {
  if (topic === "features" || !PUBLISHED_TOPICS.has(topic)) {
    return { href: featuresPath(lang), label: FEATURES_LABEL[lang] };
  }
  return { href: topicPath(lang, topic), label: TOPIC_ANCHOR[topic][lang] };
}

export const PLAY_STORE_ID = "com.christian.moonli";
export const APP_STORE_URL =
  "https://apps.apple.com/us/app/moonli-baby-parent-assistant/id6762447948";

export function playStoreUrl(lang: GuideLang): string {
  return `https://play.google.com/store/apps/details?id=${PLAY_STORE_ID}&hl=${lang}`;
}
