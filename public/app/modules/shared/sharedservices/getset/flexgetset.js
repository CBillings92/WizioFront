angular.module('SharedServiceApp')
.service('FlexGetSetSvc', [
    '$sessionStorage',
    function($sessionStorage){
        var dataStore = [];
        var persistentDataStore = [];
        var set = function(data){
            dataStore = [];
            dataStore.push(data);
            return;
        };
        var get = function(){
            return dataStore[0];
        };
        var reset = function(){
            dataStore = [];
        };

    }
]);
