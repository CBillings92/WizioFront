angular.module('UnitApp')
    .controller('UnitClaimListCtrl', [
        '$scope',
        '$resource',
        'WizioConfig',
        'lodash',
        function($scope, $resource, WizioConfig, lodash){
            $resource(WizioConfig.baseAPIURL + 'apartment/claim/list')
                .query(null, function(apiResponse){
                    var setUnits = lodash.groupBy(apiResponse, 'PropertyManagerId');
                    var setAddresses = lodash.groupBy(apiResponse, 'concatAddr');
                    for (var key in setAddresses){
                        setAddresses[key] = lodash.groupBy(setAddresses[key], 'PropertyManager.businessName');
                    }
                    $scope.units = setAddresses;
                });
        }
    ]);
