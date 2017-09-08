angular.module('TourApp').controller('TourCtrl', [
    '$scope',
    '$state',
    'WizioConfig',
    'TourFct',
    'lodash',
    'ngDrift',
    'LoadingSpinnerFct',
    function($scope, $state, WizioConfig, TourFct, lodash, ngDrift, LoadingSpinnerFct) {
        $scope.showInterface = true;
        if ($state.current.name === 'Tour' || $state.current.name === 'Demo') {
            document.getElementById('site-container').style.height = "100%";
            document.getElementById('site-container').setAttribute("style", "height:100%")
            document.getElementById('main-content').style["padding-bottom"] = 0;
            document.getElementById('main-content').style["margin-bottom"] = 0;
        }

        TourFct.getContent().then(function(media) {

          LoadingSpinnerFct.show('vrPlayerLoader');

            var interfaceData = {
                floorPlan: false,
                hideFloorPlanButton: true,
                media: false,
                showInterface: $scope.showInterface
            }

            var vrPlayerData = {
                media: false,
                sortedMedia: false,
                firstPhotoUrl: false,
                firstPhotoIndex: false
            }
            if ($state.current.name === 'Demo') {
              addHardCodedNavPointsToMedia(media);
            }

            var sortedMedia = sortMedia(media);


            vrPlayerData.media = media;
            vrPlayerData.sortedMedia = sortedMedia;
            vrPlayerData.firstImage = {};
            interfaceData.media = sortedMedia;

            var tourDefaults = TourFct.setTourDefaults(sortedMedia);

            vrPlayerData.firstImage.firstPhotoIndex = tourDefaults.photoIndex;
            vrPlayerData.firstImage.firstPhotoUrl = tourDefaults.photoUrl;
            vrPlayerData.firstImage.imageUrls = tourDefaults.imageUrls;
            vrPlayerData.firstImage.navpoints = tourDefaults.navpoints;

            if (tourDefaults.Floor_Plan) {
                interfaceData.floorPlan = tourDefaults.Floor_Plan;
                interfaceData.hideFloorPlanButton = false;
            }
            $scope.$broadcast('InterfaceDataReceived', interfaceData);
            $scope.$broadcast('TourDataReceived', vrPlayerData);
        })

        function sortMedia(media) {
            return lodash.groupBy(media, 'type');
        }

        function addHardCodedNavPointsToMedia(media) {
          // for (var i = 0; i < media.length; i++) {
          //   media[i].navpoints = []
          // }
          media[0].navpoints = TourFct.demoNavPointData.entryNavPoints
        }


    }
])
