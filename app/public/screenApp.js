(function(){
    var screenApp = angular.module('screenApp',[]);
    screenApp.directive('showMessages', ['Restangular','$timeout', function(Restangular,$timeout) {
            return {
                restrict: 'E',
                scope: {stationId: '@'},
                template: '<ng-include src="message.template"></ng-include>',
                link: function(scope) {
                    var socket = io();

                    Restangular.all('messages').one('displayStation', scope.stationId).get().then(function (messages) {
                        scope.messages = messages;
                        placeMessage();
                    });

                    socket.on('messageChanged', function(data){
                        var updatedMessage = _.find(scope.messages, function (message) {
                            return message.id == data.id
                        });
                        if(updatedMessage){
                            scope.messages = _.reject(scope.messages, function (message) {
                                return message.id == updatedMessage.id
                            });
                        }
                        scope.messages.push(data);

                        placeMessage();
                    });

                    var placeMessage = function(){
                        var validMessage = _.find(scope.messages, function (message) {
                            return shouldShowMessage(message);
                        });
                        if(validMessage){
                            scope.messages = _.reject(scope.messages, function (message) {
                                return message.id == validMessage.id
                            });
                            scope.messages.push(validMessage);
                            setMessageInTemplate(validMessage);

                            $timeout(placeMessage, validMessage.time * 1000);
                        } else {
                            setMessageInTemplate(undefined);
                            $timeout(placeMessage, 1000);
                        }
                    };

                    var shouldShowMessage = function(message){
                        var currentDate = new Date();
                        return _.some(message.timeFrames, function (timeFrame) {
                            var startDate = new Date(timeFrame.dateFrom);
                            var endDate = new Date(timeFrame.dateTo);
                            if(currentDate <= endDate && currentDate >= startDate){
                                var startTime = new Date(currentDate.getMonth() + 1 + " " + currentDate.getDate() + ", " + currentDate.getFullYear() + " ," + timeFrame.timeOfDayFrom );
                                var endTime = new Date(currentDate.getMonth() + 1 + " " + currentDate.getDate() + ", "  + currentDate.getFullYear() + " ," + timeFrame.timeOfDayTo);
                                if(currentDate <= endTime && currentDate >= startTime){
                                    return _.contains(timeFrame.dayOfTheWeek, currentDate.getDay() + 1);
                                }
                            }
                        })
                    };

                    var setMessageInTemplate = function(message){
                        scope.message = message;
                    };
            }
        }}]
        )
})();
