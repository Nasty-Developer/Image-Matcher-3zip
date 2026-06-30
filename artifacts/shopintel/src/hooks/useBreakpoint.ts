import { useState, useEffect } from "react";

interface Breakpoint {
  width: number;
  isMobile: boolean;   // < 768
  isTablet: boolean;   // 768 – 1023
  isDesktop: boolean;  // ≥ 1024
  isLargeDesktop: boolean; // ≥ 1440
}

export function useBreakpoint(): Breakpoint {
  const getBreakpoint = (): Breakpoint => {
    const w = window.innerWidth;
    return {
      width: w,
      isMobile: w < 768,
      isTablet: w >= 768 && w < 1024,
      isDesktop: w >= 1024,
      isLargeDesktop: w >= 1440,
    };
  };

  const [bp, setBp] = useState<Breakpoint>(getBreakpoint);

  useEffect(() => {
    let raf: number;
    const handler = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setBp(getBreakpoint()));
    };
    window.addEventListener("resize", handler);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", handler);
    };
  }, []);

  return bp;
}
