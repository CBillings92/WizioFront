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
        amenities: {
          WasherDryer: {
            Description: "In Unit"
          },
          Pool: {
            Description: ''
          },
          Gym: {
            Description: ''
          },
          SecureEntrance: {
            Description: ''
          },
          PetFriendly: {
            Cats: 1,
            Dogs: 0
          }
        },
        bedrooms: '3',
        bathrooms: '1.5'
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
