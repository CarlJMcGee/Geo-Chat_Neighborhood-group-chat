const router = require("express").Router();


const userRoutes = require("./user-routes");
const neighborhoodRoutes = require("./neighborhood-routes");
const postRoutes = require("./post-routes");
const commentRoutes = require("./comments-routes");


router.use("/users", userRoutes);
router.use("/neighborhoods", neighborhoodRoutes);
router.use("/posts", postRoutes);
router.use("/comments", commentRoutes);

module.exports = router;
