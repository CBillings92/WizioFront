angular.module('SearchApp')
    .controller('SearchCtrl', [
        '$scope',
        '$state',
        '$sessionStorage',
        'SmartSearchSvc',
        'SearchFct',
        'LoadingSpinnerFct',
        'TokenSvc',
        function($scope, $state, $sessionStorage, SmartSearchSvc, SearchFct, LoadingSpinnerFct, TokenSvc) {
            // ADD TYPE AHEAD CODE
            //smart search/typeahead functionality
            $scope.getLocation = function(val) {
                return SmartSearchSvc.smartSearch(val);
            };

            // ADD SUBMIT SEARCH ADDRESS function
            $scope.submitSearch = function() {
                $scope.$emit('searchInitiated', {});
                //massage data into proper form for building a new apartment instance
                var data = {
                    concatAddr: $scope.searchString
                };
                if($state.current.name === 'Account.Dashboard'){
                    LoadingSpinnerFct.show('account-dashboard-search-loader');
                    data.SubscriptionId = TokenSvc.decode().Subscriptions[0].id
                }
                SearchFct.search(data, $scope.filters, function(response) {
                    $sessionStorage.apartmentSearch = response;
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
