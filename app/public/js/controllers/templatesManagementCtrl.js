(function () {
    "use strict";
    function templatesManagementCtrl($scope, templateService, FileUploader){
        $scope.gridData = [];
        $scope.uploader = new FileUploader();
        $scope.uploader.queueLimit = 5;
        $scope.uploader.url = 'template';
        $scope.uploader.autoUpload = true;

        $scope.uploader.onSuccessItem = function(fileItem, response, status, headers) {
            $scope.gridData.push({name: 'templates/' +fileItem._file.name});
        };


        templateService.getAll()
            .then(function(templatesNames){
                $scope.gridData =  templatesNames.data;
        })

        $scope.gridScope = {
            delete: function(template){
                templateService.delete(template.name.slice(10, template.name.length))
                    .success(function(deletedTemplateName){
                        $scope.gridData = _.reject($scope.gridData, function (template) {
                            return template.name === deletedTemplateName;
                        })
                    })
                    .error(function (err) {
                        alert(err);
                    })
            }
        };

        $scope.gridOptions = {
            enableScrollbars: false,
            data:'gridData',
            columnDefs:[
                {field: 'name', displayName: 'File name'},
                {name: 'options', displayName: 'Options',
                    cellTemplate: '<button id="deleteBtn" type="button" class="btn-small" ng-click="getExternalScopes().delete(row.entity)">Delete</button>'}
            ]
        };
    }

    angular.module('app').controller('templatesManagementCtrl', ['$scope', 'templateService', 'FileUploader', templatesManagementCtrl])
})();
