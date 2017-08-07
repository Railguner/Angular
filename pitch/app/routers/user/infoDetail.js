angular.module('app')
	.config(['$stateProvider',function($statePrivider){
		$stateProvider
			.state('user.info',{
				url: '/info/:id',
				templateUrl: '../../../templates/user/info.html',
				controllers($scope,$stateParams,userService){


					moreMenu()
          			naviSecondery(0)

          			var id = $stateParams.id

          			userService.show({id})
            		.then(function ({ data }) {
             			$scope.content = data
            		})


				}
			})
	}])