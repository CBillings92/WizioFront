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
        '$state',
        'WizioConfig',
        function(ApartmentGetSetSvc, $sessionStorage, $stateParams, $state, WizioConfig) {
            var makeMap = function() {

                //default options for map, centered on Boston with a zoom
                //that fits most of the city: four corners jamaica plain to
                //sommerville to airport to southboston & seaport
                var mapOptions = {
                    scrollwheel: false,
                    zoom: 12,
                    center: new google.maps.LatLng(42.3601, -71.0589),
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };

                var setMapOptions = function(unitList) {

                    if(unitList.constructor !== Array){
                        unitList = [unitList];
                    }
                    if(unitList.length === 0){
                        return mapOptions;
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
                    //what we want
                    mapOptions = {
                        //so this should center the map properly, I still haven't
                        //figured out how we should zoom
                        scrollwheel:false,
                        zoom: 12,
                        center: new google.maps.LatLng(averageLatitude, averageLongitude),
                        mapTypeId: google.maps.MapTypeId.ROADMAP
                    };

                    return mapOptions;
                };

                var unitList = null;
                if($state.current.name === "Unit.Details"){
                    unitList = ApartmentGetSetSvc.get("apartmentSelected");
                } else if ($state.current.name === "Unit.Display"){
                    unitList = ApartmentGetSetSvc.get("apartmentSearch");
                }
                return setMapOptions(unitList);
            };

            //function that makes array of google maps markers
            var makeMarkers = function(map){
                var markersArray = [];
                //$scope.markers = [];
                var unitList = null;
                if($state.current.name === "Unit.Details"){
                    unitList = ApartmentGetSetSvc.get("apartmentSelected");
                } else if ($state.current.name === "Unit.Display"){
                    unitList = ApartmentGetSetSvc.get("apartmentSearch");
                }

                var createMapMarkers = function(unitList) {
                    //test for case of only one apartment and turn into array if only one.
                    if (!(Array.isArray(unitList))) {
                        unitList = [unitList];
                    }
                    for (i = 0; i < unitList.length; i++) {
                        createMarker(unitList[i]);
                    }
                    return markersArray;
                };

                function createMarker(unitData) {
                    var left = Math.floor((unitData.concatAddr.charCodeAt(5) /19) + 4);
                    var right = Math.floor((unitData.concatAddr.charCodeAt(3) /19) + 4);
                    var houseNumInt = parseInt((unitData.concatAddr).replace(/(^\d+)(.+$)/i, '$1'));
                    var houseNumLow = houseNumInt - left;
                    if(houseNumInt < 15){
                        houseNumLow = 1;
                    }
                    var houseNumHigh = houseNumInt + right;
                    var houseNumRange = houseNumLow.toString() + "-" + houseNumHigh.toString();
                    unitData.hiddenAddress = houseNumRange + unitData.concatAddr.replace(/^\d+/, '');

                    var marker = new google.maps.Marker({
                        map: map,
                        position: new google.maps.LatLng(unitData.latitude, unitData.longitude),
                        title: unitData.hiddenAddress
                    });
                    marker.content = '<div class="infoWindowContent"> <a href="'+WizioConfig.frontEndURL+'#/unit/details/'+unitData.id+'"> <img class="pull-left "'+"src =http://img.youtube.com/vi/"+unitData.Assignments[0].youtubeId+"/0.jpg " + ' style="width:160px;height:120px;"</img></div>';
                    var infoWindow = new google.maps.InfoWindow();
                    google.maps.event.addListener(marker, 'click', function() {
                        infoWindow.setContent('<p><a href="'+WizioConfig.frontEndURL+'#/unit/details/'+unitData.id+'">' + marker.title + '</p>' + marker.content);
                        infoWindow.open(map, marker);
                    });

                    markersArray.push(marker);

                }

                return createMapMarkers(unitList);
            };
            return {
                makeMap: makeMap,
                makeMarkers: makeMarkers
            };
        }
    ]);
