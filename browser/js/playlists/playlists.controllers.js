'use strict';

juke.controller('PlaylistCtrl', function ($scope, PlaylistFactory, $state) {
// Creating a new playlist
  $scope.showWarning = false;

  var clearInputField = function () {
    return $scope.makePlaylist.playlistName.$setPristine();
  };

  $scope.submit = function () {
    // What is the correct parameter to pass into .create below?
    console.log($scope.newPlaylist);
    PlaylistFactory.create($scope.newPlaylist)
    .then(function (playlist) {
      $scope.newPlaylist = {};
      clearInputField();
      $state.go('singlePlaylist', { playlistId: playlist.id });
    });
  };
});

// In fact ui-router exposes a $state factory with a .go method that allows us to change state dynamically, from our Javascript!

// In the controller for creating a new playlist, first try triggering a simple $state.go('albums') that happens after we create a playlist. Next, change the $state.go to direct us to the proper state (the playlist we just created). Use the docs linked above.

juke.controller('PlaylistsCtrl', function ($scope, PlaylistFactory) {
// Displaying all playlists
  PlaylistFactory.fetchAll()
  .then(function (allPlaylists) {
    $scope.allPlaylists = allPlaylists;
  });

});

juke.controller('SinglePlaylistCtrl', function ($scope, PlayerFactory, thePlaylist) {
// Viewing a single playlist page
  $scope.playlist = thePlaylist;

  $scope.toggle = function (song) {
    if (song !== PlayerFactory.getCurrentSong()) {
      PlayerFactory.start(song, $scope.playlist.songs);
    } else if ( PlayerFactory.isPlaying() ) {
      PlayerFactory.pause();
    } else {
      PlayerFactory.resume();
    }
  };

  $scope.getCurrentSong = function () {
    return PlayerFactory.getCurrentSong();
  };

  $scope.isPlaying = function (song) {
    return PlayerFactory.isPlaying() && PlayerFactory.getCurrentSong() === song;
  };

});
