angular.module('app',[])
	.config(['$stateProvider',function($statePrivider){
		$stateProvider
			.state('pitch.detail',{
				url: '/detail/:id',
				templateUrl: '../../../templates/pitch/pitch-detail.html',
				controllers($scope,$stateParams,pitch){

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

          var stateParams = $stateParams.id

          pitch.detail({id})

            .then(function({ data }) {
              $scope.detail = data.detail
              $scope.activitys = data.activitys
            })

            .catch(function({ message }) {
              alertbox('danger', message)
            })

                /*function($scope) {
                  if($scope.detail.publish=='已发布'){
                    $scope.isPublish = true;
                  } else {
                    $scope.isPublish = false;
                  }
                }*/




            $scope.download = function () {
                document.execCommand('SaveAs',true,'NameList.excel');
            }




            $scope.new = function () {
                $state.go('activity.add')
            }

            $scope.publish = function () {

              pitch.publish({id})

              .then(function({ data }) {
                alertbox('success', '发布成功')
                setTimeout('$state.go("pitch.list")',1200)
              })

              .catch(function({ message }) {
                alertbox('danger', message)
              })
            }





            


            }
				})
			}])
	
