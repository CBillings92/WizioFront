angular.module('ApplicationApp')
.controller('ApplicationOverviewCtrl', [
    '$scope',
    '$state',
    '$modalInstance',
    'modalData',
    'lodash',
    'FlexGetSetSvc',
    function($scope, $state, $modalInstance, modalData, lodash, FlexGetSetSvc){
        $scope.modalData = modalData;

        $scope.applications = lodash.groupBy(modalData, 'ApplicationId');
        $scope.applicationArray = [];
        for(var key in $scope.applications){
            if($scope.applications.hasOwnProperty(key)){
                $scope.applicationArray.push([$scope.applications[key]]);
            }
        }
        $scope.applicationArray = lodash.flatten($scope.applicationArray);

        $scope.viewDetails = function(applicationIndex){
            FlexGetSetSvc.set($scope.applicationArray[applicationIndex], "ApplicationDetails", "ApplicationDetails");
            $modalInstance.close('VIEW-DETAILS');
        };

        // for(var i = 0; i < Object.keys(modalData).length; i++){
        //     lodash.map(modalData.Apartment.)
        // }
        // var arraytrial = lodash.map(modalData.Apartment.Applications, function(value){
        //     return value
        // })
    }
]);
