import type { GuideLang } from "./guidePaths";

type Scene = {
  src: string;
  alt: Record<GuideLang, string>;
};

const scene = (file: string, alt: Record<GuideLang, string>): Scene => ({
  src: `/images/guides/${file}.jpg`,
  alt,
});

const SCENES: Record<string, Scene> = {
  "wake-windows": scene("wake-windows", {
    de: "Capybara-Elternteil und Baby im Morgenlicht am Fenster",
    en: "Capybara parent and baby in morning light by a window",
    es: "Capybara adulta y bebé a la luz de la mañana junto a la ventana",
    fr: "Parent capybara et bébé dans la lumière du matin, près de la fenêtre",
    ru: "Взрослая капибара и малыш у окна в утреннем свете",
  }),
  "sleep-routines": scene("sleep-routines", {
    de: "Capybara-Elternteil und schlafendes Baby am Abend",
    en: "Capybara parent and sleeping baby in the evening",
    es: "Capybara adulta y bebé dormido por la tarde",
    fr: "Parent capybara et bébé endormi le soir",
    ru: "Взрослая капибара и спящий малыш вечером",
  }),
  feeding: scene("feeding", {
    de: "Capybara-Elternteil füttert das Baby mit dem Fläschchen",
    en: "Capybara parent feeding the baby a bottle",
    es: "Capybara adulta dando el biberón al bebé",
    fr: "Parent capybara qui donne le biberon",
    ru: "Взрослая капибара кормит малыша из бутылочки",
  }),
  solids: scene("solids", {
    de: "Baby-Capybara im Hochstuhl, daneben ein Elternteil",
    en: "Baby capybara in a high chair, a parent beside them",
    es: "Bebé capybara en la trona, con un adulto al lado",
    fr: "Bébé capybara dans une chaise haute, un parent à côté",
    ru: "Малыш-капибара в стульчике, рядом взрослый",
  }),
  growth: scene("growth", {
    de: "Baby-Capybara steht und hält die Pfote eines Elternteils",
    en: "Baby capybara standing and holding a parent's paw",
    es: "Bebé capybara de pie, agarrado a la pata de un adulto",
    fr: "Bébé capybara debout, tenant la patte d'un parent",
    ru: "Малыш-капибара стоит и держится за лапу взрослого",
  }),
  "care-work": scene("care-work", {
    de: "Zwei Capybara-Eltern: eines mit dem Baby, eines faltet eine Decke",
    en: "Two capybara parents, one with the baby, one folding a blanket",
    es: "Dos capybaras adultas: una con el bebé, otra doblando una manta",
    fr: "Deux parents capybaras : l'un avec le bébé, l'autre plie une couverture",
    ru: "Две взрослые капибары: одна с малышом, другая складывает одеяло",
  }),
  "night-exhaustion": scene("night-exhaustion", {
    de: "Capybara-Elternteil nachts neben dem schlafenden Baby",
    en: "Capybara parent at night beside the sleeping baby",
    es: "Capybara adulta de noche junto al bebé dormido",
    fr: "Parent capybara la nuit, à côté du bébé endormi",
    ru: "Взрослая капибара ночью рядом со спящим малышом",
  }),
  "calm-screen": scene("calm-screen", {
    de: "Capybara-Elternteil zeigt dem Baby ein Bilderbuch",
    en: "Capybara parent showing the baby a picture book",
    es: "Capybara adulta enseña un cuento al bebé",
    fr: "Parent capybara montre un livre d'images au bébé",
    ru: "Взрослая капибара показывает малышу книжку с картинками",
  }),
  features: scene("care-work", {
    de: "Zwei Capybara-Eltern teilen sich den Alltag mit dem Baby",
    en: "Two capybara parents sharing the day with the baby",
    es: "Dos capybaras adultas comparten el día con el bebé",
    fr: "Deux parents capybaras partagent la journée avec le bébé",
    ru: "Две взрослые капибары делят день с малышом",
  }),
};

export type GuideVisual = {
  src: string;
  alt: string;
};

export function guideVisual(id: string, lang: GuideLang): GuideVisual | null {
  const sceneForId = SCENES[id];
  if (!sceneForId) return null;
  return { src: sceneForId.src, alt: sceneForId.alt[lang] };
}
