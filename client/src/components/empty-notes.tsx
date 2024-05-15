import { StickyNote } from "lucide-react";

export const EmptyNote = () => {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center flex-col gap-y-2 lg:ml-[200px]">
      <StickyNote className="opacity-25 w-12 h-12" />
      <p className="opacity-35">No notes</p>
    </div>
  );
};
