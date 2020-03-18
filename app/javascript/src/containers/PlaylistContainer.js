import React, { Component } from 'react'
import { connect } from 'react-redux'
import { destroyPlaylistSong } from '../modules/playlists'
import SongTile from '../components/SongTile'

class PlaylistContainer extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const songTiles = this.props.playlistSongs.map(playlistSong => {
      const handleClick = () => {
        this.props.destroyPlaylistSong(playlistSong)
      }
      return(
        <SongTile
          key={playlistSong.id}
          song={playlistSong.song}
          type='delete'
          handleClick={handleClick}
        />
      )
    })

    return(
      <div className='columns small-10 medium-4'>
        <h1>Current Playlist</h1>
        {songTiles}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    playlistSongs: state.playlists.playlistSongs
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    destroyPlaylistSong: (songData) => dispatch(destroyPlaylistSong(songData))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlaylistContainer)
