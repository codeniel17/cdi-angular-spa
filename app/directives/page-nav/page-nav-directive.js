;(function (){
    'use strict';

    angular
        .module     ('cdi-directives',[])
        .controller ('PaginationCtrl', PaginationCtrl)
        .directive  ('pageNav', PageNav);

    PaginationCtrl.$inject = ['$scope'];

	function PaginationCtrl ($scope) {
		var vm = this;

		vm.onPageChange = onPageChange;
		vm.onSizeChange	= onSizeChange;

		function onPageChange () {
			vm.onChangePage();
		};

		function onSizeChange () {
			vm.sizeChange();
		}
	};

    function PageNav () {
    	return {
    		restrict: 'E',
    		scope: {},
    		controller: PaginationCtrl,
    		controllerAs: 'vm',
    		bindToController: {
    			pageData: '=',
    			onChangePage: '&',
    			sizeChange: '&'
    		},
    		templateUrl: 'app/directives/page-nav/page-nav-template.html'
    	}
    };
    
})();