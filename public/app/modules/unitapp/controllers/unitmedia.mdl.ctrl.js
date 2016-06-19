angular.module('UnitApp')
    .controller('UnitMediaModalCtrl', [
        '$uibModalInstance',
        'modalData',
        function($uibModalInstance, modalData) {
            console.dir(modalData);
        }
    ]);
