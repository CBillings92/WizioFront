angular.module('CampaignApp')
.controller('VideoUploadSplashCtrl', [
    '$scope',
    '$state',
    '$modal',
    'WizioConfig',
    function($scope, $state, $modal, WizioConfig){
        var viewtemplates = {
            topHorizontal1: true,
            topHorizontal2: true,
            mainContent1: false,
            mainContent2: true,
            bottomHorizontal: true
        };
        $scope.$emit('ViewTemplatesSelector', viewtemplates);

        var modal = function(templateUrl, controller, size){
            var modalInstance = $modal.open({
                templateUrl: templateUrl,
                controller: controller,
                size: size
            });
            return modalInstance;
        };

        $scope.uploadVideo = function(){
            var modalInstanceSignup = modal(WizioConfig.AccountAuthViewsURL + 'accountcreate.html', 'AccountCreateCtrl', 'md');

            modalInstanceSignup.result.then(function(result) {
                alert('DONE');
            }, function() {
                alert('CANCELED');
            });
            //$state.go('Campaign.VideoUpload.Form');
        };
    }
]);
