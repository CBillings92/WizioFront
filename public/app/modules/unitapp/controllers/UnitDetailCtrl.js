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

            // MediaTabs
            $scope.mediaTab = 'unitVideos';
            $scope.selectMediaTab = function(tab) {
                $scope.mediaTab = tab;
            };
            $scope.range = function(n) {
                return new Array(n);
            };

            var moveSlider = function(direction) {  // direction is 1 for forward / -1 for backward
                width =  $(".unit-details-media-tab-content-picker-wrapper").width()
                $(".unit-details-media-tab-content-picker-slider").scrollLeft(width * 0.5 * direction);
            }

            $scope.moveSliderBackward = function() {
                moveSlider(-1);
            }

            $scope.moveSliderForward = function() {
                moveSlider(1);
            }

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

            //Chris made this so that the apartment details controller would
            //display null if there is nothing in the field that is trying to be
            //displayed.
            var checkForNulls = function(apartmentField){
                if (apartmentField === null){
                    return "Unknown";
                } else {
                    return apartmentField;
                }
            };

            //check that the correct apartment is getting pulled
            ApartmentGetSetSvc.checkApartment(function(result) {
                //loop through all object keys and assign "Unkown" to any null values
                result = lodash.mapValues(result, function(apartmentField){
                    if (apartmentField === null){
                        return "Unknown";
                    } else {
                        return apartmentField;
                    }
                });
                //assign result (apartment) to $scope
                $scope.apartment = result;

                var left = Math.floor(($scope.apartment.concatAddr.charCodeAt(5) /19) + 4);
                var right = Math.floor(($scope.apartment.concatAddr.charCodeAt(3) /19) + 4);
                var houseNumInt = parseInt(($scope.apartment.concatAddr).replace(/(^\d+)(.+$)/i, '$1'));
                var houseNumLow = houseNumInt - left;
                if(houseNumInt < 15){
                    houseNumLow = 1;
                }
                var houseNumHigh = houseNumInt + right;
                var houseNumRange = houseNumLow.toString() + "-" + houseNumHigh.toString();
                $scope.apartment.hiddenAddress = houseNumRange + $scope.apartment.concatAddr.replace(/^\d+/, '');

                var user = TokenSvc.decode();
                if(user && user !== 'No Token' && user !== 'undefined'){
                    user = TokenSvc.decode();
                    if(user.waitlists.length > 0){
                        var waitlistedCheck = lodash.find(user.waitlists.ApartmentId, $scope.apartment);
                    }
                }

                $sessionStorage.apartmentSelected = $scope.apartment;
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

                    var modalInstanceLoginForm = modal(WizioConfig.AccountAuthViewsURL + 'Login.html', 'AuthLoginModalCtrl', 'md');

                    modalInstanceLoginForm.result.then(function (result) {
                        if(result === 'ok'){
                            //store the current apartment in sessionStorage with the
                            //appropriate session storage variable
                            FlexGetSetSvc.set($scope.apartment, "ApartmentWaitlistingTo");
                            //Create a modal instance with the modal helper function with the correct template and controller
                            var modalInstanceWaitlist = modal(WizioConfig.ApplicationWaitlistViewsURL + 'WaitlistCreateModal.html', 'WaitlistCreateModalCtrl', 'md');

                            //on modal instance close/button click go to user dashboard
                            modalInstanceWaitlist.result.then(function(result){
                                $state.go('Account.Dashboard.Main');
                            });
                        }
                    });
                } else {
                    //store the current apartment in sessionStorage with the
                    //appropriate session storage variable
                    FlexGetSetSvc.set($scope.apartment, "ApartmentWaitlistingTo");
                    //Create a modal instance with the modal helper function with the correct template and controller
                    var modalInstanceWaitlist = modal(WizioConfig.ApplicationWaitlistViewsURL + 'WaitlistCreateModal.html', 'WaitlistCreateModalCtrl', 'md');

                    //on modal instance close/button click go to user dashboard
                    modalInstanceWaitlist.result.then(function(result){
                        $state.go('Account.Dashboard.Main');
                    });
                }
            };
            $scope.setupTour = function(){
                alert("Feature still under development and is due to arrive in our full product launch!");
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
