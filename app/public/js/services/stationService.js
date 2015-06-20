(function (){
    function stationService($http){
        this.getAll = function(){
            return $http.get('/station');
        }

        this.delete = function (displayStationId) {
            return $http.delete('/station/' + displayStationId)
        }

        this.add = function(){
            //TODO!!!!
        }
    }
    angular.module('app').service('stationService',['$http', stationService])
})();
