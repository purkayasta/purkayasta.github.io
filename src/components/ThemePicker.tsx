import type { Theme } from "../hooks/useTheme";

const themes = [
  ["default", "Default"],
  ["thanksgiving", "Thanksgiving"],
  ["christmas", "Christmas"],
  ["doomsday", "Doomsday"],
] as const;

type ThemePickerProps = {
  theme: Theme;
  onSelect: (theme: Theme) => void;
};

export function ThemePicker({ theme, onSelect }: ThemePickerProps) {
  return (
    <div
      className="theme-control theme-dots"
      role="group"
      aria-label="Page theme"
    >
      {themes.map(([value, label]) => (
        <button
          key={value}
          type="button"
          className="theme-dot-option"
          aria-pressed={theme === value}
          onClick={() => onSelect(value)}
        >
          <span className={`theme-dot ${value}-dot`} aria-hidden="true" />
          {label}
        </button>
      ))}
    </div>
  );
}
