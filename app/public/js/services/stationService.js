(function (){
    function stationService($http){
        this.getAll = function(){
            return $http.get('/station');
        }

        this.delete = function (displayStationId) {
            return $http.delete('/station/' + displayStationId.id)
        }

        this.create = function(){
            return $http.put('/station');
        }
    }
    angular.module('app').service('stationService',['$http', stationService])
})();
