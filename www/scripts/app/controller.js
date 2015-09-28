// This is a JavaScript file

(function() {

    var app = angular.module('myApp', ['onsen']);

    app.factory('Data', function() {
        var Data = {};
    	Data.items = ['コース1', 'コース2', 'コース3'];
    	return Data;
    });

    app.controller('SlidingMenuController', function($scope) {

        $scope.checkSlidingMenuStatus = function() {
            $scope.slidingMenu.on('postclose', function() {
                $scope.slidingMenu.setSwipeable(false);
            });
            $scope.slidingMenu.on('postopen', function() {
                $scope.slidingMenu.setSwipeable(true);
            });
        };
        $scope.checkSlidingMenuStatus();
    });

    app.controller('CourstListController', ['$scope', 'Data', function($scope, Data) {
        $scope.courseListDelegate = {
            configureItemScope: function(index, itemScope) {
                console.log("Created item : [" + Data.items[index] + "]");
                itemScope.item = {
                    name: Data.items[index]
                };
            },
            calculateItemHeight: function(index) {
                return 45;
            },
            countItems: function() {
                return Data.items.length;
            },
            destroyItemScope: function(index, scope) {
                console.log("Destroyed item : [" + Data.items[index] + "]");
            }
        };
        $scope.courseSelected = function(index, event) {
            event.stopPropagation();
            Data.index = index;
            var item = Data.items[index];
            myNavigator.pushPage('course.html', {title: item, index: index});
        };
    }]);

    app.controller('CourseController', function($scope) {
        var options = $scope.myNavigator.getCurrentPage().options;
        $scope.options = options;
    });
})();