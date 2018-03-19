angular.module("DashboardApp").controller("ReassignTourConfirmModalCtrl", [
  "$scope",
  "$uibModalInstance",
  "modalData",
  function($scope, $uibModalInstance, modalData) {
    $scope.formSubmitted = false;
    $scope.closeModal = function() {
      $uibModalInstance.dismiss();
    };

    $scope.modalData = modalData;
    $scope.buttonAction = function(action) {
      $scope.formSubmitted = true;
      if (action === "continue") {
        $uibModalInstance.close({ action: "continue", tour: modalData.tour, assigneeData: modalData.assigneeData });
      } else {
        $uibModalInstance.dismiss();
      }
    };
  }
]);
