angular.module('CampaignApp')
    .controller('VideoUploadSplashCtrl', [
        '$scope',
        '$state',
        '$uibModal',
        'WizioConfig',
        'AuthFct',
        'ModalSvc',
        function($scope, $state, $uibModal, WizioConfig, AuthFct, ModalSvc) {
            var viewtemplates = {
                topHorizontal1: true,
                topHorizontal2: true,
                mainContent1: false,
                mainContent2: true,
                bottomHorizontal: true
            };
            $scope.$emit('ViewTemplatesSelector', viewtemplates);

            var modalOptions = function(closeButtonText, actionButtonText, headerText, bodyText) {
                return {
                    closeButtonText: closeButtonText,
                    actionButtonText: actionButtonText,
                    headerText: headerText,
                    bodyText: bodyText,
                };
            };
            var modalDefaults = function(size, templateUrl, controller, accountType) {
                return {
                    backdrop: true,
                    keyboard: true,
                    modalFade: true,
                    size: size,
                    templateUrl: templateUrl,
                    controller: controller,
                    resolve: {
                        data: function() {
                            return accountType;
                        }
                    }
                };
            };
            var displayUploadModal = function() {
                var campaignViews = WizioConfig.CampaignVideoUploadViewsURL;

                var modalDefaultsUploadForm = modalDefaults('lg', campaignViews + 'VideoUploadModal.html', 'VideoUploadModalCtrl');
                ModalSvc.showModal(modalDefaultsUploadForm, {}).then(function(result) {
                    switch(result){
                        case 'ok':
                            alert('success');
                            break;
                        default:
                            return;
                    }
                });
            };
            var displaySignupModal = function(callback){
                var authViews = WizioConfig.AccountAuthViewsURL;
                var modalDefaultsSignup = modalDefaults('md', authViews + 'AuthCreateAcctForm.html', 'AuthCreateAcctModalCtrl');

                ModalSvc.showModal(modalDefaultsSignup, {}).then(function(result) {
                    if (result === 'ok') {
                        callback('ok');
                    } else {
                        callback('login');
                    }
                });
            };
            var displayLoginModal = function(callback){
                var authViews = WizioConfig.AccountAuthViewsURL;
                var modalDefaultsLogin = modalDefaults('md', authViews + 'Login.html', 'AuthLoginModalCtrl');

                ModalSvc.showModal(modalDefaultsLogin, {}).then(function(result){
                    callback(result);
                });
            };

            $scope.uploadVideo = function() {
                if (AuthFct.isLoggedin()) {
                    displayUploadModal();

                } else {
                    displaySignupModal(function(result){
                        switch(result){
                            case 'ok':
                                displayUploadModal();
                            break;
                            case 'login':
                                displayLoginModal(function(result){
                                    switch(result){
                                        case 'ok':
                                            displayUploadModal();
                                        break;
                                        default:
                                        return;
                                    }
                                });
                        }
                    });

                }
            };
        }
    ]);
