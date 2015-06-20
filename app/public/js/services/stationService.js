(function (){
    function stationService($http){
        this.getAll = function(){
            return $http.get('/station');
        }
    }
    angular.module('app').service('stationService',['$http', stationService])
})();
