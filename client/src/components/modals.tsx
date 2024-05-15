import { CreateNoteModal } from "./create-note-modal";
import { DeleteNoteModal } from "./delete-note-modal";
import { DeleteNotebookModal } from "./delete-notebook-modal";
import { EditNoteModal } from "./edit-note-modal";

export const Modals = () => {
  return (
    <>
      <CreateNoteModal />
      <DeleteNotebookModal />
      <EditNoteModal />
      <DeleteNoteModal />
    </>
  );
};
