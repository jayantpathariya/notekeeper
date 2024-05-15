import { EmptyNote } from "./empty-notes";
import { NoteCard } from "./note-card";

type Props = {
  notes: {
    id: number;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
  }[];
  isLoading: boolean;
  title: string;
};

export const Notes = ({ notes, isLoading, title }: Props) => {
  return (
    <section className="mt-2 h-full">
      <h1 className="text-sm font-medium capitalize">{title}</h1>
      <div className="mt-2 grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-2 items-stretch content-start">
        {isLoading ? (
          <>
            <NoteCard.Skeleton />
            <NoteCard.Skeleton />
            <NoteCard.Skeleton />
          </>
        ) : notes?.length > 0 ? (
          notes?.map((note) => <NoteCard key={note.id} note={note} />)
        ) : (
          <EmptyNote />
        )}
      </div>
    </section>
  );
};
