/*
    For tracking photographer activities during a photo shoot at a single apartment.
    Controls the photographer-track.view.html form
*/
angular.module('PhotographerApp')
    .controller('PhotographerTrackCtrl', ['$scope', function($scope) {
        //set variables
        var address, floorplans;

        //create object template
        var photo = {
            title: '',
            apartmentNumber: '',
            floorPlan: '',
            photoType: '',
            recordedTime: ''
        };

        //create first photo record for form - assign it to template
        $scope.media = [photo];

        //add a new media (photo) record to the form
        function addMedia() {
            //replicate the photo object template
            var mediaObj = Object.create(photo);
            //push it into the media array for the form
            $scope.media.push(mediaObj);
            return;
        }

        //record the time that a photo was taken
        //index is index in the media array that the record is
        function recordTime(index) {
            $scope.media[index].recordedTime = new Date();
            return;
        }

        //send data to the wizio api
        function submitForm() {
            // mediaResource.
            return;
        }

        $scope.buttons = {
            addMedia: addMedia
        };
  }]);
