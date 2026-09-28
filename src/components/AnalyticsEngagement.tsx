import { useEffect } from "react";
import {
  ANALYTICS_CONSENT_EVENT,
  trackEvent,
} from "@/lib/analytics";
import { getStoredConsent } from "@/lib/cookieConsent";

const SCROLL_MARKS = [25, 50, 75, 90, 100] as const;

const SECTION_IDS = [
  "funktionen",
  "vergleich",
  "feedback",
  "preise",
  "gruender",
  "download",
] as const;

const AnalyticsEngagement = () => {
  useEffect(() => {
    let stopped = false;
    let scrollAttached = false;
    const seenScroll = new Set<number>();
    const seenSections = new Set<string>();
    const observers: IntersectionObserver[] = [];

    const scrollPercent = () => {
      const root = document.documentElement;
      const scrolled = window.scrollY + window.innerHeight;
      const total = Math.max(root.scrollHeight, 1);
      return Math.min(100, Math.round((scrolled / total) * 100));
    };

    const onScroll = () => {
      const percent = scrollPercent();
      for (const mark of SCROLL_MARKS) {
        if (percent >= mark && !seenScroll.has(mark)) {
          seenScroll.add(mark);
          trackEvent("scroll_depth", { percent_scrolled: mark });
        }
      }
    };

    const watchSections = () => {
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (!el) continue;
        const observer = new IntersectionObserver(
          (entries) => {
            for (const entry of entries) {
              if (!entry.isIntersecting || seenSections.has(id)) continue;
              seenSections.add(id);
              trackEvent("section_view", { section_id: id });
              observer.disconnect();
            }
          },
          { threshold: 0.35 },
        );
        observer.observe(el);
        observers.push(observer);
      }
    };

    const start = () => {
      if (stopped || scrollAttached) return;
      if (!getStoredConsent()?.analytics) return;
      scrollAttached = true;
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
      watchSections();
    };

    const onConsent = (event: Event) => {
      const granted = (event as CustomEvent<{ granted: boolean }>).detail?.granted;
      if (granted) start();
    };

    start();
    window.addEventListener(ANALYTICS_CONSENT_EVENT, onConsent);

    return () => {
      stopped = true;
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener(ANALYTICS_CONSENT_EVENT, onConsent);
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  return null;
};

export default AnalyticsEngagement;
