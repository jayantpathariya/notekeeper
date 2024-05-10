import { createContext, useState } from "react";

type ModalType = "createModal" | "deleteModal";

type ModalContextType = {
  type: ModalType | null;
  title: string;
  isOpen: boolean;
  onOpen: (type: ModalType, title?: string) => void;
  onClose: () => void;
};

export const ModalContext = createContext<ModalContextType | null>(null);

type Props = {
  children: React.ReactNode;
};

export const ModalProvider = ({ children }: Props) => {
  const [type, setType] = useState<ModalType | null>(null);
  const [title, setTitle] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = (type: ModalType, title?: string) => {
    setType(type);
    setTitle(title || "");
    setIsOpen(true);
  };

  const onClose = () => {
    setType(null);
    setTitle("");
    setIsOpen(false);
  };

  return (
    <ModalContext.Provider
      value={{
        type,
        title,
        isOpen,
        onOpen,
        onClose,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
