angular.module('app')
	.config(['$stateProvider',function($statePrivider){
		$stateProvider
			.state('dprt.list',{
				url: '/dprt-list/:dprt/:current',
				templateUrl: '../../../templates/dprt/dprt-list.html',
				controllers($scope,$stateParams,$modal,dprtlist){

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

          var current = $stateParams.current | 0
          var dprt      = $stateParams.dprt

          dprtlist.show({dprt})

            .then(function({ data }) {
                $scope.members = data.members

                for(member in members){

                        if($scope.member.schedule=='已通过'){
                            $scope.isPassed = true;
                        } else {
                            $scope.isPassed = false;
                        }

                }
            } )

            .catch(function({ message }) {
              alertbox('danger', message)
            })




             $scope.scheduleOpen = function (id){
                var modal = $modal.open({
                templateUrl: '#/dprt/dprt-schedule.html',
                controller: 'modalSchedule',
                backdrop: 'false',
                keyboard: 'true',
                resolve: {
                  id: function () {
                     return $scope.id;
                   }
                }
            })}


          $scope.pagenext = function () {
            if ((current + 1) <= $scope.total) {
              $state.go('list.all', { dprt: $scope.dprt, position: $scope.position, keyword: $scope.keyword, current: current + 1 })
            } else {
              alertbox('danger', '已经是最后一页')
            }
          }

          $scope.pageprev = function () {
            if ((current - 1) >= 1) {
              $state.go('list.all', { dprt: $scope.dprt, position: $scope.position, keyword: $scope.keyword, current: current - 1 })
            } else {
              alertbox('danger', '已经是第一页')
            }
          }



				}
			})
	}])


angular.module('app')
  .controller('modalSchedule', function($scope,$modalInstance,dprtlist,id) {

    $scope.id = id;

      dprtlist.scheduleShow({
          id: $scope.id
        })
      .then(function({ data }) {
              $scope.schedule = data.schedule

              for(x in data.schedule.class){
                document.getElementById(x).setAttribute("background","blue")
              }


            })
        .catch(function({ message }){
          alertbox('danger', message)
        })


      $scope.allow = function (){
        $scope.flag = true

        dprtlist.scheduleAllow({
          id: $scope.id
        })
        .catch(function({ message }){
          alertbox('danger', message)
        })
        .then(function() {
         alertbox('success', '已允许通过')
        })
        .then(function(){
          $modalInstance.close(null);
          $scope.flag = false
        })
      }
})