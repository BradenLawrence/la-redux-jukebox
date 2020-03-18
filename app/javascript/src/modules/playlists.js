const initialState = {
  playlistSongs: [],
  isFetching: false
}

// Reducer
const playlists = (state = initialState, action) => {
  switch(action.type) {
    case GET_PLAYLIST_SONGS_REQUEST:
      return { ...state, isFetching: true }
    case GET_PLAYLIST_SONGS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        playlistSongs: action.playlistSongs
      }
    case GET_PLAYLIST_SONGS_FAILURE:
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
const GET_PLAYLIST_SONGS_REQUEST = "GET_PLAYLIST_SONGS_REQUEST"
const getPlaylistSongsRequest = () => ({ type: GET_PLAYLIST_SONGS_REQUEST })

const GET_PLAYLIST_SONGS_SUCCESS = "GET_PLAYLIST_SONGS_SUCCESS"
const getPlaylistSongsSuccess = (playlistSongs) => {
  return {
    type: GET_PLAYLIST_SONGS_SUCCESS,
    playlistSongs
  }
}

const GET_PLAYLIST_SONGS_FAILURE = "GET_PLAYLIST_SONGS_FAILURE"
const getPlaylistSongsFailure = () => ({ type: GET_PLAYLIST_SONGS_FAILURE })

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
const getPlaylistSongs = () => {
  return (dispatch) => {
    dispatch(getPlaylistSongsRequest())
    return fetch("api/v1/playlist_songs")
    .then(response => {
      if(response.ok) {
        return response.json()
      } else {
        dispatch(getPlaylistSongsFailure())
        return { error: "Error fetching playlist" }
      }
    })
    .then(playlistSongs => {
      if(!playlistSongs.error) {
        dispatch(getPlaylistSongsSuccess(playlistSongs))
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
  getPlaylistSongs,
  postPlayListSong,
  destroyPlaylistSong
}
