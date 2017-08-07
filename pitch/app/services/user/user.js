angular.module('app',[])

  .service('userService', '$requestService',function($requestService) {
    // body...
  

    return {



      logout(user) {
        requestService.post('User/logout', requestService.auth())
        $cookies.remove('token')
      },

      show(data) {
        return requestService.post('user/info',{data})
      },

      scheduleShow(data) {
        return requestService.post('user/scheduleShow',{data})
      },

      scheduleEdit(data) {
        return requestService.post('user/scheduleEdit',{data})
      },

      password(editmsg) {
        return requestService.post('User/pwEdit', {
          data: {
            old: md5(editmsg.old),
            cfrm: md5(editmsg.cfrm),
            'new': md5(editmsg['new']),
          }
        })
      }

      }
    }


  )
