(function(){
    "use strict";
    function messageService($http,Restangular){
        this.getAll = function(){
            return $http.get('message');
        };

        this.getAllMessageDisplayRelations = function () {
            return $http.get('messageDisplayRelation');
        }

        this.removeMessageDisplayRelation = function(messageDisplayRelation){
            return $http.put('messageDisplayRelation/' + messageDisplayRelation.messageId + '/' + messageDisplayRelation.displayStationId + '/"$pull"')
        };

        this.addMessageDisplayRelation = function(messageDisplayRelation){
            return $http.put('messageDisplayRelation/' + messageDisplayRelation.messageId + '/' + messageDisplayRelation.displayStationId + '/"$push"')
        }

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