angular.module("AboutUsApp")
    .controller("AboutListCtrl", [
        "$scope",
        function($scope) {
            $scope.members = [{
                name: "Chris Canal",
                title: "CEO",
                picture: "chriscanal.png",
                twitter: "chriscanal4",
                linkedin: "chriscanal",
                email: "chris@wizio.co",
            }, {
                name: "Cameron Billings",
                title: "CTO",
                picture: "cameronbillings.png",
                twitter: "CamBillings_",
                linkedin: "cameronbillings",
                email: "cameron@wizio.co",
            }, {
                name: "Devon Grodkiewicz",
                title: "COO/CMO",
                picture: "devongrodkiewicz.jpg",
                twitter: "dsgrod",
                linkedin: "dsgrod",
                email: "devon@wizio.co",
            }, {
                name: "Trent Duffy",
                title: "CMS-Chief of Misc Stuff",
                picture: "trentduffy.png",
                twitter: "trentolol",
                linkedin: "trentduffy",
                email: "ct_trentduffy@me.com",
            }];


        }
    ]);
