angular.module('ApartmentsApp')
  .controller('Apartment1Ctrl', [
    '$scope',
    function($scope){
        $scope.apartment = {
            id: "1",
            houseNum: "39",
            street: "Huntington Avenue",
            unitNum: "3B",
            city: "Boston",
            state: "MA",
            zip: "02115",
            beds: "3",
            baths: "2",
            pets: "Dogs/Cats",
            livingSpaces: "1",
            maxResidency: "4",
            costPerMonth: "3600",
            renovated: "Yes",
        };
    }
  ]);
