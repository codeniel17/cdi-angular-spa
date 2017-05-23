;(function (){
    'use strict';

    angular
        .module('app')
        .controller('ContentCtrl', ContentCtrl);

    ContentCtrl.$inject = ['$rootScope', '$state', '$cookies', '$scope', '$stateParams','ngProgressFactory'];

    function ContentCtrl ($rootScope, $state, $cookies, $scope, $stateParams, ngProgressFactory) {
        var vm                = this;

        $rootScope.back       = back;
        $rootScope.init       = rootInit;
        $rootScope.active_tab = active_tab;
        $rootScope.next       = next;

        init();

        function init() { 
            $rootScope.progressbar = ngProgressFactory.createInstance();
            $rootScope.progressbar.setHeight('4px');
            $rootScope.progressbar.setColor('#ffccdf');
            $rootScope.GLOBAL  = GLOBAL;
        };

        function rootInit() {

        };

        function back() {

        }

        function active_tab () {

        }

        function next () {

        }

    }
})();