import { createContext, useEffect, useState } from "react";

type ThemeContextTypes = {
  theme: string;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextTypes | null>(null);

type Props = {
  children: React.ReactNode;
};

export const ThemeProvider = ({ children }: Props) => {
  let savedTheme = localStorage.getItem("theme");
  if (!savedTheme) {
    const prefersDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    savedTheme = prefersDarkMode ? "dark" : "light";
  }

  const [isDarkMode, setIsDarkMode] = useState(savedTheme === "dark");

  const theme = isDarkMode ? "dark" : "light";

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      const newMode = !prev;
      const newTheme = newMode ? "dark" : "light";
      localStorage.setItem("theme", newTheme);
      return newMode;
    });
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
