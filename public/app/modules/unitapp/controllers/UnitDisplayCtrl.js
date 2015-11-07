angular.module('UnitApp')
    .controller('UnitDisplayCtrl', [
        '$scope',
        '$sessionStorage',
        '$state',
        'lodash',
        'ApartmentGetSetSvc',
        'MapFct',
        function($scope, $sessionStorage, $state, lodash, ApartmentGetSetSvc, MapFct) {
            //collect data from event emitter
            //store in apartmentSearch last search results stored on sessionStorage
            $scope.sessionStorage = $sessionStorage;
            $scope.apartmentSearch = $sessionStorage.apartmentSearch;
            console.dir($scope.apartmentSearch);
            console.dir($sessionStorage.apartmentSearch);
            if($scope.apartmentSearch.length === 0){
                alert('No apartments found!');
            }
            $scope.mapshow = true;
            $scope.maphidden = false;

            //display maps and markers
            displayMaps();

            $scope.tabToggle = function(){
                $scope.mapshow = !$scope.mapshow;
                $scope.maphidden = !$scope.maphidden;
            };
            $scope.$on('searchFinished', function(event, data) {
                $scope.apartmentSearch = data;
                //display maps and markers
                displayMaps();
            });
            $scope.apartmentSelected = function(id) {
                var apartment = lodash.find($scope.apartmentSearch, {
                    id: id
                });
                if (apartment !== undefined) {
                    ApartmentGetSetSvc.set(apartment, "apartmentSelected");
                    $state.go('Unit.Details', {
                        id: id
                    });
                } else {
                    alert('Error: Apartment not loaded properly');
                }
                console.dir(apartment);
            };

            //houses the map and marker creation functionality
            function displayMaps(){
                var mapOptions = MapFct.makeMap();
                $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
                var markers = MapFct.makeMarkers($scope.map);
                $scope.openInfoWindow = function(e, selectedMarker) {
                    e.preventDefault();
                    google.maps.event.trigger(selectedMarker, 'click');
                };
            }
        }
    ]);
