(function(){
    "use strict";
    function messageForEditCtrl(messageService, $route, $routeParams, FileUploader, templateService){
        var self = this;
        var messageId = $routeParams.id;
        self.uploader = new FileUploader();
        self.uploader.queueLimit = 5;
        self.uploader.url = 'data/file';
        self.uploader.autoUpload = true;
        self.allTemplates = []

        self.uploader.onSuccessItem = function(fileItem, response, status, headers) {
            self.message.pictures.push('img/' +fileItem._file.name);
        };
        self.days = [1,2,3,4,5,6,7];

        if(messageId == 0 || messageId == undefined){
            self.message = { id: 0, timeFrames:[],displayStationIds:[]};
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
                        alert("ההודעה נשמרה");
                    });
                } else{
                    messageService.update(self.message).then(function (message) {
                        alert("ההודעה עודכנה");
                    });
                }

            }
        };

        templateService.getAll().then(function (templates) {
            self.allTemplates = templates.data;
        });

        self.addFrame = function () {
            self.message.timeFrames.push( {dateFrom: '',dateTo: '', dayOfTheWeek: [], timeOfDayFrom: '', timeOfDayTo: '' });
        };

        self.removeFrame = function (i) {
            self.message.timeFrames.splice(i,1)
        };
    }
    angular.module('app').controller('messageForEditCtrl', ['messageService', '$route','$routeParams','FileUploader', 'templateService',messageForEditCtrl])
})();