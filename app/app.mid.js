
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
					var xy = slot.xy();
					var button;
					
					function createButton(vh) {
						var button = angular.element('<button class="slot">&nbsp;</button>');
						slotElement.prepend(button);
						button.bind('click', function () {
							var colors = [];
							slot.next.iterate(12, slot[vh], function (slot) {
								colors.push(slot.color);
							});
							var i = 0;
							slot.next.iterate(12, slot[vh], function (slot) {
								slot.color = colors[(Math.abs(9 + i) % 12)];
								i ++;
							});
							scope.$apply();
						});
						return button;
					}
					if (xy[0] != 0) {
						button = createButton('hout');
						button.addClass(xy[0] == -1 ? 'left': 'right');
					}
					
					if (xy[1] != 0) {
						button = createButton('vout');
						button.addClass(xy[1] == -1 ? 'top': 'bottom');
					}
				});
			});
		}
	}
}])
