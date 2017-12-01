angular.module('DashboardApp')
  .controller('SupportCtrl', [
    '$scope',
    '$uibModalInstance',
    'modalData',
    function($scope, $uibModalInstance, modalData){
      alert('fuck');
      $scope.closeModal = function () {
          $uibModalInstance.dismiss();
      };

      $scope.submitModal = function(){
        $uibModalInstance.close();
      }
    }
  ])
