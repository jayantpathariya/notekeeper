import { Plus } from "lucide-react";

export const FabButton = () => {
  return (
    <button className="fixed bottom-8 right-5 w-14 h-14 bg-primary-container-light dark:bg-primary-container-dark text-on-primary-container-light dark:text-on-primary-container-dark flex items-center justify-center rounded-xl shadow-xl drop-shadow-lg transition duration-300 hover:shadow-md hover:drop-shadow-md lg:hidden">
      <Plus />
    </button>
  );
};
