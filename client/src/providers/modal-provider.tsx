import { createContext, useState } from "react";

type ModalType =
  | "createModal"
  | "deleteModal"
  | "editModal"
  | "deleteNoteModal";

type ModalContextType = {
  type: ModalType | null;
  title: string;
  id: number | null;
  isOpen: boolean;
  onOpen: (type: ModalType, title?: string, id?: number) => void;
  onClose: () => void;
};

export const ModalContext = createContext<ModalContextType | null>(null);

type Props = {
  children: React.ReactNode;
};

export const ModalProvider = ({ children }: Props) => {
  const [type, setType] = useState<ModalType | null>(null);
  const [title, setTitle] = useState("");
  const [id, setId] = useState<null | number>(null);
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = (type: ModalType, title?: string, id?: number) => {
    setType(type);
    setTitle(title || "");
    setIsOpen(true);
    setId(id || null);
  };

  const onClose = () => {
    setType(null);
    setTitle("");
    setIsOpen(false);
    setId(null);
  };

  return (
    <ModalContext.Provider
      value={{
        type,
        title,
        id,
        isOpen,
        onOpen,
        onClose,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
