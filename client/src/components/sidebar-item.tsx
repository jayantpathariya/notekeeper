import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Pencil, Trash2 } from "lucide-react";

import { cn } from "../lib/utils";
import { useModal } from "../hooks/use-modal";
import { queryClient } from "../main";

type Props = {
  active?: boolean;
  notebook: {
    id: number;
    title: string;
  };
};

const editNotebook = async ({ id, title }: { id: number; title: string }) => {
  const response = await axios.post(`/api/notebooks/${id}`, { title });
  return response.data.data;
};

export const SidebarItem = ({ active, notebook }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(notebook.title);
  const { onOpen } = useModal();

  const notebookEditMutation = useMutation({
    mutationFn: editNotebook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notebooks"] });
    },
  });

  const handleEdit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    e.preventDefault();
    setIsEditing(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    notebookEditMutation.mutate(
      { id: notebook.id, title: text },
      {
        onSuccess: () => {
          toast("Notebook updated successfully");
        },
      }
    );
    setIsEditing(false);
  };

  const handleBlur = () => {
    notebookEditMutation.mutate(
      { id: notebook.id, title: text },
      {
        onSuccess: () => {
          toast("Notebook updated successfully");
        },
      }
    );
    setIsEditing(false);
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    // @ts-expect-error - Fix this later
    onOpen("deleteModal", notebook.title, notebook.id);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Link
        to={`/notebooks/${notebook.id}`}
        className={cn(
          "flex items-center justify-between hover:bg-secondary-container-light/70 hover:dark:bg-secondary-container-dark/70 text-on-secondary-container-light dark:text-on-secondary-container-dark h-14 px-5 py-3.5 rounded-full group translate duration-300 ease-in-out",
          active &&
            "bg-secondary-container-light dark:bg-secondary-container-dark",
          isEditing &&
            "bg-secondary-container-light dark:bg-secondary-container-dark"
        )}
      >
        <div>
          {isEditing ? (
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onClick={(e) => e.preventDefault()}
              onBlur={handleBlur}
              // onKeyDown={handleKeyDown}
              autoFocus
              className="text-sm w-full bg-transparent border-none focus:ring-0 focus:outline-none"
            />
          ) : (
            <p className="text-sm">{text}</p>
          )}
        </div>
        <div className="hidden items-center gap-x-1 group-hover:flex">
          <button
            type="button"
            className="hover:bg-on-secondary-container-light/20 hover:dark:bg-on-secondary-container-dark/20 p-1.5 rounded-full"
            onClick={handleEdit}
          >
            <Pencil className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="hover:bg-on-secondary-container-light/20 hover:dark:bg-on-secondary-container-dark/20 p-1.5 rounded-full"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </Link>
    </form>
  );
};

const Skeleton = () => {
  return (
    <div className="animate-pulse bg-on-surface-variant-light/50 dark:bg-on-surface-variant-dark/50 h-14 rounded-full" />
  );
};

SidebarItem.Skeleton = Skeleton;
