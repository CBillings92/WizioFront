angular.module('SearchApp')
    .controller('SearchCtrl', [
        '$scope',
        '$state',
        '$sessionStorage',
        'SmartSearchSvc',
        'SearchFct',
        'LoadingSpinnerFct',
        function($scope, $state, $sessionStorage, SmartSearchSvc, SearchFct, LoadingSpinnerFct) {
            // ADD TYPE AHEAD CODE
            //smart search/typeahead functionality
            $scope.getLocation = function(val) {
                return SmartSearchSvc.smartSearch(val);
            };

            // ADD SUBMIT SEARCH ADDRESS function
            $scope.submitSearch = function() {
                $scope.$emit('searchInitiated', {});
                if($state.current.name === 'Account.Dashboard'){
                    LoadingSpinnerFct.show('account-dashboard-searh-loader')
                }
                //massage data into proper form for building a new apartment instance
                var data = {
                    concatAddr: $scope.searchString
                };
                SearchFct.search(data, $scope.filters, function(response) {
                    //        console.log("search done lets go");
                    $sessionStorage.apartmentSearh = response;
                    $scope.$emit('searchReturned', response);
                    if ($state.current.name === 'LandingPage') {
                        $state.go('Search', {
                            apartments: response
                        });
                    }
                    //              $state.go("Unit.Display");
                });

            };
        }
    ]);
