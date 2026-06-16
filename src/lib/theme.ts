import { useSyncExternalStore } from "react";

export type Theme = "light" | "dark";

const STORAGE_KEY = "theme";

/**
 * The initial theme is established by the inline script in index.html (which
 * adds the `dark` class to <html> before React mounts, avoiding a flash). We
 * read it back from the DOM here so the store and that script agree.
 */
function readTheme(): Theme {
  if (typeof document === "undefined") return "dark";
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

let currentTheme: Theme = readTheme();
const listeners = new Set<() => void>();

export function setTheme(theme: Theme): void {
  currentTheme = theme;
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // localStorage unavailable (private mode, etc.) — fall back to in-memory.
  }
  listeners.forEach((listener) => listener());
}

export function toggleTheme(): void {
  setTheme(currentTheme === "dark" ? "light" : "dark");
}

function subscribe(callback: () => void): () => void {
  listeners.add(callback);
  return () => {
    listeners.delete(callback);
  };
}

function getSnapshot(): Theme {
  return currentTheme;
}

/** Reactive access to the current theme from any component. */
export function useTheme(): {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggle: () => void;
} {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
  return { theme, setTheme, toggle: toggleTheme };
}
