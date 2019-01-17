angular.module("ListingPageApp").controller("ListingPageCtrl", [
  "$scope",
  "$state",
  "ModalBuilderFct",
  "WizioConfig",
  function($scope, $state, ModalBuilderFct, WizioConfig) {
    $scope.isBostonPadsUnit = false;
    $scope.data = {
      Listing: {}
    };
    $scope.data.Listing.IsActive = true;
    $scope.$on("ListingDataRetrieved", function(ev, data) {
      $scope.data = data;
      $scope.business = data.User.Subscriptions[0].Businesses[0];
      $scope.data.Listing = data.SubscriptionApartment.Listing;
      $scope.data.Lease = $scope.data.Listing.Lease;
      console.dir($scope.data);
      $scope.agent = data.User;
      if ($scope.business.name === "Boston Pads") {
        $scope.isBostonPadsUnit = true;
      }
      $scope.address = data.Apartment;
      $scope.data.Lease.LeaseStartDate = new Date(
        $scope.data.Lease.LeaseStartDate
      );
      $scope.data.Lease.LeaseEndDate = new Date($scope.data.Lease.LeaseEndDate);
      if ($scope.data.Lease.LeaseLength) {
        formatLeaseLength();
      }
      var map = new google.maps.Map(document.getElementById("map"), {
        zoom: 14,
        center: {
          lat: Number($scope.address.Latitude),
          lng: Number($scope.address.Longitude)
        },
        mapTypeId: "roadmap"
      });
      var transitLayer = new google.maps.TransitLayer();
      transitLayer.setMap(map);
      var cityCircle = new google.maps.Circle({
        strokeColor: "#F79739",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#F79739",
        fillOpacity: 0.35,
        map: map,
        center: {
          lat: Number($scope.address.Latitude),
          lng: Number($scope.address.Longitude)
        },
        radius: 300
      });
    });

    function formatLeaseLength() {
      $scope.data.Lease.LeaseLength = $scope.data.Lease.LeaseLength.toString();
      var stringsToCheck = ["mo", "month", "m"];
      for (var i = 0; i < stringsToCheck.length; i++) {
        if (
          $scope.data.Lease.LeaseLength.toLowerCase().indexOf(
            stringsToCheck[i]
          ) !== -1
        ) {
          var indexOfString = $scope.data.Lease.LeaseLength.toLowerCase().indexOf(
            stringsToCheck[i]
          );
          $scope.data.Lease.LeaseLength = $scope.data.Lease.LeaseLength.substring(
            0,
            indexOfString
          );
          break;
        }
      }
      $scope.data.Lease.LeaseLength = $scope.data.Lease.LeaseLength + " months";
    }

    $scope.requestShowing = function() {
      ModalBuilderFct.buildModalWithController({
        size: "md",
        templateUrl:
          WizioConfig.modals.RequestShowingApp.RequestShowingForm.view,
        controller:
          WizioConfig.modals.RequestShowingApp.RequestShowingForm.controller,
        modalData: {
          agent: $scope.agent,
          listing: { activeListingPubId: $state.params.listingUUID }
        }
      })
        .then(function(response) {
          return;
        })
        .catch(function(err) {
          return;
        });
    };
  }
]);
