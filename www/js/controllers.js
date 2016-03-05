angular.module('starter.controllers', ['firebase'])

.controller('DashCtrl', function($scope, $state) {

  $scope.logout = function(){
    $state.go('login');
  }

})

.controller('LoginCtrl', function($scope, $state, $firebaseAuth) {

  $scope.user = [{
    email:'',
    password:''
  }];

  var fbobject = new Firebase("https://caribtest79664.firebaseio.com");

  $scope.authObj = $firebaseAuth(fbobject);

  $scope.FirebaseLogin = function(){

    //white-box testing is only for n00bs like me!
    console.log($scope.user.email,$scope.user.password);

    //grab user credentials
    var user_email = $scope.user.email;
    var user_password = $scope.user.password;

    //Authenticate using Firebase Auth
    $scope.authObj.$authWithPassword({
      email: user_email,
      password: user_password
    })
    .then(function(authData) {

      console.log("Logged in as:", authData.uid); //if successful
      //Switch to the dashboard
      $state.go('tab.dash');

    }).catch(function(error) {
      console.error("Authentication failed:", error); //if an error occurs
    });



  }

})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
