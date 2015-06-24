(function(){
    "use strict";
    function graphsCtrl($scope, stationService){

        stationService.getTemplatesGroup().success(function (stations) {
            $scope.myData = stations;
        });

        stationService.getScreensPerMessage().success(function (stations) {
            $scope.d3Data = stations;
            $scope.d3OnClick = function(item){
                alert(item.name);
            }});


    }
    angular.module('app').controller('graphsCtrl', ['$scope', 'stationService', graphsCtrl])
})();