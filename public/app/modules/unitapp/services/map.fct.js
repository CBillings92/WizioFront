angular.module('UnitApp')
    .factory('UnitMapFct', [
        'lodash',
        function(lodash) {
            var mapDefaultOptions;
            var defaultGoogleMap = new google.maps.LatLng(42.3601, -71.0589);

            function createMap(DOMElemId, scrollwheel, zoom, center, mapTypeId) {
                var googleMap = new google.maps.Map(document.getElementById(DOMElemId), {
                    scrollwheel: scrollwheel || false,
                    zoom: zoom || 12,
                    center: center || new google.maps.LatLng(42.3601, -71.0589),
                    mapTypeId: mapTypeId || google.maps.MapTypeId.ROADMAP
                });

                return googleMap;
            }

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
                for (var i = 0; i < listOfUnits.length; i++) {
                    markers.push(makeMapMarker(listOfUnits[i], googleMap, groupedAddresses));
                }
                return;
            }

            function makeMapMarker(latLngObj, googleMap, groupedAddresses) {
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
                createMap: createMap,
                setMapOptions: setMapOptions,
                addMapPinsToMap: addMapPinsToMap,
            };
        }
    ]);
