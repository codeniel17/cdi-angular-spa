;(function (){
    'use strict';

    angular
        .module('app')
        .controller('DashboardCtrl', DashboardCtrl);

    DashboardCtrl.$inject = ['$scope', '$state','ModalService', 'QueryService','logger'];

    function DashboardCtrl ($scope, $state, ModalService, QueryService,logger) {
        var vm = this;
        
        vm.titleHeader = 'Dashboard';
        vm.message_modal = message_modal;
        vm.data = {};

        
        function message_modal () {
        	var content =  {
        		header:'Message',
        		message:'Hello World!'
        	}
        	ModalService.confirm_modal(content);
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