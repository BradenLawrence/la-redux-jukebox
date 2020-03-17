import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getArtists, getArtistSongs } from '../modules/playlists'
import ArtistTile from '../components/ArtistTile'

class ArtistsIndexContainer extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.getArtists()
  }

  render() {
    const artistTiles = this.props.artists.map(artist => {
      const selected = this.props.selectedId === artist.id

      return(
        <ArtistTile
          key={artist.id}
          artist={artist}
          selected={selected}
        />
      )
    })

    return (
      <div className='columns small-10 medium-4'>
        <h1>Artists</h1>
        {artistTiles}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    artists: state.playlists.artists,
    selectedId: state.playlists.selectedArtistId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getArtists: () => dispatch(getArtists()),
    getArtistSongs: (artistId) => dispatch(getArtistSongs(artistId))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArtistsIndexContainer)
