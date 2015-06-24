(function (){
    function templateService($http){
        this.getAll = function(){
            return $http.get('/template');
        };

        this.delete = function (templateName) {
            return $http.delete('/template/' + templateName)
        };
    }
    angular.module('app').service('templateService',['$http', templateService])
})();
