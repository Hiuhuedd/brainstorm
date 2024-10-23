import { list, check, todo, home, mailIcon } from "./Icons";

const menu = [
  {
    id: 1,
    title: "Resources",
    icon: home,
    link: "/",
  },
  {
    id: 2,
    title: "Exams",
    icon: list,
    link: "/exams",
  },
  {
    id: 3,
    title: "CATs",
    icon: check,
    link: "/cats",
  },
  {
    id: 4,
    title: "Flashcards",
    icon: mailIcon,
    link: "/flashcards",
  },
  {
    id: 5,
    title: "Endorsed",
    icon: todo,
    link: "/professor-endorsed",
  },
];

export default menu;
