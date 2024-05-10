import { Plus, X } from "lucide-react";

import { cn } from "../lib/utils";
import { Link, useLocation } from "react-router-dom";
import { SidebarItem } from "./sidebar-item";

import lightLogo from "../assets/logo-light.svg";
import darkLogo from "../assets/logo-dark.svg";

const notes = [
  {
    id: 1,
    title: "Javascript",
  },
  {
    id: 2,
    title: "Typescript",
  },
  {
    id: 3,
    title: "React",
  },
];

export const Sidebar = () => {
  const isOpen = false;
  const location = useLocation();

  const activeNotebookId = location.pathname.split("/")[2];

  return (
    <aside
      className={cn(
        "bg-surface-container-low-light dark:bg-surface-container-low-dark border-r-2 border-on-surface-variant-light/20 max-w-[350px] h-full w-full fixed top-0 right-[100%] bottom-0 lg:left-0 lg:right-auto p-4 overflow-y-auto rounded-r-md z-10 transition duration-300 ease-in-out",
        !isOpen && "translate-x-0",
        isOpen && "translate-x-[100%]"
      )}
    >
      <div className="flex items-center justify-between">
        <Link to="/" className="p-2">
          <img className="dark:hidden w-36" src={lightLogo} alt="logo" />
          <img className="hidden dark:block w-36" src={darkLogo} alt="logo" />
        </Link>
        <button className="hover:bg-surface-container-highest-light hover:dark:bg-surface-container-highest-dark p-1.5 rounded-full flex items-center justify-center transition duration-300 lg:hidden">
          <X className="w-4 h-4" />
        </button>
      </div>
      <button className="bg-primary-container-light hover:bg-primary-container-light/80 dark:bg-primary-container-dark hover:dark:bg-primary-container-dark/80 text-on-primary-container-light dark:text-on-primary-container-dark flex items-center gap-x-2 px-4 py-4 rounded-xl text-sm mt-4">
        <Plus className="h-5 w-5" />
        <span>New note</span>
      </button>
      <div className="mt-4">
        <div className="flex items-center justify-between">
          <h2 className="uppercase text-sm">Notebooks</h2>
          <button
            disabled
            className="hover:bg-surface-container-highest-light hover:dark:bg-surface-container-highest-dark p-1.5 rounded-full flex items-center justify-center transition duration-300 disabled:pointer-events-none disabled:opacity-50"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        <div className="mt-4 flex flex-col gap-y-2">
          {notes.map((note) => (
            <SidebarItem
              key={note.id}
              active={note.id === Number(activeNotebookId)}
              notebook={note}
            />
          ))}
        </div>
      </div>
    </aside>
  );
};
