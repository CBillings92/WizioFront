angular.module('AdminPanelApp')
    .controller('AdminAddVrListCtrl', [
        '$scope',
        '$resource',
        'ModalSvc',
        'WizioConfig',
        function ($scope, $resource, ModalSvc, WizioConfig) {
            function modalDefaults(templateUrl, controller, data) {
                return {
                    backdrop: true,
                    keyboard: true,
                    modalFade: true,
                    size: 'lg',
                    templateUrl: templateUrl,
                    controller: controller,
                    resolve: {
                        modalData: function() {
                            return data;
                        }
                    }
                };
            }
            $resource(WizioConfig.baseAPIURL + 'admin/units')
                .query(null, function(response){
                    $scope.apartments = response;
                    console.dir(response);
                });

            $scope.selectUnit = function(index){
                $scope.apartments[index].selected = true;
                console.dir("HI");
                setTimeout(function(){
                    $scope.apartments[index].selected = false;
                }, 400);
                var modalDefaultsCreateMedia = modalDefaults(WizioConfig.AdminPanelAppViewsURL + 'createmedia.form.html', 'CreateMediaFormCtrl', {apartment: $scope.apartments[index]});
                ModalSvc.showModal(modalDefaultsCreateMedia, {})
                    .then(function(modalResults){
                        $modalInstance.close();
                    });
            };
        }
    ]);
