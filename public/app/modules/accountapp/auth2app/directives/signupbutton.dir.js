angular.module('AccountApp')
    .directive('signUpButtonDir', [
        'ModalSvc',
        function(ModalSvc) {
            return {
                template: '<button ng-click="signup()"></button>',
                scope: {},
                restrict: 'E',
                link: function(scope, elem, attrs) {
                    var modalDefaults = function(templateUrl, controller, accountType) {
                        return {
                            backdrop: true,
                            keyboard: true,
                            modalFade: true,
                            templateUrl: templateUrl,
                            controller: controller,
                            animation: false,
                            resolve: {
                                data: function() {
                                    return accountType;
                                }
                            }
                        };
                    };

                    var signupModal = modalDefaults(
                        'public/app/modules/accountapp/auth2app/views/signupmodal.view.html',
                        'SignupFormCtrl'
                    );

                    scope.signup = function() {
                        ModalSvc.showModal(signupModal, {})
                            .then(function(result) {

                            });
                    };
                }
            };
        }
    ]);
