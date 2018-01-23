var express = require("express");
// var config = require('../config/config.js');
var router = express.Router();
var request = require("request");
var config = require("../config");

router.get("/tour/:tourid", function(req, res, next) {
  request(config.backendAPIURL + "activelisting/" + req.params.tourid, function(err, apires, body) {
    console.dir("-----------");
    console.dir("-----------");
    console.dir("-----------");
    console.dir("-----------");
    console.dir(body);
    console.dir(err);
    console.dir("-----------");
    console.dir("-----------");
    console.dir("-----------");
    var url =
      config.s3bucketURL +
      "/1000x500/" +
      JSON.parse(body)[0].SubscriptionApartmentPubId +
      "/" +
      encodeURIComponent(JSON.parse(body)[0].title) +
      ".JPG";
    res.render("index", {
      ogImageContent: url,
      ogUrl: "http://alpha.wizio.co/tour/" + req.params.tourid
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
