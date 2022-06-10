const router = require("express").Router();

// The followins will be replaced with the neighborhood-group-chat tables
const tableOneRoutes = require("./category-routes");
const tableTwoRoutes = require("./product-routes");
const tableThreeRoutes = require("./tag-routes");

router.use("/categories", tableOneRoutes);
router.use("/products", tableTwoRoutes);
router.use("/tags", tableThreeRoutes);

module.exports = router;
router.get("/", (req, res) => {
  res.send("api Routes");
});

module.exports = router;
