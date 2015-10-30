angular.module("AboutUsApp")
    .controller("AboutListCtrl", [
        "$scope",
        function($scope) {
            $scope.members = [
                {
                    name: "Chris Canal",
                    title: "CEO",
                    picture: "radish.png",
                    twitter: "chriscanal4",
                    linkedin: "chriscanal",
                },
                {
                    name: "Cameron Billings",
                    title: "CTO",
                    picture: "radish.png",
                    twitter: "CamBillings_",
                    linkedin: "cameronbillings",
                },
                {
                    name: "Devon Billings",
                    title: "COO/CMO",
                    picture: "radish.png",
                    twitter: "dsgrod",
                    linkedin: "dsgrod",
                },
                {
                    name: "Trent Duffy",
                    title: "CMS-Cheif of Misc Stuff",
                    picture: "radish.png",
                    twitter: "trentolol",
                    linkedin: "trentduffy",
                }
            ];
        }
    ]);
