/*
    Controller for the About Us page (www.wizio.co/about)
*/
angular.module('AboutUsApp')
    .controller('AboutUsCtrl', [
        '$scope',
        function ($scope) {
            $scope.members =
            [{
                name: "Cameron Billings",
                title: "CTO",
                picture: "Cameron.jpg",
                twitter: "CamBillings_",
                linkedin: "cameronbillings",
                email: "cameron@wizio.co",
            }, {
                name: "Devon Grodkiewicz",
                title: "CEO",
                picture: "Devon.jpg",
                twitter: "dsgrod",
                linkedin: "dsgrod",
                email: "devon@wizio.co",
            }, {
                name: "John Puma",
                title: "COO",
                picture: "John.jpg",
                twitter: "JohnJPuma",
                linkedin: "johnjpuma",
                email: "john@wizio.co",
            }, {
                name: "Emily O'Brien",
                title: "Director of Product Design",
                picture: "emily.jpg",
                twitter: "",
                linkedin: "emilymobrien4",
                email: "emily@wizio.co",
            }];
        }
    ]);
