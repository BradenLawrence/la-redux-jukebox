const initialState = {
  artists: [],
  artistSongs: [],
  selectedArtistId: null,
  isFetching: false
}

// Reducer
const library = (state=initialState, action) => {
  switch(action.type) {
    case GET_ARTISTS_REQUEST:
      return { ...state, isFetching: true }
    case GET_ARTISTS_SUCCESS:
      return { ...state, isFetching: false, artists: action.artists }
    case GET_ARTISTS_FAILURE:
      return { ...state, isFetching: false }
    case SELECT_ARTIST:
      return { ...state, selectedArtistId: action.id}
    case GET_ARTIST_SONGS_REQUEST:
      return { ...state, isFetching: true }
    case GET_ARTIST_SONGS_SUCCESS:
      return { ...state, isFetching: false, artistSongs: action.songs }
    case GET_ARTIST_SONGS_FAILURE:
      return { ...state, isFetching: false }
    default:
      return state
  }
}

// Action creators
const GET_ARTISTS_REQUEST = "GET_ARTISTS_REQUEST"
const getArtistsRequest = () => ({ type: GET_ARTISTS_REQUEST })

const GET_ARTISTS_SUCCESS = "GET_ARTISTS_SUCCESS"
const getArtistsSuccess = (artists) => ({ type: GET_ARTISTS_SUCCESS, artists })

const GET_ARTISTS_FAILURE = "GET_ARTISTS_FAILURE"
const getArtistsFailure = () => ({ type: GET_ARTISTS_FAILURE })

const SELECT_ARTIST = "SELECT_ARTIST"
const selectArtist = (id) => ({ type: SELECT_ARTIST, id })

const GET_ARTIST_SONGS_REQUEST = "GET_ARTIST_SONGS_REQUEST"
const getArtistSongsRequest = () => ({ type: GET_ARTIST_SONGS_REQUEST })

const GET_ARTIST_SONGS_SUCCESS = "GET_ARTIST_SONGS_SUCCESS"
const getArtistSongsSuccess = (songs) => {
  return {
    type: GET_ARTIST_SONGS_SUCCESS,
    songs
  }
}

const GET_ARTIST_SONGS_FAILURE = "GET_ARTIST_SONGS_FAILURE"
const getArtistSongsFailure = () => ({ type: GET_ARTIST_SONGS_FAILURE })

// Thunk actions
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
    dispatch(getArtistSongsRequest())
    return fetch(`api/v1/artists/${artistId}/songs`)
    .then(response => {
      if(response.ok) {
        return response.json()
      } else {
        dispatch(getArtistSongsFailure())
        return { error: "Error fetch songs" }
      }
    })
    .then(songs => {
      if(!songs.error) {
        dispatch(getArtistSongsSuccess(songs))
      }
    })
  }
}

export {
  library,
  getArtists,
  getArtistSongs
}
