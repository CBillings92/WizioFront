angular.module('PhotographerApp')
    .factory('UploadFct', [
        '$q',
        'ModalBuilderFct',
        'WizioConfig',
        function($q, ModalBuilderFct, WizioConfig){

            // builds the modal and handles the logic for renaming media objects
            // returns a promise from the $q library
            function renameMedia(mediaObj) {
                return $q(function(resolve, reject){
                  ModalBuilderFct.buildComplexModal(
                    'md',
                    WizioConfig.uploadViews.modals.renameMedia,
                    'RenameMediaCtrl',
                    mediaObj
                  )
                  .then(function(response){
                      resolve(response);
                  });
                })
            }
            return {
              buildModal: {
                renameMedia: renameMedia
              }
            }
        }
    ])
