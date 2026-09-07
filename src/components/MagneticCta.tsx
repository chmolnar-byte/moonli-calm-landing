import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useEffect, useRef, type MouseEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { magneticSpring } from "@/lib/motion";
import { scrollToSection } from "@/lib/scrollToSection";

type Variant = "primary" | "ghost";
type Size = "sm" | "md" | "lg";

const faceByVariant: Record<Variant, string> = {
  ghost: "cta-store cta-store--ghost bg-card text-foreground border border-border shadow-soft",
  primary: "cta-store cta-store--primary bg-primary text-primary-foreground shadow-soft-lg",
};

const faceBySize: Record<Size, string> = {
  sm: "px-4 py-2 text-sm font-semibold gap-2",
  md: "px-7 py-3.5 font-bold gap-2.5",
  lg: "px-8 py-3.5 text-base sm:text-lg font-bold gap-2.5",
};

type MagneticCtaProps = {
  href: string;
  children: ReactNode;
  variant: Variant;
  size?: Size;
  className?: string;
  faceClassName?: string;
};

const MagneticCta = ({
  href,
  children,
  variant,
  size = "md",
  className,
  faceClassName,
}: MagneticCtaProps) => {
  const reduce = useReducedMotion();
  const canHover = useRef(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, magneticSpring);
  const springY = useSpring(y, magneticSpring);
  const transform = useMotionTemplate`translate3d(${springX}px, ${springY}px, 0)`;

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => {
      canHover.current = mq.matches;
    };
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const isInternal = href.startsWith("#") || href.startsWith("/#");
  const face = cn(
    "pressable inline-flex items-center justify-center rounded-full",
    faceByVariant[variant],
    faceBySize[size],
    faceClassName,
  );

  const onInternalClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!isInternal) return;
    event.preventDefault();
    const id = href.replace(/^\/?#/, "");
    if (!id) return;
    scrollToSection(id);
    window.history.replaceState(null, "", `/#${id}`);
  };

  const onMove = (event: MouseEvent<HTMLAnchorElement>) => {
    if (reduce || !canHover.current) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const dx = event.clientX - (rect.left + rect.width / 2);
    const dy = event.clientY - (rect.top + rect.height / 2);
    x.set(Math.max(-8, Math.min(8, dx * 0.18)));
    y.set(Math.max(-6, Math.min(6, dy * 0.18)));
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  if (reduce) {
    return (
      <a
        href={href}
        target={isInternal ? undefined : "_blank"}
        rel={isInternal ? undefined : "noopener noreferrer"}
        className={cn(face, className)}
        onClick={onInternalClick}
      >
        {children}
      </a>
    );
  }

  return (
    <motion.a
      href={href}
      target={isInternal ? undefined : "_blank"}
      rel={isInternal ? undefined : "noopener noreferrer"}
      className={cn("cta-magnetic inline-flex", className)}
      style={{ transform }}
      onMouseMove={onMove}
      onMouseLeave={reset}
      onClick={onInternalClick}
    >
      <span className={face}>{children}</span>
    </motion.a>
  );
};

export default MagneticCta;
