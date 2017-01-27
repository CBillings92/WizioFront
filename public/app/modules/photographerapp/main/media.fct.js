angular.module('PhotographerApp')
    .factory('MediaFct', [
        '$q',
        '$resource',
        'WizioConfig',
        function($q, $resource, WizioConfig){

            // Rename a media object in our database
            function renameMedia(mediaObject, newMediaName) {
              return $q(function(resolve, reject){
                if(mediaObject && newMediaName){
                  var updateData = {
                    title: newMediaName
                  };
                  // create the object that will contain the data for our API call
                  var dataToBeTransferred = {
                    Media: mediaObject,
                    updateData: updateData
                  };
                      //FIXME refactor this to look cleaner
                      $resource(
                        WizioConfig.baseAPIURL + 'media', null, {
                          update: {
                            method: 'PUT'
                          }
                        })
                        .update(dataToBeTransferred, function(response){
                          if(respone.status === 'ERR'){
                              return reject({status: 'ERR', source:'API', file: 'media.fct.js', log: response.log});
                          } else {
                              return resolve(response);
                          }
                        });
                } else {
                    return reject({status: 'ERR', source:'front end', file: 'media.fct.js', log: 'media object and new media name required'});
                }
              })
            }
            return {
              update: {
                one: {
                  title: renameMedia
                }
              }
            }
        }
    ])
