/*
    For making a request to get an API key
*/
angular.module('ApiGuideApp')
    .controller('ApiGuideCtrl', [
        '$scope',
        'ModalBuilderFct',
        'WizioConfig',
        function ($scope, ModalBuilderFct, WizioConfig) {
            $scope.triggerModal = function () {
                // api-request configurations to build modal with
                var apiGuideConfig = WizioConfig.pages.apiguide;
                var view = apiGuideConfig.modals.view;
                var controller = apiGuideConfig.modals.controller;
                ModalBuilderFct.buildComplexModal(
                    'md',
                    view,
                    controller,
                    $scope.apirequest
                )
                    .then(function(response){
                        return;
                    })
            }
        }
    ])
