const router = require("express").Router();
const { json } = require("body-parser");
const { Comments, Neighborhood, Post, User } = require("../../models");

// The `/api/comments` endpoint

// get all comments
router.get("/", (req, res) => {
  // find all comments

  Comments.findAll({
    attributes: ["id", "title", "content", "user_id"],
    // Including its associated Neighborhood and Post data
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

  // Find comments by ID
  Comments.findOne({
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

  // Create new comment
  router.post("/", (req, res) => {
    // Create a new comment

    "id", "title", "content", "user_id";
    /* req.body will look like the following
      {
        "title": "title goes here",
        "content": "content of the comment goes here",
        "user_id": 1,
      }
    */

    Comments.create(req.body, {
      title: req.body.title,
      content: req.body.content,
      user_id: req.body.user_id,
    })
      .then((databaseCommentsData) => res.json(databaseCommentsData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  // Edit comment
  router.put("/:id", (req, res) => {
    // Update a comment by its id value
    Comments.update(req.body, {
      where: {
        id: req.params.id,
      },
    })
      .then((databaseCommentsData) => {
        if (!databaseCommentsData) {
          res
            .status(400)
            .json(
              `Sorry, No comment with id =>: ${req.params.id} has been found! Please check your input and try again!`
            );
          return;
        }
        res.json(databaseCommentsData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  //Delete a comment
  router.delete("/:id", (req, res) => {
    // Delete a comment by its id value

    Comments.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then((databaseCommentsData) => {
        // Sending a status 404 message to the user if no comment with the given id is found
        if (!databaseCommentsData) {
          res
            .status(404)
            .json(
              `Sorry, No comment with id ${req.params.id} has been found! Please check your input and try again!`
            );
          return;
        }
        res.json(
          `Comment with id =>: ${req.params.id} has been successfully removed`
        );
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });
});
module.exports = router;
