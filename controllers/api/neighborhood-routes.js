const router = require("express").Router();
const { json } = require("body-parser");
const { Comments, Neighborhood, Post, User } = require("../../models");

// The `/api/neighborhoods` endpoint

// get all neighborhoods
router.get("/", (req, res) => {
  // find all neighborhoods
  Neighborhood.findAll({
    attributes: ["id", "name"],
  })
    .then((databaseNeighborhoodData) => {
      if (!databaseNeighborhoodData) {
        // Sending a status 400 message to the user if no neighborhood  is  found
        res.status(400).json(`Sorry, No neighborhood has been found!`);

        // Sending the neighborhood to the user if there is any
        return;
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Find neighborhood by ID
router.get("/:id", (req, res) => {
  // find neighborhood by its `id`
  Neighborhood.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "name"],
  })
    .then((databaseNeighborhoodData) => {
      if (!databaseNeighborhoodData) {
        // Sending a status 400 message to the user if neighborhood with the given id is not found
        res
          .status(400)
          .json(
            `Sorry, No neighborhood with id =>: ${req.params.id} has been found! Please check your input and try again!`
          );

        // Sending the neighborhood to the user if neighborhood with the given id is found
        return;
      }
      // Converting data to json format
      res.json(databaseNeighborhoodData);
    })
    // Sending a status 500 to the user if the server encountered an unexpected condition that prevented it from fulfilling the request.
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Create new neighborhood
router.post("/", (req, res) => {
  // Create a new neighborhood
  "id", "name";
  /* req.body will look like the following
      {
        "name": "name goes here",
      }
    */

  Neighborhood.create(req.body, {
    name: req.body.name,
  })
    .then((databaseNeighborhoodData) =>
      res
        .status(200)
        .json(`Neighborhood ${req.body.name} has been successfully created!`)
    )
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Edit neighborhood
router.put("/:id", (req, res) => {
  // Update a neighborhood by its id value
  Neighborhood.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((databaseNeighborhoodData) => {
      if (!databaseNeighborhoodData) {
        res
          .status(400)
          .json(
            `Sorry, No neighborhood with id =>: ${req.params.id} has been found! Please check your input and try again!`
          );
        return;
      }
      res.json(
        `Neighborhood with id =>: ${req.params.id} has been successfully changed to  `(
          databaseNeighborhoodData
        )
      );
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//Delete a neighborhood
router.delete("/:id", (req, res) => {
  // Delete a neighborhood by its id value
  Neighborhood.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((databaseNeighborhoodData) => {
      // Sending a status 404 message to the user if no neighborhood with the given id is found
      if (!databaseNeighborhoodData) {
        res
          .status(404)
          .json(
            `Sorry, No neighborhood with id ${req.params.id} has been found! Please check your input and try again!`
          );
        return;
      }
      res.json(
        `Neighborhood with id =>: ${req.params.id} has been successfully removed`
      );
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
