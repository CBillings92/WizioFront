angular.module('Directives')
    .directive('mapsDirv', [
        'MapFct',
        function (MapFct) {
            return {
                restrict: 'E',
                link: function(scope, elem, attr){
                    console.dir(MapFct);
                    var mapOptions;
                    var markers;

                    mapOptions = MapFct.makeMap();
                    console.dir(mapOptions);
                    scope.map = new google.maps.Map(document.getElementById(attr.id), mapOptions);
                    markers = MapFct.makeMarkers(scope.map);
                    console.dir(markers);
                    scope.openInfoWindow = function (e, selectedMarker) {
                        e.preventDefault();
                        google.maps.event.trigger(selectedMarker, 'click');
                    };

                }
            };
        }
    ]);
