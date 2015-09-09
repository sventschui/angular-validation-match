/*!
 * angular-validation-match
 * Checks if one input matches another
 * @version v1.6.0
 * @link https://github.com/TheSharpieOne/angular-validation-match
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
(function(window, angular, undefined){'use strict';

angular.module('validation.match', []);

angular.module('validation.match').directive('match', match);
angular.module('validation.match').directive('mismatch', mismatch);

function match ($parse) {
    return {
        require: '?ngModel',
        restrict: 'A',
        link: function(scope, elem, attrs, ctrl) {
            if(!ctrl) {
                if(console && console.warn){
                    console.warn('Match validation requires ngModel to be on the element');
                }
                return;
            }

            var matchGetter = $parse(attrs.match);
            var caselessGetter = $parse(attrs.matchCaseless);

            scope.$watch(getMatchValue, function(){
                ctrl.$$parseAndValidate();
            });

            ctrl.$validators.match = function(){
              var match = getMatchValue();
              if(caselessGetter(scope) && angular.isString(match) && angular.isString(ctrl.$viewValue)){
                return ctrl.$viewValue.toLowerCase() === match.toLowerCase();
              }
              return ctrl.$viewValue === match;
            };

            function getMatchValue(){
                var match = matchGetter(scope);
                if(angular.isObject(match) && match.hasOwnProperty('$viewValue')){
                    match = match.$viewValue;
                }
                return match;
            }
        }
    };
}
match.$inject = ["$parse"];

function mismatch ($parse) {
    return {
        require: '?ngModel',
        restrict: 'A',
        link: function(scope, elem, attrs, ctrl) {
            if(!ctrl) {
                if(console && console.warn){
                    console.warn('Mismatch validation requires ngModel to be on the element');
                }
                return;
            }

            var mismatchGetter = $parse(attrs.mismatch);
            var caselessGetter = $parse(attrs.mismatchCaseless);

            scope.$watch(getMismatchValue, function(){
                ctrl.$$parseAndValidate();
            });

            ctrl.$validators.mismatch = function(){
                var mismatch = getMismatchValue();
                if(caselessGetter(scope) && angular.isString(mismatch) && angular.isString(ctrl.$viewValue)){
                    return ctrl.$viewValue.toLowerCase() === mismatch.toLowerCase();
                }
                return ctrl.$viewValue === mismatch;
            };

            function getMismatchValue(){
                var mismatch = mismatchGetter(scope);
                if(angular.isObject(mismatch) && mismatch.hasOwnProperty('$viewValue')){
                    mismatch = mismatch.$viewValue;
                }
                return match;
            }
        }
    };
}
mismatch.$inject = ["$parse"];
})(window, window.angular);