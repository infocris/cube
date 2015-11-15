
app.directive('slot', ['$rootScope', function ($rootScope) {
	return {
		restrict: 'E',
		link: function(scope, element) {
			if (scope.$index % 3 == 0) {
				element.css({clear: 'both'});
			}
			var label = angular.element('<span></span>');
			element.append(label);
			label.bind('click', function () {
//				scope.slot.color = (scope.slot.color + 1) % 6;
//				scope.$apply();
			});
			label.text(scope.slot.id);
			scope.$watch(function() {
				return scope.slot.color;
			}, function(value, old) {
				element.removeClass('color' + old);
				element.addClass('color' + value);
			});
		}
	}
}])
