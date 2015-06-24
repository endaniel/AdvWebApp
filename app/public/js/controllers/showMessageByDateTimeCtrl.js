(function(){
    "use strict";
    function showMessageByDateTimeCtrl(stationService){
        var self = this;

        self.getMessage = function () {
            stationService.getMessagesByStationId(self.message.displayStationId).then(function (messages) {
                self.messages = filterMessages(messages)

            });
        };

        function shouldShowMessage(message){
            var currentDate = self.message.date;
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
        }

        function filterMessages(messages){
            var validMessage = _.where(messages, function (message) {
                return shouldShowMessage(message);
            });
            return validMessage;
        }
    }
    angular.module('app').controller('showMessageByDateTimeCtrl', ['stationService',showMessageByDateTimeCtrl])
})();