;(function (){
    'use strict';

    angular
        .module('app')
        .directive('uiSrefIf', uiSrefIf);

    function uiSrefIf ($compile) {
         return {
            link: function($scope, $element, $attrs) {
                var uiSrefVal       = $attrs.uiSrefVal,
                    uiSrefIf        = $attrs.uiSrefIf,
                    uiSrefNgBind    = $attrs.uiSrefNgBind;

                $element.removeAttr('ui-sref-if');
                $element.removeAttr('ui-sref-val');

                $scope.$watch(
                    function(){
                        return $scope.$eval(uiSrefIf);
                    },
                    function(bool) {
                        if (bool) {
                            $element.attr('ui-sref', uiSrefVal);
                            $element.removeClass('no_style');
                        } else {
                            $element.attr('class', 'no_style');
                            $element.removeAttr('ui-sref');
                            $element.removeAttr('href');
                        }

                        $element.attr('ng-bind-html', uiSrefNgBind + ' | displaynone');
                         
                        $compile($element)($scope);
                    }
                );
            }
        };
    }

})();



