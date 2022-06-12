const { Post, User, Comment } = require("../models");

const router = require("express").Router();

router.use("//", (req, res, next) => {
  res.redirect("/homepage");
  return;
});

router.use("/homepage", (req, res, next) => {
  if (req.session.loggedIn) {
    res.redirect("/dashboard");
    return;
  }
  next();
});

router.use("/dashboard/", (req, res, next) => {
  if (!req.session.loggedIn) {
    res.redirect("/homepage");
    return;
  }
  next();
});

router.get("/homepage", (req, res) => {
  res.render("homepage");
});

router.get("/dashboard", async (req, res) => {
  const posts = await Post.findAll({
    where: {
      neighborhood_id: req.session.neighborhoodId,
    },
    include: [
      {
        model: User,
        as: "OP",
        attributes: {
          exclude: ["password"],
        },
      },
      {
        model: Comment,
        include: {
          model: User,
          as: "commenter",
          attributes: {
            exclude: ["password"],
          },
        },
      },
    ],
  });

  console.log(posts);

  res.render("dashboard", {
    loggedIn: req.session.loggedIn,
    posts: posts,
  });
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

module.exports = router;
