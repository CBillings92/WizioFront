angular.module('UnitApp')
    .controller('UnitDetailCtrl', [
        '$scope',
        '$state',
        '$modal',
        '$location',
        '$sessionStorage',
        '$sce',
        'lodash',
        'ApartmentGetSetSvc',
        'UnitResource',
        'MapFct',
        'TokenSvc',
        'FlexGetSetSvc',
        'RerouteGetSetSvc',
        'FavoriteModel',
        'MediaModel',
        'ModalSvc',
        'WizioConfig',
        'SearchFct',
        function(
            $scope,
            $state,
            $modal,
            $location,
            $sessionStorage,
            $sce,
            lodash,
            ApartmentGetSetSvc,
            UnitResource,
            MapFct,
            TokenSvc,
            FlexGetSetSvc,
            RerouteGetSetSvc,
            FavoriteModel,
            MediaModel,
            ModalSvc,
            WizioConfig,
            SearchFct
        ) {
            $scope.apartment = {};
            // MediaTabs
            //map does not load b/c it's stupid. Must be default.
            //FIXME
            $scope.mediaTab = 'map';
            $scope.selectMediaTab = function(tab) {
                console.dir(tab);

                $scope.mediaTab = tab;
            };
            //FIXME ?????
            $scope.range = function(n) {
                return new Array(n);
            };

            //FIXME don't use JQuery..
            var moveSlider = function(direction) {  // direction is 1 for forward / -1 for backward
                width =  $(".unit-details-media-tab-content-picker-slider-scroller").width();
                el = $(".unit-details-media-tab-content-picker-slider-scroller");
                currentPosition = el.scrollLeft();
                moveWidth = width * 0.5 * direction;
                // el.scrollLeft(currentPosition + moveWidth);
                el.animate({
                    scrollLeft: currentPosition + moveWidth
                }, 500, function () {
                    $scope.sliderCanGoForward = $scope.canSliderForward();
                    $scope.sliderCanGoBackward = $scope.canSliderBackward();
                });
            };

            $scope.sliderCanGoForward = true;
            $scope.sliderCanGoBackward = false;

            $scope.canSliderBackward = function() {
                return $(".unit-details-media-tab-content-picker-slider-scroller").scrollLeft() > 0;
            };

            $scope.canSliderForward = function() {
                el = $(".unit-details-media-tab-content-picker-slider-scroller");
                width =  el.outerWidth();
                currentPosition = el.scrollLeft();
                viewportWidth = el.width();
                return currentPosition + viewportWidth < width;
            };

            $scope.moveSliderBackward = function() {
                moveSlider(-1);
            };

            $scope.moveSliderForward = function() {
                moveSlider(1);
            };

            //For displaying (ng-show) Apply or Waitlist button
            $scope.available = false;
            //HELPER FUNCTION -- modal creation function
            var modalDefaults = function(templateUrl, controller, accountType, apartmentData) {
                return {
                    backdrop: true,
                    keyboard: true,
                    modalFade: true,
                    templateUrl: templateUrl,
                    controller: controller,
                    resolve: {
                        modalData: function() {
                            return apartmentData;
                        }
                    }
                };
            };
            //check that the correct apartment is getting pulled
            ApartmentGetSetSvc.checkApartment(function(result) {
                /*
                    loop through all object keys and assign "Unkown" to any null values
                    remove the apartment object from the array. was only in array
                    for the formatSearchResults function in SearchFct
                */
                console.dir(result);
                result = result[0];
                newApartmentData = lodash.mapValues(result.apartmentData, function(apartmentField) {
                    if (apartmentField === null) {
                        return "Unknown";
                    } else {
                        return apartmentField;
                    }
                });
                result.apartmentData = newApartmentData;
                console.dir(result);
                //assign result (apartment) to $scope
                $scope.apartment = result.apartmentData;
                $scope.listing = result.Lease ? result.Lease.leaseData : false;
                $scope.media = result.Media;
                console.dir($scope.media);
                var photoIndex = 0;
                $scope.photoUrl = $scope.media.vrphoto[photoIndex].link

                $scope.photosRight = function(){
                    console.dir(photoIndex);
                    if(photoIndex === ($scope.media.vrphoto.length)){
                        photoIndex = 0;
                    } else {
                        $scope.photoUrl = $scope.media.vrphoto[photoIndex++].link
                        // photoIndex++;
                    }
                };
                $scope.photosLeft = function(){
                    photoIndex--;
                }
                $scope.trust = $sce;

                var user = TokenSvc.decode();
                if (user && user !== 'No Token' && user !== 'undefined') {
                    user = TokenSvc.decode();
                    if (user.applications.length > 0) {
                        var applicationsCheck = lodash.find(user.applications.ApartmentId, $scope.apartment);
                    }
                }

                // $scope.apartment.youtubeLink = 'http://www.youtube.com/embed/' + $scope.apartment.Assignments[0].youtubeId + '?autoplay=0';

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

            //APPLY to the apartment
            $scope.apply = function() {
                var authViews = WizioConfig.AccountAuthViewsURL;
                var modalDefaultsLogin = modalDefaults(authViews + 'Login.html', 'AuthLoginModalCtrl');
                var modalDefaultsApplication = modalDefaults(WizioConfig.ApplicationFormViewsURL + 'ApplicationCreateModal.html', 'ApplicationCreateModalCtrl', 'md');
                //check if token is expired, if so route to login
                if (TokenSvc.checkExp()) {
                    TokenSvc.deleteToken();

                    ModalSvc.showModal(modalDefaultsLogin, {}).then(function(result) {
                        //store the current apartment in sessionStorage with the
                        //appropriate session storage variable
                        FlexGetSetSvc.set($scope.apartment, "ApartmentApplyingTo");

                        ModalSvc.showModal(modalDefaultsApplication, {}).then(function(result) {
                            $state.go('Account.Dashboard.Main');
                        });
                    });
                } else {
                    //store the current apartment in sessionStorage with the
                    //appropriate session storage variable
                    FlexGetSetSvc.set($scope.apartment, "ApartmentApplyingTo");

                    ModalSvc.showModal(modalDefaultsApplication, {}).then(function(result) {
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
                });
            };
            $scope.setupTour = function() {
                //This needs to be discussed further
                alert("Feature still under development and is due to arrive in our full product launch!");
            };
            $scope.submitVideo = function(){
                var newVideo = new MediaModel($scope.media.video.link, 'vrvideo');
                newVideo.getAssociationData();
                newVideo.saveMedia(function(res){
                    console.dir(res);
                });

            };
            $scope.submitPhoto = function(){
                var newPhoto = new MediaModel($scope.media.photo.link, 'vrphoto', $scope.media.photo.title);
                newPhoto.getAssociationData();
                newPhoto.saveMedia(function(res){
                    console.dir(res);
                });
            };
            //LOAD APARTMENT DATA end
        }
    ]);
