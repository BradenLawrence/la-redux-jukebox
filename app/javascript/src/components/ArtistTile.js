import React from 'react'

const ArtistTile = props => {
  return(
    <div
      onClick={props.handleSelect}
      className={`tile ${props.selected ? 'selected' : ''}`}
      >
      <h3>
        {props.artist.name}
      </h3>
    </div>
  )
}

export default ArtistTile
