const express = require("express");
const app = express();
const router = express.Router();
const path = require("path");

const apiRouter = require("./api/routes");
const testRouter = require("./api/test-routes");

const buildPath = path.join(__dirname, "../../dist");
const port = process.env.PORT || 3000;
const cors = require("cors");
const knex = require("./database");
const handleError = require("./api/error-handler");
// For week4 no need to look into this!
// Serve the built client html
app.use(express.static(buildPath));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));
// Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.use(cors());

router.use("/meals", apiRouter);
router.use("/reservations", apiRouter);
router.use("/reviews", apiRouter);

app.use("/", testRouter);

if (process.env.API_PATH) {
  app.use(process.env.API_PATH, router);
} else {
  throw "API_PATH is not set. Remember to set it in your .env file";
}

// for the frontend. Will first be covered in the react class
/*app.use("*", (req, res) => {
  res.sendFile(path.join(`${buildPath}/index.html`));
});*/

app.use((err, req, res, next) => {
  console.log("\x1b[31m", "app.js line:42 stack", "\x1b[0m", err.stack);
  // console.error(err.stack);
  handleError(err, res);
});

module.exports = app;
