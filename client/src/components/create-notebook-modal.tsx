import { useState } from "react";
import { X } from "lucide-react";

import { useModal } from "../hooks/use-modal";
import { cn } from "../lib/utils";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import { queryClient } from "../main";

const createNote = async ({
  title,
  content,
  notebookId,
}: {
  title: string;
  content: string;
  notebookId: string | undefined;
}) => {
  const response = await axios.post("/api/notes", {
    title,
    content,
    notebookId,
  });
  return response.data;
};

export const CreateNotebookModal = () => {
  const [title, setTitle] = useState("Untitled");
  const [content, setContent] = useState("");

  const { isOpen, onClose, type } = useModal();

  const isModalOpen = isOpen && type === "createModal";

  const params = useParams();

  const createNoteMutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes", params.id] });
      setTitle("Untitled");
      setContent("");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createNoteMutation.mutate({
      title,
      content,
      notebookId: params.id,
    });
    onClose();
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className={cn(
          "hidden fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] max-w-[560px] w-[calc(100%-16px)] bg-surface-container-highest-light dark:bg-surface-container-highest-dark p-5 shadow-md rounded-xl z-20",
          isModalOpen && "block"
        )}
      >
        <div className="flex items-center justify-between mb-2">
          <input
            type="text"
            value={title}
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
            className="bg-transparent outline-none border-none text-on-surface-light dark:text-on-surface-dark placeholder:text-on-surface-light placeholder:dark:text-on-surface-dark font-bold"
          />

          <button
            className="hover:bg-surface-container-low-light/50 hover:dark:bg-surface-container-low-dark/50 p-1.5 rounded-full flex items-center justify-center transition duration-300"
            type="button"
            onClick={handleClose}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <textarea
          className="min-h-[240px] max-h-[calc(100vh-200px)] w-full text-on-surface-light dark:text-on-surface-dark bg-transparent outline-none border-none overflow-y-auto placeholder:text-on-surface-light placeholder:dark:text-on-surface-dark text-sm"
          placeholder="Take a note..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <div className="flex items-center justify-between">
          <span className="text-xs text-on-surface-variant-light dark:text-on-surface-variant-dark">
            20 min ago
          </span>
          <button
            onClick={handleClose}
            className="text-primary-light dark:text-primary-dark px-4 py-2 hover:bg-primary-light/20 hover:dark:hover:bg-primary-dark/20 rounded-full disabled:pointer-events-none disabled:opacity-50"
            disabled={createNoteMutation.isPending || !content}
          >
            Create
          </button>
        </div>
      </form>
      <div
        className={cn(
          "hidden absolute bg-black/30 h-full w-full inset-0 z-10",
          isModalOpen && "block"
        )}
      />
    </>
  );
};
