angular.module('SharedFactoryApp')
    .factory('GeocoderFct', [
        '$q',
        function($q) {
            //function which takes an address
            var getLatLong = function(address) {
                //stire $q's defer method in local variable deferred
                var deferred = $q.defer();
                //some magical google code to create a new Geocoder object
                var geocoder = new google.maps.Geocoder();
                //geocode passed in address, then utilize callback function to handle asynch results
                geocoder.geocode({
                    'address': address
                }, function(results, status) {
                    //if google maps geocodes successfully resolve promise passing lat/long data through it
                    if (status === google.maps.GeocoderStatus.OK) {
                        deferred.resolve(results[0].geometry.location);
                        console.log('---------------------------------');
                    }
                });
                //return the deferred promise.
                return deferred.promise;
            };
            return {
                getLatLong: getLatLong
            };
        }
    ])
    .factory('MapFct', [
        'ApartmentGetSetSvc',
        '$sessionStorage',
        '$stateParams',
        function(ApartmentGetSetSvc, $sessionStorage, $stateParams) {
            var makeMap = function(unitArray, $scope) {
                var mapOptions = {
                    //default options for map, centered on Boston with a zoom
                    //that fits most of the city: four corners jamaica plain to
                    //sommerville to airport to southboston & seaport
                    zoom: 12,
                    center: new google.maps.LatLng(42.3601, -71.0589),
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };

                var setMapOptions = function(unitList) {
                    //test for case of only one apartment and turn into array if only one.
                    if (!(Array.isArray(unitList))) {
                        unitList = [unitList];
                    }
                    //I am averaging all lats and longitudes to find where the best
                    //place to center the map is

                    var averageLatitude = null;
                    var averageLongitude = null;
                    for (i = 0; i < unitList.length; i++) {
                        averageLatitude += unitList[i].latitude;
                        averageLongitude += unitList[i].longitude;
                    }
                    averageLatitude = averageLatitude / (unitList.length);
                    averageLongitude = averageLongitude / (unitList.length);
                    mapOptions = {
                        //so this should center the map properly, I still haven't
                        //figured out how we should zoom
                        zoom: 12,
                        center: new google.maps.LatLng(averageLatitude, averageLongitude),
                        mapTypeId: google.maps.MapTypeId.ROADMAP
                    };
                };
                $scope.markers = [];

                var createMapMarkers = function(unitList) {
                    //test for case of only one apartment and turn into array if only one.
                    if (!(Array.isArray(unitList))) {
                        unitList = [unitList];
                    }
                    for (i = 0; i < unitList.length; i++) {
                        createMarker(unitList[i]);
                    }
                };

                var createMarker = function(unitData) {

                    var marker = new google.maps.Marker({
                        map: $scope.map,
                        position: new google.maps.LatLng(unitData.latitude, unitData.longitude),
                        title: unitData.street
                    });
                    marker.content = '<div class="infoWindowContent">' + unitData.neighborhood + '</div>';

                    google.maps.event.addListener(marker, 'click', function() {
                        infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
                        infoWindow.open($scope.map, marker);
                    });

                    $scope.markers.push(marker);

                };

                var infoWindow = new google.maps.InfoWindow();

                $scope.openInfoWindow = function(e, selectedMarker) {
                    e.preventDefault();
                    google.maps.event.trigger(selectedMarker, 'click');
                };
                ApartmentGetSetSvc.checkApartment(function(result) {
                    $scope.apartment = result;
                    console.log('---------------where are you apartment-------');
                    console.dir($scope.apartment);
                    setMapOptions($scope.apartment);
                    $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
                    createMapMarkers($scope.apartment);
                });
            };
            return {
                makeMap: makeMap
            };
        }
    ]);
