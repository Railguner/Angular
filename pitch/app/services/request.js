angular.module('app',[])

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
//////////////
      post(action, data = {}) {
        if (authService && data instanceof Object) {
          data.auth = this.auth()
        }
        return $http.post(host + action, data).then(function(response){

          authService.setToken(response.data.token)

          switch (response.data.code) {
            case 302: // 账号异常，请重新登录
              //$state.go('login')
              break
          }

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
      },

      auth() {
        var timestamp = Date.now()
        var token = authService.token
        return `${token}.${timestamp}.${encrypt(`${token}:${timestamp}`)}`
      }
    }
  })
