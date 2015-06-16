(function(){
    "use strict";
    function messagesForDisplaysGridCtrl($scope, allMessages, messageService){
        $scope.gridData = getDataForDisplay(allMessages.data);
        $scope.gridScope = {
            deleteRelation: function(messageDisplayRelation){
                messageService.removeMessageDisplayRelation(messageDisplayRelation)
                    .success(function(){
                        //TODO - remove from grid
                    })
            }
        }
        $scope.gridOptions = {
            data:'gridData',
            columnDefs:[
                {field: 'messageId', displayName: 'Message Id'},
                {field: 'displayStationId', displayName: 'Stations Id'},
                {name: 'delete', displayName: '', cellTemplate: '<button id="deleteBtn" type="button" class="btn-small" ng-click="getExternalScopes().deleteRelation(row.entity)">Delete</button>'}
            ],
        }
    }

    var getDataForDisplay = function(messages){
        var data = []
        _.each(messages, function(message){
            _.each(message.displayStationIds, function(displayStationId){
                data.push({
                    messageDbId: message._id,
                    messageId: message.id,
                    displayStationId: displayStationId
                })
            })
        })

        return data;
    }
    angular.module('app').controller('messagesForDisplaysGridCtrl', ['$scope', 'allMessages', 'messageService', messagesForDisplaysGridCtrl])
})();