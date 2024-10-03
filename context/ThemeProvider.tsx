"use client";

import { ThemeMode } from "@/constants";
import React, { createContext, useContext, useState, useEffect } from "react";

const isDarkMode = () => {
  return (
    localStorage.theme === "dark" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  );
};

interface ThemeContextType {
  mode: string;
  setMode: (mode: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState("");

  const handleThemeChange = () => {
    if (isDarkMode()) {
      setMode(ThemeMode.dark);
      document.documentElement.classList.add("dark");
    } else {
      setMode(ThemeMode.light);
      document.documentElement.classList.remove("dark");
    }
  };

  useEffect(() => {
    handleThemeChange();
  }, [mode]);

  const changeTheme = (mode: string) => {
    setMode(mode);
    if (mode !== ThemeMode.system) {
      localStorage.theme = mode;
    } else {
      localStorage.removeItem("theme");
    }
  };

  return (
    <ThemeContext.Provider value={{ mode, setMode: changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
}
