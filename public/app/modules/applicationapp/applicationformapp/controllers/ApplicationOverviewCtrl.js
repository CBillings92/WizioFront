angular.module('ApplicationApp')
.controller('ApplicationOverviewCtrl', [
    '$scope',
    'modalData',
    'lodash',
    function($scope, modalData, lodash){
        $scope.modalData = modalData;

        $scope.applications = lodash.groupBy(modalData, 'ApplicationId');
        console.dir($scope.applications);
        $scope.applicationArray = [];
        console.dir($scope.applications);
        for(var key in $scope.applications){
            if($scope.applications.hasOwnProperty(key)){
                $scope.applicationArray.push([$scope.applications[key]]);
            }
        }
        $scope.applicationArray = lodash.flatten($scope.applicationArray);
        console.dir($scope.applicationArray);

        // for(var i = 0; i < Object.keys(modalData).length; i++){
        //     lodash.map(modalData.Apartment.)
        // }
        // var arraytrial = lodash.map(modalData.Apartment.Applications, function(value){
        //     return value
        // })
    }
]);
