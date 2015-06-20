(function(){
    "use strict";
    function messagesForDisplaysGridCtrl($scope, messageDisplayRelations, messageService){
        var optionsColumnCellTemplate = '<div>' +
                '<button id="addBtn" type="button" class="btn-small"><a href="newMessageDisplayRelation">Create</a></button>' +
                '<button id="deleteBtn" type="button" class="btn-small" ng-click="getExternalScopes().deleteRelation(row.entity)">Delete</button>' +
            '</div>'
        $scope.gridData = messageDisplayRelations.data;
        $scope.gridScope = {
            deleteRelation: function(messageDisplayRelation){
                messageService.removeMessageDisplayRelation(messageDisplayRelation)
                    .success(function(deletedRelation){
                        //TODO - remove from grid
                        var a = 'b';
                    })
                    .error(function () {
                        console.log("error")
                    })
            }
        }
        $scope.gridOptions = {
            data:'gridData',
            columnDefs:[
                {field: 'messageId', displayName: 'Message Id'},
                {field: 'displayStationId', displayName: 'Stations Id'},
                {name: 'delete', displayName: 'Options', cellTemplate: optionsColumnCellTemplate}
            ]
        }
    }
    angular.module('app').controller('messagesForDisplaysGridCtrl', ['$scope', 'messageDisplayRelations', 'messageService', messagesForDisplaysGridCtrl])
})();