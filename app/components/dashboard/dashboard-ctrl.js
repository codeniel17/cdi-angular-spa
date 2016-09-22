;(function (){
    'use strict';

    angular
        .module('app')
        .controller('DashboardCtrl', DashboardCtrl);

    DashboardCtrl.$inject = ['$scope', '$state','ModalService'];

    function DashboardCtrl ($scope, $state, ModalService) {
        var vm = this;
        
        vm.titleHeader = 'Dashboard';
        vm.message_modal = message_modal;

        
        function message_modal () {
        	var content =  {
        		header:'Message',
        		message:'Hello World!'
        	}
        	ModalService.message_modal(content);
        }
    }
})();