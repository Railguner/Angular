angular.module('app',[])

  .config(['$stateProvider','$urlRouterProvider',function($stateProvider, $urlRouterProvider) {

    /*function authenticate ($timeout, $state, authService) {
      if (!authService.token) {
        $timeout(function() {$state.go('login')})
        return Promise.reject()
      }
    }*/


		$urlRouterProvider
			.when('/','/user')
			.when('/user','/user/info')
			.when('/pitch', '/pitch/pitch-list')
      .when('/dprt', '/dprt/dprt-list')

      	$stateProvider
      		.state('user',{
      			abstract: true,
      			url: '/user',
      			templateUrl: '../../template/navi/navi-user.html',
      			resolve: { authenticate }
      		})
      		.state('pitch',{
      			abstract: true,
      			url: '/pitch',
      			templateUrl : '../../template/navi/navi-pitch.html',
      			resolve: { authenticate }
      		})
      		.state('dprt', {
        		url: '/dprt',
        		abstract: true,
        		templateUrl: '../../templates/navi/navi-dprt.html',
        		resolve: { authenticate }
      		})
      		/*.state('login', {
       	 		url: '/login',
        		templateUrl: 'templates/login.html',
        		resolve: {
          		check($timeout, $state, authService) {
            	if (authService.token) {
              		$timeout(function() {$state.go('user.info')})
              		return Promise.reject()
            	}
          		}
        	}}),*/


///////////////////////////////////////////////////
        	function controller($scope, $state, $cookies, userService) {


          	$scope.alerts = []
          function alertbox (type, msg) {
            if ($scope.alerts != []) {
              $scope.alerts.shift()
            }
            $scope.alerts.push({type: type, msg: msg})
          }

          $scope.closeAlert = function (index) {
            $scope.alerts.splice(index, 1)
          }

          $scope.update = function () {

            $scope.flag = true
            //userService.login($scope)

              .then(function(){
                $state.go('user.info')
              })

              .catch(function({ message }) {
                alertbox('danger', message)
              })

              .then(function() {
                $scope.flag = false
              })
          }
        }


	}])