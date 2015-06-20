(function(){
    "use strict";
    function newMessageDisplayRelationCtrl($scope, messages, stations, messageService, $location){
        $scope.messages = messages.data;
        $scope.stations = stations.data;
        $scope.newRelation = {
            message: {},
            station: {}
        }

        $scope.create = function () {
            if($scope.newRelation.message.id && $scope.newRelation.station.id){
                var relation = {messageId : $scope.newRelation.message.id,
                                displayStationId : $scope.newRelation.station.id}
                messageService.addMessageDisplayRelation(relation)
                    .success(function(){
                        $location.path('/messagesForDisplays');
                    })
                    .error(function () {
                        alert('failed creating new relation!')
                    })
            }
            else{
                alert("Please choose Message and Station you want to connect")
            }
        }
    }

    angular.module('app').controller('newMessageDisplayRelationCtrl', ['$scope', 'messages', 'stations', 'messageService', '$location', newMessageDisplayRelationCtrl])
})();