const router = require("express").Router();
const { json } = require("body-parser");
const { Comments, Neighborhood, Post, User } = require("../../models");

// The `/api/comments` endpoint

// get all comments
router.get("/", (req, res) => {
  // find all comments
  // Including its associated comments and user data

  Comments.findAll({
    attributes: ["id", "title", "content", "user_id"],
    // Including associated comments and user data
    include: [
      // Including associated Neighborhood data
      {
        models: Neighborhood,
        attributes: ["name"],
      },

      // Including associated Posta data
      {
        model: Post,
        attributes: ["content"],
      },
    ],
  })
    .then((databaseCommentsData) => res.json(databaseCommentsData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

Product.findOne({
  where: {
    id: req.params.id,
  },

  attributes: ["id", "title", "content", "user_id"],
  // Incorporating Neighborhood and Post data
  include: [
    // Incorporating Neighborhood data
    {
      models: Neighborhood,
      attributes: ["name"],
    },

    // Incorporating Post data
    {
      model: Post,
      attributes: ["content"],
    },
  ],
})
  .then((databaseCommentsData) => {
    if (!databaseCommentsData) {
      // Sending a status 400 message to the user if comment with the given id is not found
      res
        .status(400)
        .json(
          `Sorry, No comment with id =>: ${req.params.id} has been found! Please check your input and try again!`
        );

      // Sending the comment to the user if comment with the given id is found
      return;
    }
    // Converting data to json format
    res.json(databaseCommentsData);
  })
  // Sending a status 500 to the user if the server encountered an unexpected condition that prevented it from fulfilling the request.
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });

module.exports = router;
