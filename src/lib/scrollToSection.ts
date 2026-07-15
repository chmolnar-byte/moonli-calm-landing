/** Scrollt zu einer Sektion unter der fixen Navbar. */
export function scrollToSection(id: string): void {
  const el = document.getElementById(id);
  if (!el) return;

  const isMobile = window.innerWidth < 768;
  const offset = isMobile ? 132 : 112;
  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: "smooth" });
}

export function isHomePath(pathname: string): boolean {
  const path = pathname.replace(/\/$/, "") || "/";
  return path === "/" || path.endsWith("/index.html");
}

export function scrollToHashFromUrl(): void {
  const hash = window.location.hash.replace(/^#/, "");
  if (!hash) return;

  // Kurz warten bis Layout/React-Sections gerendert sind
  requestAnimationFrame(() => {
    scrollToSection(hash);
  });
}
