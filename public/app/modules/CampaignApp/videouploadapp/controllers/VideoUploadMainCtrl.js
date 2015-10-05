angular.module('CampaignApp')
.controller('VideoUploadMainCtrl', [
    '$scope',
    function ($scope) {
        $scope.$on('ViewTemplatesSelector', function(event, data){
            $scope.viewtemplates = data;
        });
    }
]);
