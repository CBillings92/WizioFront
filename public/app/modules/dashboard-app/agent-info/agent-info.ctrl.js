angular.module("DashboardApp").controller("AgentInfoCtrl", [
  "$scope",
  "$state",
  "$q",
  "AgentInfoFct",
  "TokenSvc",
  "ModalBuilderFct",
  function($scope, $state, $q, AgentInfoFct, TokenSvc, ModalBuilderFct) {
    /**
     * Flag for turning pieces of the form UI off
     * @type {Boolean}
     */
    $scope.disableForm = true;

    /**
     * Flag for modifying UI when Save Changes is initiated
     * @type {Boolean}
     */
    $scope.saveAgentChangesDone = true;

    /**
     * Flag for modifying UI when Save Changes is initiated
     * @type {Boolean}
     */

    $scope.saveAgentChangesInitiated = false;

    /**
     * Saves profile photo for current user to their profile
     * @return {} [description]
     */

    $scope.user = TokenSvc.decode();
    $scope.saveAgentChanges = function() {
      $scope.saveAgentChangesInitiated = true;
      savePhoneNumber()
        .then(function(response) {
          return saveAgentImage();
        })
        .then(function(response) {
          ModalBuilderFct.buildSimpleModal("", "OK", "Success", "Your profile information has been updated.").then(
            function(result) {
              $scope.saveAgentChangesInitiated = false;
            }
          );
        });
    };

    function savePhoneNumber() {
      return $q(function(resolve, reject) {
        var userToken = TokenSvc.decode();
        if (
          $scope.user.phoneNumber !== "" &&
          $scope.user.phoneNumber.length >= 7 &&
          userToken.phoneNumber !== $scope.user.phoneNumber
        ) {
          AgentInfoFct.savePhoneNumber($scope.user.phoneNumber).then(function(response) {
            return resolve(response);
          });
        }
        return resolve("Phone number not in need of updating");
      });
    }

    function saveAgentImage() {
      return $q(function(resolve, reject) {
        var fileChooser = document.getElementById("file-chooser");
        if (fileChooser.files.length > 0) {
          //grab the first file in the file array (our floorplan)
          var file = fileChooser.files[0];
          AgentInfoFct.saveProfilePhoto(file).then(function(response) {
            return resolve(response);
          });
        }
        return resolve("no image to upload");
      });
    }
  }
]);
