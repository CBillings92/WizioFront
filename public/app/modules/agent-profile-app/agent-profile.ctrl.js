angular.module('AgentProfileApp')
.controller('AgentProfileCtrl', ['$scope', function($scope) {
    $.fn.flyout = function(options) {
       var el = this;
       var edge = options.edge || 30;
       el.css({
           position : "absolute",
           top : "30px",
           right : -1 * (el.width() - edge)
       });
       el.click(function () {
           $(this).animate({right : "0px"});
       });
       el.mouseleave(function () {
           $(this).animate({right : -1 * (el.width() - edge) });
       });
    }
       $("#flyout").flyout({"edge" : "30"});



}])
