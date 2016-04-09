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
        function($scope, $state, $uibModal, $uibModalInstance, ModalSvc, data, WizioConfig, UserRegistrationSvc) {
            //Set a standard, local user object to save for local authentication
            $scope.user = {};
            $scope.dropdownvals = [
                "Broker/Agent",
                "Property Manager"
            ];
            $scope.backStep = function() {
                $uibModalInstance.close('backStep');
            };
            $scope.hasRegistered = false;
            $scope.data = data;
            $scope.closeModal = function() {
                return $uibModalInstance.close('ok');
            };
            //submission of create account form
            $scope.setUserObj = function() {

                //check if the passwords match
                    if ($scope.user.password === $scope.user.passwordConfirm) {
                        //set the accountType (local vs third party);
                        $scope.user.accountType = 'local';

                        if(data === "Tenant"){
                            $scope.user.userType = 1;
                        } else {
                            //decide what kind of seller account type the user is
                            //and change to numerical value for database purposes
                            switch ($scope.user.type) {
                                case "Broker/Agent":
                                    $scope.user.userType = 3;
                                    break;
                                case "Property Manager":
                                    $scope.user.userType = 2;
                                    break;
                                default:
                                    $scope.user.userType = 2;
                            }
                        }
                        UserRegistrationSvc.saveUser($scope.user, function(data) {
                            if (data.status === "ERR") {
                                var signUpErrorModalOptions = {
                                    closeButtonText: "Close",
                                    actionButtonText: "OK",
                                    headerText: "Email Not valid",
                                    bodyText: 'That email is already in use by an account holder. Please try another email or reset your password if you forgot it.'
                                };
                                ModalSvc.showModal({}, signUpErrorModalOptions)
                                    .then(function(result) {});
                            } else {
                                $scope.hasRegistered = true;
                            }

                        });
                    } else {
                        var signUpPasswordErrorModalOptions = {
                            closeButtonText: "Close",
                            actionButtonText: "OK",
                            headerText: "Password Error",
                            bodyText: 'The two passwords you typed do not match'
                        };
                        ModalSvc.showModal({}, signUpPasswordErrorModalOptions)
                            .then(function(result) {});
                    }
            };
            $scope.login = function() {
                return $uibModalInstance.close('login');
            };
            // $scope.cancel = function() {
            //     if ($state.current.name === "Campaign.VideoUpload.Main") {
            //         $uibModalInstance.dismiss();
            //     } else {
            //         $state.go('Home');
            //     }
            // };

        }
    ]);
