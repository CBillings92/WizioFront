angular.module('ApartmentsApp')
.controller('ApartmentsDisplayCtrl', [
    '$scope',
    '$sessionStorage',
    function($scope, $sessionStorage){
        //collect data from event emitter
        var data = [
            {
                id: "1",
                houseNum: "39",
                street: "Huntington Avenue",
                unitNum: "3B",
                city: "Boston",
                state: "MA",
                zip: "02115"
            },
            {
                id: "2",
                houseNum: "10",
                street: "Charles Street",
                unitNum: "4",
                city: "Boston",
                state: "MA",
                zip: "02114",
                image: "https://gyazo.com/8417ab5a5546ff53e1133c5009253f56"
            },
            {
                id: "3",
                houseNum: "360",
                street: "Newbury Street",
                unitNum: "3",
                city: "Boston",
                state: "MA",
                zip: "02115"
            }
        ];
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
