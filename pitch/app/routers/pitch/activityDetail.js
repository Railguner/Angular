angular.module('app',[])
	.config(['$stateProvider',function($statePrivider){
		$stateProvider
			.state('activity.detail',{
				url: '/detail/:id',
				templateUrl: '../../../templates/pitch/activity-detail.html',
				controllers($scope,$stateParams,activity){

					moreMenu()
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


          var id =  $stateParams.id

           activity.show({id})

            .then(function({ data })  {
              $scope.activity = data.activity
              $scope.persons = data.persons
            })

            .catch(function({ message }) {
              alertbox('danger', message)
            })







				}
			})
	}])