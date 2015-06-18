(function(){
    "use strict";
    function messageService($http,Restangular){
        this.getAll = function(){
            return $http.get('/messages');
        };

        this.removeMessageDisplayRelation = function(messageDisplayRelation){
            return $http.delete('message/' + messageDisplayRelation.messageId + '/displayStation/' + messageDisplayRelation.displayStationId, {data : messageDisplayRelation})
        };

        this.get = function (id) {
            return Restangular.one('api/message',id).get();
        };

        this.update = function (message) {
            return message.put();
        };

        this.save = function (message) {
            return Restangular.all('api/message').post(message);
        };
    }

    angular.module('app').service('messageService', ['$http','Restangular', messageService]);
})();