
angular.module( 'app.chatroom', [
  'ui.router',
])

.config(function config( $stateProvider ) {
  $stateProvider.state( 'chatroom', {
    url: '/chatroom',
    views: {
      "main": {
        controller: 'ChatroomCtrl',
        templateUrl: 'chatroom/chatroom.tpl.html'
      }
    },
    data:{ pageTitle: 'Chatroom' }
  });
})

.controller( 'ChatroomCtrl', function ( ) {

})

;

