angular.module('ApartmentsApp')
.controller('ApartmentsDisplayCtrl', [
    '$scope',
    '$sessionStorage',
    function($scope, $sessionStorage){
        //collect data from event emitter
        var data = [{street: "street 1"}, {street: "street 2"}];
        $scope.$sessionStore = $sessionStorage;
        $scope.$sessionStore.apartments = data;
        $scope.$on('searchFinished', function(event, data){
            console.dir(data);
            data = [{street: "street 1"}, {street: "street 2"}];
            $scope.$sessionStore = $sessionStorage;
            $scope.$sessionStore.apartments = data;
        });
    }
]);
