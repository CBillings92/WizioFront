angular.module('DashboardApp')
  .controller('ReassignToursModalCtrl', [
    '$scope',
    '$uibModalInstance',
    '$resource',
    'modalData',
    'WizioConfig',
    function($scope, $uibModalInstance, $resource, modalData, WizioConfig) {
      // Close modal with 'x' on top right of modal - a directive
      $scope.closeModal = function () {
          $uibModalInstance.dismiss();
      };

      $resource(WizioConfig.baseAPIURL + 'subscription')
      .get(function(response){
        if (response.status === 'success') {
          $scope.subscriptions = response.payload;
        } else {
          alert('Could not load subscriptions at this time. Please try again later')
        }
      })

      $scope.assignTour = function(subscription){
        $uibModalInstance.close(subscription);
      }

    }
  ])
