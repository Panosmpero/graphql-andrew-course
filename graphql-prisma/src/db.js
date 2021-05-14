const users = [
  {
    id: "1",
    name: "Panos",
    email: "panos@example.com",
    age: 34,
  },
  {
    id: "2",
    name: "Mike",
    email: "mike@example.com",
    age: 44,
  },
  {
    id: "3",
    name: "Kate",
    email: "kate@example.com",
    age: 24,
  },
];

const posts = [
  {
    id: "1",
    title: "Test title 1",
    body: "this is a post body",
    published: false,
    author: "1",
  },
  {
    id: "2",
    title: "This is a title",
    body: "this is a post body",
    published: false,
    author: "1",
  },
  {
    id: "3",
    title: "Graphql",
    body: "Is good",
    published: true,
    author: "3",
  },
  {
    id: "4",
    title: "Post for deletion",
    body: "Needs to be deleted",
    published: true,
    author: "2",
  },
];

const comments = [
  {
    id: "1",
    text: "this is a comment",
    author: "1",
    post: "1",
  },
  {
    id: "2",
    text: "another one",
    author: "1",
    post: "2",
  },
  {
    id: "3",
    text: "third random",
    author: "2",
    post: "3",
  },
  {
    id: "4",
    text: "just some letters",
    author: "3",
    post: "3",
  },
  {
    id: "5",
    text: "another one",
    author: "2",
    post: "2",
  },
];

const db = {
  users,
  posts,
  comments,
};

export default db;
