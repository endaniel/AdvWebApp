(function (){
    function templateService($http){
        this.getAll = function(){
            return $http.get('/template');
        };

        this.delete = function (templateName) {
            return $http.delete('/station/' + templateName)
        }

        this.create = function(displayStationAddress){
            return $http.put('/station/' + displayStationAddress);
        };
    }
    angular.module('app').service('templateService',['$http', templateService])
})();
