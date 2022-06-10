const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("api Routes");
});

module.exports = router;
