const router = require("express").Router();

<<<<<<< HEAD
<<<<<<< HEAD
// The followins will be replaced with the neighborhood-group-chat tables
const tableOneRoutes = require("./category-routes");
const tableTwoRoutes = require("./product-routes");
const tableThreeRoutes = require("./tag-routes");

router.use("/categories", tableOneRoutes);
router.use("/products", tableTwoRoutes);
router.use("/tags", tableThreeRoutes);

module.exports = router;
=======
=======
>>>>>>> e11a7d1fad3238a27ba7ca8ec330200a60914c9a
router.get("/", (req, res) => {
  res.send("api Routes");
});

module.exports = router;
<<<<<<< HEAD
>>>>>>> 161d7164bc8c5055f148868ede76501107afcf99
=======
>>>>>>> e11a7d1fad3238a27ba7ca8ec330200a60914c9a
