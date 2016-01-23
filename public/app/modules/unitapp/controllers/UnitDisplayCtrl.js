angular.module('UnitApp')
    .controller('UnitDisplayCtrl', [
        '$scope',
        '$sessionStorage',
        '$state',
        'lodash',
        'ApartmentGetSetSvc',
        'ApartmentSearchSvc',
        'ApartmentModel',
        'SearchModel',
        'SearchFct',
        'SmartSearchSvc',
        'MapFct',
        function($scope, $sessionStorage, $state, lodash, ApartmentGetSetSvc, ApartmentSearchSvc, ApartmentModel, SearchModel, SearchFct, SmartSearchSvc, MapFct) {
            //collect data from event emitter
            //store in apartmentSearch last search results stored on sessionStorage
            $scope.sessionStorage = $sessionStorage;
            $scope.apartmentSearch = $sessionStorage.apartmentSearch;
            if($scope.apartmentSearch.length === 0){
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

            $scope.tabToggleMap = function(){
                if (!$scope.mapshow) {
                    $scope.mapshow = !$scope.mapshow;
                    $scope.maphidden = !$scope.maphidden;
                }
            };
            $scope.tabToggleGrid = function(){
                if (!$scope.maphidden) {
                    $scope.mapshow = !$scope.mapshow;
                    $scope.maphidden = !$scope.maphidden;
                }
            };
            $scope.tabToggleFilters = function(){
                $scope.filterToggle = !$scope.filterToggle;
            };
            $scope.$on('searchFinished', function(event, data) {
                for(i = 0; i < data.length; i++){
                    var left = Math.floor((data[i].concatAddr.charCodeAt(5) /19) + 4);
                    var right = Math.floor((data[i].concatAddr.charCodeAt(3) /19) + 4);
                    var houseNumInt = parseInt((data[i].concatAddr).replace(/(^\d+)(.+$)/i, '$1'));
                    var houseNumLow = houseNumInt - left;
                    if(houseNumInt < 15){
                        houseNumLow = 1;
                    }
                    var houseNumHigh = houseNumInt + right;
                    var houseNumRange = houseNumLow.toString() + "-" + houseNumHigh.toString();
                    data[i].hiddenAddress = houseNumRange + data[i].concatAddr.replace(/^\d+/, '');
                }
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
                    alert('Error: Apartment not loaded properly. Please try searching again');
                }
            };
            $scope.search = function(){
                //massage data into proper form for building a new apartment instance
                var data = {
                    concatAddr : $scope.searchString
                };
                //build new apartment instance
                var apartmentInstance = ApartmentModel.build(data);
                //get get Geocode Data
                apartmentInstance.getGeocodeData(function(response){
                    //unitNum is null, filters is null
                    var topLevelType = null;
                    if(apartmentInstance.apartmentData.topLevelType){
                        topLevelType = apartmentInstance.apartmentData.topLevelType;
                    }
                    var newSearchInstance = new SearchModel(apartmentInstance, topLevelType, $scope.filters);
                    SearchFct.search(newSearchInstance, function(response){
                        $state.go('Unit.Display');
                    });
                });
            };
            $scope.getLocation = function(val) {
                return SmartSearchSvc.smartSearch(val);
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
