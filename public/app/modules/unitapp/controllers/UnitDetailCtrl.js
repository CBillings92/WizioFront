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
            FlexGetSetSvc,
            RerouteGetSetSvc,
            FavoriteModel,
            ModalSvc,
            WizioConfig
        ) {

            //For displaying (ng-show) Apply or Waitlist button
            $scope.available = false;

            var modalDefaults = function(templateUrl, controller, accountType) {
                return {
                    backdrop: true,
                    keyboard: true,
                    modalFade: true,
                    templateUrl: templateUrl,
                    controller: controller,
                };
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
                //loop through all object keys and assign "Unkown" to any null values
                result = lodash.mapValues(result, function(apartmentField) {
                    if (apartmentField === null) {
                        return "Unknown";
                    } else {
                        return apartmentField;
                    }
                });
                //assign result (apartment) to $scope
                $scope.apartment = result;

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

                if (user && typeof(user.favorites) != 'undefined' && user.favorites.length !== 0) {
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
                var authViews = WizioConfig.AccountAuthViewsURL;
                var modalDefaultsLogin = modalDefaults(authViews + 'Login.html', 'AuthLoginModalCtrl');
                var modalDefaultsWaitlist = modalDefaults(WizioConfig.ApplicationWaitlistViewsURL + 'WaitlistCreateModal.html', 'WaitlistCreateModalCtrl', 'md');
                //check if token is expired, if so route to login
                if (TokenSvc.checkExp()) {
                    TokenSvc.deleteToken();

                    ModalSvc.showModal(modalDefaultsLogin, {}).then(function(result) {
                        //store the current apartment in sessionStorage with the
                        //appropriate session storage variable
                        FlexGetSetSvc.set($scope.apartment, "ApartmentWaitlistingTo");

                        ModalSvc.showModal(modalDefaultsWaitlist, {}).then(function(result) {
                            $state.go('Account.Dashboard.Main');
                        });
                    });
                } else {
                    //store the current apartment in sessionStorage with the
                    //appropriate session storage variable
                    FlexGetSetSvc.set($scope.apartment, "ApartmentWaitlistingTo");

                    ModalSvc.showModal(modalDefaultsWaitlist, {}).then(function(result) {
                        $state.go('Account.Dashboard.Main');
                    });
                }
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
                        $scope.favorited = true;
                    });
                }
            };

            $scope.deleteFavorite = function() {
                //create a new Favorite object
                var user = TokenSvc.decode();
                var favorite = new FavoriteModel(user.id, $scope.apartment.id);
                FavoriteModel.api().delete(favorite, function(result) {
                    alert('Favorite removed');
                });
            };
            $scope.setupTour = function() {
                alert("Feature still under development and is due to arrive in our full product launch!");
            };
            //LOAD APARTMENT DATA end
        }
    ]);
