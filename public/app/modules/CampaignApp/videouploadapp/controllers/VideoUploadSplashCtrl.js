angular.module('CampaignApp')
    .controller('VideoUploadSplashCtrl', [
        '$scope',
        '$state',
        '$modal',
        'WizioConfig',
        'AuthFct',
        function($scope, $state, $modal, WizioConfig, AuthFct) {
            var viewtemplates = {
                topHorizontal1: true,
                topHorizontal2: true,
                mainContent1: false,
                mainContent2: true,
                bottomHorizontal: true
            };
            $scope.$emit('ViewTemplatesSelector', viewtemplates);

            var modal = function(templateUrl, controller, size) {
                var modalInstance = $modal.open({
                    templateUrl: templateUrl,
                    controller: controller,
                    size: size
                });
                return modalInstance;
            };

            $scope.uploadVideo = function() {
                console.dir(AuthFct.isLoggedin());
                if (AuthFct.isLoggedin()) {
                    var modalInstanceUploadForm = modal(WizioConfig.CampaignVideoUploadViewsURL + 'VideoUploadModal.html', 'VideoUploadModalCtrl', 'md');

                    modalInstanceUploadForm.result.then(function(result) {
                        if (result === 'ok') {
                            alert('success!');
                        }
                    }, function() {
                        alert('CANCELLED');
                    });
                } else {
                    var modalInstanceSignup = modal(WizioConfig.AccountAuthViewsURL + 'AuthCreateAcctForm.html', 'AuthCreateAcctModalCtrl', 'md');

                    modalInstanceSignup.result.then(function(result) {
                        if (result === 'ok') {
                            var modalInstanceUploadForm = modal(WizioConfig.CampaignVideoUploadViewsURL + 'VideoUploadModal.html', 'VideoUploadModalCtrl', 'md');

                            modalInstanceUploadForm.result.then(function(result) {
                                if (result === 'ok') {

                                }
                            }, function() {
                                alert('CANCELLED');
                            });
                        }
                    }, function() {
                        alert('CANCELED');
                    });

                }
            };
        }
    ]);
