import { Trash2 } from "lucide-react";

import { useModal } from "../hooks/use-modal";
import { format } from "date-fns";

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

  return (
    <div className="bg-surface-light dark:bg-surface-dark border border-outline-variant-light dark:border-outline-variant-dark p-4 rounded-xl flex flex-col gap-y-2 hover:border-outline-light hover:dark:border-outline-dark transition duration-300 hover:bg-surface-dark/10 hover:dark:dark:bg-surface-light/10 active:bg-surface-dark/15 active:dark:dark:bg-surface-light/15 cursor-pointer group">
      <h2 className="text-on-surface-light dark:text-on-surface-dark text-sm font-medium">
        {note.title}
      </h2>
      <p className="text-on-surface-variant-light dark:text-on-surface-variant-dark text-sm line-clamp-4">
        {note.content}
      </p>
      <div className="flex items-center justify-between mt-auto">
        <span className="text-xs text-on-surface-variant-light dark:text-on-surface-variant-dark">
          {format(note.createdAt, "MMM dd, yyyy")}
        </span>
        <button
          onClick={() => onOpen("deleteModal", note.title)}
          className="opacity-0 group-hover:opacity-100 transition duration-300 text-on-surface-light dark:text-on-surface-dark"
        >
          <Trash2 className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};
