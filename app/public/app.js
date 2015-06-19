(function(){
    var app = angular.module('app', ['ngRoute', 'ui.grid', 'ui.grid.selection', 'ngAnimate', 'ngTouch','ngMaterial','restangular']);
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
                    allMessages: function(messageService){
                        return messageService.getAll();
                    }
                }
            })
            .when('/message/:id',{
                templateUrl: 'views/message.html',
                controller: 'messageForEditCtrl',
                controllerAs:'messageEditor'
            })
            .otherwise({
                templateUrl:'views/home.html'
            });
    })
})();
