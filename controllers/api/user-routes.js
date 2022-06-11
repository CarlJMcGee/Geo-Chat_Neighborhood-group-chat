const router = require("express").Router();
const { json } = require("body-parser");
const { Comment, Neighborhood, Post, User } = require("../../models");

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
        model: Comment,
        attributes: ["title"],
      },
      // Including associated neighborhood data
      {
        model: Neighborhood,
        attributes: ["name"],
      },
      // Including associated post data
      {
        model: Post,
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
});

router.get("/uid/:id", (req, res) => {
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
        model: Comment,
        attributes: ["title"],
      },
      // Including associated neighborhood data
      {
        model: Neighborhood,
        attributes: ["name"],
      },
      // Including associated post data
      {
        model: Post,
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
});

// Create new User
router.post("/", (req, res) => {
  // Create a new User

  "id", "email", "firstName", "lastName", "neighborhood_id";
  /* req.body will look like the following
      {
        "email": "email goes here",
        "firstName": "firstName goes here",
        "lastName": "lastName goes here",
        "password": "password goes here",
        "city": "user's city name goes here",
      }
    */

  // user will enter the city name into the sign up form,
  // then the server will check if a neighborhood with that name exists
  // and if it does, assign the neighbohood id to the User.create body,
  // or if it doesn't exist, then creating a neighborhood and assign its id to th User.create body

  Neighborhood.findOrCreate({
    where: {
      name: req.body.neighborhood.toLowerCase(),
    },
  })
    .then((city) => {
      console.log(city);

      User.create({
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password,
        neighborhood_id: city[0].dataValues.id,
      });
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
router.put("/uid/:id", (req, res) => {
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
        `User with id =>: ${
          req.params.id
        } has been successfully changed to  ${JSON.stringify(req.body)}`
      );
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//Delete a User
router.delete("/uid/:id", (req, res) => {
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

// log user in and create new session with their user_id and neighborhood_id
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!user) {
      res.status(401).send(`Incorrect Email or Password`);
      return;
    }

    const auth = await user.checkPassword(req.body.password);

    if (!auth) {
      res.status(401).send(`Incorrect Email or Password`);
      return;
    }

    req.session.regenerate((err) => {
      req.session.save(() => {
        req.session.loggedIn = true;
        req.session.userId = user.id;
        req.session.neighborhoodId = user.neighborhood_id;
        console.log(req.session);

        res.status(200).send(`User # ${user.id} logged in`);
      });
    });
  } catch (err) {
    if (err) throw err;
  }
});

// log user out and clear session data
router.post("/logout", async (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
    return;
  }
  res.status(404).end();
});

module.exports = router;
