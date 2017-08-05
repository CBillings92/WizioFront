angular.module('NewTourApp').controller('NewTourCtrl', [
    '$scope',
    '$state',
    'WizioConfig',
    'NewTourFct',
    'lodash',
    function($scope, $state, WizioConfig, NewTourFct, lodash) {
        $scope.showInterface = true;
        if ($state.current.name === 'Tour' || $state.current.name === 'Demo') {
            document.getElementById('site-container').style.height = "100%";
            document.getElementById('site-container').setAttribute("style", "height:100%")
            document.getElementById('main-content').style["padding-bottom"] = 0;
            document.getElementById('main-content').style["margin-bottom"] = 0;
        }
        NewTourFct.getContent().then(function(media) {
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

            vrPlayerData.media = media;
            vrPlayerData.sortedMedia = sortedMedia;

            interfaceData.media = sortedMedia;

            var tourDefaults = NewTourFct.setTourDefaults(sortedMedia);

            vrPlayerData.firstPhotoIndex = tourDefaults.photoIndex;
            vrPlayerData.firstPhotoUrl = tourDefaults.photoUrl;

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
    }
])
