(function(){
    "use strict"
    function messageService($http){
        this.getAll = function(){
            return $http.get('/messages');
        }

        this.removeMessageDisplayRelation = function(messageDisplayRelation){
            return $http.delete('message/' + messageDisplayRelation.messageId + '/displayStation/' + messageDisplayRelation.displayStationId, {data : messageDisplayRelation})
        }
    }

    angular.module('app').service('messageService', ['$http', messageService]);
})();