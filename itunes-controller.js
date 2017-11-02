function ItunesController() {
  var itunesService = new ItunesService()
  //Do Not Modify the getMusic function
  this.getMusic = function getMusic(e) {
    e.preventDefault();
    var artist = e.target.artist.value;
    itunesService.getMusicByArtist(artist).then(draw); //after get music by artist returns what are you doing with the objects?
  }

  //Start coding here

  function draw(songList) {
    console.log(songList)
    var template = ''
    var genreStyles = itunesService.getGenreStyleClasses()
    var mostCommonGenreStyle = 'default'

    // iterate through genreStyles, determine most common genre in songList
    for (var i = 0; i < songList.length; i++) {
      var song = songList[i]
      for (var styleType in genreStyles) {
        if (genreStyles[styleType].genres.includes(song.genre)) {
          genreStyles[styleType].count += 1
        } 
        if (genreStyles[styleType].count > genreStyles[mostCommonGenreStyle].count) {
          mostCommonGenreStyle = styleType
        }
      }
    }

    for (var i = 0; i < songList.length; i++) {
      var song = songList[i]
      console.log(mostCommonGenreStyle)
      
      for (var prop in song) {
        if (song[prop] === undefined) {
          song[prop] = ''
        }
      }
      
      if (song.fileType === 'music-video' || song.fileType ==='feature-movie') {
        song.fileType = 'video'
      }

      var albumArt = song.albumArt.replace('100x100bb', '400x400bb') //Increase image resolution
      var templates = {
        'video': ` <div class="col-sm-6 flex v-center h-center">
                              <div id="song-wrapper" class="song-wrapper ${genreStyles[mostCommonGenreStyle].elements.songWrapper.styleClass} panel panel-default text-center">
                                <div class="panel-body text-center">
                                  <p class="song-title">${song.title}</p>
                                  <p class="artist-name">${song.artist}</p>
                                  <video src="${song.preview}" controls></video>
                                  <p class="album-title">${song.collection}</p>               
                                  <p class="album-price">Album Price: 
                                  ${(song.currency === 'USD') ? ('$' + song.albumPrice) : (song.albumPrice + ' ' + song.currency)}</p>
                                </div>
                              </div>
                            </div>
                            `,
        'song': ` <div class="col-sm-6 flex v-center h-center">
                              <div id="song-wrapper" class="song-wrapper ${genreStyles[mostCommonGenreStyle].elements.songWrapper.styleClass} panel panel-default text-center">
                                <div class="panel-body">
                                  <img class="song-image" src="${albumArt}" alt="">
                                  <p class="song-title">${song.title}</p>
                                  <p class="artist-name">${song.artist}</p>
                                  <p class="album-title">${song.collection}</p>
                                  <audio src="${song.preview}" controls></audio>                    
                                  <p class="album-price">Album Price: 
                                  ${(song.currency === 'USD') ? ('$' + song.albumPrice) : (song.albumPrice + ' ' + song.currency)}</p>
                                </div>
                              </div>
                            </div>
                            `
      }
      if (templates.hasOwnProperty(song.fileType)) {
        template += templates[song.fileType]
        document.getElementById('songs').innerHTML = template
      }
    }

    for (var styleType in genreStyles) {
      if (styleType === mostCommonGenreStyle) {
        for(var element in genreStyles[styleType].elements) {
          console.log(genreStyles[styleType].elements[element].id)
          console.log(genreStyles[styleType].elements[element].styleClass)
          document.getElementById(genreStyles[styleType].elements[element].id).classList.add(genreStyles[styleType].elements[element].styleClass)
        }
      } else {
        for(var element in genreStyles[styleType].elements) {
          document.getElementById(genreStyles[styleType].elements[element].id).classList.remove(genreStyles[styleType].elements[element].styleClass)
        }
      }
    }

  }
}
