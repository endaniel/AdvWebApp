(function(){
    "use strict"
    function messageService($http){
        this.getAll = function(){
            return $http.get('/messages');
        }

        this.removeMessageDisplayRelation = function(messageDisplayRelation){
            return $http.delete('messageDisplayRelation/' + messageDisplayRelation.messageId + '/' + messageDisplayRelation.displayStationId)
        }
    }

    angular.module('app').service('messageService', ['$http', messageService]);
})();