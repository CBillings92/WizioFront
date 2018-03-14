angular.module("RequestShowingApp").controller("RequestShowingModalCtrl", [
  "$scope",
  "modalData",
  "$uibModalInstance",
  "ModalBuilderFct",
  "RequestShowingFormFct",
  "LoadingSpinnerFct",
  function($scope, modalData, $uibModalInstance, ModalBuilderFct, RequestShowingFormFct, LoadingSpinnerFct) {
    LoadingSpinnerFct.hide("requestShowingLoadingSpinner");
    $scope.requester = {
      email: "",
      phoneNumber: "",
      name: ""
    };
    $scope.disableFormSubmission = false;

    /* For close model directive */
    $scope.closeModal = function() {
      $uibModalInstance.close();
    };

    /**
     * Function to handle submission of the Request Showing form. The form requires at least the name and either Email
     * or phoneNumber to be filled out
     * @return {Object} returns data
     */
    $scope.formSubmit = function() {
      if ($scope.requester.name === "" || ($scope.requester.phoneNumber === "" && $scope.requester.email === "")) {
        var isRequiredStatement =
          "To request a showing, you must provide a name and either an email address or a phone number.";
        ModalBuilderFct.buildSimpleModal("", "Ok", "Required Information Missing", isRequiredStatement).then(function(
          response
        ) {
          /* Exit submission function */
          return;
        });
      } else {
        LoadingSpinnerFct.show("requestShowingLoadingSpinner");
        /* Disable submit button */
        $scope.disableFormSubmission = true;

        /* Send request for showing */
        RequestShowingFormFct.sendRequestForShowing($scope.requester, modalData.agent, modalData.listing)
          .then(function(response) {
            LoadingSpinnerFct.hide("requestShowingLoadingSpinner");
            ModalBuilderFct.buildSimpleModal(
              "",
              "Ok",
              "Request Completed",
              "Your request has been submitted. You should expect to be contacted by this listing's agent soon."
            ).then(function(response) {
              /* Exit submission function */
              $uibModalInstance.close();
            });
          })
          .catch(function(err) {
            LoadingSpinnerFct.hide("requestShowingLoadingSpinner");
            ModalBuilderFct.buildSimpleModal(
              "",
              "Ok",
              "Error: Could Not Complete Request",
              "Could not complete request at this time. Please try again, or contact the agent directly using their contact information provided on the listing."
            ).then(function(response) {
              /* Exit submission function */
              $uibModalInstance.close();
            });
          });
      }
    };
  }
]);
