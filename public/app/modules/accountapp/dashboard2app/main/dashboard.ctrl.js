angular.module('AccountApp').controller('DashboardCtrl', [
    '$scope',
    '$resource',
    'TokenSvc',
    'LoadingSpinnerFct',
    'WizioConfig',
    'ModalBuilderFct',
    function($scope, $resource, TokenSvc, LoadingSpinnerFct, WizioConfig, ModalBuilderFct) {
        $scope.emailToInvite = null;
        $scope.apartments = null;
        $scope.loading = false;
        console.dir(TokenSvc.decode());
        $scope.activelistings = TokenSvc.decode().ActiveListings;
        $scope.createTour = function(){
            ModalBuilderFct.buildComplexModal('lg', 'public/app/modules/photographerapp/floorplanupload/floorplanupload.view.html', 'FloorPlanUploadCtrl', {})
            .then(function(response){
                ModalBuilderFct.buildComplexModal('lg', 'public/app/modules/photographerapp/upload/upload.view.html', 'UploadPageCtrl', {})
                .then(function(response){

                })
            });
        }
        $scope.$on('searchReturned', function(event, results) {
            LoadingSpinnerFct.hide('account-dashboard-searh-loader')
            $scope.apartments = results;
            $scope.loading = false;
        });
        $scope.$on('Unit-Activated', function(event, results) {
            $scope.activelistings.push({
                pubid: results.pubid,
                Apartment: {
                    concatAddr: results.apartment.concatAddr,
                    unitNum: results.apartment.unitNum
                }
            })
        });
        $scope.$on('searchInitiated', function(event, name) {
            $scope.loading = true;
        });
        $scope.inviteUser = function(){
            var user = TokenSvc.decode();
            var data = {
                emailOfInvitee: $scope.emailOfInvitee,
                UserId: user.id,
                BusinessId: user.Subscriptions[0].UserSubscriptions.BusinessPubId,
                SubscriptionId: user.Subscriptions[0].UserSubscriptions.SubscriptionPubId,
                firstName: user.firstName,
                lastName: user.lastName,
            };
            console.dir(data);
            $resource(WizioConfig.baseAPIURL + 'subscription/invite')
            .save(data)
            .$promise
            .then(function(response){

            })
        }
    }
]);
