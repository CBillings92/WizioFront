angular.module('ProductInfoApp')
    .controller('ProductInfoCtrl', [
        '$scope',
        'ModalBuilderFct',
        function($scope, ModalBuilderFct) {

            $scope.launchTypeform = function(val) {

                var url = null;

                if (val === 'standard') {
                    url = "https://wizio-vr.typeform.com/to/vLhrLo";
                } else if (val === 'pro') {
                    url = "https://wizio-vr.typeform.com/to/vLhrLo";
                }

                ModalBuilderFct.buildComplexModal(
                    "md",
                    '/public/app/modules/product-info-app/modal/typeform-iframe.view.html',
                    "ProductInfoModalCtrl",
                    url
                )
                .then(function (response) {
                    return;
                });
            };


        }
]);
