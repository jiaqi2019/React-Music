import React from 'react';
import Scroll from '../../compontents/Scroll'
import SongList from '../../compontents/SongList'


export default function (props) {
  return (
    <Scroll className="list-scroll" {...props}>
      <div className="list-inner">
        <SongList songs={props.data} selectSong={props.selectSong} />
      </div>
    </Scroll>
  )
} 