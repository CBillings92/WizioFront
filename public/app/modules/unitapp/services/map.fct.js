angular.module('UnitApp')
    .factory('UnitMapFct', [
        'lodash',
        function(lodash) {
            var mapDefaultOptions;
            var defaultGoogleMap = new google.maps.LatLng(42.3601, -71.0589);

            function setMapOptions(listOfUnits) {
                mapDefaultOptions = {
                    scrollwheel: false,
                    zoom: 12,
                    center: defaultGoogleMap,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };

                if (listOfUnits) {
                    var averageLatLng = calculateAvgLatLng(listOfUnits);

                    mapDefaultOptions.center = new google.maps.LatLng(averageLatLng.latitude, averageLatLng.longitude);
                }

                return mapDefaultOptions;
            }

            function calculateAvgLatLng(listOfLatLng) {
                var totalLat, totalLong;
                var averageValues = {};

                for (var i = 0; i < listOfLatLng; i++) {
                    totalLat += listOfLatLng[i].latitude;
                    totalLong += listOfLatLng[i].longitude;
                }

                averageValues.latitude = totalLat / listOfLatLng.length;

                averageValues.longitude = totalLong / listOfLatLng.length;

                return averageValues;

            }

            function addMapPinsToMap(listOfUnits, googleMap) {
                var markers = [];
                var groupedAddresses = lodash.groupBy(listOfUnits, 'street');
                console.dir(groupedAddresses);
                for (var i = 0; i < listOfUnits.length; i++) {
                    markers.push(makeMapMarker(listOfUnits[i], googleMap, groupedAddresses));
                }
                console.dir(markers);
                return;
            }

            function makeMapMarker(latLngObj, googleMap, groupedAddresses) {
                console.dir(latLngObj);
                var marker = new google.maps.Marker({
                    map: googleMap,
                    position: new google.maps.LatLng(latLngObj.latitude, latLngObj.longitude),
                    title: latLngObj.street + ' Floorplans Filmed: ' + groupedAddresses[latLngObj.street].length,
                    // icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'
                    icon: '../../../../viewtemplates/images/brand_assets/map_pin.png'
                });
                return marker;
            }

            return {
                setMapOptions: setMapOptions,
                addMapPinsToMap: addMapPinsToMap,
            };
        }
    ]);
