
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

app.filter('rotate', [function () {
	return function (matrix, num) {
		return rotate(matrix, num);
	}
}])

app.directive('mid', ['$rootScope', function ($rootScope) {
	return {
		restrict: 'EA',
		link: function(scope, element, attrs) {
			scope.$watch(function(){
				return scope.cube;
			}, function(){
				_.each(element.find('slot'), function (e) {
					var slot = angular.element(e).scope().slot;
					if (slot.isMiddle()) {
						return;
					}
					var slotElement = angular.element(e);
//					slot.append('aaa');
//						console.log(lscope.slot.j == );
//					if (lscope.slot) {
//						
//					}
					var xy = slot.xy();
					var button;
					if (xy[0] != 0) {
						button = angular.element('<button class="slot">&nbsp;</button>');
						slotElement.prepend(button);
						button.addClass(xy[0] == -1 ? 'left': 'right');
						button.bind('click', function () {
							
//							console.log(slot);
						});
					}
					
					if (xy[1] != 0) {
						button = angular.element('<button class="slot">&nbsp;</button>');
						slotElement.prepend(button);
						button.addClass(xy[1] == -1 ? 'top': 'bottom');
						button.bind('click', function () {
//							console.log(slot);
						});
					}
					
//					console.log(angular.element('<button></button>'));
					
				});
//				console.log(scope.cube.faces[scope.i]);
				
			});
//			console.log(attrs);
		}
	}
}])
