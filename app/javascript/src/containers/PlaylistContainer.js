import React, { Component } from 'react'
import { connect } from 'react-redux'

import SongTile from '../components/SongTile'

class PlaylistContainer extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    // change this variable below once this container has access to the `playlistSongs` in state
    const playlistSongs = []

    const songTiles = playlistSongs.map(playlistSong => {
      return(
        <SongTile
          key={playlistSong.id}
          song={playlistSong.song}
          // below can be left alone until working on Exceeds functionality
          handleClick={() => {}}
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

export default PlaylistContainer
