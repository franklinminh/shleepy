/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/
const API_KEY = "C-vkcU6_0jq2UjpPhOwPAn3s2QTqu60k"
const DEV_ID = "4actk-robinl21mitedu-testing-zziD4s3W7V"
const SECRET = "aa24214b6dc9365a365faa07436bf40329dfc0320374dcc6"

const express = require("express");

// import models so we can interact with the database
const User = require("./models/user");
// Importing the API and instantiating the client using your keys
const { default: Terra } = require("terra-api");

// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//initialize socket
const socketManager = require("./server-socket");

const terra = new Terra(DEV_ID, API_KEY, SECRET);
terra.getProviders().then((p) => {console.log(p)});
terra
  .getUsers()
  .then((p) => {
  	console.log(p);
	})
router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }

  res.send(req.user);
});

router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user)
    socketManager.addUser(req.user, socketManager.getSocketFromSocketID(req.body.socketid));
  res.send({});
});

// |------------------------------|
// | write your API methods below!|
// |------------------------------|


router.post("/getProviders", (req, res) => {
  terra.getProviders().then((p) => {console.log(p)});
});

router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
