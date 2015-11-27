angular.module("AboutUsApp")
    .controller("AboutListCtrl", [
        "$scope",
        function($scope) {
            $scope.members = [{
                name: "Chris Canal",
                title: "CEO",
                picture: "chris.jpg",
                twitter: "chriscanal4",
                linkedin: "chriscanal",
                email: "",
            }, {
                name: "Cameron Billings",
                title: "CTO",
                picture: "chris.jpg",
                twitter: "CamBillings_",
                linkedin: "cameronbillings",
                email: "",
            }, {
                name: "Devon Billings",
                title: "COO/CMO",
                picture: "chris.jpg",
                twitter: "dsgrod",
                linkedin: "dsgrod",
                email: "",
            }, {
                name: "Trent Duffy",
                title: "CMS-Cheif of Misc Stuff",
                picture: "chris.jpg",
                twitter: "trentolol",
                linkedin: "trentduffy",
                email: "",
            }];

            
        }
    ]);
