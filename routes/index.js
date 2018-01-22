var express = require("express");
// var config = require('../config/config.js');
var router = express.Router();
var request = require("request");

router.get("/tour/:tourid", function(req, res, next) {
  request("http://alpha-api.wizio.co/api/activelisting/" + req.params.tourid, function(err, apires, body) {
    var url =
      "https://cdn.wizio.co/" +
      JSON.parse(body)[0].SubscriptionAptMedia.pubid +
      "/" +
      encodeURIComponent(JSON.parse(body)[0].title) +
      ".JPG";
    res.render("index", {
      ogImageContent: url,
      ogUrl: "http://alpha.wizio.co/tour/0994f2d2-0310-41e0-8036-329fb3e14856"
    });
  });
});

router.get("/*", function(req, res, next) {
  res.render("index", {
    title: "Express",
    ogImageContent: "https://cdn.wizio.co/cb029dc4-15ce-4d97-96fd-f8c8c84aba15/Living%20Room%201.JPG",
    ogUrl: "http://alpha.wizio.co/"
  });
});

router.get("/test", function(req, res, next) {
  res.render("sdfa", {
    title: "Express"
  });
});
router.get("/envbeurl", function(req, res, next) {
  // res.send(config.backendAPIURL);
});

module.exports = router;
