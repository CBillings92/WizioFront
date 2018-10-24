angular.module("MarketApp").controller("MarketSearchPageCtrl", [
  "$scope",
  "$state",
  function($scope, $state) {
    $scope.listings = JSON.parse(localStorage.getItem("wizio")).listings;
    $scope.showVRPreviewEnabled = false;

    // Navigate to a tour page
    $scope.viewTour = function(listing) {
      return $state.go("Listing", { listingUUID: listing.pubid });
    };

    $scope.showVRPreview = function(listing, index) {
      $scope.listings[index].isBeingPreviewed = true;
      $scope.showVRPreviewEnabled = true;
      setTimeout(function() {
        $scope.$broadcast("TourDataReceived", {
          title: "preview",
          imageUrls: [
            "https://d1mze0h82dkhhe.cloudfront.net/6bbc6427-f349-44ac-a15b-5e431d301acd/Kitchen%20(A).JPG"
          ],
          navpoints: []
        });
      }, 500);
    };

    var map = new google.maps.Map(document.getElementById("map"), {
      zoom: 14,
      center: { lng: -71.12033, lat: 42.30982 },
      mapTypeId: "roadmap"
    });
    // var cityCircle = new google.maps.Circle({
    //   strokeColor: "#F79739",
    //   strokeOpacity: 0.8,
    //   strokeWeight: 2,
    //   fillColor: "#F79739",
    //   fillOpacity: 0.35,
    //   map: map,
    //   center: { lat: $scope.address.Latitude, lng: $scope.address.Longitude },
    //   radius: 300
    // });
  }
]);
