;(function (){
    'use strict';

    angular
        .module('app')
        .controller('DashboardCtrl', DashboardCtrl);

    DashboardCtrl.$inject = ['$scope', '$state'];

    function DashboardCtrl ($scope, $state) {
        var vm = this;
        
        vm.titleHeader = 'Dashboard';
    }
})();