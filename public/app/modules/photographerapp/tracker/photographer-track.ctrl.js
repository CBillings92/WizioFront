/*
    For tracking photographer activities during a photo shoot at a single apartment.
    Controls the photographer-track.view.html form
*/
angular.module('PhotographerApp')
    .controller('PhotographerTrackCtrl', ['$scope', function($scope) {
        var address, media, floorplans;

        var photo = {
            title: '',
            apartmentNumber: '',
            floorPlan: '',
            photoType: '',
            recordedTime: ''
        };

        $scope.media = [photo];

        function addMedia() {
            console.dir("hi");
            var mediaObj = Object.create(photo);

            media.push(mediaObj);

            return;
        }

        $scope.buttons = {
            addMedia: addMedia
        }
  }]);
