(function(){
    var app = angular.module('app', ['ngRoute', 'ui.grid', 'ui.grid.selection', 'ngAnimate', 'ngTouch','ngMaterial','restangular','angularFileUpload','angular-carousel','ui.select']);
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
            .when('/displayStationsAndTemplates',{
                templateUrl: 'views/displayStationsAndTemplatesManagement.html',
                controller: 'displayStationsAndTemplatesManagementCtrl'
            })
            .when('/showMessageByDateTime',{
                templateUrl: 'views/showMessageByDateTime.html',
                controller: 'showMessageByDateTimeCtrl',
                controllerAs:'messageByDateTime'
            })
            .otherwise({
                templateUrl:'views/home.html'
            });
    })
})();
