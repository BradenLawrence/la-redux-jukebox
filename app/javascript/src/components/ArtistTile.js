import React from 'react'

const ArtistTile = props => {
  return(
    <div className='tile'>
      <h3 onClick={props.handleSelect}>
        {props.artist.name}
      </h3>
    </div>
  )
}

export default ArtistTile
