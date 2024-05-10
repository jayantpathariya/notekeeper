import { useParams } from "react-router-dom";

import { Notes } from "../components/notes";

const notes = [
  {
    id: 1,
    title: "Javascript",
    notes: [
      {
        id: 1,
        title: "Javascript",
        content:
          "Javascript is a programming language that conforms to the ECMAScript specification. JavaScript is high-level, often just-in-time compiled, and multi-paradigm.",
        createdAt: "2021-10-10",
        updatedAt: "2021-10-10",
      },
      {
        id: 2,
        title: "Javascript",
        content:
          "JavaScript has curly-bracket syntax, dynamic typing, prototype-based object-orientation, and first-class functions.",
        createdAt: "2021-10-10",
        updatedAt: "2021-10-10",
      },
      {
        id: 3,
        title: "Javascript",
        content:
          "Alongside HTML and CSS, JavaScript is one of the core technologies of the World Wide Web.",
        createdAt: "2021-10-10",
        updatedAt: "2021-10-10",
      },
    ],
  },
  {
    id: 2,
    title: "Typescript",
    notes: [
      {
        id: 1,
        title: "Typescript",
        content:
          "TypeScript is an open-source language which builds on JavaScript, one of the world’s most used tools, by adding static type definitions.",
        createdAt: "2021-10-10",
        updatedAt: "2021-10-10",
      },
      {
        id: 2,
        title: "Typescript",
        content:
          "Types provide a way to describe the shape of an object, providing better documentation, and allowing TypeScript to validate that your code is working correctly.",
        createdAt: "2021-10-10",
        updatedAt: "2021-10-10",
      },
      {
        id: 3,
        title: "Typescript",
        content: "TypeScript is being developed on GitHub.",
        createdAt: "2021-10-10",
        updatedAt: "2021-10-10",
      },
    ],
  },
  {
    id: 3,
    title: "React",
    notes: [
      {
        id: 1,
        title: "React",
        content:
          "React is an open-source, front end, JavaScript library for building user interfaces or UI components.",
        createdAt: "2021-10-10",
        updatedAt: "2021-10-10",
      },
      {
        id: 2,
        title: "React",
        content:
          "It is maintained by Facebook and a community of individual developers and companies.",
        createdAt: "2021-10-10",
        updatedAt: "2021-10-10",
      },
      {
        id: 3,
        title: "React",
        content:
          "React can be used as a base in the development of single-page or mobile applications.",
        createdAt: "2021-10-10",
        updatedAt: "2021-10-10",
      },
    ],
  },
];

const Notebook = () => {
  const { id } = useParams();

  const noteList = notes.find((note) => note.id === Number(id))?.notes || [];

  return (
    <div>
      <Notes notes={noteList} />
    </div>
  );
};

export default Notebook;
