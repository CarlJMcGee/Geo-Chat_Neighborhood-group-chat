const router = require("express").Router();
const apiRoutes = require("./api");
<<<<<<< HEAD
<<<<<<< HEAD
=======
const homeRoutes = require("./home-routes");
>>>>>>> e11a7d1fad3238a27ba7ca8ec330200a60914c9a

router.use("/api", apiRoutes);
router.use("/", homeRoutes);

router.use((req, res) => {
  res.send("<h1>Wrong Route!</h1>");
});

module.exports = router;
<<<<<<< HEAD
=======
const homeRoutes = require("./home-routes");

router.use("/api", apiRoutes);
router.use("/", homeRoutes);

module.exports = router;
>>>>>>> 161d7164bc8c5055f148868ede76501107afcf99
=======
>>>>>>> e11a7d1fad3238a27ba7ca8ec330200a60914c9a
