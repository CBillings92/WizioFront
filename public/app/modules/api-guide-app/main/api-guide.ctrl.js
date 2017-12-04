/*
    For making a request to get an API key
*/
angular.module('ApiGuideApp')
    .controller('ApiGuideCtrl', [
        '$scope',
        'ModalBuilderFct',
        'WizioConfig',
        function ($scope, ModalBuilderFct, WizioConfig) {
          var pagecontainer = document.getElementById('apiguidewrapper')
          var parser = new DOMParser();
          var converter = new showdown.Converter()
          pagecontainer.appendChild(parser.parseFromString(converter.makeHtml('#Wizio API Guide'), 'text/xml').firstChild);

          console.dir(document.getElementById('test'));
          console.dir(converter.makeHtml(document.getElementById('test').value))
          console.dir(document.getElementById('test2').innerHtml)
          console.dir(document.getElementById('test2'))
          setTimeout(function(){

            document.getElementById('test2').innerHtml = converter.makeHtml(document.getElementById('test').value)
          }, 1000)

            $scope.triggerModal = function () {
                // api-request configurations to build modal with
                var apiGuideConfig = WizioConfig.pages.apiguide;
                var view = apiGuideConfig.modals.view;
                var controller = apiGuideConfig.modals.controller;
                ModalBuilderFct.buildComplexModal(
                    'md',
                    view,
                    controller,
                    $scope.apirequest
                )
                    .then(function(response){
                        return;
                    })
            }
        }
    ])
