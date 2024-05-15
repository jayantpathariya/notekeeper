import dayjs from "dayjs";
import { Menu, Moon, Sun } from "lucide-react";

import { useTheme } from "../hooks/use-theme";
import { useSidebar } from "../hooks/use-sidebar";
import { ProfileButton } from "./profile-button";

export const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const { toggleSidebar } = useSidebar();

  const greeting = () => {
    const date = new Date();
    const hours = date.getHours();

    if (hours < 12) {
      return "Good Morning";
    } else if (hours < 18) {
      return "Good Afternoon";
    } else {
      return "Good Evening";
    }
  };

  const time = dayjs().format("ddd, MMMM D, YYYY");

  return (
    <header className="flex items-center justify-between">
      <div>
        <p className="text-lg">{greeting()}</p>
        <span className="text-xs text-on-surface-variant-light dark:text-on-surface-variant-dark">
          {time}
        </span>
      </div>

      <div className="flex items-center gap-x-2">
        <button
          className="hover:bg-surface-container-highest-light hover:dark:bg-surface-container-highest-dark p-1.5 rounded-full flex items-center justify-center transition duration-300 ease-in-out"
          onClick={toggleTheme}
        >
          {theme === "light" ? (
            <Moon className="h-6 w-6" />
          ) : (
            <Sun className="h-6 w-6" />
          )}
        </button>
        <button
          className="lg:hidden hover:bg-surface-container-highest-light hover:dark:bg-surface-container-highest-dark p-1.5 rounded-full flex items-center justify-center transition duration-300"
          onClick={toggleSidebar}
        >
          <Menu className="h-5 w-5" />
        </button>
        <ProfileButton />
      </div>
    </header>
  );
};
