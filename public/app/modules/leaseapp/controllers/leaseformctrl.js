angular.module('LeaseApp')
    .controller('LeaseFormCtrl', [
        '$scope',
        'LeaseModel',
        function($scope, LeaseModel) {
            $scope.selectOptions = {
                utilities: [{
                    'variable': 'electricIncluded',
                    'label': 'Electricity Included'
                }, {
                    'variable': 'gasIncluded',
                    'label': 'Gas Included'
                }, {
                    'variable': 'heatIncluded',
                    'label': 'Heat Included'
                }, {
                    'variable': 'hotWaterIncluded',
                    'label': 'Hot Water Included'
                }, {
                    'variable': 'waterIncluded',
                    'label': 'Water Included'
                }, {
                    'variable': 'cableIncluded',
                    'label': 'Cable Included'
                }, {
                    'variable': 'internetIncluded',
                    'label': 'Internet Included'
                }],
                additionalAmmenities: [{
                    'variable': 'smoking',
                    'label': 'Smoking OK'
                }, {
                    'variable': 'snowRemoval',
                    'label': 'Snow Removal Included'
                }, {
                    'variable': 'trashRemoval',
                    'label': 'Trash Removal Included'
                }],
                pets: ['Cats and Dogs OK', 'Cats OK', 'Dogs OK', 'Pets OK', 'Contact Landlord', 'No Pets'],
                neededUpfront: [{
                    'variable': 'secDepositNeeded',
                    'label': 'Security Deposit'
                }, {
                    'variable': 'keyFee',
                    'label': 'New Key Fee'
                }, {
                    'variable': 'firstMonthsRentNeeded',
                    'label': 'First Months Rent'
                }, {
                    'variable': 'lastMonthsRentNeeded',
                    'label': 'Last Months Rent'
                }, {
                    'variable': 'brokerFee',
                    'label': 'Broker Fee'
                }]
            };

            $scope.lease = {};

            $scope.createLease = function(){
                LeaseModel.api.base.save($scope.lease, function(response){

                });
            };
        }
    ]);
