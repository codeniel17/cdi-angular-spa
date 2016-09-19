;(function () {
    'use strict';

   angular
       .module('app')
       .factory('QueryService', QueryService);

    QueryService.$inject = ['$http', '$q'];
    function QueryService ($http, $q) {

        var service = {
            query: query
        };

        return service;

        function query(method, data, token, params, hasFile, ids, nameSpace) {
            var request = { 
                method  : method,
                data    : global.clean_data(data),
                url     : global.host(ids),
                headers : global.header(token),
                params  : global.query(params),
                transformRequest : global.transform(hasFile)
            };
            if (hasFile) {
                request.headers['Content-Type'] = undefined;
            }
            if (nameSpace) {
                request.headers['Client-Application'] = nameSpace;
            }
            var new_req = global.clean_object(request); 
            
            return $http(new_req);
        }
    }


})();