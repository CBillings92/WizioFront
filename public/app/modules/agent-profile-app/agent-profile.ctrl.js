angular.module('AgentProfileApp')
.controller('AgentProfileCtrl',
    ['$scope',
    '$resource',
    'WizioConfig',
    '$stateParams',
    '$state',
    function($scope, $resource, WizioConfig, $stateParams, $state) {

        $scope.blank = "https://s3.amazonaws.com/equirect-photos/blank.png";

    if ($state.current.name == "Demo") {
        $resource(WizioConfig.baseAPIURL + '/activelisting/0a68e5a9-da00-11e6-85e0-0a8adbb20c4d').query(function(response){

            $scope.agent = response[response.length - 1];
        });
    } else  {
        $resource(WizioConfig.baseAPIURL + 'activelisting/:activelistingid', {activelistingid: '@activelistingid'}).query(
            {
                activelistingid: $stateParams.activelistingid
            },
            function(response) {
                $scope.agent = response[response.length - 1];
                console.log(response[response.length - 1]);
            });

    }






    // var out = false;
    $scope.animation_var = "animation-start";


    $scope.toggleFlyout = function() {

    if ($scope.animation_var === "animation-start")
        $scope.animation_var = "animation-end";
    else
        $scope.animation_var = "animation-start";
    }




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



}])
