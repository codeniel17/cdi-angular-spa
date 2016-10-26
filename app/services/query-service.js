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

        function query(req, nameSpace) {
            var request = { 
                method  : req.method,
                data    : GLOBAL.clean_data(req.body),
                url     : GLOBAL.set_url(req.route),
                headers : GLOBAL.header(req.token),
                params  : GLOBAL.parameters(req.params),
                cache   : req.cache,
                transformRequest : GLOBAL.transform(req.hasFile)
            };
            if (req.hasFile) {
                request.headers['Content-Type'] = undefined;
            }
            if (req.nameSpace) {
                request.headers['Client-Application'] = nameSpace;
            }
            var new_req = GLOBAL.clean_object(request); 
            // console.log(new_req);
            return $http(new_req);
        }
    }


})();