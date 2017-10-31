angular.module('VrPlayerApp').controller('VrPlayerCtrl', [
    '$scope',
    'LoadingSpinnerFct',
    function($scope, LoadingSpinnerFct) {

      $scope.$on('VrPlayerApp', function(event, data){
        switch (data.action) {
          case 'init':
            init(data.data);
            break;
          case 'changePhoto':
            changePhoto(data.data)
          default:

        }
      })
        $scope.$on('TourDataReceived', function(event, data){
            wizio.init('pano', data, {}, function(response){
              LoadingSpinnerFct.hide('vrPlayerLoader');
            });
        })

        function init(initData) {
          console.dir('in here ');
          wizio.init(initData.htmlElemId, initData.photoData, {}, function(response){
            LoadingSpinnerFct.hide('vrPlayerLoader');
          });
        }

        function changePhoto(photoData) {
          wizio.changeImage(photoData, function(response){
            return;
          })
        }
        /**
         * Used for navigating on Powered by Wizio Button
         * @return {null}
         */
        $scope.goToWizioSite = function() {
            window.open('https://www.wizio.co');
            return;
        }

        $scope.$on()

        var rotateTimeout;
        var isRotating = true;

        $scope.autoToggleRotate = function() {
            clearTimeout(rotateTimeout);

            if (isRotating) {
                wizio.toggleAutoRotate();
                isRotating = false;
            }

            rotateTimeout = setTimeout(function(){
                 wizio.toggleAutoRotate();
                 isRotating = true;
                 //currently, we continue rotating after 10 seconds of no touches on the screen
             }, 10000);

        }

    }
])
