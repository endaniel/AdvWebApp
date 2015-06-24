(function(){
    "use strict";
    function messagesForDisplaysGridCtrl($scope, messageDisplayRelations, messageService, $filter, $location){
        var self = this;
        $scope.searchedDisplayStation = "";
        $scope.searchedMessage = "";

        $scope.gridData = messageDisplayRelations.data;
        $scope.gridScope = {
            deleteRelation: function(messageDisplayRelation){
                messageService.removeMessageDisplayRelation(messageDisplayRelation)
                    .success(function(deletedRelation){
                        messageDisplayRelations.data = _.reject(messageDisplayRelations.data, function (relation) {
                            return relation.messageId === deletedRelation.messageId &&
                                    relation.displayStationId == deletedRelation.displayStationId;
                        })

                        $scope.gridData = messageDisplayRelations.data;
                    })
                    .error(function () {
                        console.log("error")
                    })
            },
            editMessage: function (messageId) {
                $location.path('message/' + messageId);
            }
        };
        $scope.gridOptions = {
            enableFiltering: true,
            enableScrollbars: false,
            data:'gridData',
            columnDefs:[
                {field: 'messageId', displayName: 'Message Id'},
                {field: 'displayStationId', displayName: 'Stations Id'},
                {name: 'options', displayName: 'Options',
                    cellTemplate: '<button id="deleteBtn" type="button" class="btn-small" ng-click="getExternalScopes().deleteRelation(row.entity)">Delete</button>' +
                    '<button id="editBtn" type="button" class="btn-small" ng-click="getExternalScopes().editMessage(row.entity.messageId)">Edit</button>'}
            ]
        };

        $scope.filter = function(){
            $scope.gridData = messageDisplayRelations.data;
            self.filterByDisplayStation();
            self.filterByMessage();
        };
        
        $scope.directToMessageCreation = function () {
            $location.path('message/0');
        }

        $scope.directToNewRelation = function () {
            $location.path("newMessageDisplayRelation");
        }

        self.filterByDisplayStation = function() {
            $scope.gridData = $filter('filter')($scope.gridData, {'displayStationId': $scope.searchedDisplayStation}, undefined);
        };

        self.filterByMessage = function() {
            $scope.gridData = $filter('filter')($scope.gridData, {'messageId': $scope.searchedMessage}, undefined);
        };
    }
    angular.module('app').controller('messagesForDisplaysGridCtrl', ['$scope', 'messageDisplayRelations', 'messageService', '$filter', '$location', messagesForDisplaysGridCtrl])
})();