import type { GuideLang } from "./guidePaths";
import { topicPath } from "./guidePaths";

export const COMPARE_CHECKED_AT = "2026-11-02";

type Cell = { napper: string; huckleberry: string; moonli: string };
type Faq = { q: string; a: string };
type Link = { href: string; label: string };

export type CompareCopy = {
  seoTitle: string;
  description: string;
  kicker: string;
  breadcrumbHome: string;
  breadcrumbGuides: string;
  breadcrumbCompare: string;
  h1: string;
  introHtml: string;
  costsTitle: string;
  costsLead: string;
  priceCol: string;
  recommended: string;
  freeRow: string;
  paidRow: string;
  yearlyRow: string;
  costs: Cell;
  paid: Cell;
  yearly: Cell;
  sourceLabel: string;
  costsNoteHtml: string;
  featuresTitle: string;
  featuresLead: string;
  topicCol: string;
  featureRows: Array<{ label: string } & Cell>;
  forWhomTitle: string;
  forWhom: { name: string; text: string }[];
  nextTitle: string;
  nextLinks: Link[];
  pricesLabel: string;
  downloadLabel: string;
  faqTitle: string;
  faq: Faq[];
  disclaimer: string;
};

const sharedPrices = {
  free: {
    napper: {
      de: "Free-Stufe mit Basis-Tracking und altersbasiertem Schlafplan",
      en: "Free tier with basic tracking and an age-based sleep schedule",
      es: "Nivel gratis con seguimiento básico y plan de sueño por edad",
      fr: "Offre Free avec suivi de base et planning sommeil selon l’âge",
      ru: "Бесплатный уровень: базовый трекинг и план сна по возрасту",
    },
    huckleberry: {
      de: "Free: Basis-Logging und einfache Reports",
      en: "Free: basic logging and simple reports",
      es: "Gratis: registro básico e informes simples",
      fr: "Free : journal de base et rapports simples",
      ru: "Free: базовый лог и простые отчёты",
    },
    moonli: {
      de: "<strong>0 €</strong> für immer – Schlaf, Stillen/Flasche, Windeln, Wachstum, Info-Hub, White Noise, Auswahl Geschichten",
      en: "<strong>€0</strong> forever – sleep, feeding, diapers, growth, Info Hub, white noise, selected stories",
      es: "<strong>0 €</strong> para siempre: sueño, tomas, pañales, crecimiento, Info Hub, ruido blanco, selección de cuentos",
      fr: "<strong>0 €</strong> pour toujours – sommeil, tétées, couches, croissance, Info Hub, bruit blanc, sélection d’histoires",
      ru: "<strong>0 €</strong> навсегда — сон, кормление, подгузники, рост, Info Hub, белый шум, подборка сказок",
    },
  },
  paid: {
    napper: {
      de: 'Unlimited ca. <strong class="text-foreground">69,99 USD / Jahr</strong>',
      en: 'Unlimited about <strong class="text-foreground">$69.99 / year</strong>',
      es: 'Unlimited aprox. <strong class="text-foreground">69,99 USD / año</strong>',
      fr: 'Unlimited env. <strong class="text-foreground">69,99 USD / an</strong>',
      ru: 'Unlimited ≈ <strong class="text-foreground">69,99 USD / год</strong>',
    },
    huckleberry: {
      de: 'Plus ca. <strong class="text-foreground">11,99 USD / Monat</strong> · Premium darüber',
      en: 'Plus about <strong class="text-foreground">$11.99 / month</strong> · Premium above that',
      es: 'Plus aprox. <strong class="text-foreground">11,99 USD / mes</strong> · Premium por encima',
      fr: 'Plus env. <strong class="text-foreground">11,99 USD / mois</strong> · Premium au-dessus',
      ru: 'Plus ≈ <strong class="text-foreground">11,99 USD / месяц</strong> · Premium выше',
    },
    moonli: {
      de: "<strong>5 € / Monat</strong> im Jahresabo<span class=\"mt-1 block text-xs text-muted-foreground\">oder 7 € / Monat monatlich kündbar · 1 Monat testen</span>",
      en: "<strong>€5 / month</strong> on the annual plan<span class=\"mt-1 block text-xs text-muted-foreground\">or €7 / month billed monthly · 1-month trial</span>",
      es: "<strong>5 € / mes</strong> en plan anual<span class=\"mt-1 block text-xs text-muted-foreground\">o 7 € / mes con cancelación mensual · 1 mes de prueba</span>",
      fr: "<strong>5 € / mois</strong> en abonnement annuel<span class=\"mt-1 block text-xs text-muted-foreground\">ou 7 € / mois sans engagement · 1 mois d’essai</span>",
      ru: "<strong>5 € / месяц</strong> при годовой подписке<span class=\"mt-1 block text-xs text-muted-foreground\">или 7 € / месяц · 1 месяц теста</span>",
    },
  },
  yearly: {
    napper: {
      de: "~70 USD Unlimited",
      en: "~$70 Unlimited",
      es: "~70 USD Unlimited",
      fr: "~70 USD Unlimited",
      ru: "~70 USD Unlimited",
    },
    huckleberry: {
      de: "~144 USD Plus (12×11,99)",
      en: "~$144 Plus (12×11.99)",
      es: "~144 USD Plus (12×11,99)",
      fr: "~144 USD Plus (12×11,99)",
      ru: "~144 USD Plus (12×11,99)",
    },
    moonli: {
      de: "<strong>~60 €</strong> Premium Jahresabo – oder <strong>0 €</strong>",
      en: "<strong>~€60</strong> Premium annual – or <strong>€0</strong>",
      es: "<strong>~60 €</strong> Premium anual – o <strong>0 €</strong>",
      fr: "<strong>~60 €</strong> Premium annuel – ou <strong>0 €</strong>",
      ru: "<strong>~60 €</strong> Premium за год — или <strong>0 €</strong>",
    },
  },
} as const;

function cell(lang: GuideLang, row: keyof typeof sharedPrices): Cell {
  return {
    napper: sharedPrices[row].napper[lang],
    huckleberry: sharedPrices[row].huckleberry[lang],
    moonli: sharedPrices[row].moonli[lang],
  };
}

function nextLinks(lang: GuideLang, labels: Record<string, string>): Link[] {
  return [
    { href: topicPath(lang, "sleep-routines"), label: labels.sleep },
    { href: topicPath(lang, "feeding"), label: labels.feeding },
    { href: topicPath(lang, "solids"), label: labels.solids },
    { href: topicPath(lang, "wake-windows"), label: labels.wake },
  ];
}

const copy: Record<GuideLang, CompareCopy> = {
  de: {
    seoTitle: "Moonli vs Napper vs Huckleberry: Kosten & Funktionen",
    description:
      "Transparenter Vergleich: Was kostet Napper, Huckleberry und Moonli – und welche Features bleiben bei Moonli dauerhaft kostenlos? Stand November 2026.",
    kicker: "Vergleich",
    breadcrumbHome: "Start",
    breadcrumbGuides: "Ratgeber",
    breadcrumbCompare: "Vergleich",
    h1: "Moonli vs Napper vs Huckleberry",
    introHtml: `Du suchst eine <strong class="text-foreground font-semibold">Napper-Alternative</strong> oder vergleichst Huckleberry? Hier stehen Kosten und Funktionen nebeneinander – ohne Marketing-Nebel. Stand der Konkurrenzpreise: ${COMPARE_CHECKED_AT} (Quellen verlinkt; Beträge können sich ändern).`,
    costsTitle: "Kosten im Überblick",
    costsLead:
      "Der größte Unterschied: Bei Moonli bleibt das Kern-Tracking dauerhaft gratis. Bei Napper und Huckleberry sitzen Schlafplan, Vorhersagen und viele Statistiken hinter dem Abo.",
    priceCol: "Preis",
    recommended: "Empfohlen",
    freeRow: "Free",
    paidRow: "Bezahlt",
    yearlyRow: "Grobrechnung / Jahr",
    costs: cell("de", "free"),
    paid: cell("de", "paid"),
    yearly: cell("de", "yearly"),
    sourceLabel: "Quelle",
    costsNoteHtml:
      'USD-Preise der Konkurrenz ohne Umrechnung und ohne Store-Steuern. Moonli-Preise wie auf <a href="/#preise" class="underline hover:text-foreground">moonli.net/#preise</a>.',
    featuresTitle: "Funktionen: worauf es ankommt",
    featuresLead:
      "Napper und Huckleberry sind stark bei Schlafplänen und Vorhersagen. Moonli ist stark, wenn ihr den Tag zu zweit trackt, Stillen und später Beikost braucht – und nicht für jedes Statistik-Feature zahlen wollt.",
    topicCol: "Thema",
    featureRows: [
      { label: "Schlaf tracken", napper: "Ja · Fokus der App", huckleberry: "Ja · Fokus der App", moonli: "Ja · kostenlos" },
      {
        label: "Schlafplan / Vorhersage",
        napper: "Stärke: altersbasierter Plan & Personalisierung",
        huckleberry: "Stärke: SweetSpot® & Schedule Creator (Plus/Premium)",
        moonli: "Wachfenster-Orientierung & Tagesplan (Premium)",
      },
      { label: "Stillen & Flasche", napper: "Tracking möglich", huckleberry: "Tracking möglich", moonli: "Stillprotokoll · kostenlos" },
      { label: "Beikost / BLW", napper: "Eher Nebenrolle", huckleberry: "Logging möglich, kein BLW-Fokus", moonli: "Teller, 100+ Zutaten, eigene Rezepte" },
      {
        label: "Beide Eltern / Sync",
        napper: "Teilen möglich (je nach Plan)",
        huckleberry: "Mehrere Geräte auf demselben Account",
        moonli: "Parent-Sync in Echtzeit (Premium)",
      },
      { label: "Care-Arbeit spielerisch", napper: "—", huckleberry: "—", moonli: "Punkte, Ehren-Rad, Komplimente (Premium)" },
      {
        label: "White Noise & Geschichten",
        napper: "Schlafgeräusche (Unlimited)",
        huckleberry: "Kein vergleichbarer Fokus",
        moonli: "Ja · große Auswahl schon in Free",
      },
      { label: "Werbefrei", napper: "Abo-Modell", huckleberry: "Abo-Modell", moonli: "Premium 100 % werbefrei" },
      {
        label: "Datenspeicherung",
        napper: "Je nach Anbieter / Region",
        huckleberry: "Je nach Anbieter / Region",
        moonli: "Daten in der EU gehostet",
      },
      { label: "Made for DACH", napper: "Intl. · starke DE-Inhalte", huckleberry: "Vor allem EN / US", moonli: "Ja · Wien, DE/AT-Ratgeber" },
    ],
    forWhomTitle: "Für wen welche App?",
    forWhom: [
      { name: "Napper", text: ", wenn ihr vor allem einen festen Schlafplan und Vorhersagen wollt und dafür ein Jahresabo akzeptiert." },
      { name: "Huckleberry", text: ", wenn ihr SweetSpot®, Insights und ggf. Expert-Pläne sucht und den monatlichen US-Preis mitgeht." },
      {
        name: "Moonli",
        text: ", wenn Tracking dauerhaft kostenlos bleiben soll, beide Eltern denselben Stand brauchen, Stillen sowie später Beikost/BLW genauso zählen wie Schlaf – und die Daten in der EU liegen sollen.",
      },
    ],
    nextTitle: "Weiterlesen & ausprobieren",
    nextLinks: nextLinks("de", {
      sleep: "Babyschlaf: Abendroutine",
      feeding: "Stillprotokoll & Still-App",
      solids: "Beikost starten",
      wake: "Wachfenster nach Alter",
    }),
    pricesLabel: "Moonli Preise",
    downloadLabel: "Kostenlos laden",
    faqTitle: "Häufige Fragen",
    faq: [
      {
        q: "Ist Moonli eine Napper-Alternative?",
        a: "Ja – besonders wenn euch Kosten und gemeinsames Tracking wichtiger sind als ein starrer Schlafplan. Napper bleibt stark bei Vorhersage und Schlafkurs; Moonli bei Free-Tracking, Stillprotokoll und Beikost.",
      },
      {
        q: "Kann ich Huckleberry ersetzen?",
        a: "Für Logging von Schlaf und Mahlzeiten ja. Wenn ihr auf SweetSpot® und Expert-Pläne angewiesen seid, bleibt Huckleberry Plus/Premium die speziellere Lösung – zu einem höheren Monatspreis.",
      },
      {
        q: "Wo werden die Daten gespeichert?",
        a: "Bei Moonli werden die App-Daten in der EU gehostet. Bei Napper und Huckleberry hängt die Speicherung vom jeweiligen Anbieter und der Region ab – bitte in deren Datenschutzhinweisen prüfen.",
      },
      {
        q: "Ändern sich die Preise?",
        a: `Konkurrenzpreise haben wir am ${COMPARE_CHECKED_AT} von den verlinkten Seiten übernommen. Vor dem Kauf immer die aktuellen Store- und Website-Preise prüfen. Moonli-Preise stehen live unter /#preise.`,
      },
    ],
    disclaimer:
      "Keine bezahlte Kooperation. Vergleich auf Basis öffentlich einsehbarer Preisseiten und unserer eigenen Produktfunktionen. Napper® und Huckleberry® sind Marken der jeweiligen Anbieter.",
  },
  en: {
    seoTitle: "Moonli vs Napper vs Huckleberry: pricing & features",
    description:
      "A clear comparison of Napper, Huckleberry and Moonli – what you pay, what stays free, and where data is hosted. Checked November 2026.",
    kicker: "Compare",
    breadcrumbHome: "Home",
    breadcrumbGuides: "Guides",
    breadcrumbCompare: "Compare",
    h1: "Moonli vs Napper vs Huckleberry",
    introHtml: `Looking for a <strong class="text-foreground font-semibold">Napper alternative</strong> or weighing Huckleberry? Costs and features side by side – no marketing fog. Competitor prices checked ${COMPARE_CHECKED_AT} (sources linked; amounts can change).`,
    costsTitle: "Pricing at a glance",
    costsLead:
      "The big difference: Moonli keeps core tracking free forever. With Napper and Huckleberry, schedules, predictions and many stats sit behind a subscription.",
    priceCol: "Price",
    recommended: "Recommended",
    freeRow: "Free",
    paidRow: "Paid",
    yearlyRow: "Rough yearly cost",
    costs: cell("en", "free"),
    paid: cell("en", "paid"),
    yearly: cell("en", "yearly"),
    sourceLabel: "Source",
    costsNoteHtml:
      'Competitor USD prices without FX conversion or store taxes. Moonli prices as on <a href="/#preise" class="underline hover:text-foreground">moonli.net/#preise</a>.',
    featuresTitle: "Features that matter",
    featuresLead:
      "Napper and Huckleberry shine at sleep schedules and predictions. Moonli shines when you track together, need feeding later solids/BLW, and do not want to pay for every stats feature.",
    topicCol: "Topic",
    featureRows: [
      { label: "Track sleep", napper: "Yes · app focus", huckleberry: "Yes · app focus", moonli: "Yes · free" },
      {
        label: "Schedule / prediction",
        napper: "Strength: age-based plan & personalization",
        huckleberry: "Strength: SweetSpot® & Schedule Creator (Plus/Premium)",
        moonli: "Wake-window guidance & day plan (Premium)",
      },
      { label: "Breastfeeding & bottles", napper: "Tracking available", huckleberry: "Tracking available", moonli: "Feeding log · free" },
      { label: "Solids / BLW", napper: "Secondary", huckleberry: "Logging possible, not BLW-first", moonli: "Plate, 100+ ingredients, own recipes" },
      {
        label: "Both parents / sync",
        napper: "Sharing possible (by plan)",
        huckleberry: "Multiple devices on one account",
        moonli: "Parent-Sync in real time (Premium)",
      },
      { label: "Playful care work", napper: "—", huckleberry: "—", moonli: "Points, honor wheel, compliments (Premium)" },
      {
        label: "White noise & stories",
        napper: "Sleep sounds (Unlimited)",
        huckleberry: "No comparable focus",
        moonli: "Yes · strong Free selection",
      },
      { label: "Ad-free", napper: "Subscription model", huckleberry: "Subscription model", moonli: "Premium 100% ad-free" },
      {
        label: "Data hosting",
        napper: "Depends on vendor / region",
        huckleberry: "Depends on vendor / region",
        moonli: "Data hosted in the EU",
      },
      { label: "Built for DACH / EU", napper: "Intl. · strong DE content", huckleberry: "Mostly EN / US", moonli: "Yes · Vienna, DE/AT guides" },
    ],
    forWhomTitle: "Which app for whom?",
    forWhom: [
      { name: "Napper", text: " if you mainly want a firm sleep schedule and predictions and accept a yearly subscription." },
      { name: "Huckleberry", text: " if you want SweetSpot®, insights and maybe expert plans and accept the US monthly price." },
      {
        name: "Moonli",
        text: " if tracking should stay free forever, both parents need the same view, feeding and later solids/BLW matter as much as sleep – and you want data hosted in the EU.",
      },
    ],
    nextTitle: "Read next & try Moonli",
    nextLinks: nextLinks("en", {
      sleep: "Baby sleep routines",
      feeding: "Track breastfeeding and bottles",
      solids: "Starting solids",
      wake: "Wake windows by age",
    }),
    pricesLabel: "Moonli pricing",
    downloadLabel: "Download free",
    faqTitle: "FAQ",
    faq: [
      {
        q: "Is Moonli a Napper alternative?",
        a: "Yes – especially if cost and shared tracking matter more than a rigid schedule. Napper stays strong on prediction and sleep courses; Moonli on free tracking, feeding logs and solids.",
      },
      {
        q: "Can Moonli replace Huckleberry?",
        a: "For logging sleep and feeds, yes. If you rely on SweetSpot® and expert plans, Huckleberry Plus/Premium stays the more specialised option – at a higher monthly price.",
      },
      {
        q: "Where is data stored?",
        a: "Moonli hosts app data in the EU. For Napper and Huckleberry, storage depends on each vendor and region – check their privacy policies.",
      },
      {
        q: "Do prices change?",
        a: `Competitor prices were taken from their linked pages on ${COMPARE_CHECKED_AT}. Always check current store and site prices before buying. Moonli prices are live at /#preise.`,
      },
    ],
    disclaimer:
      "No paid partnership. Comparison based on public pricing pages and our own product features. Napper® and Huckleberry® are trademarks of their respective owners.",
  },
  es: {
    seoTitle: "Moonli vs Napper vs Huckleberry: precios y funciones",
    description:
      "Comparación clara de Napper, Huckleberry y Moonli: qué pagas, qué sigue gratis y dónde se alojan los datos. Revisado noviembre 2026.",
    kicker: "Comparación",
    breadcrumbHome: "Inicio",
    breadcrumbGuides: "Guías",
    breadcrumbCompare: "Comparación",
    h1: "Moonli vs Napper vs Huckleberry",
    introHtml: `¿Buscas una <strong class="text-foreground font-semibold">alternativa a Napper</strong> o comparas Huckleberry? Costes y funciones lado a lado, sin niebla de marketing. Precios de la competencia revisados el ${COMPARE_CHECKED_AT} (fuentes enlazadas; pueden cambiar).`,
    costsTitle: "Costes de un vistazo",
    costsLead:
      "La gran diferencia: en Moonli el seguimiento esencial sigue gratis para siempre. En Napper y Huckleberry, planes, predicciones y muchas estadísticas van tras la suscripción.",
    priceCol: "Precio",
    recommended: "Recomendado",
    freeRow: "Gratis",
    paidRow: "De pago",
    yearlyRow: "Coste anual aprox.",
    costs: cell("es", "free"),
    paid: cell("es", "paid"),
    yearly: cell("es", "yearly"),
    sourceLabel: "Fuente",
    costsNoteHtml:
      'Precios USD de la competencia sin conversión ni impuestos de tienda. Precios Moonli en <a href="/#preise" class="underline hover:text-foreground">moonli.net/#preise</a>.',
    featuresTitle: "Funciones que importan",
    featuresLead:
      "Napper y Huckleberry destacan en planes y predicciones de sueño. Moonli destaca si trackeáis en pareja, necesitáis lactancia y luego BLW, y no queréis pagar cada estadística.",
    topicCol: "Tema",
    featureRows: [
      { label: "Seguir el sueño", napper: "Sí · foco de la app", huckleberry: "Sí · foco de la app", moonli: "Sí · gratis" },
      {
        label: "Plan / predicción",
        napper: "Fuerte: plan por edad y personalización",
        huckleberry: "Fuerte: SweetSpot® y Schedule Creator (Plus/Premium)",
        moonli: "Orientación de ventanas de sueño y plan del día (Premium)",
      },
      { label: "Lactancia y biberón", napper: "Seguimiento posible", huckleberry: "Seguimiento posible", moonli: "Registro de tomas · gratis" },
      { label: "Complementaria / BLW", napper: "Secundario", huckleberry: "Registro posible, sin foco BLW", moonli: "Plato, +100 ingredientes, recetas propias" },
      {
        label: "Ambos padres / sync",
        napper: "Compartir según plan",
        huckleberry: "Varios dispositivos en una cuenta",
        moonli: "Parent-Sync en tiempo real (Premium)",
      },
      { label: "Cuidados con juego", napper: "—", huckleberry: "—", moonli: "Puntos, rueda de honor, cumplidos (Premium)" },
      {
        label: "Ruido blanco y cuentos",
        napper: "Sonidos de sueño (Unlimited)",
        huckleberry: "Sin foco comparable",
        moonli: "Sí · buena selección ya en Free",
      },
      { label: "Sin anuncios", napper: "Modelo de suscripción", huckleberry: "Modelo de suscripción", moonli: "Premium 100 % sin anuncios" },
      {
        label: "Datos",
        napper: "Según proveedor / región",
        huckleberry: "Según proveedor / región",
        moonli: "Datos alojados en la UE",
      },
      { label: "Hecho para DACH / UE", napper: "Intl. · fuerte en DE", huckleberry: "Sobre todo EN / US", moonli: "Sí · Viena, guías DE/AT" },
    ],
    forWhomTitle: "¿Para quién cada app?",
    forWhom: [
      { name: "Napper", text: " si queréis sobre todo un plan de sueño fijo y predicciones y aceptáis un abono anual." },
      { name: "Huckleberry", text: " si buscáis SweetSpot®, insights y quizá planes expert y asumís el precio mensual US." },
      {
        name: "Moonli",
        text: " si el tracking debe seguir gratis, ambos padres necesitan la misma vista, la lactancia y luego el BLW importan tanto como el sueño – y los datos deben estar en la UE.",
      },
    ],
    nextTitle: "Seguir leyendo y probar",
    nextLinks: nextLinks("es", {
      sleep: "Rutinas de sueño del bebé",
      feeding: "Seguimiento de lactancia y biberón",
      solids: "Empezar la alimentación complementaria",
      wake: "Ventanas de sueño por edad",
    }),
    pricesLabel: "Precios Moonli",
    downloadLabel: "Descargar gratis",
    faqTitle: "Preguntas frecuentes",
    faq: [
      {
        q: "¿Moonli es alternativa a Napper?",
        a: "Sí – sobre todo si el coste y el seguimiento compartido importan más que un plan rígido. Napper sigue fuerte en predicción; Moonli en tracking gratis, lactancia y complementaria.",
      },
      {
        q: "¿Puede sustituir a Huckleberry?",
        a: "Para registrar sueño y tomas, sí. Si dependéis de SweetSpot® y planes expert, Huckleberry Plus/Premium sigue siendo la opción más especializada – a un precio mensual más alto.",
      },
      {
        q: "¿Dónde se guardan los datos?",
        a: "Moonli aloja los datos de la app en la UE. En Napper y Huckleberry depende del proveedor y la región: consultad su política de privacidad.",
      },
      {
        q: "¿Cambian los precios?",
        a: `Tomamos los precios de la competencia de las páginas enlazadas el ${COMPARE_CHECKED_AT}. Antes de comprar, comprobad siempre tienda y web. Los precios Moonli están en /#preise.`,
      },
    ],
    disclaimer:
      "Sin colaboración de pago. Comparación basada en páginas de precios públicas y nuestras propias funciones. Napper® y Huckleberry® son marcas de sus titulares.",
  },
  fr: {
    seoTitle: "Moonli vs Napper vs Huckleberry : prix et fonctions",
    description:
      "Comparaison claire de Napper, Huckleberry et Moonli – ce que vous payez, ce qui reste gratuit, et où sont hébergées les données. Vérifié novembre 2026.",
    kicker: "Comparaison",
    breadcrumbHome: "Accueil",
    breadcrumbGuides: "Guides",
    breadcrumbCompare: "Comparaison",
    h1: "Moonli vs Napper vs Huckleberry",
    introHtml: `Vous cherchez une <strong class="text-foreground font-semibold">alternative à Napper</strong> ou comparez Huckleberry ? Coûts et fonctions côte à côte, sans brouillard marketing. Prix concurrents vérifiés le ${COMPARE_CHECKED_AT} (sources liées ; montants susceptibles de changer).`,
    costsTitle: "Les coûts en un coup d’œil",
    costsLead:
      "La grande différence : chez Moonli, le suivi essentiel reste gratuit pour toujours. Chez Napper et Huckleberry, planning, prédictions et beaucoup de stats sont derrière l’abonnement.",
    priceCol: "Prix",
    recommended: "Recommandé",
    freeRow: "Gratuit",
    paidRow: "Payant",
    yearlyRow: "Coût annuel approx.",
    costs: cell("fr", "free"),
    paid: cell("fr", "paid"),
    yearly: cell("fr", "yearly"),
    sourceLabel: "Source",
    costsNoteHtml:
      'Prix USD des concurrents sans conversion ni taxes store. Prix Moonli sur <a href="/#preise" class="underline hover:text-foreground">moonli.net/#preise</a>.',
    featuresTitle: "Les fonctions qui comptent",
    featuresLead:
      "Napper et Huckleberry excellent sur les plannings et prédictions de sommeil. Moonli brille si vous suivez à deux, avez besoin de l’allaitement puis du BLW, et ne voulez pas payer chaque statistique.",
    topicCol: "Sujet",
    featureRows: [
      { label: "Suivre le sommeil", napper: "Oui · focus de l’app", huckleberry: "Oui · focus de l’app", moonli: "Oui · gratuit" },
      {
        label: "Planning / prédiction",
        napper: "Point fort : plan selon l’âge & personnalisation",
        huckleberry: "Point fort : SweetSpot® & Schedule Creator (Plus/Premium)",
        moonli: "Repères de fenêtres d’éveil & plan du jour (Premium)",
      },
      { label: "Allaitement & biberon", napper: "Suivi possible", huckleberry: "Suivi possible", moonli: "Journal des tétées · gratuit" },
      { label: "Diversification / BLW", napper: "Secondaire", huckleberry: "Journal possible, pas BLW-first", moonli: "Assiette, 100+ aliments, recettes perso" },
      {
        label: "Les deux parents / sync",
        napper: "Partage selon l’offre",
        huckleberry: "Plusieurs appareils sur un compte",
        moonli: "Parent-Sync en temps réel (Premium)",
      },
      { label: "Charge mentale ludique", napper: "—", huckleberry: "—", moonli: "Points, roue d’honneur, compliments (Premium)" },
      {
        label: "Bruit blanc & histoires",
        napper: "Sons de sommeil (Unlimited)",
        huckleberry: "Pas de focus comparable",
        moonli: "Oui · large choix déjà en Free",
      },
      { label: "Sans pubs", napper: "Modèle abonnement", huckleberry: "Modèle abonnement", moonli: "Premium 100 % sans pubs" },
      {
        label: "Hébergement des données",
        napper: "Selon éditeur / région",
        huckleberry: "Selon éditeur / région",
        moonli: "Données hébergées dans l’UE",
      },
      { label: "Pensé pour DACH / UE", napper: "Intl. · fort en DE", huckleberry: "Surtout EN / US", moonli: "Oui · Vienne, guides DE/AT" },
    ],
    forWhomTitle: "Pour qui quelle app ?",
    forWhom: [
      { name: "Napper", text: " si vous voulez surtout un planning sommeil ferme et des prédictions, et acceptez un abonnement annuel." },
      { name: "Huckleberry", text: " si vous voulez SweetSpot®, des insights et éventuellement des plans experts, au tarif mensuel US." },
      {
        name: "Moonli",
        text: " si le suivi doit rester gratuit, les deux parents ont besoin de la même vue, l’allaitement puis le BLW comptent autant que le sommeil – et les données doivent rester dans l’UE.",
      },
    ],
    nextTitle: "Lire la suite & essayer",
    nextLinks: nextLinks("fr", {
      sleep: "Routines de sommeil de bébé",
      feeding: "Suivi allaitement et biberon",
      solids: "Commencer la diversification",
      wake: "Fenêtres d’éveil par âge",
    }),
    pricesLabel: "Prix Moonli",
    downloadLabel: "Télécharger gratuitement",
    faqTitle: "Questions fréquentes",
    faq: [
      {
        q: "Moonli est-elle une alternative à Napper ?",
        a: "Oui – surtout si le coût et le suivi partagé comptent plus qu’un planning rigide. Napper reste fort sur la prédiction ; Moonli sur le tracking gratuit, l’allaitement et la diversification.",
      },
      {
        q: "Peut-elle remplacer Huckleberry ?",
        a: "Pour journaliser sommeil et tétées, oui. Si vous dépendez de SweetSpot® et des plans experts, Huckleberry Plus/Premium reste plus spécialisé – à un prix mensuel plus élevé.",
      },
      {
        q: "Où sont stockées les données ?",
        a: "Moonli héberge les données de l’app dans l’UE. Pour Napper et Huckleberry, cela dépend de l’éditeur et de la région – voir leurs politiques de confidentialité.",
      },
      {
        q: "Les prix changent-ils ?",
        a: `Les prix concurrents ont été repris des pages liées le ${COMPARE_CHECKED_AT}. Vérifiez toujours store et site avant d’acheter. Les prix Moonli sont sur /#preise.`,
      },
    ],
    disclaimer:
      "Aucune collaboration payante. Comparaison basée sur des pages tarifaires publiques et nos propres fonctions. Napper® et Huckleberry® sont des marques de leurs titulaires.",
  },
  ru: {
    seoTitle: "Moonli vs Napper vs Huckleberry: цены и функции",
    description:
      "Прозрачное сравнение Napper, Huckleberry и Moonli: сколько стоит, что остаётся бесплатным и где хранятся данные. Проверено в ноябре 2026.",
    kicker: "Сравнение",
    breadcrumbHome: "Главная",
    breadcrumbGuides: "Гид",
    breadcrumbCompare: "Сравнение",
    h1: "Moonli vs Napper vs Huckleberry",
    introHtml: `Ищете <strong class="text-foreground font-semibold">альтернативу Napper</strong> или сравниваете Huckleberry? Цены и функции рядом — без маркетингового тумана. Цены конкурентов проверены ${COMPARE_CHECKED_AT} (источники по ссылкам; суммы могут меняться).`,
    costsTitle: "Цены одним взглядом",
    costsLead:
      "Главное отличие: в Moonli базовый трекинг остаётся бесплатным навсегда. У Napper и Huckleberry планы, прогнозы и много статистики — за подпиской.",
    priceCol: "Цена",
    recommended: "Рекомендуем",
    freeRow: "Бесплатно",
    paidRow: "Платно",
    yearlyRow: "Грубо за год",
    costs: cell("ru", "free"),
    paid: cell("ru", "paid"),
    yearly: cell("ru", "yearly"),
    sourceLabel: "Источник",
    costsNoteHtml:
      'USD-цены конкурентов без конвертации и налогов стора. Цены Moonli: <a href="/#preise" class="underline hover:text-foreground">moonli.net/#preise</a>.',
    featuresTitle: "Функции, которые важны",
    featuresLead:
      "Napper и Huckleberry сильны в планах сна и прогнозах. Moonli — когда трекаете вдвоём, нужны кормление и позже прикорм/BLW, и не хотите платить за каждую статистику.",
    topicCol: "Тема",
    featureRows: [
      { label: "Трекинг сна", napper: "Да · фокус приложения", huckleberry: "Да · фокус приложения", moonli: "Да · бесплатно" },
      {
        label: "План / прогноз",
        napper: "Сильная сторона: план по возрасту и персонализация",
        huckleberry: "Сильная сторона: SweetSpot® и Schedule Creator (Plus/Premium)",
        moonli: "Ориентиры окон бодрствования и план дня (Premium)",
      },
      { label: "Грудное и бутылочка", napper: "Трекинг возможен", huckleberry: "Трекинг возможен", moonli: "Дневник кормлений · бесплатно" },
      { label: "Прикорм / BLW", napper: "Второстепенно", huckleberry: "Лог возможен, без фокуса BLW", moonli: "Тарелка, 100+ продуктов, свои рецепты" },
      {
        label: "Оба родителя / sync",
        napper: "Шеринг по тарифу",
        huckleberry: "Несколько устройств на одном аккаунте",
        moonli: "Parent-Sync в реальном времени (Premium)",
      },
      { label: "Забота с игрой", napper: "—", huckleberry: "—", moonli: "Очки, колесо чести, комплименты (Premium)" },
      {
        label: "Белый шум и сказки",
        napper: "Звуки сна (Unlimited)",
        huckleberry: "Нет сопоставимого фокуса",
        moonli: "Да · большой выбор уже в Free",
      },
      { label: "Без рекламы", napper: "Подписочная модель", huckleberry: "Подписочная модель", moonli: "Premium 100 % без рекламы" },
      {
        label: "Хранение данных",
        napper: "Зависит от вендора / региона",
        huckleberry: "Зависит от вендора / региона",
        moonli: "Данные хостятся в ЕС",
      },
      { label: "Для DACH / ЕС", napper: "Intl. · сильный DE-контент", huckleberry: "В основном EN / US", moonli: "Да · Вена, гиды DE/AT" },
    ],
    forWhomTitle: "Кому какое приложение?",
    forWhom: [
      { name: "Napper", text: ", если нужен жёсткий план сна и прогнозы и вы готовы к годовой подписке." },
      { name: "Huckleberry", text: ", если хотите SweetSpot®, инсайты и, возможно, экспертные планы по месячной US-цене." },
      {
        name: "Moonli",
        text: ", если трекинг должен оставаться бесплатным, обоим родителям нужна одна картина дня, кормление и позже прикорм/BLW важны так же, как сон — и данные должны быть в ЕС.",
      },
    ],
    nextTitle: "Читать дальше и попробовать",
    nextLinks: nextLinks("ru", {
      sleep: "Режим сна малыша",
      feeding: "Грудное вскармливание и бутылочка",
      solids: "Начало прикорма",
      wake: "Окна бодрствования по возрасту",
    }),
    pricesLabel: "Цены Moonli",
    downloadLabel: "Скачать бесплатно",
    faqTitle: "Частые вопросы",
    faq: [
      {
        q: "Moonli — альтернатива Napper?",
        a: "Да — особенно если важнее цена и общий трекинг, а не жёсткий план. Napper силён в прогнозах; Moonli — в бесплатном трекинге, кормлении и прикорме.",
      },
      {
        q: "Можно ли заменить Huckleberry?",
        a: "Для лога сна и кормлений — да. Если нужны SweetSpot® и экспертные планы, Huckleberry Plus/Premium остаётся более узкой опцией — по более высокой месячной цене.",
      },
      {
        q: "Где хранятся данные?",
        a: "Moonli хостит данные приложения в ЕС. У Napper и Huckleberry это зависит от вендора и региона — смотрите их политики конфиденциальности.",
      },
      {
        q: "Меняются ли цены?",
        a: `Цены конкурентов взяты с указанных страниц на ${COMPARE_CHECKED_AT}. Перед покупкой всегда проверяйте стор и сайт. Цены Moonli — на /#preise.`,
      },
    ],
    disclaimer:
      "Без платного партнёрства. Сравнение на основе публичных прайсов и наших собственных функций. Napper® и Huckleberry® — товарные знаки правообладателей.",
  },
};

export function getCompareCopy(lang: GuideLang): CompareCopy {
  return copy[lang];
}

export const COMPARE_HUB_TEASER: Record<GuideLang, { before: string; link: string }> = {
  de: { before: "Napper oder Huckleberry im Blick?", link: "Kosten & Funktionen transparent vergleichen" },
  en: { before: "Looking at Napper or Huckleberry?", link: "Compare pricing & features clearly" },
  es: { before: "¿Mirando Napper o Huckleberry?", link: "Compara precios y funciones con claridad" },
  fr: { before: "Vous regardez Napper ou Huckleberry ?", link: "Comparer clairement prix et fonctions" },
  ru: { before: "Смотрите Napper или Huckleberry?", link: "Прозрачно сравнить цены и функции" },
};
