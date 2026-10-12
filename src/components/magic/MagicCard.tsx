import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";
import { type PointerEvent, type ReactNode, useCallback } from "react";
import { cn } from "@/lib/utils";
import { BorderBeam } from "@/components/magic/BorderBeam";

type MagicCardProps = {
  children: ReactNode;
  className?: string;
  gradientSize?: number;
  beam?: boolean;
};

/**
 * Adapted from Magic UI MagicCard (MIT).
 * Cursor light stays inside the brand accent. No purple spotlight.
 */
export function MagicCard({
  children,
  className,
  gradientSize = 320,
  beam = false,
}: MagicCardProps) {
  const reduce = useReducedMotion();
  const mouseX = useMotionValue(-gradientSize);
  const mouseY = useMotionValue(-gradientSize);

  const onMove = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      if (reduce) return;
      const rect = event.currentTarget.getBoundingClientRect();
      mouseX.set(event.clientX - rect.left);
      mouseY.set(event.clientY - rect.top);
    },
    [mouseX, mouseY, reduce],
  );

  const reset = useCallback(() => {
    mouseX.set(-gradientSize);
    mouseY.set(-gradientSize);
  }, [gradientSize, mouseX, mouseY]);

  const border = useMotionTemplate`radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px, var(--magic-from), var(--magic-to) 36%, hsl(var(--border)) 68%)`;
  const fill = useMotionTemplate`radial-gradient(${gradientSize * 0.72}px circle at ${mouseX}px ${mouseY}px, var(--magic-fill), transparent 70%)`;

  return (
    <motion.div
      onPointerMove={onMove}
      onPointerLeave={reset}
      className={cn(
        "magic-card group relative flex h-full flex-col overflow-hidden rounded-[1.5rem] p-px",
        reduce && "bg-border",
        className,
      )}
      style={reduce ? undefined : { background: border }}
    >
      {beam ? <BorderBeam /> : null}
      <div className="relative z-10 min-h-full flex-1 overflow-hidden rounded-[calc(1.5rem-1px)] bg-card">
        {!reduce && (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{ background: fill }}
          />
        )}
        <div className="relative">{children}</div>
      </div>
    </motion.div>
  );
}
