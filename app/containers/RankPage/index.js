import React, { useRef, useEffect, useState } from 'react';
import { connect } from 'react-redux'
import { Route, useHistory } from 'react-router-dom'

import Wrapper from './Wrapper'
import Scroll from '../../compontents/Scroll'
import Loading from '../../compontents/Loading'
import LoadingWrapper from '../../compontents/LoadingWrapper'
import Img from '../../compontents/Img'
import {setSelectRank} from './actions'
import RankDetail from '../RankDetail'
import List from '../../compontents/List'
import ListItem from '../../compontents/ListItem'

import {getRank} from '../../api/rank'
import withPlayLIst from '../../hoc/withPlayLIst'
import {useHandlePlayList} from '../../utils/handlePlayList'


function RankPage({ setSelectRank, playlist}) {
  const[ranks, setRanks] = useState([])
  
  const rankRef = useRef()
  const scrollObjRef = useRef()
  const history = useHistory()

  useEffect(() => {
    async function fetchRankList() {
      let res = await getRank()
      setRanks(res.data.topList)
    }
    fetchRankList()
  }, [])

  function selectRank(rank) {
    setSelectRank(rank)
    history.push('/rank/'+ rank.id)
  }

  const [refresh, setRefresh] = useState(0)
  // const MusicListRef = useRef()
  useHandlePlayList(playlist, handlePlaylist)
  function handlePlaylist(playlist, height) {
    height = playlist.length ? height : 0
    rankRef.current.style.bottom = height;
    setRefresh(new Date())
  }


  return (
    <Wrapper ref={rankRef} >
      <Scroll data={ranks} scrollRef={scrollObjRef} className="toplist" refresh={refresh}>
        <List items={ranks} component={(rank, index) => (
          <ListItem key={index} className="rank-item" onClick={() => selectRank(rank) }>
            <Img src={rank.picUrl}  className="item-img" />
            <List items={rank.songList} className="item-songList" component={(song, index) => (
              <ListItem key={index} className="song">{index+1}.{song.songname}</ListItem>
              )}/>
          </ListItem>
        )}/>
      </Scroll>
      <LoadingWrapper show={!ranks.length}>
        <Loading />
      </LoadingWrapper>
      <Route path='/rank/:id' component={RankDetail}/>
   </Wrapper>
  )
}


function mapDispatchToProps(dispatch) {
  return {
    setSelectRank: (rank) => {
      dispatch(setSelectRank(rank))
    }
  }
}

export default connect(null, mapDispatchToProps)(withPlayLIst(RankPage))