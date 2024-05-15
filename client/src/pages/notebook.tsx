import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import { Notes } from "../components/notes";

const getNotes = async (notebookId: string | undefined) => {
  const response = await axios(`/api/notes/${notebookId}`);
  return response.data.data;
};

const Notebook = () => {
  const { id } = useParams();

  const { data: notes } = useQuery({
    queryKey: ["notes", id],
    queryFn: () => getNotes(id),
  });
  return (
    <div>
      <Notes notes={notes} />
    </div>
  );
};

export default Notebook;
