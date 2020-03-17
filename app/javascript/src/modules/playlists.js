const initialState = {
  artists: [],
  artistSongs: [],
  selectedArtistId: null,
  playlistSongs: [],
  isFetching: false
}

const playlists = (state = initialState, action) => {
  switch(action.type) {
    default:
      return state
  }
}

export {
  playlists
}
