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
        'FavoriteModel',
        'ModalSvc',
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
            FavoriteModel,
            ModalSvc,
            WizioConfig
        ) {

            //For displaying (ng-show) Apply or Waitlist button
            $scope.available = false;
            //HELPER FUNCTION -- modal creation function
            var modal = function(templateUrl, controller, size) {
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
            var checkForNulls = function(apartmentField) {
                if (apartmentField === null) {
                    return "Unknown";
                } else {
                    return apartmentField;
                }
            };

            //check that the correct apartment is getting pulled
            ApartmentGetSetSvc.checkApartment(function(result) {
                $scope.apartment = result;
                $scope.apartment.concatAddr = checkForNulls($scope.apartment.concatAddr);
                $scope.apartment.beds = checkForNulls($scope.apartment.beds);
                $scope.apartment.baths = checkForNulls($scope.apartment.baths);
                $scope.apartment.livingSpaces = checkForNulls($scope.apartment.livingSpaces);
                $scope.apartment.maxResidency = checkForNulls($scope.apartment.maxResidency);
                $scope.apartment.costPerMonth = checkForNulls($scope.apartment.costPerMonth);
                $scope.apartment.renovated = checkForNulls($scope.apartment.renovated);
                $scope.apartment.pets = checkForNulls($scope.apartment.pets);

                var left = Math.floor(($scope.apartment.concatAddr.charCodeAt(5) / 19) + 4);
                var right = Math.floor(($scope.apartment.concatAddr.charCodeAt(3) / 19) + 4);
                var houseNumInt = parseInt(($scope.apartment.concatAddr).replace(/(^\d+)(.+$)/i, '$1'));
                var houseNumLow = houseNumInt - left;
                if (houseNumInt < 15) {
                    houseNumLow = 1;
                }
                var houseNumHigh = houseNumInt + right;
                var houseNumRange = houseNumLow.toString() + "-" + houseNumHigh.toString();
                $scope.apartment.hiddenAddress = houseNumRange + $scope.apartment.concatAddr.replace(/^\d+/, '');

                var user = TokenSvc.decode();
                if (user && user !== 'No Token' && user !== 'undefined') {
                    user = TokenSvc.decode();
                    if (user.waitlists.length > 0) {
                        var waitlistedCheck = lodash.find(user.waitlists.ApartmentId, $scope.apartment);
                    }
                }

                $sessionStorage.apartmentSelected = $scope.apartment;
                $scope.apartment.youtubeLink = 'http://www.youtube.com/embed/' + $scope.apartment.Assignments[0].youtubeId + '?autoplay=0';

                //create the google maps
                var mapOptions = MapFct.makeMap();
                $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
                //create the markers for the map
                var markers = MapFct.makeMarkers($scope.map);

                //check to see if apartment has been favorited

                if (user && user.favorites.length !== 0) {
                        if (lodash.indexOf(user.favorites, $scope.apartment.id) !== -1) {
                             $scope.favorited = true;
                         } else {
                             $scope.favorited = false;
                         }
                } else {
                    $scope.favorited = false;
                }



            });
            /*$scope.waitlist = function(){
                alert('Feature still under development and coming soon!');
            }; */
            //WAITLIST for the apartment
            $scope.waitlist = function() {
                //check if token is expired, if so route to login
                if (TokenSvc.checkExp()) {
                    TokenSvc.deleteToken();
                    RerouteGetSetSvc.set($location.path());
                    alert('Please login');

                    var modalInstanceLoginForm = modal(WizioConfig.AccountAuthViewsURL + 'Login.html', 'AuthLoginModalCtrl', 'md');

                    modalInstanceLoginForm.result.then(function(result) {
                        if (result === 'ok') {
                            //store the current apartment in sessionStorage with the
                            //appropriate session storage variable
                            FlexGetSetSvc.set($scope.apartment, "ApartmentWaitlistingTo");
                            //Create a modal instance with the modal helper function with the correct template and controller
                            var modalInstanceWaitlist = modal(WizioConfig.ApplicationWaitlistViewsURL + 'WaitlistCreateModal.html', 'WaitlistCreateModalCtrl', 'md');

                            //on modal instance close/button click go to user dashboard
                            modalInstanceWaitlist.result.then(function(result) {
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
                    modalInstanceWaitlist.result.then(function(result) {
                        $state.go('Account.Dashboard.Main');
                    });
                }
                //store the current apartment in sessionStorage with the
                //appropriate session storage variable
                FlexGetSetSvc.set($scope.apartment, "ApartmentWaitlistingTo");
                //Create a modal instance with the modal helper function with the correct template and controller
                var modalInstanceWaitlist = modal(WizioConfig.ApplicationWaitlistViewsURL + 'WaitlistCreateModal.html', 'WaitlistCreateModalCtrl', 'md');

                //on modal instance close/button click go to user dashboard
                modalInstanceWaitlist.result.then(function(result) {
                    $state.go('Account.Dashboard.Main');
                });
            };
            //FAVORITE for the apartment
            $scope.favorite = function() {

                var user = TokenSvc.decode();
                if (user !== "No Token") {
                    //create a new Favorite object
                    var favorite = new FavoriteModel(user.id, $scope.apartment.id);
                    //create empty modalOptions object
                    var modalOptions = {};
                    FavoriteModel.api().save(favorite, function(response) {
                        if (response.status === 'ERR') {
                            //set modal text options
                            modalOptions.closeButtonText = "Close";
                            modalOptions.actionButtonText = "OK";
                            modalOptions.headerText = "Error";
                            modalOptions.bodyText = "You've already favorited this apartment!";
                            //launch modal using ModalSvc (shaedservices)
                            ModalSvc.showModal({}, modalOptions);
                        }
                        //set modal text options
                        modalOptions.closeButtonText = "Close";
                        modalOptions.actionButtonText = "OK";
                        modalOptions.headerText = "Success!";
                        modalOptions.bodyText = "This apartment is favorited! You can view this apartment in your account page now.";
                        //launch modal using ModalSvc (sharedservices)
                        ModalSvc.showodal({}, modalOptions);
                        //change button to favorited button
                        $scope.favorited =  true;
                    });
                }
            };

            $scope.deleteFavorite = function(){
                //create a new Favorite object
                var user = TokenSvc.decode();
                var favorite = new FavoriteModel(user.id, $scope.apartment.id);
                FavoriteModel.api().delete(favorite, function(result){
                    alert('Favorite removed');
                });
            };
            $scope.setupTour = function() {
                alert("Feature still under development and is due to arrive in our full product launch!");
            };
            //LOAD APARTMENT DATA end

            $scope.apply = function() {

                checkToken();

                //get user data
                var user = TokenSvc.decode();
                //set apartment data and store that data in sessionStorage variable
                ApartmentGetSetSvc.set($scope.apartment, "apartmentApplyingTo");
                //If the user doesn't have a profile
                if (user.ProfileId === null) {
                    //call modal function
                    var modalInstanceCreate = modal('public/viewtemplates/public/createprofilemodal.html', 'ProfileCreateModalCtrl', 'md');

                    modalInstanceCreate.result.then(function(result) {
                        $state.go('Profile.Create');
                    }, function() {

                    });
                } else {
                    //call modal function
                    ProfileResource.get({
                        id: user.ProfileId
                    }, function(data) {
                        if (data) {
                            var modalInstanceVerify = modal('public/app/modules/AccountApp/profileapp/viewtemplates/profileexistsmodal.html', 'ProfileExistsModalCtrl', 'lg');

                            modalInstanceVerify.result.then(function(result) {
                                switch (result) {
                                    case "ok":
                                        $state.go('ApartmentApplication');
                                        break;
                                    case "edit":
                                        FlexGetSetSvc.set(data);
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
