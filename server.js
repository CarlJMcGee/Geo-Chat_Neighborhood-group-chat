const express = require("express");
const routes = require("./controllers");
const sequelize = require("./config/connection");
const path = require("path");
const exprsHand = require("express-handlebars");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const { v4: uuid } = require("uuid");

const hbs = exprsHand.create({});
const app = express();
const PORT = process.env.PORT || 3001;

let minutes = 60;
app.use(
  session({
    genid: () => uuid(),
    secret: "Jotaro is best JoJo",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: minutes * 60000,
    },
    store: new SequelizeStore({
      db: sequelize,
    }),
  })
);
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on PORT: ${PORT}`));
});
