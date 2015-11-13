
var app = angular.module('app', [])

app.run(['$rootScope', function (scope) {
	scope.cube = new Cube();
}]);

app.directive('slot', ['$rootScope', function ($rootScope) {
	return {
		restrict: 'E',
		link: function(scope, element) {
			if (scope.$index % 3 == 0) {
				element.css({clear: 'both'});
			}
			scope.$watch(function() {
				return scope.slot.color;
			}, function(value, old) {
				element.removeClass('color' + old);
				element.addClass('color' + value);
			});
		}
	}
}])

app.directive('face', ['$rootScope', function ($rootScope) {
	return {
		restrict: 'E',
		link: function(scope, element) {
//			console.log({width: (52 * 3)+'px'});
//			element.css({width: (52 * 3)+'px'});
		}
	}
}])
