/*  UploadFloorPlanDescisionCtrl - SUMMARY

*/
angular.module('PhotographerApp')
    .controller('UploadFloorPlanDecisionCtrl', [
        '$scope',
        'modalData',
        '$uibModalInstance',
        function(
            $scope,
            modalData,
            $uibModalInstance
        ) {
            $scope.closeModal = function(){
                $uibModalInstance.dismiss('exit');
            }
            var state = modalData;
            // on selecting to upload a floor plan, append a flag and pass the data
            // to the next modal
            $scope.handleYesClick = function () {
                var flag = {
                    upload_floor_plan_flag: true
                };
                var uploadObjectState = set_upload_floor_plan_flag(state, flag);
                $uibModalInstance.close(uploadObjectState);
            };

            // on selecting to upload a floor plan, append a flag and pass the data
            // to the next modal
            $scope.handleNoClick = function () {
                var flag = {
                    upload_floor_plan_flag: false
                };
                var uploadObjectState = set_upload_floor_plan_flag(state, flag);
                $uibModalInstance.close(uploadObjectState);
            };

            // A reducer function for setting the upload_floor_plan_flag on the state
            function set_upload_floor_plan_flag(state, action) {
                var newState = {};
                Object.assign(newState, state, {'upload_floor_plan_flag': action.upload_floor_plan_flag});
                return newState;
            }
    }])
