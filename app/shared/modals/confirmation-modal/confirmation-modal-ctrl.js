;(function (){
    'use strict'

    angular
        .module('app')
        .controller('ConfirmationModalCtrl', ConfirmationModalCtrl);

    ConfirmationModalCtrl.$inject = ['$scope', '$cookies', '$uibModalInstance',
                                     '$timeout', 'Data', 'QueryService'];
    function ConfirmationModalCtrl ($scope, $cookies, $uibModalInstance, 
                                    $timeout, Data, QueryService) {
        var vm      = this;

        // variables
        vm.header   = Data.header;
        vm.message  = Data.message; 

        // methods
        vm.approve  = approve;
        vm.cancel   = cancel;

        function approve () {
            $uibModalInstance.close(true);
        }

        function cancel () {
            $uibModalInstance.close(false);
        }

    }


})();