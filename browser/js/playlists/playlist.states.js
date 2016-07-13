'use strict';

juke.config(function ($stateProvider) {

  $stateProvider.state('newPlaylist', {
    url: '/playlists/new',
    templateUrl: '/js/playlists/templates/playlists.html',
    controller: 'PlaylistCtrl'/*,
    resolve: {
      newlist: function (PlaylistFactory, $stateParams) {
        return PlaylistFactory.fetchById($stateParams.playlistId);
      }
    }*/
  });

  $stateProvider.state('singlePlaylist', {
    url: '/playlists/:playlistId',
    templateUrl: '/js/playlists/templates/single-playlist.html',
    controller: 'SinglePlaylistCtrl',
    resolve: {
      thePlaylist: function (PlaylistFactory, $stateParams) {
        return PlaylistFactory.fetchById($stateParams.playlistId);
      }
    }
  });

});

// Go ahead and define a state for creating a new playlist. The view should include a field for entering the name of the playlist, and also a button for submission. Once you've done so, make sure to link up that  PLAYLIST button to this state.
