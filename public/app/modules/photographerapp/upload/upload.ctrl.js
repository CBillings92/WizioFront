angular.module('UploadPageApp')
    .controller('UploadPageCtrl', [
        '$scope',
        function($scope) {

            var units;

            $scope.units = [
{
id: 1,
concatAddr: "2 Huntington",
unitNum: 10,
pubid: 1234,
Floor_Plan: "http://placekitten.com/g/600/400"
},
{id: 2,
concatAddr: "130 Maple Ave",
unitNum: 2,
pubid: 12345,
Floor_Plan: "http://placekitten.com/g/400/600"
}
];


            $("#floorplan").click(function(e){
                var x = e.pageX - this.offsetLeft;
                var y = e.pageY - this.offsetTop;
                console.log("x =" + x);
                console.log("y =" + y);

            });






        }
    ]);
