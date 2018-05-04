angular.module('DashboardApp').controller('AgentInfoCtrl', [
    '$scope',
    '$state',
    '$q',
    'AgentInfoFct',
    'TokenSvc',
    function($scope, $state, $q, AgentInfoFct, TokenSvc) {

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

        // $scope.saveAgentChanges = function() {
        //   $scope.saveAgentChangesInitiated = true;
        //
        //   if ($scope.phoneNumber !== '' && $scope.phoneNumber.length >= 7) {
        //       AgentInfoFct.savePhoneNumber($scope.phoneNumber)
        //           .then(function(response){
        //               return;
        //               $scope.saveAgentChangesInitiated = false;
        //           })
        //
        //   }
        //
        //   var fileChooser = document.getElementById('file-chooser');
        //   if (fileChooser.files.length > 0){
        //   console.log("photo save initiated");
        //   //grab the first file in the file array (our floorplan)
        //   var file = fileChooser.files[0];
        //   AgentInfoFct.saveProfilePhoto(file)
        //   .then(function(response){
        //       return
        //       console.log("photo saved");
        //   });
        //   }
        //
        //   console.log("phone number save initiated");
        //
        //
        //
        //   console.log("all save done");
        //
        //
        //
        // };

        $scope.saveAgentChanges = function() {
          $scope.saveAgentChangesInitiated = true;
          savePhoneNumber()
          .then(function(response){
            return saveAgentImage()
          })
          .then(function(response){
            console.log("does it get here")
            $scope.saveAgentChangesInitiated = false;
          })
          }

function savePhoneNumber(){
return $q(function(resolve,reject){
  if ($scope.user.phoneNumber !== '' && $scope.user.phoneNumber.length >= 7) {
      AgentInfoFct.savePhoneNumber($scope.user.phoneNumber)
          .then(function(response){
            console.log("phone test")
              return resolve(response)
          })

  }

})
}

function saveAgentImage() {
  return $q(function(resolve,reject){
    var fileChooser = document.getElementById('file-chooser');
    if (fileChooser.files.length > 0){
    console.log("photo save initiated");
    //grab the first file in the file array (our floorplan)
    var file = fileChooser.files[0];
    AgentInfoFct.saveProfilePhoto(file)
    .then(function(response){
        return resolve(response)
    });
    }
    return resolve("no image to upload")
  })
}



// AgentInfo.saveProfilePhoto(file)
// .then(function(resultOfPromise){
//   return AgentInfoFct.savePhoneNumber(phonenum)}).then(function (resultOfNextPromise){...enable button again..})




        /**
         * Save the phone number of the current user to their profilePhotos
         * @return {} [description]
         */

    }
])
