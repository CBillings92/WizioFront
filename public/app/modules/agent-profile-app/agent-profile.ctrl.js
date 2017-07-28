angular.module('AgentProfileApp')
.controller('AgentProfileCtrl',
    ['$scope',
    '$resource',
    'WizioConfig',
    '$stateParams',
    '$state',
    'ModalBuilderFct',
    function($scope, $resource, WizioConfig, $stateParams, $state, ModalBuilderFct) {

        $scope.blank = "https://s3.amazonaws.com/' + WizioConfig.S3_EQUIRECTPHOTOS_BUCKET  + '/blank.png";
        $scope.profileUploaded = false;

    if ($state.current.name == "Demo") {
        $resource(WizioConfig.baseAPIURL + '/activelisting/0a68e5a9-da00-11e6-85e0-0a8adbb20c4d').query(function(response){
            $scope.profileUploaded = true;
            $scope.agent = {
                firstName: "Devon",
                lastName: "Grodkiewicz",
                email: "devon@wizio.co",
                awsProfilePhotoUrl: "https://cdn.wizio.co/profile-photos/Devon_Grodkiewicz_35.png",
                state: $state.current.name
            };

        });
    } else  {
        $resource(WizioConfig.baseAPIURL + 'activelisting/:activelistingid', {activelistingid: '@activelistingid'}).query(
            {
                activelistingid: $stateParams.activelistingid
            },
            function(response) {
                $scope.agent = response[response.length - 1];
                $scope.profileUploaded = $scope.agent.awsProfilePhotoUrl;
                $scope.agent.state = $state.current.name;

            });

    }


    $scope.launchAgentProfileModal = function() {


        ModalBuilderFct.buildComplexModal(
            'md',
            '/public/app/modules/agent-profile-app/modal/agent-profile-modal.view.html',
            'AgentProfileModalCtrl',
            $scope.agent).then(function(response) {

            });

    };


}]);
