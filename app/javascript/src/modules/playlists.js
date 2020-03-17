const initialState = {
  artists: [],
  artistSongs: [],
  selectedArtistId: null,
  playlistSongs: [],
  isFetching: false
}

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
    default:
      return state
  }
}

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

export {
  playlists,
  getArtists,
  getArtistSongs
}
