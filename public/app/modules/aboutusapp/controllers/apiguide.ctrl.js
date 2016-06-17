angular.module('AboutUsApp')
    .controller('ApiGuideCtrl', [
        '$scope',
        'ModalBuilderFct',
        function ($scope, ModalBuilderFct) {
            $scope.triggerModal = function triggerAPIRequestModal() {
                var routeToView = "public/app/modules/aboutusapp/viewtemplates/apirequest.modal.view.html";
                ModalBuilderFct.buildComplexModal('md', routeToView, 'ApiRequestModalCtrl', $scope.apirequest)
                    .then(function(response){

                    });
            };
        }
    ]);
