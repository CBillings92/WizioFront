angular.module('AdminPanelApp')
.controller('AdminUpdateUnitCtrl', [
    '$scope',
    'lodash',
    'AdminPanelResource',
    function($scope, lodash, AdminPanelResource){
        $scope.apartment = null;
        //Array for number of beds drop down
        $scope.numBeds = [0,1,2,3,4,5,6];
        $scope.numBaths = [0,1,2,3,4];
        $scope.numLivingrooms = [0,1,2,3];
        $scope.maxResidency = [0,1,2,3,4,5,6,7,8,9,10];
        $scope.renovatedSelect = ["No", "Yes", "Unsure"];
        $scope.petPolicy = ["Dogs Only", "Cats Only", "Dogs & Cats", "Small Animals", "None"];

        $scope.$on('updateUnitData', function(event, data){
            console.dir(data);
            $scope.apartment = data[0];

            console.dir($scope.bedsSelected);
        });



        $scope.editUnit = function() {
            //Build out the address by pulling values in text inputs from HTML
            //Appending spaces between each variable and storing it in local address variable
            var address = $scope.apartmentAddress;


            //Create apartment object that will get sent through request body and stored in database
            var apartmentParams= {
                unitNum: $scope.apartment.unitNum,
                beds: $scope.apartment.beds,
                baths: $scope.apartment.baths,
                livingSpaces: $scope.apartment.livingSpaces,
                maxResidency: $scope.apartment.maxResidency,
                costPerMonth: $scope.apartment.costPerMonth,
                renovated: $scope.apartment.renovated,
                pets: $scope.apartment.petPolicy,
                youtubeVRID: $scope.apartment.youtubeID
            };
            AdminPanelResource.save({item: 'unit', action: 'update'}, $scope.apartment, function(data, status) {
                console.dir(data);
                $state.go('Account.Dashboard.Main');
            });
        };
    }
])
