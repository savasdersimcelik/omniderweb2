"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "@/i18n/navigation";

/**
 * Instant top progress bar on internal link clicks so navigations feel responsive
 * even while the next RSC payload is still loading.
 */
export function NavigationProgress() {
  const pathname = usePathname();
  const [active, setActive] = useState(false);
  const [done, setDone] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    setDone(true);
    const finish = window.setTimeout(() => {
      setActive(false);
      setDone(false);
    }, 280);
    return () => window.clearTimeout(finish);
  }, [pathname]);

  useEffect(() => {
    const clearDelay = () => {
      if (timerRef.current != null) {
        window.clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };

    const onClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const anchor = (event.target as Element | null)?.closest?.("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("#")) return;
      if (anchor.target === "_blank" || anchor.hasAttribute("download")) return;
      if (
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        href.startsWith("javascript:")
      ) {
        return;
      }

      let url: URL;
      try {
        url = new URL(href, window.location.href);
      } catch {
        return;
      }

      if (url.origin !== window.location.origin) return;

      const nextPath = `${url.pathname}${url.search}`;
      const currentPath = `${window.location.pathname}${window.location.search}`;
      if (nextPath === currentPath) return;

      clearDelay();
      setDone(false);
      // Tiny delay avoids flash on instant cached navigations.
      timerRef.current = window.setTimeout(() => setActive(true), 40);
    };

    document.addEventListener("click", onClick, true);
    return () => {
      clearDelay();
      document.removeEventListener("click", onClick, true);
    };
  }, []);

  if (!active && !done) return null;

  return (
    <div
      className={`nav-progress${done ? " is-done" : " is-active"}`}
      role="progressbar"
      aria-hidden
    />
  );
}
