angular.module("ListingPageApp").controller("ListingPageCtrl", [
  "$scope",
  function($scope) {
    $scope.data = {
      Tour: {
        TourId: 1
      },
      Listing: {
        concatAddr: "228 South Street Jamaica Plain MA 02130",
        unitNum: "#2",
        description: "This is a description of the apartment!",
        amenities: [
          {
            WasherDryer: 1,
            Description: "In Unit"
          },
          {
            Pool: 1
          }
        ],
        rent: "2100",
        rentFrequency: "per month",
        leaseType: "Annual",
        securityDeposit: {
          required: 1,
          total: "2100"
        },
        firstMonthRent: {
          required: 1,
          total: "2100"
        },
        lastMonthRent: {
          required: 0,
          total: "2100"
        }
      }
    };
  }
]);
