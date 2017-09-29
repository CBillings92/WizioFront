angular.module('ProductInfoApp')
    .controller('ProductInfoCtrl', [
        '$scope',
        'ModalBuilderFct',
        '$state',
        function($scope, ModalBuilderFct, $state) {

            $scope.goToDemo = function() {
                window.open('/demo','_blank');

            }

            $scope.launchTypeform = function(val) {

                var url = null;

                if (val === 'standard') {
                    url = "https://wizio.youcanbook.me/service/jsps/cal.jsp?cal=0e1dab23-37c5-43ee-8aca-f76f2e2ae82c&ini=1504025346477&service=jsid8558281";
                } else if (val === 'pro') {
                    url = "https://wizio.youcanbook.me/service/jsps/cal.jsp?cal=0e1dab23-37c5-43ee-8aca-f76f2e2ae82c&ini=1504025361875&service=jsid385766";
                }

                ModalBuilderFct.buildComplexModal(
                    "lg",
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
