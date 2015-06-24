(function (){
    function stationService($http,Restangular){
        this.getAll = function(){
            return $http.get('/station');
        };

        this.delete = function (displayStationId) {
            return $http.delete('/station/' + displayStationId.id)
        }

        this.add = function(){
            //TODO!!!!
        };

        this.getMessagesByStationId = function (stationId) {
            return Restangular.all('messages').one('displayStation',stationId).get();
        this.create = function(displayStationAddress){
            return $http.put('/station/' + displayStationAddress);
        }
    }
    angular.module('app').service('stationService',['$http','Restangular', stationService])
})();
