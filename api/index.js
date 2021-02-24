"use strict";
const express = require("express");
const os = require("os");
const fetch = require("node-fetch");
const path = require("path");
const serverless = require("serverless-http");
const app = express();
const bodyParser = require("body-parser");
const { getUser, load, startStream } = require("../fauna");

const apiSecret =
  "0de30bfc9c8dc4d6f75ebb13afc2c9843337f463ff9ef83d09275189485b2a1e";
const apiKey = "dc4bc6c4-fdcb-4986-a94e-b0f6caa2f884";
const workspaceId = "601d4676dfbe980014c372a7";
const { Thadeus } = require("thadeus");
const thadeus = new Thadeus({ apiSecret, apiKey, workspaceId });

const router = express.Router();
router.get("/", (req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.write("<h1>Hello from Express.js!</h1>");
  res.end();
});

router.all("/thadeus", bodyParser.json(), async (req, res) => {
  thadeus
    .predictIntents(req.body.message || req.query.message)
    .then((result) => res.send({ result }));
});

router.all("/thadeus/example", bodyParser.json(), async (req, res) => {
  thadeus
    .updateIntent({
      intentId: "601d69acdfbe980014c12372a9",
      examples: ["111", "2222", "333", "4444", "5555"],
    })
    .then((result) => res.send({ result }))
    .catch((err) => res.send(err));
});

router.get("/fauna", async (_, res) =>
  getUser()
    .then((user) => {
      console.info(user);
      res.send(user);
    })
    .catch((error) => {
      console.info("error ", error);
      res.status(500).send(error);
    })
);
router.get("/fauna-load", async (_, res) => load());
router.get("/env", (_, res) => {
  res.json({
    ...process.env,
    version: os.version(),
    platform: os.platform(),
  });
});
router.get("/do", (_, res) =>
  fetch("http://169.254.169.254/metadata/v1/")
    .then((response) => res.send(response.data))
    .catch((error) => res.status(400).send(error))
);

var cors = require("cors");
app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use("/api", router);
app.use("/.netlify/functions/index", router); // netlify

module.exports = app;
module.exports.handler = serverless(app);
app.listen(3030, () => console.log(`App is running on port`));
// startStream();
