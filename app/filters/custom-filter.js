;(function (){
    'use strict';
    
    angular
        .module('app')
		.filter('titlecase', titlecase)
		.filter('handleStatus', handleStatus)
        .filter('displaynone', displaynone)
        .filter('displayurlimg', displayurlimg)
        .filter('cut', cut)
        .filter('handlefetch', handlefetch)
        .filter('handleplural', handleplural)
        .filter('convertMonthNameToNumber',convertMonthNameToNumber);


        function handlefetch ($sce) {
            return function (input, text) {
                var input_state = (input) ? 'fa fa-spinner fa-pulse' : (!input) ? '' : '';
                var input_text = (input_state) ? ' Loading ' + text : (!input_state) ? 'No ' + text + ' Found' : '';

                var att = '<em class="text-muted"><i class="'+ input_state +'"></i>' + input_text + '</em>';
                return $sce.trustAsHtml(att);
            }
        }

		function titlecase () {
			return function( input ) {
				 if (input == null) return '';
				 else
				return input.replace(/_/g, ' ').replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
			}
		}

		function handleStatus ($sce) {
        	return function (input) { 
                var class_status = 
                    (input == 'SUCCESS') ? 'success':         (input == 'STAGING') ? 'primary':           (input == 'FOR-DELIVERY') ? 'warning':      
                    (input == 'FOR-SORTING') ? 'info':          (input == 'FOR-PICKUP') ? 'default':        (input == 'FAILED') ? 'danger': '';

                var att = '<span class="label label-'+class_status+'">'+input+'</span>';
				return $sce.trustAsHtml(att);
			}
        }

        function displaynone ($sce) {
            return function (input , pre, sup) {
                 return $sce.trustAsHtml(
                        (input) ? (pre?pre : '') + input + (sup?sup:''): "<span class='text-uppercase text-italic low-opacity'>None</span>"
                 );
            }
        }

        function displayurlimg ($sce) {
            return function (input) {
                 return $sce.trustAsHtml(
                        (input) ?  "<img class='img-repsonsive double-border'  style='width:100%' src='"+ input  + "' class='responsive' />" : ''
                 );
            }
        }

        function cut () {
            return function (value, wordwise, max, tail) {
                if (!value) return '';

                max = parseInt(max, 10);
                if (!max) return value;
                if (value.length <= max) return value;

                value = value.substr(0, max);
                if (wordwise) {
                    var lastspace = value.lastIndexOf(' ');
                    if (lastspace != -1) { 
                        if (value.charAt(lastspace-1) == '.' || value.charAt(lastspace-1) == ',') {
                            lastspace = lastspace - 1;
                        }
                        value = value.substr(0, lastspace);
                    }
                }
                return value + (tail || ' …');
            };
        }

        function handleplural () {
            return function( input, sup ) {
                 var plural  = sup.toUpperCase();

                 if (input > 1) 
                    if (plural.slice(-2) == 'Y')
                        plural = plural.slice(0,-1) + 'IES';
                    else if (plural.slice(-1) == 'S')
                        plural = plural + 'ES';
                    else if (plural.slice(-1) != 'S')
                        plural = plural + 'S';
                    
                 return plural;
            }
        }

        function convertMonthNameToNumber() {

            return function( monthName ) {
                var myDate = new Date(monthName + " 1, 2000");
                var monthDigit = myDate.getMonth();
                return isNaN(monthDigit) ? 0 : (monthDigit + 1);
            }
        
        }

})();