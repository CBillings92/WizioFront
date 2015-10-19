angular.module('SharedServiceApp')
    .service('ApartmentGetSetSvc', [
        '$sessionStorage',
        '$stateParams',
        'UnitResource',
        'lodash',
        function($sessionStorage, $stateParams, UnitResource, lodash) {
            var apartmentSelected = null;
            var sessionStorageVarContainer = [];
            var set = function(apartment, sessionStorageVar) {
                if (sessionStorageVar) {
                    $sessionStorage[sessionStorageVar] = apartment;
                    if(lodash.indexOf(sessionStorageVarContainer, sessionStorageVar)===-1){
                        sessionStorageVarContainer.push(sessionStorageVar);
                    }
                }

                apartmentSelected = apartment;
            };
            var get = function(sessionStorageVar) {
                if(sessionStorageVar){
                    apartmentSelected = $sessionStorage[sessionStorageVar];
                    return apartmentSelected;
                } else if(apartmentSelected === null || apartmentSelected.id !== $stateParams.id){
                    UnitResource.get({
                        id: apartmentURLID
                    }, function(data) {
                        apartmentSelected = data;
                        console.dir(data);
                        callback(apartmentSelected);
                    });
                } else {
                    return apartmentSelected;
                }

            };
            var reset = function() {
                apartmentSelected = null;
            };
            var checkApartment = function(callback){
                //LOAD APARTMENT DATA START
                //get apartment ID from URL
                var apartmentURLID = $stateParams.id;
                console.log('----------stateParams id-----------');
                console.dir($stateParams.id);
                console.log('----------apartmentSelected-----------');
                console.dir(apartmentSelected);
                //get apartment data from apartmentGetSet service
                var apartment = apartmentSelected;
                //get apartment ID from session storage if it exists
                var apartmentSessionStorageID = null;
                if ($sessionStorage.apartmentSelected) {
                    apartmentSessionStorageID = $sessionStorage.apartmentSelected.id;
                }
                //check if apartment from apartmentGetSet and sessionStorage match apartment requested in URL
                if (apartment !== null && apartment.id === apartmentURLID && apartmentSessionStorageID === apartmentURLID) {
                    callback(apartment);
                } else if (apartmentSessionStorageID == apartmentURLID) {
                    apartmentSelected = $sessionStorage.apartmentSelected;
                    callback(apartmentSelected);
                } else {
                    UnitResource.get({
                        id: apartmentURLID
                    }, function(data) {
                        apartmentSelected = data;
                        callback(apartmentSelected);
                    });
                }
            };
            var map = function(unitArray, $scope){
                var mapOptions = {
                        //default options for map, centered on Boston with a zoom
                        //that fits most of the city: four corners jamaica plain to
                        //sommerville to airport to southboston & seaport
                        zoom: 12,
                        center: new google.maps.LatLng(42.3601, -71.0589),
                        mapTypeId: google.maps.MapTypeId.ROADMAP
                    };

                var setMapOptions = function(unitList){
                    //test for case of only one apartment and turn into array if only one.
                    if (!(Array.isArray(unitList))){
                        unitList = [unitList];
                    }
                    //I am averaging all lats and longitudes to find where the best
                    //place to center the map is

                    var averageLatitude = null;
                    var averageLongitude = null;
                    for (i = 0; i < unitList.length; i++){
                        averageLatitude += unitList[i].latitude;
                        averageLongitude += unitList[i].longitude;
                    }
                    averageLatitude = averageLatitude/(unitList.length);
                    averageLongitude = averageLongitude/(unitList.length);
                    mapOptions = {
                            //so this should center the map properly, I still haven't
                            //figured out how we should zoom
                            zoom: 12,
                            center: new google.maps.LatLng(averageLatitude, averageLongitude),
                            mapTypeId: google.maps.MapTypeId.ROADMAP
                        };
                };
                $scope.markers = [];

                var createMapMarkers = function(unitList){
                    //test for case of only one apartment and turn into array if only one.
                    if (!(Array.isArray(unitList))){
                        unitList = [unitList];
                    }
                    for (i = 0; i < unitList.length; i++){
                        createMarker(unitList[i]);
                    }
                };

                var createMarker = function (unitData){

                    var marker = new google.maps.Marker({
                        map: $scope.map,
                        position: new google.maps.LatLng(unitData.latitude, unitData.longitude),
                        title: unitData.street
                    });
                    marker.content = '<div class="infoWindowContent">' + unitData.neighborhood + '</div>';

                    google.maps.event.addListener(marker, 'click', function(){
                        infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
                        infoWindow.open($scope.map, marker);
                    });

                    $scope.markers.push(marker);

                };

                var infoWindow = new google.maps.InfoWindow();

                $scope.openInfoWindow = function(e, selectedMarker){
                    e.preventDefault();
                    google.maps.event.trigger(selectedMarker, 'click');
                };

                checkApartment(function(result) {
                    $scope.apartment = result;
                    console.log('---------------where are you apartment-------');
                    console.dir($scope.apartment);
                    setMapOptions($scope.apartment);
                    $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
                    createMapMarkers($scope.apartment);
                });

            };
            return {
                set: set,
                get: get,
                reset: reset,
                checkApartment: checkApartment,
                map:map
            };
        }
    ]);
