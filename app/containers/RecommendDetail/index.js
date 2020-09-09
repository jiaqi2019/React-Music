import React, { useState, useEffect } from 'react';
import MusicList from '../../compontents/MusicList'
import { connect } from 'react-redux'
import { loadSongs } from './proccessData'
import { useRouteMatch, useHistory } from 'react-router-dom';

function Disc({ disc = {} }) {
  const [songs, setSongs] = useState([])
  const match = useRouteMatch('/recommend/' + disc.dissid)
  const history = useHistory()

  useEffect(() => {
    if (!match) {
      history.push('/recommend')
      return
    }
    getSongs(disc.dissid)
  }, [])

  async function getSongs(id) {
    let songs = await loadSongs(id)
    setSongs(songs)
  }

  return (
    <div>
      <MusicList songs= {songs} img={disc.imgurl} title={disc.dissname} rank={false} />
    </div>
  )
}

function mapStateToProps(state) {
  return {
    disc: state.RecommendReducer.disc
  }
}


export default connect(mapStateToProps, null)(Disc)


























