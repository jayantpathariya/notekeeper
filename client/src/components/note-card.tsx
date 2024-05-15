import { Trash2 } from "lucide-react";

import { useModal } from "../hooks/use-modal";
import { formatDistanceToNow } from "date-fns";

type Props = {
  note: {
    id: number;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
  };
};

export const NoteCard = ({ note }: Props) => {
  const { onOpen } = useModal();

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onOpen("deleteNoteModal", note.title, note.id);
  };

  return (
    <div
      onClick={() => onOpen("editModal", undefined, note.id)}
      className="bg-surface-light dark:bg-surface-dark border border-outline-variant-light dark:border-outline-variant-dark p-4 rounded-xl flex flex-col gap-y-2 hover:border-outline-light hover:dark:border-outline-dark transition duration-300 hover:bg-surface-dark/10 hover:dark:dark:bg-surface-light/10 active:bg-surface-dark/15 active:dark:dark:bg-surface-light/15 cursor-pointer group"
    >
      <h2 className="text-on-surface-light dark:text-on-surface-dark text-sm font-medium">
        {note.title}
      </h2>
      <p className="text-on-surface-variant-light dark:text-on-surface-variant-dark text-sm line-clamp-4">
        {note.content}
      </p>
      <div className="flex items-center justify-between mt-auto">
        <span className="text-xs text-on-surface-variant-light dark:text-on-surface-variant-dark">
          {formatDistanceToNow(note.createdAt, { addSuffix: true })}
        </span>
        <button
          onClick={handleDelete}
          className="opacity-0 group-hover:opacity-100 transition duration-300 text-on-surface-light dark:text-on-surface-dark hover:bg-surface-container-low-light/50 hover:dark:bg-surface-container-low-dark/50 p-1.5 rounded-full flex items-center justify-center "
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

const Skeleton = () => {
  return (
    <div className="bg-surface-light dark:bg-surface-dark border border-outline-variant-light dark:border-outline-variant-dark p-4 rounded-xl flex flex-col gap-y-2 animate-pulse">
      <div className="h-4 bg-on-surface-light/50 dark:bg-on-surface-dark/50 rounded w-1/2"></div>
      <div className="h-4 bg-on-surface-variant-light/50 dark:bg-on-surface-variant-dark/50 rounded"></div>
      <div className="h-4 bg-on-surface-variant-light/50 dark:bg-on-surface-variant-dark/50 rounded"></div>
      <div className="h-4 w-[80%] bg-on-surface-variant-light/50 dark:bg-on-surface-variant-dark/50 rounded"></div>
      <div className="flex items-center justify-between mt-auto">
        <div className="h-3 w-12 bg-on-surface-variant-light/50 dark:bg-on-surface-variant-dark/50 rounded"></div>
        <div className="h-5 w-5 bg-on-surface-light/50 dark:bg-on-surface-dark/50 rounded-full"></div>
      </div>
    </div>
  );
};

NoteCard.Skeleton = Skeleton;
