angular.module("AgentProfileApp").controller("AgentProfileModalCtrl", [
  "$scope",
  "$uibModalInstance",
  "modalData",
  "WizioConfig",
  function($scope, $uibModalInstance, modalData, WizioConfig) {
    $scope.agent = modalData;
    $scope.profileUploaded = false;

    if (modalData.state == "Demo") {
      $scope.profileUploaded = true;

      $scope.awsProfilePhotoUrl = "https://cdn.wizio.co/profile-photos/Devon_Grodkiewicz_35.png";
    } else {
      $scope.profileUploaded = $scope.agent.awsProfilePhotoUrl || $scope.agent.blankDefault;
    }

    $scope.ok = function() {
      $uibModalInstance.close("success");
    };

    $scope.closeModal = function() {
      $uibModalInstance.dismiss();
    };
  }
]);
