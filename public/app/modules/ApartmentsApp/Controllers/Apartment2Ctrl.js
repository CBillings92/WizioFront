angular.module('ApartmentsApp')
  .controller('Apartment2Ctrl', [
    '$scope',
    function($scope){
        $scope.apartment = {
            id: "1",
            houseNum: "10",
            street: "Charles Street",
            unitNum: "3",
            city: "Boston",
            state: "MA",
            zip: "02114",
            beds: "2",
            baths: "1",
            pets: "None",
            livingSpaces: "1",
            maxResidency: "3",
            costPerMonth: "2700",
            renovated: "Yes",
        };
    }
  ]);
