(function(){
    "use strict";
    function messagesForDisplaysGridCtrl($scope, messageDisplayRelations, messageService, uiGridConstants, $filter){
        var self = this;
        $scope.searchedDisplayStation = "";
        $scope.searchedMessage = "";
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
        };
        $scope.gridOptions = {
            enableFiltering: true,
            onRegisterApi: function(gridApi){
                $scope.gridApi = gridApi;
            },
            data:'gridData',
            columnDefs:[
                {field: 'messageId', displayName: 'Message Id', enableFiltering: true,
                    filter: {
                        noTerm: true,
                        condition: function(searchTerm, cellValue) {
                            return (cellValue+"" === $scope.searchedMessage+"");
                        }}},
                {field: 'displayStationId', displayName: 'Stations Id'},
                {name: 'delete', displayName: 'Options', cellTemplate: optionsColumnCellTemplate, enableFiltering: false}
            ]
        };

        $scope.filter = function(){
            $scope.gridData = messageDisplayRelations.data;
            self.filterByDisplayStation();
            self.filterByMessage();
        };

        self.filterByDisplayStation = function() {
            $scope.gridData = $filter('filter')($scope.gridData, {'displayStationId': $scope.searchedDisplayStation}, undefined);
        };

        self.filterByMessage = function() {
            $scope.gridData = $filter('filter')($scope.gridData, {'messageId': $scope.searchedMessage}, undefined);
        };
    }
    angular.module('app').controller('messagesForDisplaysGridCtrl', ['$scope', 'messageDisplayRelations', 'messageService', 'uiGridConstants', '$filter', messagesForDisplaysGridCtrl])
})();