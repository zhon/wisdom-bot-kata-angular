angular.module( 'app', [
  'templates-app',
  'templates-common',
  'app.chatroom',
  'app.about',
  'ui.bootstrap',
])

.config( function myAppConfig ( $stateProvider, $urlRouterProvider ) {
  $urlRouterProvider.otherwise( '/chatroom' );
})

.run( function run ( ) {
})

/*jshint -W098 */
.controller( 'AppCtrl', function AppCtrl ( $scope, $location ) {
  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
    if ( angular.isDefined( toState.data.pageTitle ) ) {
      $scope.pageTitle = toState.data.pageTitle;
    }
  });
})

;

