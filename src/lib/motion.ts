/**
 * Framer Motion + Astro SSR: `initial={{ opacity: 0 }}` bleibt nach Hydration oft unsichtbar.
 * Mit `false` rendert der Endzustand sofort server- und clientseitig.
 */
export const motionInitial = false as const;

/** Strong ease-out — UI enters and marketing scroll-ins. */
export const easeOut = [0.23, 1, 0.32, 1] as const;

/** Critically damped follow for scroll-tied marketing motion. */
export const scrollSpring = { stiffness: 90, damping: 24, restDelta: 0.001 } as const;

/** Snappy magnetic pull. Near-imperceptible, hover-gated. */
export const magneticSpring = { stiffness: 260, damping: 22, mass: 0.55 } as const;
