import { X } from "lucide-react";

import { useModal } from "../hooks/use-modal";
import { cn } from "../lib/utils";

export const CreateNoteModal = () => {
  const { isOpen, onClose, type } = useModal();

  const isModalOpen = isOpen && type === "createModal";

  const handleClose = () => {
    onClose();
  };

  return (
    <div>
      <div
        className={cn(
          "hidden fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] max-w-[560px] w-[calc(100%-16px)] bg-surface-container-highest-light dark:bg-surface-container-highest-dark p-5 shadow-md rounded-xl z-20",
          isModalOpen && "block"
        )}
      >
        <div className="flex items-center justify-between mb-2">
          <p className="text-on-surface-light dark:text-on-surface-dark">
            Untitled
          </p>
          <button onClick={handleClose}>
            <X />
          </button>
        </div>
        <textarea
          className="min-h-[240px] max-h-[calc(100vh-200px)] w-full text-on-surface-light dark:text-on-surface-dark bg-transparent outline-none border-none overflow-y-auto placeholder:text-on-surface-light placeholder:dark:text-on-surface-dark"
          placeholder="Take a note..."
        />
        <div className="flex items-center justify-between">
          <span className="text-xs text-on-surface-variant-light dark:text-on-surface-variant-dark">
            20 min ago
          </span>
          <button
            onClick={handleClose}
            className="text-primary-light dark:text-primary-dark px-4 py-2 hover:bg-primary-light/20 hover:dark:hover:bg-primary-dark/20 rounded-full"
          >
            Save
          </button>
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
