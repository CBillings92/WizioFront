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
      $scope.agent = data.User;
      if ($scope.business.name === "Boston Pads") {
        $scope.isBostonPadsUnit = true;
      }
      $scope.address = data.Apartment;
      $scope.finalAddress = "";
      if ($scope.address.neighborhood) {
        $scope.finalAddress = $scope.address.neighborhood + ", ";
      }
      $scope.finalAddress =
        $scope.finalAddress + data.Apartment.concatAddr.substring(data.Apartment.concatAddr.indexOf(",") + 2);
      $scope.data.Lease.LeaseStartDate = new Date($scope.data.Lease.LeaseStartDate);
      $scope.data.Lease.LeaseEndDate = new Date($scope.data.Lease.LeaseEndDate);
      formatLeaseLength();
      var map = new google.maps.Map(document.getElementById("map"), {
        zoom: 14,
        center: { lat: $scope.address.Latitude, lng: $scope.address.Longitude },
        mapTypeId: "terrain"
      });
      var cityCircle = new google.maps.Circle({
        strokeColor: "#F79739",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#F79739",
        fillOpacity: 0.35,
        map: map,
        center: { lat: $scope.address.Latitude, lng: $scope.address.Longitude },
        radius: 300
      });
    });

    function formatLeaseLength() {
      var stringsToCheck = ["mo", "month", "m"];
      for (var i = 0; i < stringsToCheck.length; i++) {
        if ($scope.data.Lease.LeaseLength.toLowerCase().indexOf(stringsToCheck[i])) {
          var indexOfString = $scope.data.Lease.LeaseLength.toLowerCase().indexOf(stringsToCheck[i]);
          $scope.data.Lease.LeaseLength = $scope.data.Lease.LeaseLength.substring(0, indexOfString);
          $scope.data.Lease.LeaseLength = $scope.data.Lease.LeaseLength + "months";
          break;
        }
      }
    }

    $scope.leaseLengthOptions = ["12 Month", "6 Month", "3 Month", "Custom"];

    $scope.requestShowing = function() {
      ModalBuilderFct.buildModalWithController({
        size: "md",
        templateUrl: WizioConfig.modals.RequestShowingApp.RequestShowingForm.view,
        controller: WizioConfig.modals.RequestShowingApp.RequestShowingForm.controller,
        modalData: { agent: $scope.agent, listing: { activeListingPubId: $state.params.listingUUID } }
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
