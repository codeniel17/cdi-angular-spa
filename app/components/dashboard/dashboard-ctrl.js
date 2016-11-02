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
        vm.handleButtonClick    = handleButtonClick;

        
        function handleButtonClick () { 

        	ModalService.confirm_modal({
                header:'Test Confirmation Header',
                message:'Are you sure you want to perform this action?'
            })
            .then( function (response) {
                if (response) {
                    logger.success(response);
                    // getPost()
                } else {
                    logger.info(response);
                }
            });

        }

        (function getPost () {
            var req = {
                method  : 'GET', // POST, GET, PUT, DELETE
                body    : false, // data to be sent
                token   : false, // if required
                params  : false, // or { users:1 } will result &users=1
                hasFile : false, // true if the body has file
                cache   : true, // false if not needed
                route   : { users:'' } // will result /users
            };

           /* https://jsonplaceholder.typicode.com/users*/
            QueryService
                .query(req)
                .then(function (response) {
                    vm.data = response.data;
                    // logger.success('',response, MESSAGE.success);
                }, function (err) {
                    logger.error(MESSAGE.error, err, '');
                })

        })()
    }
})();