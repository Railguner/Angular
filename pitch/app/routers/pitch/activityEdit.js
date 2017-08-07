angular.module('app',[])
	.config(['$stateProvider',function($statePrivider){
		$stateProvider
			.state('activity.edit',{
				url: '/edit/:id',
				templateUrl: '../../../templates/pitch/activity-edit.html',
				controllers($scope, $stateParams,$state,activity){

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



          const id = $stateParams.id

          activity.editshow({ id })

            .then(function ({ data }) {
              $scope.content = data
              $scope.name = $scope.content.name
              $scope.date = $scope.content.date
              $scope.time = $scope.content.time
              $scope.place = $scope.content.place
              $scope.person = $scope.content.person
              $scope.respond = $scope.content.respond
              $scope.department = $scope.content.department
              $scope.respond = $scope.content.respond
              $scope.boyFirst = $scope.content.boyFirst
            })

            .catch(function({ message }){
              alertbox('danger', message)
            })

          $scope.reset = function () {
              $scope.name = $scope.content.name
              $scope.date = $scope.content.date
              $scope.time = $scope.content.time
              $scope.place = $scope.content.place
              $scope.person = $scope.content.person
              $scope.respond = $scope.content.respond
              $scope.department = $scope.content.department
              $scope.respond = $scope.content.respond
              $scope.boyFirst = $scope.content.boyFirst
              editform.$setPristine();
              editform.$setUntouched();


          }
          $scope.edit = function () {

            $scope.flag = true

            activity.edit({
              id,
              name: $scope.name,
              date: $scope.date,
              time: $scope.time,
              place: $scope.place,
              person: $scope.person,
              respond: $scope.respond,
              department: $scope.department,
              respond: $scope.respond,
              boyFirst: $scope.boyFirst
            })

              .then(function()  {
                alertbox('success', '活动修改成功')
                setTimeout(function() { $state.go('pitch.detail/:id') }, 1500)
              })

              .catch(function({ message })  {
                alertbox('danger', message)
              })

              .then(function()  {
                $scope.flag = false
              })








				}
			}
    })
	}])