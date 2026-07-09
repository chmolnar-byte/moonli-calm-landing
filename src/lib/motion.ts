/**
 * Framer Motion + Astro SSR: `initial={{ opacity: 0 }}` bleibt nach Hydration oft unsichtbar.
 * Mit `false` rendert der Endzustand sofort server- und clientseitig.
 */
export const motionInitial = false as const;
