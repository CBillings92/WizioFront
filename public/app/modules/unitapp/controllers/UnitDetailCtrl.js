angular.module('UnitApp')
    .controller('UnitDetailCtrl', [
        '$scope',
        '$state',
        '$modal',
        '$location',
        '$sessionStorage',
        'lodash',
        'ApartmentGetSetSvc',
        'UnitResource',
        'MapFct',
        'TokenSvc',
        'ProfileResource',
        'FlexGetSetSvc',
        'RerouteGetSetSvc',
        'WizioConfig',
        function(
            $scope,
            $state,
            $modal,
            $location,
            $sessionStorage,
            lodash,
            ApartmentGetSetSvc,
            UnitResource,
            MapFct,
            TokenSvc,
            ProfileResource,
            FlexGetSetSvc,
            RerouteGetSetSvc,
            WizioConfig
        ) {
            //For displaying (ng-show) Apply or Waitlist button
            $scope.available = false;
            //HELPER FUNCTION -- modal creation function
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
                $sessionStorage.apartmentSelected = $scope.apartment;
                console.dir($scope.apartment);
                $scope.apartment.youtubeLink = 'http://www.youtube.com/embed/'+$scope.apartment.Assignments[0].youtubeId +'?autoplay=0';

                //create the google maps
                var mapOptions = MapFct.makeMap();
                $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
                //create the markers for the map
                var markers = MapFct.makeMarkers($scope.map);
            });

            //WAITLIST for the apartment
            $scope.waitlist = function(){
                //check if token is expired, if so route to login
                if(TokenSvc.checkExp()){
                    TokenSvc.deleteToken();
                    RerouteGetSetSvc.set($location.path());
                    alert('Please login');
                    return $state.go('Login');
                }
                //store the current apartment in sessionStorage with the
                //appropriate session storage variable
                FlexGetSetSvc.set($scope.apartment, "ApartmentWaitlistingTo");
                //Create a modal instance with the modal helper function with the correct template and controller
                var modalInstanceWaitlist = modal(WizioConfig.ApplicationWaitlistViewsURL + 'WaitlistCreateModal.html', 'WaitlistCreateModalCtrl', 'md');

                //on modal instance close/button click go to user dashboard
                modalInstanceWaitlist.result.then(function(result){
                    $state.go('Account.Dashboard.Main');
                });
            };
            //LOAD APARTMENT DATA end
            /*$scope.apply = function() {

                checkToken();

                //get user data
                var user = TokenSvc.decode();
                console.dir(user);
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
            };*/
        }
    ]);
