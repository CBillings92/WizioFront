angular.module('SharedFactoryApp')
    .factory('ModalBuilderFct', [
        'ModalSvc',
        '$q',
        function(ModalSvc, $q) {
            function buildModalWithController(size, templateUrl, controller, modalData) {
                return new $q(function(resolve, reject){
                    console.dir(modalData);
                    var modalObj = {
                        backdrop: true,
                        keyboard: true,
                        modalFade: true,
                        size: size,
                        templateUrl: templateUrl,
                        controller: controller,
                        resolve: {
                            modalData: function() {
                                return modalData;
                            }
                        }
                    };
                    ModalSvc.showModal(modalObj, {})
                    .then(function (response) {
                        resolve(response);
                    });
                });
            }

            function buildModalWithControllerObj(modalConfig) {
                return $q(function(resolve, reject){
                    buildModalWithController(
                        modalConfig.size,
                        modalConfig.templateUrl,
                        modalConfig.controller,
                        modalConfig.modalData
                    )
                    .then(function(response){
                        return resolve(response);
                    })
                });
            }

            function buildModalWithNoController(closeBtnText, actionBtnText, headerText, bodyText) {
                return new $q(function(resolve, reject) {
                    ModalSvc.showModal({}, {
                            closeButtonText: closeBtnText,
                            actionBtnText: actionBtnText,
                            headerText: headerText,
                            bodyText: bodyText
                        })
                        .then(function(result) {
                            resolve(result);
                        });
                });
            }
            return {
                buildComplexModal: buildModalWithController,
                buildSimpleModal: buildModalWithNoController,
                buildModalWithController: buildModalWithControllerObj
            };
        }
    ]);
