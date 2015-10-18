angular.module('UnitApp')
    .controller('UnitDetailCtrl', [
        '$scope',
        '$state',
        '$stateParams',
        '$sessionStorage',
        '$modal',
        'lodash',
        'ApartmentGetSetSvc',
        'UnitResource',
        'AuthFct',
        'TokenSvc',
        'ProfileResource',
        'FlexGetSetSvc',
        function(
            $scope,
            $state,
            $stateParams,
            $sessionStorage,
            $modal,
            lodash,
            ApartmentGetSetSvc,
            UnitResource,
            AuthFct,
            TokenSvc,
            ProfileResource,
            FlexGetSetSvc
        ) {
            var cities = [
                {
                    city : 'Toronto',
                    desc : 'This is the best city in the world!',
                    lat : 43.7000,
                    long : -79.4000
                },
                {
                    city : 'New York',
                    desc : 'This city is aiiiiite!',
                    lat : 40.6700,
                    long : -73.9400
                },
                {
                    city : 'Chicago',
                    desc : 'This is the second best city in the world!',
                    lat : 41.8819,
                    long : -87.6278
                },
                {
                    city : 'Los Angeles',
                    desc : 'This city is live!',
                    lat : 34.0500,
                    long : -118.2500
                },
                {
                    city : 'Las Vegas',
                    desc : 'Sin City...\'nuff said!',
                    lat : 36.0800,
                    long : -115.1522
                }
            ];
            var mapOptions = {
                    zoom: 4,
                    center: new google.maps.LatLng(40.0000, -98.0000),
                    mapTypeId: google.maps.MapTypeId.TERRAIN
                };

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

            };

            for (i = 0; i < cities.length; i++){
                createMarker(cities[i]);
            }

            $scope.openInfoWindow = function(e, selectedMarker){
                e.preventDefault();
                google.maps.event.trigger(selectedMarker, 'click');
            };
            //modal function
            var modal = function(templateUrl, controller, size){
                var modalInstance = $modal.open({
                    templateUrl: templateUrl,
                    controller: controller,
                    size: size
                });
                return modalInstance;
            };
            //check that the correct apartment is getting pulled
            ApartmentGetSetSvc.checkApartment(function(result) {
                $scope.apartment = result;
            });
            //LOAD APARTMENT DATA end
            $scope.apply = function() {
                if(TokenSvc.checkExp()){
                    TokenSvc.deleteToken();
                    alert('Please login');
                    return $state.go('Login');
                }
                //get user data
                var user = TokenSvc.decode();
                //set apartment data and store that data in sessionStorage variable
                ApartmentGetSetSvc.set($scope.apartment, "apartmentApplyingTo");
                //If the user doesn't have a profile
                console.dir(user.ProfileId);
                if (user.ProfileId === null) {
                    //call modal function
                    var modalInstanceCreate = modal('public/viewtemplates/public/createprofilemodal.html', 'ProfileCreateModalCtrl', 'md');

                    modalInstanceCreate.result.then(function(result) {
                        $state.go('Profile.Create');
                    }, function() {

                    });
                } else {
                    //call modal function
                    ProfileResource.get({id: user.ProfileId}, function(data){
                        if(data){
                            console.dir(data);
                            var modalInstanceVerify = modal('public/app/modules/AccountApp/profileapp/viewtemplates/profileexistsmodal.html', 'ProfileExistsModalCtrl', 'lg');

                            modalInstanceVerify.result.then(function(result) {
                                switch(result){
                                    case "ok":
                                        $state.go('ApartmentApplication');
                                        break;
                                    case "edit":
                                        console.dir(data);
                                        FlexGetSetSvc.set(data);
                                        console.dir(FlexGetSetSvc.get());
                                        $state.go('Profile.Edit');
                                        break;
                                    default:
                                        alert('ERROR');
                                }
                            }, function() {
                                alert('MODAL DISMISSED');
                            });
                        } else {
                            //handle
                        }
                    });

                }
            };
        }
    ]);
