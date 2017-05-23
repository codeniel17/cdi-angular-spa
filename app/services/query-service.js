;(function () {
    'use strict';

   angular
       .module('app')
       .factory('QueryService', QueryService);

    QueryService.$inject = ['$http', '$q','$rootScope', '$cacheFactory'];

    function QueryService ($http, $q, $rootScope, $cacheFactory) {

        var httpCache = $cacheFactory.get('$http');
        var service = {
            query : query,
            roadSnapQuery : roadSnapQuery
        };

        return service;

        function query (req) { 

            var deferred = $q.defer();
            var request = { 
                method  : req.method,
                data    : GLOBAL.clean_data(req.body),
                url     : typeof (req.route) === 'string' ? req.route : GLOBAL.set_url(req.route),
                headers : GLOBAL.header(req.token),
                params  : GLOBAL.parameters(req.params),
                withCredentials: true,
                cache   : req.cache,
                transformRequest : GLOBAL.transform(req.hasFile)
            };
            
            if (req.hasFile) 
                request.headers['Content-Type'] = undefined;

            var new_req = GLOBAL.clean_object(request); 
            $rootScope.progressbar.start(); 
            console.log('here');
            $http(new_req).then( function (response) { 
                    
                if (request.method == 'GET' && req.cache) {
                    var str_params = GLOBAL.stringifyParams(request.params);
                    var full_url = response.config.url + str_params;
                    GLOBAL.collectCacheKeys(req.cache_string, full_url);
                } else { 
                    GLOBAL.removeCache(req.cache_string, httpCache);
                }
                deferred.resolve(response);
                
            }, function (error) { 
                deferred.reject(error);
            }).finally( function () {
                $rootScope.progressbar.complete();
            });

            return deferred.promise;

        }

        function roadSnapQuery (coords) {

            var promises = [];

            for (var i = 0; i < coords.length; i++) {
                promises.push(
                    $http({
                        method : "GET",
                        url    : "https://roads.googleapis.com/v1/snapToRoads",
                        params : {
                            interpolate: true,
                            key: GLOBAL.roadApiKey,
                            path: coords[i].join('|')
                        }
                    })
                );
            }

            return $q.all(promises);

        }

    }

})();

            /*return $http(new_req)
            .finally(function () {
                $rootScope.progressbar.complete();
                if (request.method == 'GET') {

                } else {

                }
            });;*/