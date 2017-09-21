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
                floorplan: false,
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
            /*
              Creates array of progressive image URLs and builds floorplan urls
              for each image - Media is now prepped for the VRPlayer and Interface
            */
            var preppedMedia = TourFct.prepMedia(sortedMedia);
            // firstPhoto.media = sortedMedia.vrphoto[0];
            interfaceData.media = preppedMedia;
            interfaceData.hideFloorPlanButton = true;
            console.dir(preppedMedia);
            if (preppedMedia.vrphoto[0].floorplan) {
              alert('why');
                interfaceData.floorplan = true;
                interfaceData.floorplan = preppedMedia.vrphoto[0].floorplan;
                interfaceData.hideFloorPlanButton = false;
            }
            $scope.photoIndex = 0;
            console.dir(interfaceData)
            $scope.$broadcast('InterfaceDataReceived', interfaceData);
            $scope.$broadcast('TourDataReceived', preppedMedia.vrphoto[0]);
        })

        function sortMedia(media) {
            return lodash.groupBy(media, 'type');
        }

        function addHardCodedNavPointsToMedia(media) {
          if ($state.current.name === 'Demo') {
            for (var i = 0; i < media.vrphoto.length; i++) {
              media.vrphoto[i].navpoints = TourFct.demoNavPointData[media.vrphoto[i].title]
            }
          } else if ($state.params.activelistingid === '2b13cd9e-e945-4ce7-83cc-ff6182eae5d8') {
            for (var i = 0; i < media.vrphoto.length; i++) {
              media.vrphoto[i].navpoints = TourFct.demo2NavPointData[media.vrphoto[i].title]
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
