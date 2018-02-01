angular.module("ListingPageApp").controller("ListingPageDemo1Ctrl", [
  "$scope",
  "ModalBuilderFct",
  function($scope, ModalBuilderFct) {
    $scope.data = {
      Listing: {
        ListingId: 1,
        Pubid: "",
        Beds: 2,
        Baths: 1,
        IsHeatIncluded: 1,
        IsHotWaterIncluded: 1,
        IsElectricIncluded: 1,
        StoveType: "Electric",
        Address: {
          concatAddr: "156 Fisher Ave Boston MA",
          unitNum: 1,
          Neighborhood: "Mission Hill"
        },
        PrimaryFlooringType: "Wood",
        HasDishWasher: 1,
        amenitiesDescription: "Backyard, Driveway/Parking, Basement",
        WasherDryer: 3,
        HasGym: 1,
        Availability: "02/01/2018",
        HasCentralAir: 1,
        HasConcierge: 1,
        PetType: 3,
        SquareFootage: "1500",
        LeaseLength: "12 Months",
        HasStoveRange: 1,
        HasMicrowave: 1,
        BicycleStorageType: 1,
        ParkingType: 1,
        LaundryType: "In Unit",
        BrokersFeeAmount: "$2700",
        SecurityDepositAmount: "$2700",
        SecurityDepositRequired: 1,
        RentFrequency: "month",
        RentPrice: "$2700",
        FirstMonthsRent: "$2700",
        FirstMonthsRentRequired: 1,
        LastMonthsRent: "$2700",
        LastMonthsRentRequired: 0,
        BrokerFeeRequired: 1,
        ListingDescription:
          "Fantastic 2 bed 1 bath available in Mission Hill. The unit is easily accessible by the MBTA - just a 10 minute walk to the Green Line's E train or a few minutes walk to the 14 Bus Route! Hop on the T and get to downtown Boston in 45 minutes. Local night life, restaurants, super markets and convenience stores can also be found within a quick 10 minute walk. Unit is incredibly spacious with an additional basement room that can be used for storage or as an office. Split level offers unique look and feel. This is an unbeatable price for the size and location of this unit!"
      }
    };

    $scope.agentInfo = function() {
      ModalBuilderFct.buildComplexModal(
        "md",
        "/public/app/modules/vr-player-interface-app/modal/agent-profile-modal.view.html",
        "AgentProfileModalCtrl",
        {
          firstName: "Joe",
          lastName: "Parrish",
          email: "Joe@hillwayrealty.com"
        }
      ).then(function(response) {});
    };
    // $scope.data = {
    //   Tour: {
    //     TourId: 1
    //   },
    //   Listing: {
    //     concatAddr: "228 South Street Jamaica Plain MA 02130",
    //     unitNum: "#2",
    //     neighborhood: "Back Bay",
    //     amenitiesDescription:
    //       "Pet-Friendly, Balcony, Fireplace, Fitness center, Roof Deck, 24 Hour security, remote door bell, maintence team on site",
    //     amenities: {
    //       WasherDryer: {
    //         Description: "In Unit"
    //       },
    //       DishWasher: true,
    //       Pool: {
    //         Description: ""
    //       },
    //       Gym: false,
    //       SecureEntrance: {
    //         Description: ""
    //       },
    //       PetFriendly: {
    //         Cats: true,
    //         Dogs: true
    //       }
    //     },
    //     Bedrooms: "3 Bedrooms",
    //     Bathrooms: "1.5 Bathrooms",
    //     rent: "2100",
    //     availability: "2.17.18",
    //     rentFrequency: "per month",
    //     leaseType: "Annual",
    //     securityDeposit: {
    //       required: true,
    //       total: "2100"
    //     },
    //     firstMonthRent: {
    //       required: true,
    //       total: "2100"
    //     },
    //     lastMonthRent: {
    //       required: true,
    //       total: "2100"
    //     },
    //     brokerFee: {
    //       required: false,
    //       total: "2100"
    //     },
    //     ListingDetails:
    //       "Fantastic loft available in Downtown Lowell within a 10-15 minute walk to the commuter rail station! Hop on the T and get to Boston's North Station in 45 minutes. If you drive then it's really close to the Lowell Connector where you can get on 495 and over to Chelmsford, Methuen, or Lawrence very quickly. You are also within walking distance to all the restaurants, conveniences, and nightlife of the downtown! This is a TRUE loft converted from a warehouse."
    //   }
    // };
  }
]);
