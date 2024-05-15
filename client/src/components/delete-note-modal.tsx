import axios from "axios";
import { toast } from "sonner";
import { useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import { cn } from "../lib/utils";
import { useModal } from "../hooks/use-modal";
import { queryClient } from "../main";

const deleteNote = async (id: number | null) => {
  const res = await axios.delete(`/api/notes/${id}`);

  return res.data;
};

export const DeleteNoteModal = () => {
  const { isOpen, onClose, type, title, id } = useModal();

  const isModalOpen = isOpen && type === "deleteNoteModal";

  const params = useParams();

  const deleteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes", params.id] });
    },
  });

  const handleDelete = () => {
    deleteMutation.mutate(id, {
      onSuccess: () => {
        toast.success("Note deleted successfully");
        onClose();
      },
    });
  };

  return (
    <div>
      <div
        className={cn(
          "hidden fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] max-w-[560px] w-[calc(100%-16px)] bg-surface-container-highest-light dark:bg-surface-container-highest-dark p-5 shadow-md rounded-xl z-20",
          isModalOpen && "block"
        )}
      >
        <h3>
          Are you sure you want to delete <strong>&quot;{title}&quot;</strong>?
        </h3>
        <div className="flex items-center mt-6">
          <div className="ml-auto flex items-center gap-x-2">
            <button
              onClick={onClose}
              className="text-primary-light dark:text-primary-dark px-4 py-2 hover:bg-primary-light/20 hover:dark:hover:bg-primary-dark/20 rounded-full"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 rounded-full bg-primary-light hover:bg-primary-light/80 dark:bg-primary-dark hover:dark:bg-primary-dark/80 text-on-primary-light dark:text-on-primary-dark"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
      <div
        className={cn(
          "hidden absolute bg-black/30 h-full w-full inset-0 z-10",
          isModalOpen && "block"
        )}
      />
    </div>
  );
};
