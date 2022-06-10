const router = require("express").Router();
const { json } = require("body-parser");
const { Comments, Neighborhood, Post, User } = require("../../models");

// The `/api/users` endpoint

// get all users
router.get("/", (req, res) => {
  // find all users
  User.findAll({
    attributes: ["id", "email", "firstName", "lastName"],

    // Including associated comments, neighborhood and post data
    include: [
      // Including associated comments data
      {
        models: Comments,
        attributes: ["title"],
      },
      // Including associated neighborhood data
      {
        models: Neighborhood,
        attributes: ["name"],
      },
      // Including associated post data
      {
        models: Post,
        attributes: ["title"],
      },
    ],
  })
    .then((databaseUserData) => {
      if (!databaseUserData) {
        // Sending a status 400 message to the user if no User is found
        res.status(400).json(`Sorry, No user has been found!`);

        // Sending the user to the user if there is any
        return;
      }
      // Converting data to json format
      res.json(databaseUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });

  // Find user by ID
  User.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "email", "firstName", "lastName"],

    // Including associated comments, neighborhood and post data
    include: [
      // Including associated comments data
      {
        models: Comments,
        attributes: ["title"],
      },
      // Including associated neighborhood data
      {
        models: Neighborhood,
        attributes: ["name"],
      },
      // Including associated post data
      {
        models: Post,
        attributes: ["title"],
      },
    ],
  })
    .then((databaseUserData) => {
      if (!databaseUserData) {
        // Sending a status 400 message to the user if user with the given id is not found
        res
          .status(400)
          .json(
            `Sorry, No User with id =>: ${req.params.id} has been found! Please check your input and try again!`
          );

        // Sending the user to the user if user with the given id is found
        return;
      }
      // Converting data to json format
      res.json(databaseUserData);
    })
    // Sending a status 500 to the user if the server encountered an unexpected condition that prevented it from fulfilling the request.
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });

  // Create new User
  router.post("/", (req, res) => {
    // Create a new User

    "id", "email", "firstName", "lastName", "password", "neighborhood_id";
    /* req.body will look like the following
      {
        "email": "email goes here",
        "firstName": "firstName goes here",
        "lastName": "lastName goes here",
        "password": "password goes here",
        "neighborhood_id": "neighborhood_id goes here",
      }
    */

    User.create(req.body, {
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: req.body.password,
      neighborhood_id: req.body.neighborhood_id,
    })
      .then((databaseUserData) =>
        res
          .status(200)
          .json(
            `User ${req.body.firstName} ${req.body.lastName} has been successfully created!`
          )
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  // Edit User
  router.put("/:id", (req, res) => {
    // Update a user by its id value
    User.update(req.body, {
      where: {
        id: req.params.id,
      },
    })
      .then((databaseUserData) => {
        if (!databaseUserData) {
          res
            .status(400)
            .json(
              `Sorry, No User with id =>: ${req.params.id} has been found! Please check your input and try again!`
            );
          return;
        }
        res.json(
          `User with id =>: ${req.params.id} has been successfully changed to  `(
            databaseUserData
          )
        );
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  //Delete a User
  router.delete("/:id", (req, res) => {
    // Delete a user by its id value

    User.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then((databaseUserData) => {
        // Sending a status 404 message to the user if no user with the given id is found
        if (!databaseUserData) {
          res
            .status(404)
            .json(
              `Sorry, No User with id ${req.params.id} has been found! Please check your input and try again!`
            );
          return;
        }
        res.json(
          `User with id =>: ${req.params.id} has been successfully removed`
        );
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });
});
module.exports = router;
