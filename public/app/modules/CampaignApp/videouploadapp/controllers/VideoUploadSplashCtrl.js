angular.module('CampaignApp')
.controller('VideoUploadSplashCtrl', [
    '$scope',
    '$state',
    'WizioConfig',
    function($scope, $state, WizioConfig){
        var viewtemplates = {
            topHorizontal1: true,
            topHorizontal2: true,
            mainContent1: false,
            mainContent2: true,
            bottomHorizontal: true
        };
        $scope.$emit('ViewTemplatesSelector', viewtemplates);

        $scope.uploadVideo = function(){
            var modalInstanceSignup = modal(WizioConfig.AccountAuthViewsURL + 'accountcreate.html', 'ProfileCreateModalCtrl', 'md');

            modalInstanceCreate.result.then(function(result) {
                $state.go('Profile.Create');
            }, function() {

            });
            $state.go('Campaign.VideoUpload.Form');
        };
    }
]);
