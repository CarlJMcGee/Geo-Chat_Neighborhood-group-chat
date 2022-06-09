const { Post } = require("../models");

const postsList = [
  {
    title: "Post 1",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Commodo elit at imperdiet dui accumsan sit amet nulla facilisi. Tincidunt praesent semper feugiat nibh sed pulvinar proin. Suspendisse in est ante in nibh mauris cursus mattis molestie. Egestas egestas fringilla phasellus faucibus scelerisque.",
    user_id: "1",
  },
  {
    title: "Post 2",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Commodo elit at imperdiet dui accumsan sit amet nulla facilisi. Tincidunt praesent semper feugiat nibh sed pulvinar proin. Suspendisse in est ante in nibh mauris cursus mattis molestie. Egestas egestas fringilla phasellus faucibus scelerisque.",
    user_id: "1",
  },
  {
    title: "Post 3",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Commodo elit at imperdiet dui accumsan sit amet nulla facilisi. Tincidunt praesent semper feugiat nibh sed pulvinar proin. Suspendisse in est ante in nibh mauris cursus mattis molestie. Egestas egestas fringilla phasellus faucibus scelerisque.",
    user_id: "2",
  },
  {
    title: "Post 4",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Commodo elit at imperdiet dui accumsan sit amet nulla facilisi. Tincidunt praesent semper feugiat nibh sed pulvinar proin. Suspendisse in est ante in nibh mauris cursus mattis molestie. Egestas egestas fringilla phasellus faucibus scelerisque.",
    user_id: "2",
  },
  {
    title: "Post 5",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Commodo elit at imperdiet dui accumsan sit amet nulla facilisi. Tincidunt praesent semper feugiat nibh sed pulvinar proin. Suspendisse in est ante in nibh mauris cursus mattis molestie. Egestas egestas fringilla phasellus faucibus scelerisque.",
    user_id: "1",
  },
];

const seedPosts = () =>
  Post.bulkCreate(postsList, {
    individualHooks: true,
  });

module.exports = seedPosts;
