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
                picture: "cameronbillings.png",
                twitter: "CamBillings_",
                linkedin: "cameronbillings",
                email: "cameron@wizio.co",
            }, {
                name: "Devon Grodkiewicz",
                title: "CEO",
                picture: "devongrodkiewicz.jpg",
                twitter: "dsgrod",
                linkedin: "dsgrod",
                email: "devon@wizio.co",
            }, {
                name: "Trent Duffy",
                title: "Co-Founder and Web Developer",
                picture: "trentduffy.png",
                twitter: "trentolol",
                linkedin: "trentduffy",
                email: "trent@wizio.co",
            }, {
                name: "John Puma",
                title: "Business Development",
                picture: "johnjpuma.jpg",
                twitter: "JohnJPuma",
                linkedin: "johnjpuma",
                email: "john@wizio.co",
            }];
        }
    ])
