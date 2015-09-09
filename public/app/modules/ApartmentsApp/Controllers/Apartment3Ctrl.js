angular.module('ApartmentsApp')
  .controller('Apartment3Ctrl', [
    '$scope',
    function($scope){
        $scope.apartment = {
            id: "3",
            houseNum: "360",
            street: "Newbury Street",
            unitNum: "4",
            city: "Boston",
            state: "MA",
            zip: "02115",
            beds: "2",
            baths: "1",
            pets: "Dogs/Cats",
            livingSpaces: "1",
            maxResidency: "4",
            costPerMonth: "3500",
            renovated: "Yes",
        };
    }
  ]);
