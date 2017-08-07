angular.module('app',[])
	.config(['$stateProvider',function($statePrivider){
		$stateProvider
			.state('activity.add',{
				url: '/add',
				templateUrl: '../../../templates/pitch/activity-add.html',
				controllers($scope,$state,activity){


					moreMenu()


          $scope.clear = function () {
            $scope.name=$scope.date=$scope.time=$scope.place=$scope.person=$scope.respond=$scope.indispensable=$scope.boyFirst=''
            myForm.$setPristine();
            myForm.$setUntouched();

          }

          $scope.add = function () {

            $scope.flag = true //防止反复提交

            activity.add({
              name: $scope.name,
              date: $scope.date,
              time: $scope.time,
              place: $scope.place,
              person: $scope.person,
              respond: $scope.respond,
              indispensable: $scope.indispensable,
              boyFirst: $scope.boyFirst
            })

              .then(function() {
                alertbox('success', '活动添加成功')
                setTimeout(function()  { $state.go('pitch.detail/:id') }, 1500)
              })

              .catch(function({ message }) {
                alertbox('danger', message)
              })

              .then(function() {
                $scope.flag = false
              })







				}
			}})
	}])