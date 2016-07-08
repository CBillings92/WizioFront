angular.module('SharedFactoryApp')
    .factory('ModalBuilderFct', [
        'ModalSvc',
        '$q',
        function(ModalSvc, $q) {
            function buildModalWithController(size, templateUrl, controller, modalData) {
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
                return modalObj;
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
                buildSimpleModal: buildModalWithNoController
            };
        }
    ]);
