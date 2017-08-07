angular.module('app')
  .directive('logoutBtn', function (userService) {
    return {
      restrict: 'A',
      link(scope, element, attrs) {
        element.bind('click', function () {
          scope.flag = true
          userService.logout()

        })
      }
    }
  })
