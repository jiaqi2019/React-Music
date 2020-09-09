import React, {useState, useEffect} from 'react';
import Wrapper from './Wrapper'
import MusicList from '../../compontents/MusicList'
import {connect} from 'react-redux'
import {useRouteMatch, useHistory} from 'react-router-dom'
import {loadSongList} from './processData'

function RankDetail({ rank = {}}) {
  const [songs, setSongs ] = useState([])
  
  const [title, setTitle ] = useState('')
  
  const match = useRouteMatch('/rank/' + rank.id)
  const history = useHistory()
  useEffect(() => {
    if (!match) {
      history.push('/rank')
    } else {
      (async function (){
        let [title, songs] = await loadSongList(rank.id)
        setTitle(title)
        setSongs(songs)
      })()
    }
  }, [])

  return (
    <Wrapper>
      <MusicList songs={songs} rank={true} title={title} img={getImg(songs, rank)}></MusicList>
    </Wrapper>
  )
}

function getImg(songs, rank) {
  if(songs[0]){
    return songs[0].image
  }else{
      return rank.picUrl
  }
}

function mapStateToProps(state) {
  return {
    rank: state.rankReducer.selectedRank,
  }
}

export default connect(mapStateToProps, null)(RankDetail)


