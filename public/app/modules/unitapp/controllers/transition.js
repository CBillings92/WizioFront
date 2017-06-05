angular.module('UnitApp').controller('TransitionUnitMediaCtrl', [
    '$scope',
    '$rootScope',
    '$state',
    '$resource',
    'WizioConfig',
    '$sce',
    'lodash',
    'ModalSvc',
    'LoadingSpinnerFct',
    'ModalBuilderFct',
    'AWSFct',
    'VrPlayerFct',
    function($scope, $rootScope, $state, $resource, WizioConfig, $sce, lodash, ModalSvc, LoadingSpinnerFct, ModalBuilderFct, AWSFct, VrPlayerFct) {
        LoadingSpinnerFct.show('vrPlayerLoader');

        // var panelContainer;
        var apartmentpubid;
        var apitoken;
        var state = $state.current.name;

        $scope.accelerometerToggle = function() {
            $scope.toggle = !$scope.toggle;
            $scope.$broadcast('accelerometer-toggle', {flag: $scope.toggle});
        }
        // For photo and floorplan selection
        $scope.selectPhoto = false;
        $scope.viewFloorPlan = false;

        $scope.buttonAction = function(toggle) {
            if (toggle === 'toggleFloorplan') {
                $scope.viewFloorPlan = !$scope.viewFloorPlan
                if ($scope.selectPhoto && $scope.viewFloorPlan) {
                    $scope.selectPhoto = !$scope.selectPhoto;
                }
            } else {
                $scope.selectPhoto = !$scope.selectPhoto
                if ($scope.viewFloorPlan && $scope.selectPhoto) {
                    $scope.viewFloorPlan = !$scope.viewFloorPlan;
                }

            }
        }

        // For styling VR player floorplan programatically
        $scope.style = 'margin: 0 auto; width:325px';

        // for loading CORS images....UGH
        $scope.trust = $sce;
        var apiResource;
        var query;
        $scope.style= "margin: 0 auto";

        if (state === 'LandingPage') {
            activelistingid = WizioConfig.LandingPage.activeListingId();
        } else if (state === 'Demo') {
            activelistingid = WizioConfig.DemoPage.activeListingId();
        } else {
            activelistingid = $state.params.apitoken || $state.params.activelistingid;
            apartmentpubid = $state.params.apartmentpubid;
        }

        apiResource = $resource(WizioConfig.baseAPIURL + 'activelisting/:activelistingid', {activelistingid: '@activelistingid'});
        query = {
            activelistingid: activelistingid
        };

        apiResource.query(query, function(result) {
            if (result[0].pinRequired) {
                result.activelistingid = activelistingid;
                ModalBuilderFct.buildComplexModal('md', 'public/app/modules/unitapp/viewtemplates/pinrequired.modal.html', 'PinRequiredModalCtrl', result).then(function(result) {
                    LoadingSpinnerFct.hide('vrPlayerLoader');
                    initialize(result)
                });
            } else {
                LoadingSpinnerFct.hide('vrPlayerLoader');
                initialize(result);
            };
        });

        function initialize(result) {
            var media = result;
            $scope.media = lodash.groupBy(media, 'type');
            $scope.$broadcast('MediaLoad', $scope.media);

        }
    }
]);
