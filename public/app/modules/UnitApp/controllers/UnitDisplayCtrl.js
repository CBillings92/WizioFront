angular.module('UnitApp')
.controller('UnitDisplayCtrl', [
    '$scope',
    '$sessionStorage',
    '$state',
    'lodash',
    'ApartmentGetSetSvc',
    function($scope, $sessionStorage, $state, lodash, ApartmentGetSetSvc){
        //collect data from event emitter
        $scope.sessionStorage = $sessionStorage;
        $scope.$on('searchFinished', function(event, data){
            console.dir(data);
            $scope.apartmentSearch = data;
        });
        $scope.apartmentSearch = $sessionStorage.apartmentSearch;

        $scope.apartmentSelected = function(id){
            var apartment = lodash.find($scope.apartmentSearch, {id: id});
            if(apartment !== undefined){
                ApartmentGetSetSvc.set(apartment, "apartmentSelected");
                $state.go('Unit.Details', {id: id});
            } else {
                alert('Error: Apartment not loaded properly');
            }
            console.dir(apartment);
        };

        var mapOptions = {
            zoom: 4,
            center: new google.maps.LatLng(40.0000, -98.0000),
            mapTypeId: google.maps.MapTypeId.TERRAIN
        }

        $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

        $scope.markers = [];

        var infoWindow = new google.maps.InfoWindow();

        var createMarker = function (info){

            var marker = new google.maps.Marker({
                map: $scope.map,
                position: new google.maps.LatLng(info.lat, info.long),
                title: info.city
            });
            marker.content = '<div class="infoWindowContent">' + info.desc + '</div>';

            google.maps.event.addListener(marker, 'click', function(){
                infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
                infoWindow.open($scope.map, marker);
            });

            $scope.markers.push(marker);

        }

        for (i = 0; i < cities.length; i++){
            createMarker(cities[i]);
        }

        $scope.openInfoWindow = function(e, selectedMarker){
            e.preventDefault();
            google.maps.event.trigger(selectedMarker, 'click');
        }
    }
]);
