import { useTheme } from "@/theme/ThemeContext";
import type { ReactNode } from "react";

type PageShellProps = {
  children: ReactNode;
  className?: string;
};

const PageShell = ({ children, className = "" }: PageShellProps) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div
      className={`${isDark ? "night-sky" : "linen"} min-h-screen bg-gradient-page overflow-x-hidden text-foreground ${className}`}
    >
      <div className="night-sky-stars fixed inset-0 z-0 pointer-events-none" />
      {children}
    </div>
  );
};

export default PageShell;
