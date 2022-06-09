const router = require("express").Router();
const commentsRoutes = require("./comments-routes");
const neighborhoodsRoutes = require("./neighborhood-routes");
const postsRoutes = require("./post-routes");
const usersRoutes = require("./user-routes");

// router.use("/comments", commentsRoutes);
// router.use("/neighborhoods", neighborhoodsRoutes);
// router.use("/posts", postsRoutes);
// router.use("/users", usersRoutes);
// router.get('/post/:id', (req, res) => {
//   const post = {
//     id: 1,
//     post_url: 'https://handlebarsjs.com/guide/',
//     title: 'Handlebars Docs',
//     created_at: new Date(),
//     vote_count: 10,
//     comments: [{}, {}],
//     user: {
//       username: 'test_user'
//     }
//   };

//   res.render('single-post', { post });
// });

router.get("/post/:id", (req, res) => {
  const post = {
    id: 1,
    post_url: "https://handlebarsjs.com/guide/",
    title: "Handlebars Docs",
    created_at: new Date(),
    vote_count: 10,
    comments: [{}, {}],
    user: {
      username: "root",
      password: "MYSQL@pass123",
    },
  };

  res.render("single-post", { post });
});

module.exports = router;
