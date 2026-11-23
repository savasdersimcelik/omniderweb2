"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { captureAttributionFromLocation } from "@/lib/attribution/client";

/**
 * Captures first-touch UTM / click IDs on entry and keeps them across navigations.
 */
export function AttributionCapture() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    captureAttributionFromLocation();
  }, [pathname, searchParams]);

  return null;
}
