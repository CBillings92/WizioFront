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
            //first
            //$scope.sessionStorage = $sessionStorage;
            //store in apartmentSearch last search results stored on sessionStorage
            $scope.sessionStorage = $sessionStorage;
            $scope.apartmentSearch = $sessionStorage.apartmentSearch;
            $scope.mapshow = true;

            //display maps and markers
            displayMaps();

            $scope.tabToggle = function(){
                $scope.mapshow = !$scope.mapshow;
            };
            $scope.$on('searchFinished', function(event, data) {
                console.log('------This is the data from the search------');
                console.dir(data);
                console.log('------This is the data from the search------');
                $scope.apartmentSearch = data;

                //display maps and markers
                displayMaps();
            });
            console.log('This is the apartment search object----------------');
            console.dir($scope.sessionStorage.apartmentSearch);


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
                console.dir($scope.map);
                var markers = MapFct.makeMarkers($scope.map);
                console.dir(markers);

                $scope.openInfoWindow = function(e, selectedMarker) {
                    e.preventDefault();
                    google.maps.event.trigger(selectedMarker, 'click');
                };
            }
        }
    ]);
