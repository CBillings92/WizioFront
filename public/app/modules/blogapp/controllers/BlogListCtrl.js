angular.module("BlogApp")
    .controller("BlogListCtrl", [
        "$scope",
        function($scope) {
            $scope.articles = [
                {
                    title: "Local Landlord Shocked to Find Lack of Interest in Apartment",
                    intro: "Sam explained to the Wizio staff-writers that he remains hopeful that his new, candid apartment listing will help him to find a good tenant match.",
                    author: "The Radish",
                    authorPicture: "radish.png",
                    images: [
                        "post1_img1.jpg",
                        "post1_img2.jpg",
                    ]
                },
                {
                    title: "Local Landlord Shocked to Find Lack of Interest in Apartment",
                    intro: "Sam explained to the Wizio staff-writers that he remains hopeful that his new, candid apartment listing will help him to find a good tenant match.",
                    author: "The Radish",
                    authorPicture: "radish.png",
                    images: [
                        "post1_img1.jpg",
                        "post1_img2.jpg",
                    ]
                }
            ];
        }
    ]);
