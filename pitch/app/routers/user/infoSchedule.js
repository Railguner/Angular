angular.module('app',[])
	.config(['$stateProvider',function($statePrivider){
		$stateProvider
			.state('user.schedule',{
				url: '/schedule/:id',
				templateUrl: '../../../templates/user/schedule.html',
				controllers($scope,$stateParams){


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

          var id = $stateParams.id
          var lesson = []


          userService.scheduleShow({id})

            .then(function({ data })  {
              $scope.schedule = data.schedule

              for(x in data.schedule.class){
                document.getElementById(x).setAttribute("background","blue")
              }


            })

            .catch(function({ message }) {
              alertbox('danger', message)
            })

            $scope.blue = function (){
              if (this.getAttribute("background")=='blue') {
                this.setAttribute("background","gray")
                for(var i = lesson.length;i>=0;i--){
                  if(lesson[i]==this.id){lesson.splice(i,1)}
                }
              } else{
                this.setAttribute("background","blue")
                lesson = lesson + this.id
              }
            }

            $scope.reset = function (){
              for(x in data.schedule.class){
                document.getElementById(x).setAttribute("background","blue")
              }
              editform.$setPristine();
              editform.$setUntouched();
            }


            $scope.edit = function (){

              $scope.flag = true
              userService.scheduleEdit({
                id,
                lesson: lesson
              })

            .then(function({ data }) {{
               alertbox('success', '修改成功')
                setTimeout(function() { $state.go('user.schedule') }, 1500)
            }
            })

            .catch(function({ message }) {
              alertbox('danger', message)
            })
            .then(function(){
                $scope.flag = false
              })

            }


				}
			})
	}])