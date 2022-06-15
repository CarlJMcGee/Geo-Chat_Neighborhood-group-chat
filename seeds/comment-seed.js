const Comment = require("../models/Comments");

const commentList = [
  {
    id: 1,
    content: "You can borrow mine for the day, I just finished up my yard!",
    user_id: 2,
    post_id: 1,
  },
  {
    id: 2,
    content: "Thanks, neighbor!",
    user_id: 1,
    post_id: 1,
  },

  {
    id: 3,
    content:
      "If you haven't read them already, I'd recomend the Discworld series. There are a lot of books, but it's worth the read!",
    user_id: 4,
    post_id: 2,
  },
  {
    id: 4,
    content:
      "I love Discworld! Terry Pratchett is one of my favorite authors! Unfortunatly, I've already finished the series.",
    user_id: 3,
    post_id: 2,
  },
  {
    id: 5,
    content:
      "Dang, what about the Hyprion Cantos series, by Dan Simmons? Those are very in the vibe of Pratchett or Asimov.",
    user_id: 4,
    post_id: 2,
  },

  {
    id: 6,
    content: "That sounds pretty good, I'll check them out! Thanks!",
    user_id: 3,
    post_id: 2,
  },
  {
    id: 7,
    content: "I'm down!",
    user_id: 4,
    post_id: 3,
  },
  {
    id: 8,
    content: "Count me in!",
    user_id: 5,
    post_id: 3,
  },
  {
    id: 9,
    content: "I'll you then!",
    user_id: 6,
    post_id: 3,
  },

  {
    id: 10,
    content:
      "FOUND HIM! He was hiding under my porch. I've got him here so pick him up whenever",
    user_id: 5,
    post_id: 4,
  },
  {
    id: 11,
    content: "THANK YOU! I'll be there right away!",
    user_id: 6,
    post_id: 4,
  },
];

const seedComments = () =>
  Comment.bulkCreate(commentList, {
    individualHooks: true,
  });

module.exports = seedComments;
