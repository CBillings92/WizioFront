angular.module('UnitApp')
    .controller('UnitDisplayCtrl', [
        '$scope',
        '$sessionStorage',
        '$state',
        'lodash',
        'ApartmentGetSetSvc',
        'ApartmentModel',
        'SearchModel',
        'SearchFct',
        'SmartSearchSvc',
        'MapFct',
        function($scope, $sessionStorage, $state, lodash, ApartmentGetSetSvc, ApartmentModel, SearchModel, SearchFct, SmartSearchSvc, MapFct) {
            //houses the map and marker creation functionality
            var displayMaps = function displayMaps() {
                var mapOptions = MapFct.makeMap();
                $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

                var markers = MapFct.makeMarkers($scope.map);
                $scope.openInfoWindow = function(e, selectedMarker) {
                    e.preventDefault();
                    google.maps.event.trigger(selectedMarker, 'click');
                };
            };
            //collect data from event emitter
            //store in apartmentSearch last search results stored on sessionStorage
            $scope.sessionStorage = $sessionStorage;
            $scope.apartmentSearch = $sessionStorage.apartmentSearch;
            console.dir($scope.apartmentSearch)
            if ($scope.apartmentSearch.length === 0) {
                alert('No apartments found!');
            }
            $scope.mapshow = true;
            $scope.maphidden = false;
            $scope.filterToggle = true;

            $scope.filters = {
                beds: null,
                baths: null,
                minPrice: null,
                maxPrice: null
            };

            //display maps and markers
            displayMaps();

            $scope.tabToggleMap = function() {
                if (!$scope.mapshow) {
                    $scope.mapshow = !$scope.mapshow;
                    $scope.maphidden = !$scope.maphidden;
                }
            };
            $scope.tabToggleGrid = function() {
                if (!$scope.maphidden) {
                    $scope.mapshow = !$scope.mapshow;
                    $scope.maphidden = !$scope.maphidden;
                }
            };
            $scope.tabToggleFilters = function() {
                $scope.filterToggle = !$scope.filterToggle;
            };
            $scope.$on('searchFinished', function(event, data) {
                $scope.apartmentSearch = data;
                //display maps and markers
                displayMaps();
            });
            $scope.apartmentSelected = function(id) {
                console.dir("HI");
                var apartment = lodash.find($scope.apartmentSearch, function(apartment){
                    return apartment.apartmentData.id === id;
                });
                console.dir(apartment);
                if (apartment !== undefined) {
                    console.dir(apartment);
                    ApartmentGetSetSvc.set(apartment, "apartmentSelected");
                    $state.go('Unit.Details', {
                        id: id
                    });
                } else {
                    alert('Error: Apartment not loaded properly. Please try searching again');
                }
            };
            $scope.search = function() {
                //massage data into proper form for building a new apartment instance
                var data = {
                    concatAddr: $scope.searchString
                };
                //build new apartment instance
                var apartmentInstance = ApartmentModel.build(data);
                //get get Geocode Data
                apartmentInstance.getGeocodeData()
                    .then(function(response) {
                        //unitNum is null, filters is null
                        var topLevelType = null;
                        if (apartmentInstance.apartmentData.topLevelType) {
                            topLevelType = apartmentInstance.apartmentData.topLevelType;
                        }
                        var newSearchInstance = new SearchModel(apartmentInstance, topLevelType, $scope.filters);
                        SearchFct.search(newSearchInstance, function(response) {
                            $state.go('Unit.Display');
                        });
                    });
            };
            $scope.getLocation = function(val) {
                return SmartSearchSvc.smartSearch(val);
            };
        }
    ]);
