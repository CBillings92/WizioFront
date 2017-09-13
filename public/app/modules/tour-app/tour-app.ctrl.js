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

            var sortedMedia = sortMedia(media);
            sortedMedia  = addHardCodedNavPointsToMedia(sortedMedia);

            vrPlayerData.media = media;
            vrPlayerData.sortedMedia = sortedMedia;
            // vrPlayerData.firstImage = sortedMedia.vrphoto[0];
            interfaceData.media = sortedMedia;
            var preppedMedia = TourFct.prepMedia(sortedMedia);
            // firstPhoto.media = sortedMedia.vrphoto[0];
            interfaceData.media = preppedMedia;
            if (preppedMedia.vrphoto[0].floorplan) {
                interfaceData.floorPlan = preppedMedia.vrphoto[0].floorplan;
                interfaceData.hideFloorPlanButton = false;
            }

            $scope.$broadcast('InterfaceDataReceived', interfaceData);
            $scope.$broadcast('TourDataReceived', preppedMedia.vrphoto[0]);
        })

        function sortMedia(media) {
            return lodash.groupBy(media, 'type');
        }

        function addHardCodedNavPointsToMedia(media) {
          if ($state.current.name === 'Demo') {
            for (var i = 0; i < media.vrphoto.length; i++) {
              // console.dir(interfaceData.media);
              media.vrphoto[i].navpoints = TourFct.demoNavPointData[media.vrphoto[i].title]
            }
          } else {
            for (var i = 0; i < media.vrphoto.length; i++) {
              media.vrphoto[i].navpoints = [];
            }
          }
          return media;
        }


    }
])
