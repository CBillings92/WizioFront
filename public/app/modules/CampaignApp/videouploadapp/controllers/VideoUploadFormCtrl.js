angular.module('CampaignApp')
.controller('VideoUploadFormCtrl', [
    $scope,
    function ($scope) {
        var viewtemplates = {
            topHorizontal1: true,
            topHorizontal2: true,
            mainContent1: false,
            mainContent2: true,
            mainContent3: true,
            bottomHorizontal: true
        };
        $scope.$emit('ViewTemplatesSelector', viewtemplates);


    }
]);
