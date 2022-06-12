const { Post, User, Comment, Neighborhood } = require("../models");

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

router.use("/post", (req, res, next) => {
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
        limit: 3,
        separate: true,
      },
    ],
    order: [["id", "DESC"]],
  });

  const neighborhoodData = await Neighborhood.findByPk(
    req.session.neighborhoodId
  );

  const neighborhood = neighborhoodData.dataValues.name.toUpperCase();

  console.log(posts[0]);

  res.render("dashboard", {
    loggedIn: req.session.loggedIn,
    posts: posts,
    neighborhood: neighborhood,
  });
});

router.get("/post/:id", async (req, res) => {
  const post = await Post.findByPk(req.params.id, {
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

  res.render("post", {
    loggedIn: req.session.loggedIn,
    post: post,
  });
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

module.exports = router;
