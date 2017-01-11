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
        var user = TokenSvc.decode();
        $scope.inviteAccess = user.Subscriptions[0].UserSubscriptions.subscription_manager;
        $scope.activelistings = TokenSvc.decode().ActiveListings;
        $scope.createTour = function(){
            ModalBuilderFct.buildComplexModal('lg', 'public/app/modules/photographerapp/floorplanupload/floorplanupload.view.html', 'FloorPlanUploadCtrl', {})
            .then(function(response){
                ModalBuilderFct.buildComplexModal('lg', 'public/app/modules/photographerapp/upload/upload.view.html', 'UploadPageCtrl', {})
                .then(function(response){

                })
            });
        }
        $scope.changeApartment = function() {
            ModalBuilderFct.buildComplexModal('lg', 'public/app/modules/photographerapp/upload/upload.view.html', 'UploadPageCtrl', {});
        }
        $scope.$on('searchReturned', function(event, results) {
            LoadingSpinnerFct.hide('account-dashboard-search-loader')
            var apartments = [];
            console.dir(results);
            for(var i = 0; i < results.length; i++){
                console.dir(results[i]);
                apartments.push(results[i].Apartment);
            }
            $scope.apartments = apartments;
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
            var userSubscriptions = user.Subscriptions[0].UserSubscriptions;
            var data = {
                emailOfInvitee: $scope.emailOfInvitee,
                UserId: user.id,
                BusinessId: userSubscriptions.BusinessId ||  userSubscriptions.BusinessPubId ,
                SubscriptionId: userSubscriptions.SubscriptionId || userSubscriptions.SubscriptionPubId ,
                firstName: user.firstName,
                lastName: user.lastName,
            };
            console.dir(data);
            $resource(WizioConfig.baseAPIURL + 'subscription/invite')
            .save(data)
            .$promise
            .then(function(response){
                alert('User Invited');
            })
        }
    }
]);
