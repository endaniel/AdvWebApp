(function(){
    var app = angular.module('app', ['ngRoute', 'ui.grid', 'd3', 'ui.grid.selection', 'ngAnimate', 'ngTouch','ngMaterial','restangular','angularFileUpload','angular-carousel','ui.select','screenApp']);
    app.config(function($routeProvider,$locationProvider){
        $locationProvider.html5Mode(true).hashPrefix('!');
        $routeProvider
            .when('/',{
                templateUrl:'views/home.html'
            })
            .when('/messagesForDisplays', {
                templateUrl: 'views/messagesForDisplaysGrid.html',
                controller: 'messagesForDisplaysGridCtrl',
                resolve:{
                    messageDisplayRelations: function(messageService){
                        return messageService.getAllMessageDisplayRelations();
                    }
                }
            })
            .when('/message/:id',{
                templateUrl: 'views/message.html',
                controller: 'messageForEditCtrl',
                controllerAs:'messageEditor'
            })
            .when('/newMessageDisplayRelation',{
                templateUrl: 'views/newMessageDisplayRelation.html',
                controller: 'newMessageDisplayRelationCtrl',
                resolve:{
                    messages: function(messageService){
                        return messageService.getAll();
                    },
                    stations: function(stationService){
                        return stationService.getAll();
                    }
                }
            })
            .when('/displayStations',{
                templateUrl: 'views/displayStationsManagement.html',
                controller: 'displayStationsManagementCtrl'
            })
            .when('/showMessageByDateTime',{
                templateUrl: 'views/showMessageByDateTime.html',
                controller: 'showMessageByDateTimeCtrl',
                controllerAs:'messageByDateTime'
            })
            .when('/displayStation',{
                templateUrl: 'views/displayStation.html'
            })
            .when('/displayStationsLocation',{
                templateUrl: 'views/displayStationsLocation.html',
                controller: 'displayStationsLocationCtrl'
            })
            .when('/graphs',{
                templateUrl: 'views/graphs.html',
                controller: 'graphsCtrl'
            })
            .when('/templates', {
                templateUrl: 'views/templatesManagement.html',
                controller: 'templatesManagementCtrl'
            }).
            when('/about',{
                templateUrl: 'views/about.html'
            })
            .otherwise({
                templateUrl:'views/home.html'
            });
    })
})();
