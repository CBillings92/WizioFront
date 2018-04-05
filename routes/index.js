var express = require("express");
// var config = require('../config/config.js');
var router = express.Router();
var request = require("request");
var config = require("../config");

router.get("/tour/:tourid", function(req, res, next) {
  request(config.backendAPIURL + "activelisting/socialshare/" + req.params.tourid, function(err, apires, body) {
    var url = "https://cdn.wizio.co/cb029dc4-15ce-4d97-96fd-f8c8c84aba15/Living%20Room%201.JPG";
    var description = "";
    var title = "360 Virtual Tour";
    var neighborhood = "";
    var locality = "";
    var broughtToYouBy = "";
    if (body) {
      console.dir(body.Media);
      try {
        var body = JSON.parse(body);
        /* Build out dynamic URL */
        url =
          config.s3bucketURL +
          "/1000x500/" +
          body.SubscriptionApartment.pubid +
          "/" +
          encodeURIComponent(body.Media[0].title) +
          ".JPG";
        description = "See virtual reality tour";
        if (body.Listing.Description && body.Listing.Description !== "") {
          description = body.Listing.Description;
        }
        if (body.Media[body.Media.length - 1].BusinessName) {
          broughtToYouBy = "Lisiting By - " + body.Media[body.Media.length - 1].BusinessName + ":";
          description = broughtToYouBy + " " + description;
        }
        title = body.Listing.Beds + " bed, " + body.Listing.Baths + " bath unit";
        /* Check if we have a filled out listing for the title. If no filled out listing make title generic. */
        if (
          body.Listing.Beds === 0 &&
          body.Listing.Baths === 0 &&
          !body.Listing.LeaseEndDate &&
          !body.Listing.LeaseStartDate &&
          body.Listing.Rent == 0
        ) {
          title = "Real estate virtual tour";
        }
        /* Check if we have neighborhood data for the title */
        if (body.Apartment.neighborhood && body.Apartment.neighborhood !== "") {
          title = title + " in " + body.Apartment.neighborhood;
        }
        /* check if we have city data for the title */

        if (body.Apartment.locality && body.Apartment.locality !== "") {
          title = title + ", " + body.Apartment.locality;
        }
        /* check if we have rent/price data for title */
        if (body.Listing.Rent !== 0) {
          title = title + " - $" + body.Listing.Rent;
        }
      } catch (e) {
        console.dir(e);
      } finally {
        res.render("index", {
          title: "Express",
          ogTitle: title,
          ogImageContent: url,
          ogDescription: description,
          ogUrl: config.frontendURL + "/tour/" + req.params.tourid
        });
      }
    }
  });
});

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

router.get("/listing/:tourid", function(req, res, next) {
  request(config.backendAPIURL + "activelisting/socialshare/" + req.params.tourid, function(err, apires, body) {
    var url = "https://cdn.wizio.co/cb029dc4-15ce-4d97-96fd-f8c8c84aba15/Living%20Room%201.JPG";
    var description = "";
    var title = "360 Virtual Tour";
    var neighborhood = "";
    var locality = "";
    if (body) {
      try {
        var body = JSON.parse(body);
        url =
          config.s3bucketURL +
          "/1000x500/" +
          body.Media[0].SubscriptionApartmentPubId +
          "/" +
          encodeURIComponent(body.Media[0].title) +
          ".JPG";
        description = "See virtual reality tour";
        if (body.Listing.Description && body.Listing.Description !== "") {
          description = body.Listing.Description;
        }
        if (body.Media[body.Media.length - 1].BusinessName) {
          broughtToYouBy = "Lisiting By - " + body.Media[body.Media.length - 1].BusinessName + ":";
          description = broughtToYouBy + " " + description;
        }
        title = body.Listing.Beds + " bed, " + body.Listing.Baths + " bath unit";
        if (
          body.Listing.Beds === 0 &&
          body.Listing.Baths === 0 &&
          !body.Listing.LeaseEndDate &&
          !body.Listing.LeaseStartDate &&
          body.Listing.Rent == 0
        ) {
          title = "Real estate virtual tour";
        }
        if (body.Apartment.neighborhood && body.Apartment.neighborhood !== "") {
          title = title + " in " + body.Apartment.neighborhood;
        }
        if (body.Apartment.locality && body.Apartment.locality !== "") {
          title = title + ", " + body.Apartment.locality;
        }
        /* check if we have rent/price data for title */
        if (body.Listing.Rent !== 0) {
          title = title + " - $" + body.Listing.Rent;
        }
      } catch (e) {
        console.dir(e);
      } finally {
        res.render("index", {
          title: "Express",
          ogTitle: title,
          ogImageContent: url,
          ogDescription: description,
          ogUrl: config.frontendURL + "/tour/" + req.params.tourid
        });
      }
    }
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
