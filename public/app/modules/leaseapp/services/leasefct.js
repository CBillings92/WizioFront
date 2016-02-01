angular.module('LeaseApp')
.factory('LeaseFct', [
    'LeaseModel',
    'TokenSvc',
    'FlexGetSetSvc',
    function(LeaseModel, TokenSvc, FlexGetSetSvc){
        var selectLeaseOptions = {
            utilities: [{
                'variable': 'electricIncluded',
                'label': 'Electricity Included',
                'trueValue': 1,
                'falseValue': 0
            }, {
                'variable': 'gasIncluded',
                'label': 'Gas Included',
                'trueValue': 1,
                'falseValue': 0
            }, {
                'variable': 'heatIncluded',
                'label': 'Heat Included',
                'trueValue': 1,
                'falseValue': 0
            }, {
                'variable': 'hotWaterIncluded',
                'label': 'Hot Water Included',
                'trueValue': 1,
                'falseValue': 0
            }, {
                'variable': 'waterIncluded',
                'label': 'Water Included',
                'trueValue': 1,
                'falseValue': 0
            }, {
                'variable': 'cableIncluded',
                'label': 'Cable Included',
                'trueValue': 1,
                'falseValue': 0
            }, {
                'variable': 'internetIncluded',
                'label': 'Internet Included',
                'trueValue': 1,
                'falseValue': 0
            }],
            additionalAmmenities: [{
                'variable': 'smoking',
                'label': 'Smoking OK',
                'trueValue': 1,
                'falseValue': 0
            }, {
                'variable': 'snowRemoval',
                'label': 'Snow Removal Included',
                'trueValue': 1,
                'falseValue': 0
            }, {
                'variable': 'trashRemoval',
                'label': 'Trash Removal Included',
                'trueValue': 1,
                'falseValue': 0
            }],
            pets: ['Cats and Dogs OK', 'Cats OK', 'Dogs OK', 'Pets OK', 'Contact Landlord', 'No Pets'],
            neededUpfront: [{
                'variable': 'secDepositNeeded',
                'label': 'Security Deposit'
            }, {
                'variable': 'newKeyFeeNeeded',
                'label': 'New Key Fee'
            }, {
                'variable': 'firstMonthsRentNeeded',
                'label': 'First Months Rent'
            }, {
                'variable': 'lastMonthsRentNeeded',
                'label': 'Last Months Rent'
            }, {
                'variable': 'brokerFeeNeeded',
                'label': 'Broker Fee'
            }]
        };

        var createLease = function(leaseObject, callback){
            //build a new Lease object based on data from form
            var lease = LeaseModel.build(leaseObject);
            //set association fields such as UserId, ApartmentId, LandlordId
            lease.setAssociationData();
            console.dir(lease);
            //make a post request to /lease to save the new lease
            lease.create(function(response){
                callback(response);
            });
        };
        var editLease = function(leaseObject, callback){
            //build a new Lease object based on data from form
            var lease = LeaseModel.build(leaseObject);
            //make a post request to lease/:id to update the lease
            lease.update(function(response){
                callback(response);
            });
        };

        return {
            selectLeaseOptions : selectLeaseOptions,
            createLease : createLease,
            editLease : editLease
        };
    }
]);
