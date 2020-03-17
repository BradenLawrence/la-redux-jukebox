import React, { Component } from 'react'
import { connect } from 'react-redux'

import SongTile from '../components/SongTile'

class SongsIndexContainer extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const songTiles = this.props.artistSongs.map(song => {
      const addSong = () => {
        // add your code here
      }
      return(
        <SongTile
          key={song.id}
          song={song}
          handleClick={addSong}
          type='add'
        />
      )
    })

    return(
      <div className='columns small-10 medium-4'>
        <h1>Available Songs</h1>
        {songTiles}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { artistSongs: state.playlists.artistSongs }
}
export default connect(mapStateToProps)(SongsIndexContainer)
