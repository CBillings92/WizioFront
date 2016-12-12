/*
    Handle landing page related business logic.
*/
angular.module('LandingPageApp').controller('LandingPageCtrl', [
    '$scope',
    '$state',
    '$resource',
    'LandingPageFct',
    'SmartSearchSvc',
    'SearchFct',
    'WizioConfig',
    'ModalSvc',
    'ModalBuilderFct',
    'UnitMapFct',
    function($scope, $state, $resource, LandingPageFct, SmartSearchSvc, SearchFct, WizioConfig, ModalSvc, ModalBuilderFct, UnitMapFct) {
        $scope.data = {};
        $scope.mapViewSelected = false;
        $scope.filters = {
            beds: null,
            baths: null,
            minPrice: null,
            maxPrice: null
        };
        var listOfUnits = null;

        // on toggle map view click, if the units have already been loaded,
        // don't make  a new map, just invert the show map variable.
        // otherwise, get the units for the map to display and create the map.
        $scope.toggleMapView = function() {
            if (listOfUnits) {
                $scope.mapViewSelected = !$scope.mapViewSelected;
            } else {
                LandingPageFct.getUnitsForLandingPageMap().then(function(response) {
                    var googleMap = UnitMapFct.createMap('mapLP');
                    UnitMapFct.addMapPinsToMap(response, googleMap);
                    $scope.mapViewSelected = !$scope.mapViewSelected;
                    listOfUnits = response;
                }).catch(function(error) {
                    alert(error);
                })
            }
            return;
        };

        $scope.openTermsOfServicesModal = function openTermsOfServicesModal() {
            ModalBuilderFct.buildComplexModal('md', '/public/app/modules/accountapp/termsandservices/termsandservices.view.html', 'TermsAndServicesCtrl', null).then(function(response) {
                if (response === "success") {
                    ModalBuilderFct.buildComplexModal('md', 'public/app/modules/accountapp/auth2app/views/signupmodal.view.html', 'SignupFormCtrl', null).then(function(response) {});
                }
            });
        };

        var modalDefaults = function(templateUrl, controller, accountType) {
            return {
                backdrop: true,
                keyboard: true,
                modalFade: true,
                templateUrl: templateUrl,
                controller: controller,
                animation: false,
                resolve: {
                    data: function() {
                        return accountType;
                    }
                }
            };
        };
        //smart search/typeahead functionality
        $scope.getLocation = function(val) {
            return SmartSearchSvc.smartSearch(val);
        };
        //search function
        $scope.search = function() {
            SearchFct.search({
                concatAddr: $scope.data.searchString
            }, $scope.filters, function(response) {
                $state.go('Unit.Display');
            });
        };

    }
]);
