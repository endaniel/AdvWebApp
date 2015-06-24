(function(){
    "use strict";
    function xyGraphsCtrl($scope, stationService){
        $scope.myData = [
            {name: 'AngularJS', count: 300},
            {name: 'D3.JS', count: 150},
            {name: 'jQuery', count: 400},
            {name: 'Backbone.js', count: 300},
            {name: 'Ember.js', count: 100}
        ];
        $scope.d3OnClick = function(item){
            alert(item.name);
        };
    }
    angular.module('app').controller('xyGraphsCtrl', ['$scope', 'stationService', xyGraphsCtrl])
})();