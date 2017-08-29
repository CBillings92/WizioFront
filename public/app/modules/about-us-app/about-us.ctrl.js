/*
    Controller for the About Us page (www.wizio.co/about)
*/
angular.module('AboutUsApp')
    .controller('AboutUsCtrl', [
        '$scope',
        'ngDrift',
        function ($scope, ngDrift) {
          ngDrift.show();
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
                title: "Co-Founder and Head of Product",
                picture: "trentduffy.png",
                twitter: "trentolol",
                linkedin: "trentduffy",
                email: "trent@wizio.co",
            }, {
                name: "John Puma",
                title: "COO",
                picture: "johnjpuma.jpg",
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
            }, {
                name: "Yuyang He",
                title: "Video Production Co-op",
                picture: "yuyang.JPG",
                twitter: "",
                linkedin: "yuyang-he-ab6087a6",
                email: "yuyang@wizio.co",
            }];
        }
    ]);
