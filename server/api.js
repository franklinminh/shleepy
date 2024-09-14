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


router.get("/getProviders", (req, res) => {
  terra.getProviders().then((p) => {res.send(p)});
});

router.get("/getUsers", (req, res) => {
  terra
  .getUsers()
  .then((p) => {
  	res.send(p);
	});
});

router.get("/generateWidgetSession", (req, res) => {
  // user_id appended as query parameters
  terra
  .generateWidgetSession({
    referenceID: "robinl",
    providers: ["MYFITNESSPAL", "APPLE", "GARMIN"],
    authSuccessRedirectUrl: "http://localhost:5050/",
    authFailureRedirectUrl: "failure.com",
    language: 'en'
  })
  .then((s) => {
    res.send(s);
  });
});

router.get("/getData", (req, res) => {
  // user ID from generated widget session
  terra
  .getSleep({ userId: "54e13039-bed4-4a4e-8adc-1b58554d8d6c", startDate: new Date("2023-03-29"), endDate: new Date("2024-03-29"), toWebhook: true })
  .then((p) => console.log(p))
  .catch((e) => console.log(e.status, e.message));
});

router.get("/requestSong", async (req, res) => {
  const response = await fetch('https://studio-api.suno.ai/api/external/generate/', {
    method: 'POST',
    headers: {
      'accept': '/',
      'accept-language': 'en-US,en;q=0.9',
      'affiliate-id': 'undefined',
      'authorization': `Bearer TIO0M93F13oYbcLXusM5nzBwf8o65er2`,
      'content-type': 'text/plain;charset=UTF-8',
      'origin': 'https://suno.com/',
      'priority': 'u=1, i',
      'referer': 'https://suno.com/',
      'sec-ch-ua': '"Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"macOS"',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'cross-site',
      'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36'
    },
    body: JSON.stringify({
      topic: "A song about traveling on Christmas",
      tags: "pop"
    })
  });
  const data = await response.json();
  res.send(data);
});

router.get("/getData", (req, res) => {
  // user ID from generated widget session
  terra
  .getSleep({ userId: "54e13039-bed4-4a4e-8adc-1b58554d8d6c", startDate: new Date("2023-03-29"), endDate: new Date("2024-03-29"), toWebhook: true })
  .then((p) => console.log(p))
  .catch((e) => console.log(e.status, e.message));
});

router.get("/getSong", async (req, res) => {
  const response = await fetch('https://studio-api.suno.ai/api/external/clips/?ids=29a7c29d-cd30-4a9c-be85-0aa74091b380', {
    method: 'GET',
    headers: {
      'accept': '/',
      'accept-language': 'en-US,en;q=0.9',
      'affiliate-id': 'undefined',
      'authorization': `Bearer TIO0M93F13oYbcLXusM5nzBwf8o65er2`,
      'content-type': 'text/plain;charset=UTF-8',
      'origin': 'https://suno.com/',
      'priority': 'u=1, i',
      'referer': 'https://suno.com/',
      'sec-ch-ua': '"Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"macOS"',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'cross-site',
      'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36'
    }
  });
  const data = await response.json();
  res.send(data);
});

router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
