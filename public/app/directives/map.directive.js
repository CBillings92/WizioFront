/*
    directive for generating maps with apartments and pins.
    Requires the map factory
*/
angular.module('Directives')
    .directive('mapsDirv', [
        'MapFct',
        function (MapFct) {
            return {
                restrict: 'E',
                template: '<div></div>',
                replace: true,
                link: function(scope, elem, attr){
                    var mapOptions;
                    var markers;

                    //create the map object
                    mapOptions = MapFct.makeMap();
                    var map = new google.maps.Map(document.getElementById(attr.id), mapOptions);

                    //create the map markers
                    markers = MapFct.makeMarkers(map);

                    //add the event handler for clicking on a map pin
                    scope.openInfoWindow = function (e, selectedMarker) {
                        e.preventDefault();
                        google.maps.event.trigger(selectedMarker, 'click');
                    };

                }
            };
        }
    ]);
