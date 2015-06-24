(function () {
    "use strict";
    function displayStationsManagementCtrl($scope, stationService){
        $scope.displayStationAddress = "";
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
                {field: 'address', displayName: 'Address'},
                {field: 'id', displayName: 'Stations Id'},
                {name: 'options', displayName: 'Options',
                    cellTemplate: '<button id="deleteBtn" type="button" class="btn-small" ng-click="getExternalScopes().delete(row.entity)">Delete</button>'}
            ]
        };

        $scope.create = function () {
            if(!$scope.displayStationAddress){
                alert("please define display station address")
            }
            else{
                stationService.create($scope.displayStationAddress)
                    .then(function (newDisplayStation) {
                        $scope.gridData.push(newDisplayStation.data);
                        $scope.displayStationAddress = "";
                    })
            }
        }
    }

    angular.module('app').controller('displayStationsManagementCtrl', ['$scope', 'stationService', displayStationsManagementCtrl])
})();
