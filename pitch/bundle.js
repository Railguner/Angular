var app = angular.module('app', ['ui.router', 'ngCookies', 'ui.bootstrap']);

  app.config(['$httpProvider', function($httpProvider) {

    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8'

    var param = function (obj) {
      var query = '', name, value, fullSubName, subName, subValue, innerObj, i

      for (name in obj) {
        value = obj[name]

        if (value instanceof Array) {
          for (i = 0; i < value.length; ++i) {
            subValue = value[i]
            fullSubName = name + '[' + i + ']'
            innerObj = {}
            innerObj[fullSubName] = subValue
            query += param(innerObj) + '&'
          }
        }
        else if (value instanceof Object) {
          for (subName in value) {
            subValue = value[subName]
            fullSubName = name + '[' + subName + ']'
            innerObj = {}
            innerObj[fullSubName] = subValue
            query += param(innerObj) + '&'
          }
        }
        else if (value !== undefined && value !== null)
          query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&'
      }

      return query.length ? query.substr(0, query.length - 1) : query
    }

    // Override $http service's default transformRequest
    $httpProvider.defaults.transformRequest = [function (data) {
      return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data
    }]
  }])

// var host = 'http://125.216.250.105/bbter/index.php/Home/'
// var host = 'http://192.168.1.120/bbter/index.php/Home/'
var host = ''

angular.module('app')

  .service('alertService',function($rootScope) {

    $rootScope.alerts = [];

    this.alertbox = function(type, msg) {
        if ($rootScope.alerts != []) {
            $rootScope.alerts.shift()
        }
        $rootScope.alerts.push({
            'type': type,
            'msg': msg,
            'close': function(){
                alertService.closeAlert(this)
            }
        })
    }
    this.closeAlert = function(index) {
        $rootScope.alerts.splice(index, 1)
    }
})


angular.module('app')

  .service('authService',function($cookies) {

    return {

      token: $cookies.get('token'),

      setToken(token) {
        this.token = token
        var expireDate = new Date()
        expireDate.setDate(expireDate.getDate() + 7)
        $cookies.put('token', token, { 'expires' : expireDate } )
      }
    }
  })


angular.module('app')

  .service('requestService', function ($http, $state, authService) {

    return {

      errMsg: {
        '101': '存在未输入项',
        '102': '账号错误',
        '103': '密码错误',
        '104': '宿舍号有误',
        '105': '新旧密码相同',
        '106': '确认密码不一致',
        '107': '旧密码错误',
        '108': '操作对象不能包含自己',
        '201': '请先完善个人资料',
        '202': '部分添加成功,未成功条目已在学号框中呈现,请检查输入',
        '302': '账号异常，请重新登录',
        '403': '你不具有操作权限',
        '404': '你不具有查看权限',
        '500': '未知错误',
      },
    auth() {
        var timestamp = Date.now()
        var token = authService.token
        return token + timestamp
      },


    post(host/*action,*/, data = {}) {
        if (authService && data instanceof Object) {
          data.auth = this.auth()
        }
        return $http.post(host/* + action*/, data).then(function(response){

          authService.setToken(response.data.token)

          /*switch (response.data.code) {
            case 302: 账号异常，请重新登录
              $state.go('login')
              break
          }*/

          return response.data

        }).catch(function(error){

          return Promise.resolve({ error, code: 500 })

        }).then(function(response) {

          const code = response.code
          if (code == 200) {
            return response
          }
          return Promise.reject({ response, code, message: this.errMsg[response.code] })
        })
      }


    }
  })


angular.module('app')

  .service('userService',function($window,$cookies,requestService) {

    return {

      logout(user) {
        requestService.post('/pitch/test/get/logout.json', requestService.auth())
        $cookies.remove('token')
        $window.location.href="http://baidu.com";
      },

      show(data) {
        return requestService.post('/pitch/test/get/user-info.json',{data})

      },

      scheduleShow(data) {
        return requestService.post('/pitch/test/get/userSchedule.json',{data})
      },

      scheduleEdit(data) {
        return requestService.post('/pitch/test/get/scheduleEdit.json',{data})
      }
      }
    }


  )


angular.module('app')
  .directive('more', function () {
    return {
      restrict: 'A',
      replace : false,
      templateUrl: 'templates/moreMenu.html',
      link: function($scope, element, attrs){
        document.getElementById('more').addEventListener('click',function(e){
            e.stopPropagation();
            if (document.getElementById('moreMenu').style.opacity==0) {
                document.getElementById('moreMenu').style.opacity=1
                document.getElementById('moreMenu').style.zIndex=10
            } else {
                document.getElementById('moreMenu').style.opacity=0
                document.getElementById('moreMenu').style.zIndex=-10
            }
            document.getElementsByTagName('body')[0].addEventListener('click',function(){
                if (document.getElementById('moreMenu').style.opacity==1) {
                    document.getElementById('moreMenu').style.opacity=0
                    document.getElementById('moreMenu').style.zIndex=-10
                }
            })

        })

      }
        }
})


angular.module('app')
  .directive('logoutBtn', function (userService) {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        element.bind('click', function () {
          scope.flag = true
          userService.logout()

        })
      }
    }
  })



angular.module('app')

  .service('dprtlist',function(requestService) {

    return {

      show(data) {
        return requestService.post('/pitch/test/get/dprtlist.json', { data })
      },

      scheduleShow(data) {
        return requestService.post('/pitch/test/get/userSchedule.json',{data})
      },

      scheduleAllow(data) {
        return requestService.post('user/scheduleAllow',{data})
      }

      }
    }
  )



angular.module('app')

  .service('activity',function(requestService) {

    return {

      show(data) {
        return requestService.post('/pitch/test/get/activityDetail.json', { data })
      },

      add(data) {
        return requestService.post('/pitch/test/get/activityAdd.json', { data })
      },

      editshow(data) {
        return requestService.post('/pitch/test/get/activityDetail.json', { data })

      },

      edit(data) {
        return requestService.post('/pitch/test/get/activityEdit.json', { data })
      }
    }
  })


angular.module('app')

  .service('pitch',function(requestService) {

    return {

      show() {
        return requestService.post('/pitch/test/get/pitchlist.json')
      },

      add(data) {
        return requestService.post('/pitch/test/get/pitchAdd.json', { data })


      },

      detail(data) {
        return requestService.post('/pitch/test/get/pitch-detail.json', { data })
      },

      publish(data) {
        return requestService.post('/pitch/test/get/pitch-publish.json', { data })
      }
    }
  })



angular.module('app')

  .config(['$stateProvider','$urlRouterProvider',function($stateProvider, $urlRouterProvider) {

/*    function authenticate (authService) {
      if (!authService.token) {
        windows.location.href="baidu.com";
      }
    }*/


    $urlRouterProvider
      .when('/','/user')
      .when('/user','/user/info')
      .when('/pitch', '/pitch/pitchList')
      .when('/dprt', '/dprt/dprtList/&1')
      .when('/activity', '/activity/add')
      .otherwise('/user/info')

        $stateProvider
          .state('user',{
            abstract: true,
            url: '/user',
            templateUrl: 'templates/navi/navi-user.html'/*,
            resolve: {
                go : function (authService) {
                        if (!authService.token) {
                        windows.location.href="baidu.com";
                        }
                    }
            }*/
            })
          .state('pitch',{
            abstract: true,
            url: '/pitch',
            templateUrl : 'templates/navi/navi-pitch.html'/*,
            resolve: {
                go : function (authService) {
                        if (!authService.token) {
                        windows.location.href="baidu.com";
                        }
                    }
            }*/
          })
          .state('dprt', {
            url: '/dprt',
            abstract: true,
            templateUrl: 'templates/navi/navi-dprt.html'/*,
            resolve: {
                go : function (authService) {
                        if (!authService.token) {
                        windows.location.href="baidu.com";
                        }
                    }
            }*/
          })
          .state('activity', {
            url: '/activity',
            abstract: true,
            templateUrl: 'templates/navi/navi-pitch.html'/*,
            resolve: {
                go : function (authService) {
                        if (!authService.token) {
                        windows.location.href="baidu.com";
                        }
                    }
            }*/
          })

  }])



angular.module('app')
  .config(function($stateProvider){
    $stateProvider
      .state('dprt.list',{
        url: '/dprtList/:dprt&:current',
        templateUrl: 'templates/dprt/dprt-list.html',
        controller: function($scope,$stateParams,$state,dprtlist,alertService){

          var current = $stateParams.current | 0
          var dprt = $stateParams.dprt


          dprtlist.show({
            current : current,
            dprt : $stateParams.dprt})

            .then(function({ data }) {
                $scope.members = data.members
                $scope.current = data.current
                $scope.total = data.total
                for(member in $scope.members){
                    member.isPassed = member.schedule;
                }
            } )

            .catch(function({ message }) {
              alertService.alertbox('danger', message)
            })


          $scope.pagenext = function () {
            if ((current + 1) <= $scope.total) {
              $state.go('dprt.list', { dprt: $scope.dprt, current: current + 1 })
            } else {
              alertService.alertbox('danger', '已经是最后一页')
            }
          }

          $scope.pageprev = function () {
            if ((current - 1) >= 1) {
              $state.go('dprt.list', { dprt: $scope.dprt, current: current - 1 })
            } else {
              alertService.alertbox('danger', '已经是第一页')
            }
          }



        }
      })
  })



  angular.module('app')
  .config(function($stateProvider){
    $stateProvider
      .state('activity.add',{
        url: '/add',
        templateUrl: 'templates/activity/activity-add.html',
        controller : function($scope,$state,$timeout,activity,alertService){

          $scope.clear = function () {
            console.log($scope.addform)
            $scope.name=$scope.date=$scope.time=$scope.place=$scope.person=$scope.respondNum=$scope.indispensable=$scope.boyFirst=null
            $scope.addform.$setPristine();
            $scope.addform.$setUntouched();

          }

          $scope.add = function () {

            $scope.flag = true

            activity.add({
              name: $scope.name,
              date: $scope.date,
              time: $scope.time,
              place: $scope.place,
              person: $scope.person,
              respondNum: $scope.respondNum,
              indispensable: $scope.indispensable,
              boyFirst: $scope.boyFirst
            })
              .then(function({data}) {
                alertService.alertbox('success', '活动添加成功')
                var id = data.id
                $timeout(function()  { $state.go('pitch.detail', { id : id }) }, 1500)
              })
              .catch(function({ message }) {
                alertService.alertbox('danger', message)
              })

              .then(function() {
                $scope.flag = false
              })

        }
      }})
  })



angular.module('app')
  .config(function($stateProvider){
    $stateProvider
      .state('activity.detail',{
        url: '/detail/:id',
        templateUrl: 'templates/activity/activity-detail.html',
        controller: function($scope,$stateParams,activity,alertService){



          var id =  $stateParams.id

           activity.show({id})

            .then(function({ data })  {
              $scope.activity = data.activity
              $scope.persons = data.persons
            })
            .catch(function({ message }) {
              alertService.alertbox('danger', message)
            })

        }
      })
  })



angular.module('app')
  .config(function($stateProvider){
    $stateProvider
      .state('activity.edit',{
        url: '/edit/:id',
        templateUrl: 'templates/activity/activity-edit.html',
        controller: function($scope,$stateParams,$state,activity,alertService){



          const id = $stateParams.id

          $scope.content = []

          activity.editshow({ id })

            .then(function ({ data }) {
              $scope.name = data.activity.name
              $scope.date = data.activity.date
              $scope.time = data.activity.time
              $scope.place= data.activity.place
              $scope.personNum = data.activity.personNum
              $scope.respond = data.activity.respond
              $scope.department = data.activity.department
              $scope.boyFirst = data.activity.boyFir

              $scope.content.name = data.activity.name
              $scope.content.date = data.activity.date
              $scope.content.time = data.activity.time
              $scope.content.place= data.activity.place
              $scope.content.personNum = data.activity.personNum
              $scope.content.respond = data.activity.respond
              $scope.content.department = data.activity.department
              $scope.content.boyFirst = data.activity.boyFirst
            })
            .catch(function({ message }){
              alertService.alertbox('danger', message)
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
              $scope.editform.$setPristine();
              $scope.editform.$setUntouched();
          }


          $scope.edit = function () {

            $scope.flag = true

            activity.edit({
              id: id,
              name: $scope.name,
              date: $scope.date,
              time: $scope.time,
              place: $scope.place,
              personNum: $scope.personNum,
              respond: $scope.respond,
              department: $scope.department,
              respond: $scope.respond,
              boyFirst: $scope.boyFirst
            })
            .then(function()  {
                alertService.alertbox('success', '活动修改成功')
                setTimeout(function() { $state.go('activity.detail',{id : id}) }, 1500)
              })
              .catch(function({ message })  {
                alertService.alertbox('danger', message)
              })

              .then(function()  {
                $scope.flag = false
              })

        }
      }
    })
  })



angular.module('app')
  .config(function($stateProvider){
    $stateProvider
      .state('pitch.detail',{
        url: '/detail/:id',
        templateUrl: 'templates/pitch/pitch-detail.html',
        controller: function($scope,$stateParams,$state,$timeout,pitch,alertService){

          var id = $stateParams.id

          pitch.detail({id})

            .then(function({ data }) {
                $scope.detail = data.detail
                $scope.activitys = data.activitys
                $scope.isPublish = data.detail.publish
            })
            .catch(function({ message }) {
              alertService.alertbox('danger', message)
            })




            $scope.download = function () {
                document.execCommand('SaveAs',true,'NameList.excel');
            }


            $scope.new = function () {
                $state.go('activity.add')
            }

            $scope.publish = function () {

            pitch.publish({id})

            .then(function({ data }) {
                function golist(){
                    $state.go('pitch.list')
                }
                if (data.whether==true) {
                alertService.alertbox('success', '发布成功')
                $timeout(golist,1200)
            } else {
                alertService.alertbox('danger', '发布失败')
                $timeout(golist,1200)
            }
            })
            .catch(function({ message }) {
                alertService.alertbox('danger', message)
              })
            }





            }
        })
      })



angular.module('app')
  .config(function($stateProvider){
    $stateProvider
      .state('pitch.list',{
        url: '/pitchList',
        templateUrl: 'templates/pitch/pitch-list.html',
        controller: function($scope,pitch){

          pitch.show()

          .then(function({ data }) {
              $scope.pitchs = data.pitchs
            })

            .catch(function({ message }) {
              alertService.alertbox('danger', message)
            })



}
      })
  })


angular.module('app')
    .controller('pitchAddModal',function($scope,$stateParams,$timeout,$state,pitch,alertService){




        $scope.flag = false
        $scope.open = function(){
            $scope.show = true
        }
        $scope.cancel = function(){
            $scope.show = false
        }

        $scope.add = function(){
            var name = $scope.name
            var note = $scope.note

        pitch.add({
          name: name,
          note: note
        })
        .then(function({ data }) {
          alertService.alertbox('success', '添加成功')
            $scope.flag = false
            $state.go('pitch.detail',100)
            /*$timeout(window.location.href ='#/pitch/detail/' + data.id , 1500)*/
        })
        .catch(function({ message }) {
          alertService.alertbox('danger', message)
        })
      }


    })



angular.module('app')
  .config(function($stateProvider){
    $stateProvider
      .state('user.info',{
        url: '/info',
        templateUrl: 'templates/user/info.html',
        controller : function($scope,$stateParams,userService){


                var id = 1
                userService.show({id})//auth?token?
                .then(function ({ data }) {
                  $scope.content = data
                })
        }
      })
  })


angular.module('app')
  .config(function($stateProvider){
    $stateProvider
      .state('user.schedule',{
        url: '/schedule',
        templateUrl: 'templates/user/schedule.html',
        controller: function($scope,$stateParams,userService,$state,alertService){


          var id = $stateParams.id


          userService.scheduleShow( {id})

            .then(function({ data })  {
              $scope.classstatus = data.classstatus
              $scope.class = data.class






            })

            .catch(function({ message }) {
              alertService.alertbox('danger', message)
            })

            $scope.blue = function (){

            }

            $scope.reset = function ($scope){
              $scope.scheduleForm.$setPristine();
              $scope.scheduleForm.$setUntouched();
            }


            $scope.edit = function (){
                $scope.flag = true
              userService.scheduleEdit({
                id : id,
                lesson: lesson
              })

            .then(function({ data }) {{
               alertService.alertbox('success', '修改成功')
                setTimeout(function() { $state.go('user.schedule') }, 1500)
            }
            })

            .catch(function({ message }) {
              alertService.alertbox('danger', message)
            })
            .then(function(){
                $scope.flag = false
              })

            }


        }
      })
  })

