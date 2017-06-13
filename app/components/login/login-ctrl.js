;(function (){
    'use strict';

    angular
        .module('app')
        .controller('LoginCtrl', LoginCtrl);

    LoginCtrl.$inject = [
        '$scope', 
        '$state', 
        '$uibModal',
        '$cookies',
        '$rootScope',
        'QueryService',
        'ngProgressFactory',
        'logger'
    ];

    function LoginCtrl ($scope, $state, $uibModal, $cookies, $rootScope, QueryService, ngProgressFactory, logger) {
        var vm = this;

        vm.admin = true; 
        vm.showNavItem = true;
        vm.disable = false;
        vm.isPassword  = false;
        vm.header = 'Login';
        vm.loading = 'Logging in...';
        vm.log = 'Login'; 
        vm.logo = UTILS.logo;

        $rootScope.progressbar  = ngProgressFactory.createInstance();
        $rootScope.progressbar.setHeight('4px');
        $rootScope.progressbar.setColor('rgba(0,0,0,0.3)');

        vm.login  = login;
        vm.forgot = forgot;

        function login (user) {
            $state.go('app.dashboard');
        }

        /*function login (user) { // use in project

            user.role = $state.current.name;
            var request = {
                method  : 'POST',
                body    : user,
                token   : false,
                params  : false,
                hasFile : false,
                route   : { auth:'', login:'' }
            }; 

            QueryService
                .query(request)
                .then( function (response) { 
                    
                    $cookies.putObject('user', response.data.data.items[0]);
                    var state = (response.data.data.items[0].role == 'sorter') ? 'app.messengers' : 'app.dashboard';
                    $state.go(state); 
                
                }, function (error) { 
                    logger.error(error.data.errors[0].message);
                });

        }*/

        function forgot () {

        }
    }

})();