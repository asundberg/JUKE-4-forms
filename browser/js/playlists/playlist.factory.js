'use strict';

juke.factory('PlaylistFactory', function ($http, $q, SongFactory) {

  var cachedPlaylists = [];
  var PlaylistFactory = {};

  function getData (res) { return res.data; }

  PlaylistFactory.fetchAll = function () {
    return $http.get('/api/playlists')
    .then(getData)
    .then(function (data) {
      angular.copy(data, cachedPlaylists);
      return cachedPlaylists;
    });
  };

  PlaylistFactory.fetchById = function (id) {
    var url = '/api/playlists/' + id;
    return $q.all([$http.get(url), $http.get(url + '/songs')/*, $http.get(url + '/albums')*/])
    .then(function (responses) { return responses.map(getData); })
    .then(function (results) {
      var playlist = results[0];
      var songs = results[1].map(SongFactory.convert);
      playlist.songs = songs;
      return playlist;
    });
  };

  PlaylistFactory.create = function (playlistName) {
    console.log(playlistName);
    return $http.post('/api/playlists', playlistName)
    .then(getData)
    .then(function (name) {
      var playlist = name;
      cachedPlaylists.push(playlist);
      return playlist;
    });
  };

  return PlaylistFactory;

});

