angular.module('Directives')
    .directive('mapsDirv', [
        'MapFct',
        function (MapFct) {
            return {
                restrict: 'E',
                template: '<div></div>',
                replace: true,
                link: function(scope, elem, attr){
                    console.dir(MapFct);
                    var mapOptions;
                    var markers;

                    mapOptions = MapFct.makeMap();
                    console.dir(mapOptions);
                    console.dir(attr.id);
                    var map = new google.maps.Map(document.getElementById(attr.id), mapOptions);
                    console.dir(map);
                    markers = MapFct.makeMarkers(map);
                    scope.openInfoWindow = function (e, selectedMarker) {
                        e.preventDefault();
                        google.maps.event.trigger(selectedMarker, 'click');
                    };

                }
            };
        }
    ]);
