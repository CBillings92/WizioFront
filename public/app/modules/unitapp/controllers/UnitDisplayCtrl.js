angular.module('UnitApp')
    .controller('UnitDisplayCtrl', [
        '$scope',
        '$sessionStorage',
        '$state',
        'lodash',
        'ApartmentGetSetSvc',
        'ApartmentModel',
        'SearchModel',
        'ModalSvc',
        'SearchFct',
        'SmartSearchSvc',
        'MapFct',
        'ModalBuilderFct',
        function($scope, $sessionStorage, $state, lodash, ApartmentGetSetSvc, ApartmentModel, SearchModel, ModalSvc, SearchFct, SmartSearchSvc, MapFct,ModalBuilderFct) {
            //houses the map and marker creation functionality
            function displayMaps() {
                var mapOptions = MapFct.makeMap();
                $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

                var markers = MapFct.makeMarkers($scope.map);
                $scope.openInfoWindow = function(e, selectedMarker) {
                    e.preventDefault();
                    google.maps.event.trigger(selectedMarker, 'click');
                };
            }
            //collect data from event emitter
            //store in apartmentSearch last search results stored on sessionStorage
            $scope.sessionStorage = $sessionStorage;
            $scope.apartmentSearch = $sessionStorage.apartmentSearch;
            if ($scope.apartmentSearch.length === 0) {
                var noSearchResultsModalOptions = {
                    closeButtonText: "Close",
                    actionButtonText: "OK",
                    headerText: "No Listings Found",
                    bodyText: 'Unfortunatly, we could not find any listings that met your specified criteria. Pleasse try broadening your search parameters.'
                };
                ModalSvc.showModal({}, noSearchResultsModalOptions)
                    .then(function(result) {});
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
            $scope.launchVRModal = function(unit){
                alert('work');
                ModalBuilderFct.buildModalWithController('lg', WizioConfig.UnitViewsURL + 'unitmedia.mdl.view.html', 'UnitMediaModalCtrl', unit)
                    .then(function(result){
                        return;
                    });
            };
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
                var apartment = lodash.find($scope.apartmentSearch, function(apartment){
                    return apartment.apartmentData.id === id;
                });
                if (apartment !== undefined) {
                    ApartmentGetSetSvc.set(apartment, "apartmentSelected");
                    $state.go('Unit.Details', {
                        id: id
                    });
                } else {
                    var aptLoadErrorModalOptions = {
                        closeButtonText: "Close",
                        actionButtonText: "OK",
                        headerText: "Listing Load Error",
                        bodyText: 'There was an error loading the page you requested. Please try again, or start your search over.'
                    };
                    ModalSvc.showModal({}, aptLoadErrorModalOptions)
                        .then(function(result) {});
                }
            };
            $scope.search = function() {
                //massage data into proper form for building a new apartment instance
                var data = {
                    concatAddr : $scope.searchString
                };
                SearchFct.search(data, $scope.filters, function(response){
                    $state.go('Unit.Display');
                });
            };
            $scope.getLocation = function(val) {
                return SmartSearchSvc.smartSearch(val);
            };
        }
    ]);
