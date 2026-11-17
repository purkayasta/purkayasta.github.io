import { useEffect, useState } from "react";

export type Theme = "default" | "thanksgiving" | "christmas" | "doomsday";
export type ThemePreference = "auto" | Theme;

export function resolveTheme(preference: ThemePreference, date: Date): Theme {
  if (preference !== "auto") return preference;
  // U.S. release: December 18, 2026. Celebrate release day and the following day.
  if (
    date.getFullYear() === 2026 &&
    date.getMonth() === 11 &&
    [18, 19].includes(date.getDate())
  )
    return "doomsday";
  if (date.getMonth() === 11) return "christmas";
  if (date.getMonth() === 10) return "thanksgiving";
  return "default";
}

export function useTheme() {
  const [preference, setPreference] = useState<ThemePreference>("auto");
  const [date, setDate] = useState(() => new Date());
  useEffect(() => {
    let day = new Date().toDateString();
    function refresh() {
      const next = new Date();
      if (day !== next.toDateString()) {
        day = next.toDateString();
        setPreference("auto");
      }
      setDate(next);
    }
    const timer = window.setInterval(refresh, 60_000);
    document.addEventListener("visibilitychange", refresh);
    return () => {
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", refresh);
    };
  }, []);
  function selectTheme(next: ThemePreference) {
    setPreference(next);
    setDate(new Date());
  }
  return { preference, theme: resolveTheme(preference, date), selectTheme };
}
