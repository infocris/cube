
var app = angular.module('app', [])

app.run(['$rootScope', function (scope) {
	scope.cube = new Cube();
}]);

//app.directive('face', ['$rootScope', function ($rootScope) {
//	return {
//		restrict: 'E',
//		link: function(scope, element) {
//		}
//	}
//}])

app.filter('rotate', [function () {
	return function (matrix, num) {
		return rotate(matrix, num);
	}
}])
