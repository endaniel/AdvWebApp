(function(){
    "use strict";
    function messageForEditCtrl(messageService,$route,$routeParams){
        var self = this;
        var messageId = $routeParams.id;
        if(messageId == 0 || messageId == undefined){
            self.message = {};
        } else{
            messageService.get(messageId).then(function (message) {
                self.message = message;
            });
        }
    }
    angular.module('app').controller('messageForEditCtrl', ['messageService', '$route','$routeParams',messageForEditCtrl])
})();