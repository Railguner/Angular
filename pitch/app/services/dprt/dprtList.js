angular.module('app')

  .service('dprtlist', '$requestService',function($requestService) {
    // body...

    return {

      show(data) {
        return requestService.post('dprt/dprtlist', { data })
      },

      scheduleShow(data) {
        return requestService.post('user/scheduleShow',{data})
      },

      scheduleAllow(data) {
      	return requestService.post('user/scheduleAllow',{data})
      }

      }
    }
  )
