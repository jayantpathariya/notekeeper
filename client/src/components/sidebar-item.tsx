"use client";

import { Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

import { cn } from "../lib/utils";

type Props = {
  active?: boolean;
  notebook: {
    id: number;
    title: string;
  };
};

export const SidebarItem = ({ active, notebook }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(notebook.title);

  const handleEdit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    e.preventDefault();
    setIsEditing(true);
  };

  const handleEditNote = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setIsEditing(false);
    }
  };

  return (
    <Link
      to={`/notebooks/${notebook.id}`}
      className={cn(
        "flex items-center justify-between  hover:bg-secondary-container-light/70 hover:dark:bg-secondary-container-dark/70 text-on-secondary-container-light dark:text-on-secondary-container-dark h-14 px-5 py-3.5 rounded-full group translate duration-300 ease-in-out",
        active &&
          "bg-secondary-container-light dark:bg-secondary-container-dark"
      )}
    >
      <div>
        {isEditing ? (
          <input
            type="text"
            value={text}
            onChange={handleEditNote}
            onClick={(e) => e.preventDefault()}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            autoFocus
            className="text-sm w-full bg-transparent border-none focus:ring-0 focus:outline-none"
          />
        ) : (
          <p className="text-sm">{text}</p>
        )}
      </div>
      <div className="hidden items-center gap-x-1 group-hover:flex">
        <button
          className="hover:bg-on-secondary-container-light/20 hover:dark:bg-on-secondary-container-dark/20 p-1.5 rounded-full"
          onClick={handleEdit}
        >
          <Pencil className="h-4 w-4" />
        </button>
        <button className="hover:bg-on-secondary-container-light/20 hover:dark:bg-on-secondary-container-dark/20 p-1.5 rounded-full">
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </Link>
  );
};
