angular.module("ListingPageApp").controller("ListingPageDemo2Ctrl", [
  "$scope",
  function($scope) {
    $scope.data = {
      Listing: {
        ListingId: 1,
        Pubid: "",
        Beds: 2,
        Baths: 1,
        IsHeatIncluded: 1,
        IsHotWaterIncluded: 1,
        IsElectricIncluded: 1,
        StoveType: "Gas",
        Address: {
          concatAddr: "156 Fisher Ave Boston MA",
          unitNum: 1
        },
        PrimaryFlooringType: "Wood",
        HasDishWasher: 1,
        amenitiesDescription:
          "Pet-Friendly, Balcony, Fireplace, Fitness center, Roof Deck, 24 Hour security, remote door bell, maintence team on site",
        WasherDryer: 3,
        HasGym: 1,
        HasCentralAir: 1,
        HasConcierge: 1,
        PetType: 3,
        SquareFootage: "1500",
        LeaseLength: "12 Months",
        HasStoveRange: 1,
        HasMicrowave: 1,
        BicycleStorageType: 1,
        ParkingType: 1,
        BrokersFeeAmount: "1250",
        SecurityDepositAmount: "600",
        SecurityDepositRequired: 1,
        RentFrequency: "Monthly",
        RentPrice: "1250",
        FirstMonthsRent: "1250",
        FirstMonthsRentRequired: 1,
        LastMonthsRent: "1250",
        LastMonthsRentRequired: 0,
        BrokerFeeRequired: 1,
        ListingDescription:
          "Fantastic loft available in Downtown Lowell within a 10-15 minute walk to the commuter rail station! Hop on the T and get to Boston's North Station in 45 minutes. If you drive then it's really close to the Lowell Connector where you can get on 495 and over to Chelmsford, Methuen, or Lawrence very quickly. You are also within walking distance to all the restaurants, conveniences, and nightlife of the downtown! This is a TRUE loft converted from a warehouse."
      }
    };
  }
]);
