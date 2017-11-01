function ItunesService() {

  var genreStyleClasses = {
    default: {
      genres: ['default'],
      count: 0,
      elements: {
        headerRow: {
          id: 'header-row',
          styleClass: 'header-row-background-default'
        },
        songsRow: {
          id: 'songs-row',
          styleClass: 'songs-row-background-default'
        },
        songWrapper: {
          id: 'song-wrapper',
          styleClass: 'song-wrapper-background-default'
        }
      }
    },
    alternate1: {
      genres: ['Hip-Hop/Rap'],
      count: 0,
      elements: {
        headerRow: {
          id: 'header-row',
          styleClass: 'header-row-background-alternate-1'
        },
        songsRow: {
          id: 'songs-row',
          styleClass: 'songs-row-background-alternate-1'
        },
        songWrapper: {
          id: 'song-wrapper',
          styleClass: 'song-wrapper-background-alternate-1'
        }
      }
    },
    alternate2: {
      genres: ['Pop', 'Alternative', 'Electronic'],
      count: 0,
      elements: {
        headerRow: {
          id: 'header-row',
          styleClass: 'header-row-background-alternate-2'
        },
        songsRow: {
          id: 'songs-row',
          styleClass: 'songs-row-background-alternate-2'
        },
        songWrapper: {
          id: 'song-wrapper',
          styleClass: 'song-wrapper-background-alternate-2'
        }
      }
    }
  }

  this.getGenreStyleClasses = function getGenreStyleClasses() {
    return JSON.parse(JSON.stringify(genreStyleClasses))
  }

  this.getMusicByArtist = function (artist) {

    //allows requests to localhost: 8080 otherwise blocked by itunes
    var url = '//bcw-getter.herokuapp.com/?url=';
    var url2 = 'https://itunes.apple.com/search?term=' + artist;
    var apiUrl = url + encodeURIComponent(url2);

    //changes the button to loading while songs load
    $('#get-music-button').text('LOADING....');

    //modifies the objects to reduce the excess data
    return $.getJSON(apiUrl).then(function (response) {
      var songList = response.results.map(function (song) {
        return {
          title: song.trackName,
          albumArt: song.artworkUrl100, // Slightly better resolution than using .artworkUrl60
          artist: song.artistName,
          collection: song.collectionName,
          albumPrice: song.collectionPrice,
          trackPrice: song.trackPrice,
          preview: song.previewUrl,
          currency: song.currency,
          fileType: song.kind,
          genre: song.primaryGenreName
        };
      })
      //changes button back to GET MUSIC once songs are loaded
      $('#get-music-button').text('GET MUSIC');
      return songList;
    })
  }
}