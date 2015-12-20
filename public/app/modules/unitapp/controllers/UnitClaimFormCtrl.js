angular.module('UnitApp')
    .controller('UnitClaimFormCtrl', [
        '$scope',
        'SmartSearchSvc',
        'UnitObjectSvc',
        'FlexGetSetSvc',
        'ApartmentClaimGetSetSvc',
        function($scope, SmartSearchSvc, UnitObjectSvc, FlexGetSetSvc, ApartmentClaimGetSetSvc) {
            var Apartment = function(localID, address, unitNum, beds, baths, livingSpaces, maxResidency, costPerMonth, renovated, pets, youtubeVRID) {
                this.localID = localID;
                this.address = address;
                this.unitNum = unitNum;
                this.beds = beds;
                this.baths = baths;
                this.livingSpaces = livingSpaces;
                this.maxResidency = maxResidency;
                this.costPerMonth = costPerMonth;
                this.renovated = renovated;
                this.pets = pets;
                this.youtubeVRID = youtubeVRID;
            };
            $scope.apartmentArray = [];
            if (ApartmentClaimGetSetSvc.get('ApartmentClaims')) {
                $scope.apartmentArray = ApartmentClaimGetSetSvc.get('ApartmentClaims');
            } else {
                $scope.apartmentArray = [];
            }

            $scope.getLocation = function(val) {
                return SmartSearchSvc.smartSearch(val);
            };

            $scope.addTenantSlot = function(indexNum) {

            };

            $scope.copyApartment = function(indexNum) {

            };

            $scope.newApartment = function(indexNum) {
                var localApartmentID = $scope.apartmentArray.length + 1;
                var apartmentObj = new Apartment(localApartmentID);
                $scope.apartmentArray.push(apartmentObj);
            };

            $scope.submitApartments = function() {};
        }
    ]);
