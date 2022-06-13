const { Post, User, Comment, Neighborhood } = require("../models");

const router = require("express").Router();

//redirect usersto main homepage
router.use("//", (req, res, next) => {
  res.redirect("/homepage");
  return;
});

// if the user is logged in, they will be redirected to the dashboard
router.use("/homepage", (req, res, next) => {
  if (req.session.loggedIn) {
    res.redirect("/dashboard");
    return;
  }
  next();
});

// if a user is not logged in, they will be redirected to the login homepage
router.use("/dashboard/", (req, res, next) => {
  if (!req.session.loggedIn) {
    res.redirect("/homepage");
    return;
  }
  next();
});

// if a user is not logged in, they will be redirected to the login homepage
router.use("/post", (req, res, next) => {
  if (!req.session.loggedIn) {
    res.redirect("/homepage");
    return;
  }
  next();
});

// render the main login/signup homepage
router.get("/homepage", (req, res) => {
  res.render("homepage");
});

// render the dashboard with post data of the user's neighborhood with post organized by newest to oldest
router.get("/dashboard", async (req, res) => {
  const posts = await Post.findAll({
    where: {
      // find posts attached to the user's nighborhood
      neighborhood_id: req.session.neighborhoodId,
    },
    include: [
      {
        // include original poster's user data
        model: User,
        as: "OP",
        attributes: {
          exclude: ["password"],
        },
      },
      {
        // include comments from newest to oldest
        model: Comment,
        include: {
          // include commenters' user data
          model: User,
          as: "commenter",
          attributes: {
            exclude: ["password"],
          },
        },
        limit: 3,
        separate: true,
        order: [["id", "DESC"]],
      },
    ],
    // organize posts from newest to oldest
    order: [["id", "DESC"]],
  });

  const neighborhoodData = await Neighborhood.findByPk(
    req.session.neighborhoodId
  );

  // get neighborhood name and make it uppercase
  const neighborhood = neighborhoodData.dataValues.name.toUpperCase();

  res.render("dashboard", {
    loggedIn: req.session.loggedIn,
    posts: posts,
    neighborhood: neighborhood,
  });
});

// render individual post with all comments and links to edit post or comment
router.get("/post/:id", async (req, res) => {
  const post = await Post.findByPk(req.params.id, {
    include: [
      {
        // include original poster's user data
        model: User,
        as: "OP",
        attributes: {
          exclude: ["password"],
        },
      },
      {
        // include comments from newest to oldest
        model: Comment,
        include: {
          // include commenters' user data
          model: User,
          as: "commenter",
          attributes: {
            exclude: ["password"],
          },
        },
        order: [["id", "DESC"]],
      },
    ],
  });

  // compare userId to post's user_id to check if user is original poster
  const isOP = () =>
    post.dataValues.user_id === req.session.userId ? true : false;

  // check each comment to see if user created any of them
  post.comments.map((comment) => {
    comment.dataValues.user_id === req.session.userId
      ? (comment.isCommenter = true)
      : (comment.isCommenter = false);
  });

  res.render("post", {
    loggedIn: req.session.loggedIn,
    post: post,
    isOP: isOP,
  });
});

// page to edit post title or content. If user did not create post, they will be redirected to the homepage
router.get("/post/:id/edit", async (req, res) => {
  const postData = await Post.findByPk(req.params.id, {
    include: {
      // include original poster's user data
      model: User,
      as: "OP",
      attributes: {
        exclude: ["password"],
      },
    },
  });

  // get post dataValues as plaintext
  const post = postData.get({ plain: true });

  // if user is not OP, redirect to homepage
  if (req.session.userId !== post.OP.id) {
    res.status(401).redirect("/");
    return;
  }

  res.render("edit-post", {
    loggedIn: req.session.loggedIn,
    post: post,
  });
});

// page to edit comments
router.get("/comment/:id/edit", async (req, res) => {
  const commentData = await Comment.findByPk(req.params.id);
  // get comment dataValues as plaintext
  const comment = commentData.get({ plain: true });

  if (req.session.userId !== comment.user_id) {
    res.status(401).redirect("/");
    return;
  }

  res.render("edit-comments", {
    loggedIn: req.session.loggedIn,
    comment: comment,
  });
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

module.exports = router;
