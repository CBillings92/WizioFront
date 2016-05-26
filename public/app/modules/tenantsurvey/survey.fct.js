angular.module('TenantSurveyApp')
    .factory('TenantSurveyFct', [
        function () {
            var selectOptions = {
                occupationStatus:['Employed Full Time', 'Employed Part Time', 'Not Employed'],
                studentStatus: ['Not a student','Fulltime Undergraduate', 'Part Time Undergraduate', 'Fulltime Graduate', 'Parttime Graduate'],
                pets:['No', 'Yes', 'No, but I plan on getting a pet(s)'],
                bedrooms: ['studio', '1 Bed', '2 Bed', '3 Bed', '4 Bed', '5 Bed', 'Other'],
                bestContactMethod: ['Email', 'Phone', 'Text', 'Other']
            };
            return {
                selectOptions: selectOptions
            };
        }
    ]);
