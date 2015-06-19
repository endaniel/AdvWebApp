(function(){
    "use strict";
    function messageForEditCtrl(messageService,$route,$routeParams){
        var self = this;
        var messageId = $routeParams.id;
        if(messageId == 0 || messageId == undefined){
            self.message = { id: 0};
        } else{
            messageService.get(messageId).then(function (message) {
                self.message = message;
            });
        }

        self.save = function (form) {
            if(form.$valid){
                if(self.message.id == 0){
                    messageService.save(self.message).then(function (message) {
                        self.message = message;
                    });
                } else{
                    messageService.update(self.message).then(function (message) {
                        self.message = message;
                    });
                }

            }
        }
    }
    angular.module('app').controller('messageForEditCtrl', ['messageService', '$route','$routeParams',messageForEditCtrl])
})();