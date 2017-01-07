angular.module('AccountApp')
    .controller('AuthCreateAcctModalCtrl', [
        '$scope',
        '$state',
        '$uibModal',
        '$uibModalInstance',
        'ModalSvc',
        'data',
        'WizioConfig',
        'UserRegistrationSvc',
        'ModalBuilderFct',
        function($scope, $state, $uibModal, $uibModalInstance, ModalSvc, data, WizioConfig, UserRegistrationSvc, ModalBuilderFct) {
            //Set a standard, local user object to save for local authentication
            $scope.user = {};
            $scope.hasRegistered = false;
            //data comes from previous modal
            $scope.data = data;
            $scope.dropdownvals = [
                "Broker/Agent",
                "Property Manager",
            ];
            //the back button functionality
            function backstep() {
                return $uibModalInstance.close('backStep');
            }
            function closeModal() {
                return $uibModalInstance.close('ok');
            }
            function save() {
                var passwordOne = $scope.user.password;
                var passwordTwo = $scope.user.passwordConfirm;
                var passwordsMatch;

                passwordsMatch = AuthFct.confirmPasswords(passwordOne, passwordTwo);
                if(passwordsMatch){
                    //assign user type
                    $scope.user = AuthFct.setUserType($scope.user, data);
                    //save user to DB
                    UserRegistrationSvc.saveUser($scope.user, function(data) {
                        if (data.status === "ERR") {
                            ModalBuilderFct.buildSimpleModal(
                                "Close",
                                "OK",
                                "Email Not valid",
                                'That email is already in use by an account holder. Please try another email or reset your password if you forgot it.'
                            ).then(function(result){
                                return;
                            });
                        } else {
                            $scope.hasRegistered = true;
                        }

                    });
                } else {
                    ModalBuilderFct.buildSimpleModal(
                        'Close',
                        'OK',
                        'Password Error',
                        'The two passwords you typed do not match'
                    )
                    .then(function(result){
                        return;
                    });
                    return;
                }

            }
            $scope.backStep = backstep;

            $scope.closeModal = closeModal;

            $scope.save = save;

            $scope.login = function() {
                return $uibModalInstance.close('login');
            };

        }
    ]);
