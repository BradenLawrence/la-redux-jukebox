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

export {
  playlists,
  getArtists
}
