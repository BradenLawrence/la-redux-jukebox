const initialState = {
  artists: [],
  artistSongs: [],
  selectedArtistId: null,
  playlistSongs: [],
  isFetching: false
}

// Reducer
const playlists = (state = initialState, action) => {
  switch(action.type) {
    case GET_ARTISTS_REQUEST:
      return { ...state, isFetching: true }
    case GET_ARTISTS_SUCCESS:
      return { ...state, isFetching: false, artists: action.artists }
    case GET_ARTISTS_FAILURE:
      return { ...state, isFetching: false }
    case SELECT_ARTIST:
      return { ...state, selectedArtistId: action.id}
    case DISPLAY_ARTIST_SONGS_REQUEST:
      return { ...state, isFetching: true }
    case DISPLAY_ARTIST_SONGS_SUCCESS:
      return { ...state, isFetching: false, artistSongs: action.songs }
    case DISPLAY_ARTIST_SONGS_FAILURE:
      return { ...state, isFetching: false }
    case POST_PLAYLIST_SONG_REQUEST:
      return { ...state, isFetching: true }
    case POST_PLAYLIST_SONG_SUCCESS:
      return { ...state, isFetching: false, playlistSongs: [
        ...state.playlistSongs,
        action.playlistSong
      ]}
    case POST_PLAYLIST_SONG_FAILURE:
      return { ...state, isFetching: false }
    case DESTROY_PLAYLIST_SONG_REQUEST:
      return { ...state, isFetching: true }
    case DESTROY_PLAYLIST_SONG_SUCCESS:
      const updatedPlaylist = state.playlistSongs.filter(song => {
        return song.id !== action.playlistSong.id
      })
      return { ...state, isFetching: false, playlistSongs: updatedPlaylist }
    case DESTROY_PLAYLIST_SONG_FAILURE:
      return { ...state, isFetching: false }
    default:
      return state
  }
}

// Action Creators
const GET_ARTISTS_REQUEST = "GET_ARTISTS_REQUEST"
const getArtistsRequest = () => ({ type: GET_ARTISTS_REQUEST })

const GET_ARTISTS_SUCCESS = "GET_ARTISTS_SUCCESS"
const getArtistsSuccess = (artists) => ({ type: GET_ARTISTS_SUCCESS, artists })

const GET_ARTISTS_FAILURE = "GET_ARTISTS_FAILURE"
const getArtistsFailure = () => ({ type: GET_ARTISTS_FAILURE })

const SELECT_ARTIST = "SELECT_ARTIST"
const selectArtist = (id) => ({ type: SELECT_ARTIST, id })

const DISPLAY_ARTIST_SONGS_REQUEST = "DISPLAY_ARTIST_SONGS_REQUEST"
const displayArtistSongsRequest = () => ({ type: DISPLAY_ARTIST_SONGS_REQUEST })

const DISPLAY_ARTIST_SONGS_SUCCESS = "DISPLAY_ARTIST_SONGS_SUCCESS"
const displayArtistSongsSuccess = (songs) => {
  return {
    type: DISPLAY_ARTIST_SONGS_SUCCESS,
    songs
  }
}

const DISPLAY_ARTIST_SONGS_FAILURE = "DISPLAY_ARTIST_SONGS_FAILURE"
const displayArtistSongsFailure = () => ({ type: DISPLAY_ARTIST_SONGS_FAILURE })

const POST_PLAYLIST_SONG_REQUEST = "POST_PLAYLIST_SONG_REQUEST"
const postPlaylistSongRequest = () => ({ type: POST_PLAYLIST_SONG_REQUEST })

const POST_PLAYLIST_SONG_SUCCESS = "POST_PLAYLIST_SONG_SUCCESS"
const postPlaylistSongSuccess = (playlistSong) => {
  return {
    type: POST_PLAYLIST_SONG_SUCCESS,
    playlistSong
  }
}

const POST_PLAYLIST_SONG_FAILURE = "POST_PLAYLIST_SONG_FAILURE"
const postPlaylistSongFailure = () => ({ type: POST_PLAYLIST_SONG_FAILURE })

const DESTROY_PLAYLIST_SONG_REQUEST = "DESTROY_PLAYLIST_SONG_REQUEST"
const destroyPlaylistSongRequest = () => ({ type: DESTROY_PLAYLIST_SONG_REQUEST })

const DESTROY_PLAYLIST_SONG_SUCCESS = "DESTROY_PLAYLIST_SONG_SUCCESS"
const destroyPlaylistSongSuccess = (playlistSong) => {
  return {
    type: DESTROY_PLAYLIST_SONG_SUCCESS,
    playlistSong
  }
}

const DESTROY_PLAYLIST_SONG_FAILURE = "DESTROY_PLAYLIST_SONG_FAILURE"
const destroyPlaylistSongFailure = () => ({ type: DESTROY_PLAYLIST_SONG_FAILURE })

// Thunk Actions
const getArtists = () => {
  return (dispatch) => {
    dispatch(getArtistsRequest())
    return fetch("api/v1/artists")
    .then(response => {
      if(response.ok) {
        return response.json()
      } else {
        dispatch(getArtistsFailure())
        return { error: "Error fetching artists" }
      }
    })
    .then(artists => dispatch(getArtistsSuccess(artists)))
  }
}

const getArtistSongs = (artistId) => {
  return (dispatch) => {
    dispatch(selectArtist(artistId))
    dispatch(displayArtistSongsRequest())
    return fetch(`api/v1/artists/${artistId}/songs`)
    .then(response => {
      if(response.ok) {
        return response.json()
      } else {
        dispatch(displayArtistSongsFailure())
        return { error: "Error fetch songs" }
      }
    })
    .then(songs => {
      if(!songs.error) {
        dispatch(displayArtistSongsSuccess(songs))
      }
    })
  }
}

const postPlayListSong = (songData) => {
  return (dispatch) => {
    dispatch(postPlaylistSongRequest())
    return fetch(`api/v1/songs/${songData.id}/playlist_songs`, {
      method: "POST",
      body: JSON.stringify(songData),
      credentials: "same-origin",
      headers: {
        "Accept": "application/json",
        "Content-type": "application/json"
      }
    })
    .then(response => {
      if(response.ok) {
        return response.json()
      } else {
        dispatch(postPlaylistSongFailure())
        return { error: "Error adding song to playlist" }
      }
    })
    .then(playlistSong => {
      dispatch(postPlaylistSongSuccess(playlistSong))
    })
  }
}

const destroyPlaylistSong = (songData) => {
  return (dispatch) => {
    dispatch(destroyPlaylistSongRequest)
    return fetch(`api/v1/playlist_songs/${songData.id}`, {
      method: "DELETE",
      headers: {
        "Accept": "application/json",
        "Content-type": "application/json"
      }
    })
    .then(response => {
      if(response.ok) {
        dispatch(destroyPlaylistSongSuccess(songData))
        return { notice: "Song successfully deleted" }
      } else {
        dispatch(destroyPlaylistSongFailure())
        return { error: "Error deleting song" }
      }
    })
  }
}

export {
  playlists,
  getArtists,
  getArtistSongs,
  postPlayListSong,
  destroyPlaylistSong
}
