;(function (){
    'use strict';

    angular
        .module('app')
        .controller('DashboardCtrl', DashboardCtrl);

    DashboardCtrl.$inject = ['$scope', '$state', 'ModalService', 'QueryService', 'logger'];

    function DashboardCtrl ($scope, $state, ModalService, QueryService, logger) {
        var vm                  = this;
        
        // variables
        vm.titleHeader          = 'Dashboard'; 
        vm.data                 = {};

        // methods
        vm.handleConfirm        = handleConfirm;

        
        function handleConfirm () { 

            var request = {
                method  : 'DELETE',
                body    : false,
                params  : false,
                hasFile : false,
                route   : { users:'' },
                cache_string : ''
            }; 
            
            var content = { 
                header : "Confirmation Header", 
                message : "Are you sure you want to perform this action", 
                prop : '' // item name
            };

            confirmation(content)
                .then( function (response) { 

                    if (response) { 
                        QueryService
                            .query(request)
                            .then( function (response) { 

                                vm.items.splice(vm.items.indexOf(item), 1);
                                logger.success( vm.subTitleHeader + ' removed!');
                            
                            }, function (error) {
                                logger.error(error.data.message);
                            });
                    }

                });

        }

        function confirmation (content) {
            return ModalService.confirm_modal(content);
        }

        (function getPost () {
            
            var request = {
                method  : 'GET', // POST, GET, PUT, DELETE
                body    : false, // data to be sent
                params  : false, // sample { page:1, limit:10 }
                hasFile : false, // formData to be sent
                route   : { users:'' }, // will result /users
                cache   : true, // false if not needed
                cache_string : 'users' // replace with '' if not needed
            };

            QueryService
                .query(request)
                .then(function (response) {
                    console.log(response.data);
                    vm.data = response.data;
                    // logger.success('',response, MESSAGE.success);
                }, function (err) {
                    logger.error(MESSAGE.error, err, '');
                })

        })()
    }
})();