import axios from "axios";
import { X } from "lucide-react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { useMutation, useQuery } from "@tanstack/react-query";

import { useModal } from "../hooks/use-modal";
import { cn } from "../lib/utils";
import { queryClient } from "../main";

const editNote = async ({
  title,
  content,
  id,
}: {
  title: string;
  content: string;
  id: number | null;
}) => {
  const response = await axios.post(`/api/notes/${id}`, {
    title,
    content,
  });
  return response.data;
};

const getNote = async ({
  notebookId,
  noteId,
}: {
  notebookId: string | undefined;
  noteId: number | null;
}) => {
  const response = await axios.get(`/api/notes/${notebookId}/${noteId}`);
  return response.data.data;
};

export const EditNoteModal = () => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(new Date());
  const [content, setContent] = useState("");

  const { isOpen, onClose, type, id } = useModal();
  const isModalOpen = isOpen && type === "editModal";

  const params = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["notes", params.id, id],
    queryFn: () => getNote({ notebookId: params.id, noteId: id }),
    enabled: isModalOpen,
  });

  useEffect(() => {
    if (data) {
      setTitle(data.title);
      setContent(data.content);
      setDate(data.createdAt);
    }
  }, [data]);

  const editNoteMutation = useMutation({
    mutationFn: editNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes", params.id] });
      setTitle("Untitled");
      setContent("");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    editNoteMutation.mutate({
      title,
      content,
      id: id,
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
        {isLoading ? (
          <Skeleton />
        ) : (
          <>
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
                {formatDistanceToNow(date, { addSuffix: true })}
              </span>
              <button
                type="submit"
                className="text-primary-light dark:text-primary-dark px-4 py-2 hover:bg-primary-light/20 hover:dark:hover:bg-primary-dark/20 rounded-full disabled:pointer-events-none disabled:opacity-50"
                disabled={editNoteMutation.isPending || !content}
              >
                Save
              </button>
            </div>
          </>
        )}
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

const Skeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="h-4 bg-on-surface-light/50 dark:bg-on-surface-dark/50 rounded w-1/2 mb-2"></div>

      <div className="flex flex-col gap-y-2">
        <div className="h-4 bg-on-surface-variant-light/50 dark:bg-on-surface-variant-dark/50 rounded"></div>
        <div className="h-4 bg-on-surface-variant-light/50 dark:bg-on-surface-variant-dark/50 rounded"></div>
        <div className="h-4 bg-on-surface-variant-light/50 dark:bg-on-surface-variant-dark/50 rounded"></div>
        <div className="h-4 bg-on-surface-variant-light/50 dark:bg-on-surface-variant-dark/50 rounded"></div>
        <div className="h-4 bg-on-surface-variant-light/50 dark:bg-on-surface-variant-dark/50 rounded"></div>
        <div className="h-4 bg-on-surface-variant-light/50 dark:bg-on-surface-variant-dark/50 rounded"></div>
        <div className="h-4 bg-on-surface-variant-light/50 dark:bg-on-surface-variant-dark/50 rounded"></div>
        <div className="h-4 bg-on-surface-variant-light/50 dark:bg-on-surface-variant-dark/50 rounded"></div>
        <div className="h-4 w-[80%] bg-on-surface-variant-light/50 dark:bg-on-surface-variant-dark/50 rounded"></div>
        <div className="flex items-center justify-between mt-auto"></div>
      </div>
      <div className="flex items-center justify-between">
        <div className="h-3 w-14 bg-on-surface-variant-light/50 dark:bg-on-surface-variant-dark/50 rounded"></div>
        <div className="h-8 w-16 bg-on-surface-light/50 dark:bg-on-surface-dark/50 rounded-full"></div>
      </div>
    </div>
  );
};
