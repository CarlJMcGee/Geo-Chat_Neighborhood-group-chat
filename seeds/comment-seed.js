const Comment = require("../models/Comments");

const commentList = [
  {
    title: "Comment 1",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu ac tortor dignissim convallis aenean et tortor at.",
    user_id: 2,
    post_id: 1,
  },
  {
    title: "Comment 2",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu ac tortor dignissim convallis aenean et tortor at.",
    user_id: 1,
    post_id: 1,
  },
  {
    title: "Comment 3",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu ac tortor dignissim convallis aenean et tortor at.",
    user_id: 1,
    post_id: 3,
  },
  {
    title: "Comment 4",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu ac tortor dignissim convallis aenean et tortor at.",
    user_id: 2,
    post_id: 5,
  },
  {
    title: "Comment 5",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu ac tortor dignissim convallis aenean et tortor at.",
    user_id: 2,
    post_id: 3,
  },
];

const seedComments = () =>
  Comment.bulkCreate(commentList, {
    individualHooks: true,
  });

module.exports = seedComments;
