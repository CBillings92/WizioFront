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
                console.log('---------------where are you apartment-------');
                console.dir($scope.apartment);
                setMapOptions($scope.apartment);
                $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
                createMapMarkers($scope.apartment);
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
