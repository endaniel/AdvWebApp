(function (){
    function stationService($http){
        this.getAll = function(){
            return $http.get('/station');
        }

        this.delete = function (displayStationId) {
            return $http.delete('/station/' + displayStationId.id)
        }

        this.create = function(displayStationAddress){
            return $http.put('/station/' + displayStationAddress);
        }
    }
    angular.module('app').service('stationService',['$http', stationService])
})();
