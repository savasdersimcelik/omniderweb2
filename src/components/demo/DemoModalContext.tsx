"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type DemoModalContextValue = {
  open: boolean;
  source: string;
  openDemo: (source?: string) => void;
  closeDemo: () => void;
};

const DemoModalContext = createContext<DemoModalContextValue | null>(null);

export function DemoModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [source, setSource] = useState("website");

  const openDemo = useCallback((nextSource = "website") => {
    setSource(nextSource);
    setOpen(true);
    document.documentElement.classList.add("overflow-hidden");
  }, []);

  const closeDemo = useCallback(() => {
    setOpen(false);
    document.documentElement.classList.remove("overflow-hidden");
  }, []);

  const value = useMemo(
    () => ({ open, source, openDemo, closeDemo }),
    [open, source, openDemo, closeDemo],
  );

  return (
    <DemoModalContext.Provider value={value}>
      {children}
    </DemoModalContext.Provider>
  );
}

export function useDemoModal() {
  const ctx = useContext(DemoModalContext);
  if (!ctx) {
    throw new Error("useDemoModal must be used within DemoModalProvider");
  }
  return ctx;
}
