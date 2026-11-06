import { Apple, Play } from "lucide-react";
import { useRef } from "react";
import sleepShot from "@/assets/hero-sleep.png";
import weeklyShot from "@/assets/hero-wochenbericht.png";
import growthShot from "@/assets/hero-entwicklung.png";
import { assetUrl } from "@/lib/assetUrl";
import { APP_STORE_URL, GOOGLE_PLAY_URL } from "@/constants/storeUrls";
import { gsap, useGSAP } from "@/lib/gsapClient";
import { trackEvent } from "@/lib/analytics";
import type { StageBeat } from "@/components/v2/copy";
import "./night.css";

const shots = [
  { src: assetUrl(sleepShot), alt: "Schlaf und Stillen in Moonli" },
  { src: assetUrl(weeklyShot), alt: "Wochenbericht in Moonli" },
  { src: assetUrl(growthShot), alt: "Entwicklung und Phasen in Moonli" },
];

const storeClass =
  "inline-flex h-12 items-center justify-center gap-2 rounded-full px-5 text-[15px] font-extrabold";

type Opening = {
  a: string;
  b: string;
  c: string;
  lede: string;
};

type Panel = {
  key: string;
  time: string;
  title: string;
  body: string;
  opening?: boolean;
};

const NightSequence = ({
  opening,
  beats,
  appStore,
  play,
}: {
  opening: Opening;
  beats: StageBeat[];
  appStore: string;
  play: string;
}) => {
  const root = useRef<HTMLElement>(null);
  const panels: Panel[] = [
    { key: "open", time: beats[0].time, title: `${opening.a} ${opening.b} ${opening.c}`, body: opening.lede, opening: true },
    { key: beats[1].title, time: beats[1].time, title: beats[1].title, body: beats[1].body },
    { key: beats[2].title, time: beats[2].time, title: beats[2].title, body: beats[2].body },
  ];

  useGSAP(
    (_context, contextSafe) => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
        const pin = root.current?.querySelector<HTMLElement>(".v2-pin");
        const panelEls = gsap.utils.toArray<HTMLElement>(".v2-cinema .v2-panel");
        const shotEls = gsap.utils.toArray<HTMLElement>(".v2-cinema .v2-shot");
        const timeEls = gsap.utils.toArray<HTMLElement>(".v2-cinema .v2-time");
        const bar = root.current?.querySelector<HTMLElement>(".v2-rail-fill");
        if (!pin || panelEls.length < 2 || shotEls.length < 2 || !contextSafe) return;

        gsap.set(shotEls, { scale: 0.96, transformOrigin: "50% 30%" });
        gsap.set(shotEls[0], { scale: 1 });

        let shown = 0;
        const reveal = contextSafe((index: number) => {
          panelEls.forEach((el, panelIndex) => {
            gsap.to(el, {
              autoAlpha: panelIndex === index ? 1 : 0,
              y: panelIndex === index ? 0 : 24,
              duration: 0.45,
              overwrite: "auto",
              ease: "power3.out",
            });
          });
          timeEls.forEach((el, timeIndex) => {
            el.classList.toggle("is-on", timeIndex === index);
          });
        });

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: pin,
            start: "top top",
            end: "+=2000",
            pin: true,
            scrub: 0.4,
            anticipatePin: 1,
            onUpdate: (self) => {
              if (bar) gsap.set(bar, { scaleX: self.progress, transformOrigin: "left center" });
              const index = Math.min(panelEls.length - 1, Math.floor(self.progress * panelEls.length * 0.999));
              if (index !== shown) {
                shown = index;
                reveal(index);
              }
            },
          },
        });

        timeline.to({}, { duration: 1 });
        [0.34, 0.67].forEach((at, index) => {
          timeline
            .to(shotEls[index], { autoAlpha: 0, scale: 0.96, duration: 0.12, ease: "power1.inOut" }, at)
            .to(shotEls[index + 1], { autoAlpha: 1, scale: 1, duration: 0.12, ease: "power1.inOut" }, at);
        });
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} id="ablauf" className="v2-night relative">
      <div className="block min-[900px]:hidden motion-reduce:!block">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-16 px-5 pb-16 pt-36">
          <div>
            <h1 className="text-[clamp(2.8rem,12vw,4.4rem)] font-extrabold leading-[0.88] tracking-[-0.05em]">
              <span className="block">{opening.a}</span>
              <span className="block">{opening.b}</span>
              <span className="block text-primary">{opening.c}</span>
            </h1>
            <p className="mt-5 max-w-[34ch] text-lg leading-snug text-foreground/75">{opening.lede}</p>
            <StoreRow appStore={appStore} play={play} />
            <img
              src={shots[0].src}
              alt={shots[0].alt}
              width={447}
              height={921}
              className="mx-auto mt-10 block w-[min(100%,340px)]"
              loading="eager"
              decoding="async"
            />
          </div>
          {panels.slice(1).map((panel, index) => (
            <div key={panel.key}>
              <p className="text-5xl font-extrabold leading-none tracking-[-0.05em] text-primary">{panel.time}</p>
              <h2 className="mt-3 max-w-[16ch] text-[clamp(2rem,8vw,3rem)] font-extrabold leading-[0.92] tracking-[-0.045em]">
                {panel.title}
              </h2>
              <p className="mt-3 max-w-[32ch] text-lg text-foreground/70">{panel.body}</p>
              <img
                src={shots[index + 1].src}
                alt={shots[index + 1].alt}
                width={447}
                height={921}
                className="mx-auto mt-8 block w-[min(100%,300px)]"
                loading="lazy"
                decoding="async"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="sr-only max-[899px]:hidden motion-reduce:!hidden">
        <h1>{panels[0].title}</h1>
        <p>{panels[0].body}</p>
        {panels.slice(1).map((panel) => (
          <div key={panel.key}>
            <h2>{panel.title}</h2>
            <p>{panel.body}</p>
          </div>
        ))}
      </div>

      <div className="v2-cinema hidden min-[900px]:block motion-reduce:!hidden" aria-hidden="true">
        <div className="v2-pin relative h-[100dvh] overflow-hidden">
          <div className="mx-auto grid h-full w-full max-w-[1500px] grid-cols-[minmax(560px,1fr)_auto] items-center gap-12 px-12 pt-20">
            <div className="flex h-full flex-col justify-center pb-16">
              <div className="mb-8 flex items-center gap-4">
                <div className="relative h-px w-16 bg-foreground/15" aria-hidden>
                  <div className="v2-rail-fill absolute inset-y-0 left-0 w-full origin-left scale-x-0 bg-primary" />
                </div>
                <ol className="flex gap-5">
                  {panels.map((panel, index) => (
                    <li key={panel.time}>
                      <p
                        className={`v2-time text-lg font-extrabold tracking-[-0.04em] text-foreground/35 transition-colors duration-300 [&.is-on]:text-primary ${index === 0 ? "is-on" : ""}`}
                      >
                        {panel.time}
                      </p>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="v2-copy relative">
                <div className="v2-panel">
                  <h1 className="text-[clamp(2.9rem,4.15vw,4.7rem)] font-extrabold leading-[0.9] tracking-[-0.05em]">
                    <span className="v2-hero-line block">{opening.a}</span>
                    <span className="v2-hero-line block">{opening.b}</span>
                    <span className="v2-hero-line block text-primary">{opening.c}</span>
                  </h1>
                  <p className="v2-hero-fade mt-6 max-w-[32ch] text-lg leading-snug text-foreground/70">{opening.lede}</p>
                  <div className="v2-hero-fade">
                    <StoreRow appStore={appStore} play={play} />
                  </div>
                </div>
                {panels.slice(1).map((panel) => (
                  <article key={panel.key} className="v2-panel max-w-[14ch]">
                    <h2 className="text-[clamp(3.2rem,5.2vw,5.8rem)] font-extrabold leading-[0.88] tracking-[-0.05em]">
                      {panel.title}
                    </h2>
                    <p className="mt-5 max-w-[28ch] text-lg leading-snug text-foreground/70">{panel.body}</p>
                  </article>
                ))}
              </div>
            </div>

            <div className="v2-phone-rig relative flex h-full items-center justify-end">
              <div
                aria-hidden
                className="absolute bottom-[12%] left-1/2 h-[62%] w-[78%] -translate-x-1/2 rounded-full bg-primary/20 blur-3xl"
              />
              <div className="v2-shots relative z-[1]">
                {shots.map((shot, index) => (
                  <img
                    key={shot.src}
                    src={shot.src}
                    alt=""
                    width={447}
                    height={921}
                    className="v2-shot block h-auto w-full"
                    loading={index === 0 ? "eager" : "lazy"}
                    decoding="async"
                    draggable={false}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const StoreRow = ({ appStore, play }: { appStore: string; play: string }) => (
  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
    <a
      href={APP_STORE_URL}
      onClick={() => trackEvent("store_click", { store: "app_store", location: "hero_v2" })}
      className={`${storeClass} bg-foreground text-background`}
    >
      <Apple className="h-5 w-5" />
      {appStore}
    </a>
    <a
      href={GOOGLE_PLAY_URL}
      onClick={() => trackEvent("store_click", { store: "google_play", location: "hero_v2" })}
      className={`${storeClass} border border-foreground/15 text-foreground`}
    >
      <Play className="h-5 w-5" />
      {play}
    </a>
  </div>
);

export default NightSequence;
