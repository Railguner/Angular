angular.module('app',[])
	.config(['$stateProvider',function($statePrivider){
		$stateProvider
			.state('pitch.list',{
				url: '/list',
				templateUrl: '../../../templates/pitch/pitch-list.html',
				controllers($scope,$modal,pitch){

					moreMenu()
          			naviSecondery(0)

          $scope.alerts = []

          function alertbox (type, msg) {
            if ($scope.alerts != []) {
              $scope.alerts.shift()
            }
            $scope.alerts.push({type: type, msg: msg})
          }

          pitch.show()

          .then(function({ data }) {
              $scope.pitchs = data.pitchs
            })

            .catch(function({ message }) {
              alertbox('danger', message)
            })

            $scope.open = function (){
                var modal = $modal.open({
                templateUrl: 'pitchAdd.html',
                controller: 'pitchAddModal',
                backdrop: 'static',
                keyboard: 'true',
                }
            )}
            modal.opened.then(function(){
              document.getElementsByTagName('body').setAttribute('background','gray')
            })
            modal.result.then(function(){
                document.getElementsByTagName('body').setAttribute('background','')
            })



}
			})
	}])

angular.module('app')
  .controller('pitchAddModal', function($scope,$state,$modalInstance,pitch) {

      $scope.add = function (){
        $scope.flag = true

        pitch.add({
          /*name: $scope.name
          note: $scope.note*/
        })

        .then(function({ data }) {
          alertbox('success', '添加成功')
          setTimeout(function()  { $state.go('pitch.detail/:id') }, 1500)
        })

        .catch(function({ message }) {
          alertbox('danger', message)
        })

        .then(function(){
                $scope.flag = false
              })
      }

      $scope.cancel = function (){
        $modalInstance.close(null);
      }


})