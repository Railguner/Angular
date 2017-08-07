angular.module('app',[])

  .service('pitch', '$requestService',function($requestService) {
    // body...

    return {

      show() {
        return requestService.post('pitch/listall')
      },

      add(data) {
        return requestService.post('pitch/pitchAdd', { data })
      },

      detail(data) {
        return requestService.post('pitch/pitchDetail', { data })
      },

      publish(data) {
        return requestService.post('pitch/publish', { data })
      }
    }
  })
