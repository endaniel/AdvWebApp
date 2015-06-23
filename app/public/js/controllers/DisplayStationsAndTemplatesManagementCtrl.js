(function () {
    "use strict";
    function displayStationsAndTemplatesManagementCtrl($scope, stationService){
        stationService.getAll().success(function (stations) {
            $scope.gridData = stations;
        })

        $scope.gridScope = {
            delete: function(displayStationId){
                stationService.delete(displayStationId)
                    .success(function(deletedDisplayStationId){
                        $scope.gridData = _.reject($scope.gridData, function (displayStation) {
                            return displayStation.id === deletedDisplayStationId;
                        })
                    })
                    .error(function () {
                        console.log("error deleting display station")
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

        $scope.create = function () {
            stationService.create()
                .then(function (newDisplayStation) {
                    $scope.gridData.push(newDisplayStation.data);
                })
        }
    }

    angular.module('app').controller('displayStationsAndTemplatesManagementCtrl', ['$scope', 'stationService', displayStationsAndTemplatesManagementCtrl])
})();
