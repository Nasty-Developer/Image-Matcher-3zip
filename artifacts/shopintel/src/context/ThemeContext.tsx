import React, { createContext, useContext, useState, useEffect } from "react";

type ColorScheme = "dark" | "light";
type ThemeMode = "signature" | "minimal";

interface ThemeContextType {
  theme: ColorScheme;
  toggleTheme: () => void;
  colorScheme: ColorScheme;
  setColorScheme: (scheme: ColorScheme) => void;
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [colorScheme, setColorScheme] = useState<ColorScheme>(() => {
    return (localStorage.getItem("prisma_color_scheme") as ColorScheme)
      || (localStorage.getItem("prisma_legacy_theme") as ColorScheme)
      || "dark";
  });
  const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
    return (localStorage.getItem("prisma_theme_mode") as ThemeMode) || "signature";
  });

  useEffect(() => {
    localStorage.setItem("prisma_color_scheme", colorScheme);
    document.documentElement.classList.toggle("light-mode", colorScheme === "light");
  }, [colorScheme]);

  useEffect(() => {
    localStorage.setItem("prisma_theme_mode", themeMode);
    document.documentElement.classList.toggle("theme-minimal", themeMode === "minimal");
    document.documentElement.classList.toggle("theme-signature", themeMode === "signature");
  }, [themeMode]);

  const toggleTheme = () => {
    setColorScheme(prev => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider
      value={{
        theme: colorScheme,
        toggleTheme,
        colorScheme,
        setColorScheme,
        themeMode,
        setThemeMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within a ThemeProvider");
  return context;
}
