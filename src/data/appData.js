const priorities = { High: 3, Medium: 2, Low: 1 };
const progress = [{ Done: 3 }, { InProgress: 2 }, { Todo: 1 }];
const sort = ["Task", "Priority", "Date", "Progress"];
const defaultTasks = [
  {
    task: "Read a book",
    notes: "Mum reckons I should check out some of those Matthew Reilly books.",
    priority: "Low",
    date: "17/10/2023, 12:20:04",
    progress: "To do",
  },
  {
    task: "Go to the market (Ingredients for spaghetti aglio, olio e peperoncino)",
    notes: "spaghetti, chilli powder, garlic, parsley, milk, cheese, mushrooms",
    priority: "Medium",
    date: "20/10/2023, 13:20:04",
    progress: "In progress",
  },
  {
    task: "Go to the gym",
    notes: "Monday: Legs\nWednesday: Arms\nFriday: Neck",
    priority: "High",
    date: "16/10/2023, 11:20:04",
    progress: "To do",
  },
  {
    task: "Zebra watching",
    priority: "High",
    date: "20/10/2023, 14:50:24",
    progress: "In progress",
  },
  {
    task: "Aardvark show",
    priority: "Low",
    date: "21/10/2023, 14:50:37",
    progress: "Done",
  },
];

export { priorities, progress, sort, defaultTasks };
