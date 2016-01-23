angular.module('UnitApp')
    .controller('UnitCreateCtrl', [
        '$scope',
        '$sessionStorage',
        '$rootScope',
        '$state',
        'lodash',
        'UnitResource',
        'SmartSearchSvc',
        'UnitCreateSvc',
        'FlexGetSetSvc',
        //Pass $scope into the function as a way to allow our code to work when utilizing minification.
        //See the last 3 sections of this site. Starts with: "The benefit to the longhand version is that..." https://thinkster.io/egghead/scope-vs-scope/
        function($scope, $sessionStorage, $rootScope, $state, lodash, UnitResource, SmartSearchSvc, UnitCreateSvc, FlexGetSetSvc) {
            





            //save sessionStorage variable into $scope.$storage for sessionStorage

            $scope.$storage = $sessionStorage;
            //Array for number of beds drop down
            $scope.numBeds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

            $scope.getLocation = function(val){
                return SmartSearchSvc.smartSearch(val);
            };

            $scope.addUnit = function() {
                //Build out the address by pulling values in text inputs from HTML
                //Appending spaces between each variable and storing it in local address variable
                var address = $scope.apartmentAddress;


                //Create apartment object that will get sent through request body and stored in database
                var apartmentParams= {
                    unitNum: $scope.unitNum,
                    beds: $scope.beds,
                    baths: $scope.baths,
                    livingSpaces: $scope.livingRooms,
                    maxResidency: $scope.maxResidency,
                    costPerMonth: $scope.costPerMonth,
                    renovated: $scope.renovated,
                    pets: $scope.petPolicy,
                    youtubeVRID: $scope.youtubeVRID
                };
                //send geocoding API data from smart search
                //to get parsed and then save the data to the DB
                UnitCreateSvc.parseGeocodeData(address, apartmentParams, function(err, apartment){
                    UnitResource.save(apartment, function(data, status) {

                        $state.go('Account.Dashboard.Main');
                    });
                });
            };
        }
    ]);
