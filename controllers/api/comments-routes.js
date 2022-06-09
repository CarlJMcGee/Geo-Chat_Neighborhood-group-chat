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
    .then((databaseCategoryData) => res.json(databaseCategoryData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
