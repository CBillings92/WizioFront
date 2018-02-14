var express = require("express");
// var config = require('../config/config.js');
var router = express.Router();
var request = require("request");
var config = require("../config");

// router.get("/tour/:tourid", function(req, res, next) {
//   console.dir("FUCK");
//   console.dir(config.backendAPIURL);
//   console.dir(req.params);
//   console.dir(request);
//   request(config.backendAPIURL + "activelisting/" + req.params.tourid, function(err, apires, body) {
//     var url = "https://cdn.wizio.co/cb029dc4-15ce-4d97-96fd-f8c8c84aba15/Living%20Room%201.JPG";
//     console.dir("FUCK");
//     console.dir(err);
//     console.dir(apires);
//     console.dir(body);
//     if (body) {
//       try {
//         url =
//           config.s3bucketURL +
//           "/1000x500/" +
//           JSON.parse(body)[0].SubscriptionApartmentPubId +
//           "/" +
//           encodeURIComponent(JSON.parse(body)[0].title) +
//           ".JPG";
//       } catch (e) {
//         console.dir(e);
//       } finally {
//         res.render("index", {
//           ogImageContent: url,
//           ogUrl: config.frontendURL + "/tour/" + req.params.tourid
//         });
//       }
//     }
//   });
// });

router.get("/listing/a3885803-1100-450f-931d-fbb53b6ed410", function(req, res, next) {
  res.render("index", {
    title: "Express",
    ogImageContent: "https://cdn.wizio.co/1000x500/a48065f3-6be0-41a5-a23c-b502ccee8c31/Kitchen.JPG",
    ogDescription:
      "Fantastic 2 bed 1 bath available in Mission Hill. The unit is easily accessible by the MBTA - just a 10 minute walk to the Green Line E train or a few minutes walk to the 14 Bus Route! Hop on the T and get to downtown Boston in 45 minutes. Local night life, restaurants, super markets and convenience stores can also be found within a quick 10 minute walk. Unit is incredibly spacious with an additional basement room that can be used for storage or as an office. Split level offers unique look and feel. This is an unbeatable price for the size and location of this unit!",
    ogUrl: "https://www.wizio.co/listing/a3885803-1100-450f-931d-fbb53b6ed410",
    ogTitle: "2 Bed 1 Bath in Mission Hill - $2700"
  });
});

router.get("/*", function(req, res, next) {
  res.render("index", {
    title: "Express",
    ogImageContent: "https://cdn.wizio.co/cb029dc4-15ce-4d97-96fd-f8c8c84aba15/Living%20Room%201.JPG",
    ogDescription: "VR-based online marketplace and on-demand content service.",
    ogTitle: "Wizio - Virtual Reality Tours for Real Estate",
    ogUrl: config.frontendURL
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
