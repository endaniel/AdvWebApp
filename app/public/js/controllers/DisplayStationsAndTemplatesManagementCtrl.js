(function () {
    "use strict";
    function displayStationsAndTemplatesManagementCtrl($scope, stationService){
        stationService.getAll().success(function (stations) {
            $scope.gridData = stations;
        })

        $scope.gridScope = {
            delete: function(messageDisplayRelation){
                stationService.delete(messageDisplayRelation)
                    .success(function(deletedDisplayStationId){
                        $scope.gridData = _.reject($scope.gridData, function (displayStationId) {
                            return displayStationId === deletedDisplayStationId;
                        })
                    })
                    .error(function () {
                        console.log("error")
                    })
            }
        };
        $scope.gridOptions = {
            enableScrollbars: false,
            data:'gridData',
            columnDefs:[
                {field: 'id', displayName: 'Stations Id'},
                {name: 'options', displayName: 'Options',
                    cellTemplate: '<button id="deleteBtn" type="button" class="btn-small" ng-click="getExternalScopes().delete(row.entity)">Delete</button>'}
            ]
        };
    }
    angular.module('app').controller('displayStationsAndTemplatesManagementCtrl', ['$scope', 'stationService', displayStationsAndTemplatesManagementCtrl])
})();
