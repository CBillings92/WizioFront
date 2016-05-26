angular.module('TenantSurveyApp')
    .controller('TenantSurveyCtrl', [
        '$scope',
        'TenantSurveyFct',
        function($scope, TenantSurveyFct) {
            $scope.form = {

            };
            $scope.selectOptions = TenantSurveyFct.selectOptions;
            console.dir($scope.selectOptions);
        }
    ]);
