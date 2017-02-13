angular.module('AgentProfileApp')
.controller('AgentProfileCtrl', ['$scope', function($scope) {

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
