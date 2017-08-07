angular.module('app',[])

  .service('activity', '$requestService',function($requestService) {
    // body...

    return {

      show(data) {
        return requestService.post('activity/activityDetail', { data })
      },

      add(data) {
        return requestService.post('activity/activityAdd', { data })
      },

      editshow(data) {
        return requestService.post('activity/activityDetail', { data })

      },

      edit(data) {
        return requestService.post('activity/activityEdit', { data })
      }
    }
  })
