angular.module('UnitApp')
    .factory('UnitDetailsFct', [
        'ApartmentGetSetSvc',
        'UnitFct',
        'lodash',
        function unitDetailsFct(ApartmentGetSetSvc, UnitFct, lodash) {
            function setDataForPage(dataFromAPI) {
                var listing, apartment, features;

                listing = dataFromAPI;
                listing.dateStart = moment(
                    listing.dateStart
                ).format('YYYY-MM-DD');

                apartment = dataFromAPI.Apartment;
                apartment.monthlyRent = dataFromAPI.monthlyRent;
                features = UnitFct.features;

                //store the data in sessionStorage
                ApartmentGetSetSvc.set(apartment, 'apartmentSelected');
                var dataForPage = {
                    dataFromAPI: dataFromAPI,
                    listing: listing,
                    apartment: apartment,
                    features: features
                };
                return dataForPage;
            }

            function setFloorPlan(street, unitnum) {
                var floorplan;
                if (street === "1040 North Quincy Street") {
                    switch (street) {
                        case "406":
                            floorplan = "https://s3.amazonaws.com/wiziouservideos/LG-1b1d1s2b.png";
                            break;
                        case "209":
                            // floorplan = false;
                            break;
                        default:
                            // floorplan = false;
                    }
                } else if (street === "1020 North Quincy Street") {
                    switch (street) {
                        case "908":
                            floorplan = "https://s3.amazonaws.com/wiziouservideos/1020-2b2b.png";
                            break;
                        case "1013":
                            floorplan = "https://s3.amazonaws.com/wiziouservideos/1020-2b1b.png";
                            break;
                        case "616":
                            floorplan = false;
                            break;
                        case "619":
                            floorplan = false;
                            break;
                        default:
                            floorplan = false;
                    }
                } else {
                    floorplan = false;
                }
                return floorplan;
            }

            function setMap() {

            }
            function selectMediaTab(tab) {
                var mediaTab = 'unitPhotos';
                if (tab === 'unitVideos') {
                    if (vrvideos.length !== 1) {
                        var signUpErrorModalOptions = {
                            closeButtonText: "Close",
                            actionButtonText: "OK",
                            headerText: "No 360 Video",
                            bodyText: 'Sorry! This unit does not have a 360 video tour just yet.'
                        };
                        ModalSvc.showModal({}, signUpErrorModalOptions)
                        .then(function(result) {
                            return;
                        });

                    } else {
                        $scope.mediaTab = tab;
                    }
                } else {
                    $scope.mediaTab = tab;
                }
            }
            function setPhotos(data) {
                var photoIndex = 0;
                var vrphotos = [], vrvideos = [];
                var media = lodash.groupBy(data.Apartment.Media, 'type');
                var initialPhotoUrl = media.vrphoto[photoIndex].awsurl;
                return {
                    media: media,
                    initialPhotoUrl: initialPhotoUrl
                };
            }
            return {
                setDataForPage: setDataForPage,
                setFloorPlan: setFloorPlan,
                setMap: setMap,
                setPhotos: setPhotos,
            };
        }
    ]);
