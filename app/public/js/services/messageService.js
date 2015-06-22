(function(){
    "use strict";
    function messageService($http,Restangular,$filter){
        this.getAll = function(){
            return $http.get('message');
        };

        this.getAllMessageDisplayRelations = function () {
            return $http.get('messageDisplayRelation');
        };

        this.removeMessageDisplayRelation = function(messageDisplayRelation){
            return $http.put('messageDisplayRelation/' + messageDisplayRelation.messageId + '/' + messageDisplayRelation.displayStationId + '/' + "pull" + '/' + "")
        };

        this.addMessageDisplayRelation = function(messageDisplayRelation){
            return $http.put('messageDisplayRelation/' + messageDisplayRelation.messageId + '/' + messageDisplayRelation.displayStationId + '/' + "push" + '/' + "")
        };

        this.get = function (id) {
            return Restangular.one('api/message',id).get().then(function (message) {
                for(var i = 0; i < message.timeFrames.length; i++){
                    changeToClientDates(message.timeFrames[i]);
                    return message;
                }
            });
        };

        this.update = function (message) {
            var messageCopy = Restangular.copy(message);
            for(var i = 0; i < messageCopy.timeFrames.length; i++){
                changeToServerDates(messageCopy.timeFrames[i]);
            }
            return messageCopy.put();
        };

        this.save = function (message) {
            var messageCopy = angular.copy(message);
            for(var i = 0; i < messageCopy.timeFrames.length; i++){
                changeToServerDates(messageCopy.timeFrames[i]);
            }
            return Restangular.all('api/message').post(messageCopy).then(function (savedMessage) {
                for(var i = 0; i < savedMessage.timeFrames.length; i++){
                    changeToClientDates(savedMessage.timeFrames[i]);
                    return savedMessage;
                }
            });
        };

        function changeToServerDates(timeFrame){
            timeFrame.dateFrom  = $filter('date')(timeFrame.dateFrom, 'yyyy-MM-dd');
            timeFrame.dateTo =  $filter('date')(timeFrame.dateTo, 'yyyy-MM-dd');
            timeFrame.timeOfDayFrom = $filter('date')(timeFrame.timeOfDayFrom, 'HH:mm:ss');
            timeFrame.timeOfDayTo = $filter('date')(timeFrame.timeOfDayTo, 'HH:mm:ss');
        }

        function changeToClientDates(timeFrame){
            var currentDate = new Date();
            timeFrame.dateFrom = new Date(timeFrame.dateFrom);
            timeFrame.dateTo = new Date(timeFrame.dateTo);
            timeFrame.timeOfDayFrom = new Date(currentDate.getMonth() + 1 + " " + currentDate.getDate() + ", " + currentDate.getFullYear() + " ," + timeFrame.timeOfDayFrom );
            timeFrame.timeOfDayTo = new Date(currentDate.getMonth() + 1 + " " + currentDate.getDate() + ", " + currentDate.getFullYear() + " ," + timeFrame.timeOfDayTo );
        }
    }

    angular.module('app').service('messageService', ['$http','Restangular','$filter', messageService]);
})();