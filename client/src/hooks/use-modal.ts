import { useContext } from "react";

import { ModalContext } from "../providers/modal-provider";

export const useModal = () => {
  const ctx = useContext(ModalContext);

  if (!ctx) {
    throw new Error("useModal must be used within a ModalProvider");
  }

  return ctx;
};
