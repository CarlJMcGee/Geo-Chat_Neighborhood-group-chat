const { Post } = require("../models");

const postsList = [
  {
    id: 1,
    title: "Lawn Mower to Borrow?",
    content:
      "Does anyone have a lawn mower I can borrow this morning? Mine just stalled out... I got a new one coming this week, but I wanted to get my grass trimmed this morning.",
    user_id: "1",
    neighborhood_id: 1,
  },
  {
    id: 2,
    title: "Any Good Book Recomendations?",
    content:
      "I just finished up the Battletech series and I'm iching for some more sci-fi!",
    user_id: "3",
    neighborhood_id: 1,
  },
  {
    id: 3,
    title: "Saturday BBQ Anyone?",
    content:
      "I'm planning on doing some BBQ'in this Saturday, if the weather holds... Anyone intersted? BYOB!",
    user_id: "2",
    neighborhood_id: 1,
  },
  {
    id: 4,
    title: "Lost Cat, Please HELP!",
    content:
      "My cat tux got out this morning and I haven't seen him all day. If you see a black cat with a white belly, please let me know!",
    user_id: "6",
    neighborhood_id: 1,
  },
];

const seedPosts = () =>
  Post.bulkCreate(postsList, {
    individualHooks: true,
  });

module.exports = seedPosts;
