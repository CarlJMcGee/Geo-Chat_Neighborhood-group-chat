const router = require("express").Router();
const apiRoutes = require("./api");
<<<<<<< HEAD

router.use("/api", apiRoutes);

router.use((req, res) => {
  res.send("<h1>Wrong Route!</h1>");
});

module.exports = router;
=======
const homeRoutes = require("./home-routes");

router.use("/api", apiRoutes);
router.use("/", homeRoutes);

module.exports = router;
>>>>>>> 161d7164bc8c5055f148868ede76501107afcf99
