;(function (){
    'use strict';

    angular
        .module('app')
        .controller('UsersFormCtrl', UsersFormCtrl);

    UsersFormCtrl.$inject = [
        '$rootScope', 
        '$state', 
        '$cookies', 
        '$scope', 
        '$stateParams',
        '$uibModalInstance',
        '$filter',
        '$timeout',
        'QueryService',
        'logger',
        'Request',
        'Modal',
        'NgMap'
    ];

    function UsersFormCtrl ($rootScope, $state, $cookies, $scope, $stateParams, $uibModalInstance, $filter, $timeout, 
        QueryService, logger, Request, Modal, NgMap) {
        
        var vm                          = this;
        // attributes
        vm.titleHeader                  = Modal.header;
        vm.user                         = {}; 
        vm.data                         = angular.copy(Request.body); 
        vm.submitted                    = false; 
        // methods
        vm.save                         = save;
        vm.cancel                       = cancel; 

        init(); 

        function init() { 
            // codes to initialize
        }; 

        function save (data) { 

            // temporary code
            vm.disable = true; 
            data.company = {};
            data.company.name = angular.copy(data.comp);
            logger.success('New '+ Modal.title +' added.');
            $uibModalInstance.close(data);
            return; 
            // temporary code
            
            QueryService
                .query(Request)
                .then( function (response) { 
                    if (Request.method === 'POST') {
                        logger.success('New '+ Modal.title +' added.');
                    } else if (Request.method === 'PUT') {
                        logger.success(Modal.title+' updated.');
                    }
                    $uibModalInstance.close(response.data.data.items[0]);
                }, function (error) { 
                    logger.error(error.data.message);
                }).finally(function(){
                    vm.disable = false;
                });
        } 

        function cancel () { 
            $uibModalInstance.close(false);
        }

    }
    
})();