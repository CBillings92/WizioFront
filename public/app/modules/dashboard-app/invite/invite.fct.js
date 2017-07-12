angular.module('DashboardApp')
    .factory('InviteFct', [
        'WizioConfig',
        '$resource',
        '$q',
        'TokenSvc',
        'ModalBuilderFct',
        function (WizioConfig, $resource, $q, TokenSvc, ModalBuilderFct) {
            function inviteUser (emailOfInvitee) {
                return $q(function(resolve, reject){
                    var user = TokenSvc.decode();
                    var userSubscriptions = user.Subscriptions[0].UserSubscriptions_Migration;
                    var data = {
                        emailOfInvitee: emailOfInvitee,
                        UserId: user.id,
                        BusinessId: userSubscriptions.BusinessId || userSubscriptions.BusinessPubId,
                        SubscriptionId: userSubscriptions.SubscriptionId || userSubscriptions.SubscriptionPubId,
                        firstName: user.firstName,
                        lastName: user.lastName
                    };
                    $resource(WizioConfig.baseAPIURL + 'subscription/invite')
                    .save(data)
                    .$promise
                    .then(function(response) {
                        ModalBuilderFct.buildSimpleModal(
                            "",
                            "OK",
                            "Success",
                            'User has been invited!'
                        ).then(function(result) {
                            return resolve(result);
                        });
                    })
                })
            }

            return {
                inviteUser: inviteUser
            }
        }
    ])
