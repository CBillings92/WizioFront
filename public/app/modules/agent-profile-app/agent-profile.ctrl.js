angular.module('AgentProfileApp')
.controller('AgentProfileCtrl',
    ['$scope',
    '$resource',
    'WizioConfig',
    '$stateParams',
    '$state',
    function($scope, $resource, WizioConfig, $stateParams, $state) {

        $scope.blank = "https://s3.amazonaws.com/' + WizioConfig.S3_EQUIRECTPHOTOS_BUCKET  + '/blank.png";
        $scope.profileUploaded = false;

    if ($state.current.name == "Demo") {
        $resource(WizioConfig.baseAPIURL + '/activelisting/0a68e5a9-da00-11e6-85e0-0a8adbb20c4d').query(function(response){
            $scope.profileUploaded = true;
            $scope.agent = {
                firstName: "Devon",
                lastName: "Grodkiewicz",
                email: "devon@wizio.co",
                awsProfilePhotoUrl: "https://cdn.wizio.co/profile-photos/Devon_Grodkiewicz_35.png"

            };

        });
    } else  {
        $resource(WizioConfig.baseAPIURL + 'activelisting/:activelistingid', {activelistingid: '@activelistingid'}).query(
            {
                activelistingid: $stateParams.activelistingid
            },
            function(response) {
                if($stateParams.activelistingid === 'e2653af3-8912-4136-995d-1db64830d3ce' || $stateParams.activelistingid === 'dca9eef0-5bdd-4d57-8db7-f0f0e96196fa') {
                    console.dir('1');
                    $scope.profileUploaded = true;
                    $scope.agent.awsProfilePhotoUrl = 'https://cdn.wizio.co/cb7a5550-9105-4c1f-9002-744d8c0069c6/SailBoston2017_logo.jpg';
                    $scope.agent.firstName = 'Sail Boston';
                    $scope.agent.email = 'http://www.sailboston.com/'
                } else {

                    $scope.agent = response[response.length - 1];
                    $scope.profileUploaded = $scope.agent.awsProfilePhotoUrl;
                }

            });

    }







    // var out = false;
    $scope.animation_var = "animation-start";


    $scope.toggleFlyout = function() {

    if ($scope.animation_var === "animation-start")
        $scope.animation_var = "animation-end";
    else
        $scope.animation_var = "animation-start";
    };




    // $.fn.flyout = function(options) {
    //    var el = this;
    //    var edge = options.edge || 30;
    //    el.css({
    //        position : "absolute",
    //        top : "30px",
    //        right : -1 * (el.width() - edge)
    //    });
    //    el.click(function () {
    //        if (out) {
    //            $(this).animate({right : -1 * (el.width() - edge) });
    //        } else {
    //        $(this).animate({right : "0px"});
    //     }
    //     out = !out;
    //
    //    });
    //    el.mouseleave(function () {
    //        $(this).animate({right : -1 * (el.width() - edge) });
    //
    //    });
    // }
    //    $("#flyout").flyout({"edge" : "30"});



}]);
