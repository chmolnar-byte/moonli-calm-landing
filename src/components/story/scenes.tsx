import { AbsoluteFill, Easing, Img, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import sleepShot from "@/assets/hero-sleep.png";
import { assetUrl } from "@/lib/assetUrl";

export const SCENE_SIZE = 720;
export const SCENE_FPS = 30;
export const SCENE_FRAMES = 210;

type Title = { title: string; sub: string };
export type WakeCopy = Title & { weeks: string; months: string; minutes: string; regression: string; regressionNote: string };
export type OverviewCopy = Title & {
  sleep: string;
  sleepUnit: string;
  food: string;
  foodUnit: string;
  diapers: string;
  diapersUnit: string;
  more: string;
  chips: string[];
};
export type SyncCopy = Title & { parent1: string; parent2: string; evt1: string; evt2: string };

const NIGHT = "#1b2046";
const CREAM = "#f6e7c8";
const TERRA = "#c8714f";
const SAGE = "#7fa596";
const PURPLE = "#8e7bdc";
const BLUE = "#6fb3e0";
const SUN = "#e8b95a";
const CHIP_COLORS = [PURPLE, SUN, BLUE, SAGE, TERRA];

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

const Stars = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      {Array.from({ length: 26 }).map((_, i) => {
        const x = (i * 137) % SCENE_SIZE;
        const y = (i * 89) % (SCENE_SIZE * 0.7);
        const o = Math.round((0.2 + 0.4 * Math.abs(Math.sin((frame + i * 11) / 22))) * 100) / 100;
        return (
          <div
            key={i}
            style={{ position: "absolute", left: x, top: y, width: 4, height: 4, borderRadius: 4, background: CREAM, opacity: o }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

const Frame = ({ children }: { children: React.ReactNode }) => (
  <AbsoluteFill style={{ background: `radial-gradient(circle at 30% 20%, #2b3270, ${NIGHT} 65%)`, fontFamily: "inherit", overflow: "hidden" }}>
    <Stars />
    {children}
  </AbsoluteFill>
);

const Caption = ({ copy }: { copy: Title }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps, config: { damping: 200 } });
  return (
    <div
      style={{
        position: "absolute",
        left: 48,
        right: 48,
        top: 44,
        color: CREAM,
        opacity: s,
        transform: `translateY(${(1 - s) * 18}px)`,
      }}
    >
      <div style={{ fontSize: 48, fontWeight: 700, lineHeight: 1.1 }}>{copy.title}</div>
      <div style={{ fontSize: 28, opacity: 0.75, marginTop: 10 }}>{copy.sub}</div>
    </div>
  );
};

/** Wake window by age, floating bars (lower part = minimum, brighter part = range up to the maximum). */
const WAKE_DATA = [
  { age: "0–6", unit: "weeks", min: 45, max: 60 },
  { age: "2–3", unit: "months", min: 75, max: 90 },
  { age: "4–6", unit: "months", min: 90, max: 120 },
  { age: "7–9", unit: "months", min: 120, max: 180 },
  { age: "10–12", unit: "months", min: 180, max: 240 },
] as const;

export const WakeWindowScene = ({ copy }: { copy: WakeCopy }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const BASE = 560;
  const PX = 1.25;
  const LEFT = 60;
  const STEP = 120;
  const HIGHLIGHT = 2;

  const note = spring({ frame: frame - 100, fps, config: { damping: 14, stiffness: 120 } });
  const pulse = 0.5 + 0.5 * Math.sin(frame / 8);

  return (
    <Frame>
      <Caption copy={copy} />

      <div style={{ position: "absolute", left: LEFT - 20, width: STEP * 5 + 40, top: BASE, height: 3, background: "rgba(246,231,200,0.25)" }} />

      {WAKE_DATA.map((d, i) => {
        const s = spring({ frame: frame - 14 - i * 9, fps, config: { damping: 15, stiffness: 100 } });
        const hl = i === HIGHLIGHT;
        const lit = hl ? interpolate(frame, [95, 115], [0, 1], clamp) : 0;
        const full = d.max * PX * s;
        const low = d.min * PX * s;
        const x = LEFT + i * STEP + 12;
        const unit = d.unit === "weeks" ? copy.weeks : copy.months;
        return (
          <div key={d.age}>
            <div style={{ position: "absolute", left: x, width: 76, top: BASE - full, height: full, borderRadius: 16, overflow: "hidden", background: hl ? `rgba(200,113,79,${0.35 + lit * 0.65})` : "rgba(142,123,220,0.95)" }}>
              <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: low, background: "rgba(20,23,45,0.38)" }} />
            </div>
            <div style={{ position: "absolute", left: x - 22, width: 120, top: BASE - full - 34, textAlign: "center", color: CREAM, fontSize: 24, fontWeight: 600, opacity: s }}>
              {d.min}–{d.max}
            </div>
            <div style={{ position: "absolute", left: x - 22, width: 120, top: BASE + 14, textAlign: "center", color: CREAM, opacity: 0.8, fontSize: 24 }}>
              {d.age} {unit}
            </div>
          </div>
        );
      })}

      <div style={{ position: "absolute", left: LEFT - 10, top: BASE + 48, color: CREAM, opacity: 0.55, fontSize: 20 }}>{copy.minutes}</div>

      {/* 4-month regression callout */}
      <div
        style={{
          position: "absolute",
          left: 48,
          top: 235,
          width: 300,
          padding: "14px 18px",
          borderRadius: 20,
          background: "rgba(200,113,79,0.18)",
          border: `2px solid ${TERRA}`,
          color: CREAM,
          opacity: note,
          transform: `scale(${0.85 + note * 0.15})`,
          transformOrigin: "bottom left",
        }}
      >
        <div style={{ fontSize: 28, fontWeight: 700, color: "#f2b394" }}>{copy.regression}</div>
        <div style={{ fontSize: 22, opacity: 0.85, marginTop: 4, lineHeight: 1.25 }}>{copy.regressionNote}</div>
      </div>
      <svg width={SCENE_SIZE} height={SCENE_SIZE} style={{ position: "absolute", inset: 0, opacity: note }}>
        <path d={`M 250 ${326} Q 330 ${360} ${LEFT + HIGHLIGHT * STEP + 50} ${BASE - 120 * PX - 50}`} stroke={TERRA} strokeWidth={3} fill="none" strokeDasharray="6 6" />
        <circle cx={LEFT + HIGHLIGHT * STEP + 50} cy={BASE - 120 * PX - 50} r={9 + pulse * 5} fill="none" stroke={TERRA} strokeWidth={3} opacity={1 - pulse * 0.6} />
      </svg>
    </Frame>
  );
};

const MoonIcon = ({ c }: { c: string }) => (
  <svg width={64} height={64} viewBox="0 0 64 64">
    <path d="M44 40a22 22 0 1 1-24-26 17 17 0 0 0 24 26z" fill={c} />
  </svg>
);
const BottleIcon = ({ c }: { c: string }) => (
  <svg width={64} height={64} viewBox="0 0 64 64">
    <rect x={20} y={26} width={24} height={34} rx={8} fill={c} />
    <rect x={25} y={16} width={14} height={10} rx={3} fill={c} />
    <path d="M32 4c5 0 7 6 7 10H25c0-4 2-10 7-10z" fill={c} />
  </svg>
);
const DiaperIcon = ({ c }: { c: string }) => (
  <svg width={64} height={64} viewBox="0 0 64 64">
    <path d="M6 16h52v12c0 14-10 24-26 24S6 42 6 28z" fill={c} />
    <rect x={4} y={14} width={12} height={8} rx={3} fill={c} opacity={0.7} />
    <rect x={48} y={14} width={12} height={8} rx={3} fill={c} opacity={0.7} />
  </svg>
);

/** Everything at a glance: sleep, feeding, diapers as three tiles with counting numbers. */
export const OverviewScene = ({ copy }: { copy: OverviewCopy }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  // After ~3 s the three tiles shrink up to make room for the "and much more" topics.
  const c = interpolate(frame, [95, 125], [0, 1], { ...clamp, easing: Easing.inOut(Easing.cubic) });
  const lerp = (a: number, b: number) => a + (b - a) * c;
  const tiles = [
    { name: copy.sleep, unit: copy.sleepUnit, color: PURPLE, Icon: MoonIcon, value: (p: number) => `${Math.round(11 * p)} h ${String(Math.round(40 * p)).padStart(2, "0")}` },
    { name: copy.food, unit: copy.foodUnit, color: SUN, Icon: BottleIcon, value: (p: number) => `${Math.round(6 * p)}` },
    { name: copy.diapers, unit: copy.diapersUnit, color: BLUE, Icon: DiaperIcon, value: (p: number) => `${Math.round(7 * p)}` },
  ];

  return (
    <Frame>
      <Caption copy={copy} />
      <div style={{ position: "absolute", left: 28, right: 28, top: lerp(230, 180), display: "flex", gap: 16 }}>
        {tiles.map((t, i) => {
          const s = spring({ frame: frame - 16 - i * 14, fps, config: { damping: 14, stiffness: 110 } });
          const p = interpolate(frame, [30 + i * 14, 100 + i * 14], [0, 1], clamp);
          const bob = Math.sin((frame + i * 20) / 16) * 4;
          return (
            <div
              key={t.name}
              style={{
                flex: 1,
                height: lerp(330, 190),
                borderRadius: 28,
                background: "rgba(246,231,200,0.07)",
                border: `2px solid ${t.color}`,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
                opacity: s,
                transform: `translateY(${(1 - s) * 50 + bob}px) scale(${0.9 + s * 0.1})`,
              }}
            >
              <div style={{ width: lerp(96, 58), height: lerp(96, 58), borderRadius: "50%", background: `${t.color}33`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ transform: `scale(${lerp(1, 0.6)})`, display: "flex" }}>
                  <t.Icon c={t.color} />
                </div>
              </div>
              <div style={{ color: CREAM, fontSize: lerp(30, 24), fontWeight: 700, marginTop: lerp(10, 4) }}>{t.name}</div>
              <div style={{ color: t.color, fontSize: lerp(44, 32), fontWeight: 700, fontVariantNumeric: "tabular-nums" }}>{t.value(p)}</div>
              <div style={{ color: CREAM, opacity: 0.65, fontSize: lerp(22, 18) }}>{t.unit}</div>
            </div>
          );
        })}
      </div>

      <div
        style={{
          position: "absolute",
          left: 36,
          right: 36,
          top: 400,
          textAlign: "center",
          color: CREAM,
          fontSize: 34,
          fontWeight: 700,
          opacity: interpolate(frame, [115, 135], [0, 1], clamp),
        }}
      >
        {copy.more}
      </div>
      <div style={{ position: "absolute", left: 36, right: 36, top: 462, display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12 }}>
        {copy.chips.map((chip, i) => {
          const s = spring({ frame: frame - (132 + i * 6), fps, config: { damping: 12, stiffness: 140 } });
          const color = CHIP_COLORS[i % CHIP_COLORS.length];
          return (
            <div
              key={chip}
              style={{
                padding: "10px 22px",
                borderRadius: 999,
                border: `2px solid ${color}`,
                background: `${color}26`,
                color: CREAM,
                fontSize: 26,
                fontWeight: 600,
                opacity: s,
                transform: `scale(${0.6 + s * 0.4})`,
                whiteSpace: "nowrap",
              }}
            >
              {chip}
            </div>
          );
        })}
      </div>
    </Frame>
  );
};

/** One subscription, both parents track at once: two phones, live event chips, a shared pulse. */
export const ParentSyncScene = ({ copy }: { copy: SyncCopy }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({ frame: frame - 10, fps, config: { damping: 16 } });
  const pulse = interpolate(frame % 60, [0, 60], [0, 1]);

  const phone = (x: number, tilt: number, delay: number, name: string) => {
    const s = spring({ frame: frame - delay, fps, config: { damping: 15 } });
    return (
      <div style={{ position: "absolute", left: x, top: 240 + (1 - s) * 80, width: 170, opacity: s }}>
        <div style={{ textAlign: "center", color: CREAM, fontSize: 30, fontWeight: 700, marginBottom: 10 }}>{name}</div>
        <Img
          src={assetUrl(sleepShot)}
          style={{ width: 170, transform: `rotate(${tilt}deg)`, filter: "drop-shadow(0 18px 30px rgba(0,0,0,0.45))" }}
        />
      </div>
    );
  };

  const chip = (x: number, from: number, text: string, color: string) => {
    const s = spring({ frame: frame - from, fps, config: { damping: 13, stiffness: 130 } });
    const out = interpolate(frame, [from + 60, from + 80], [1, 0], clamp);
    return (
      <div
        style={{
          position: "absolute",
          left: x,
          top: 205 - s * 20,
          padding: "10px 18px",
          borderRadius: 999,
          background: color,
          color: NIGHT,
          fontSize: 24,
          fontWeight: 700,
          opacity: Math.min(s, out),
          transform: `scale(${0.7 + s * 0.3})`,
          whiteSpace: "nowrap",
        }}
      >
        {text}
      </div>
    );
  };

  return (
    <Frame>
      <Caption copy={copy} />
      {phone(110, -5, 14, copy.parent1)}
      {phone(440, 5, 24, copy.parent2)}
      {chip(50, 50, copy.evt1, PURPLE)}
      {chip(400, 90, copy.evt2, BLUE)}
      <div style={{ position: "absolute", top: 400, left: 310, width: 100, height: 100, display: "flex", alignItems: "center", justifyContent: "center", opacity: enter }}>
        <div style={{ position: "absolute", width: 100 + pulse * 70, height: 100 + pulse * 70, borderRadius: "50%", border: `4px solid ${SAGE}`, opacity: 1 - pulse }} />
        <div style={{ width: 88, height: 88, borderRadius: "50%", background: SAGE, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40, color: NIGHT, fontWeight: 800 }}>
          1×
        </div>
      </div>
    </Frame>
  );
};
