(function(){
    var app = angular.module('app', ['ngRoute', 'ui.grid', 'ui.grid.selection', 'ngAnimate', 'ngTouch']);
    app.config(function($routeProvider){
        $routeProvider
            .when('/',{
                templateUrl: 'views/messagesForDisplaysGrid.html',
                controller: 'messagesForDisplaysGridCtrl',
                resolve:{
                    allMessages: function(messageService){
                        return messageService.getAll();
                    }
                }
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
                controller: 'messagesForEdit',
                controllerAs:'messageEditor'
            })
    })
})();
