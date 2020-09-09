import React, { useState, useRef, useLayoutEffect } from 'react';
import { connect } from 'react-redux'
import { useHistory  } from 'react-router-dom'

import Wrapper from './Wrapper'
import IconFont from '../../compontents/IconFont'
import Switches from '../../compontents/Switches'
import NoResult from '../../compontents/NoResult'
import {randomPlayAll, insertSong} from '../Player/actions'
import ScrollList from './ScrollList' 
import Song from '../../common/js/song'
import withPlayLIst from '../../hoc/withPlayLIst'
import {useHandlePlayList} from '../../utils/handlePlayList'

function UserPage({ favoriteSongs, playHistory, randomPlayAll, insertSong, playlist }) {
  const switches = [
    {
        title:'我的收藏'
    },
    {
        title:'最近播放'
    }
  ]
  const [switchesIndex, setIndex] = useState(0)
  const [scrollData, setData] = useState([])
  const likeScrollObjRef = useRef()
  // const historyScrollObjRef = useRef()
  const history = useHistory()
  function back() { history.goBack()}
  function switchItme(index) {
    setIndex(index)
  }
  function selectPlay(item, index) {
    insertSong(item)
  }
  function randomPlay() {
    if (!scrollData.length) return 
    randomPlayAll(scrollData)
  }
  useLayoutEffect(() => {
    // setRefreshflg(new Date())
    let data = switchesIndex == 0 ? favoriteSongs : playHistory
    setData(data)
  }, [switchesIndex, playHistory, favoriteSongs ])

  const [refresh, setRefresh] = useState(0)
  const wrapperRef = useRef()
  useHandlePlayList(playlist, handlePlaylist)
  function handlePlaylist(playlist, height) {
    height = playlist.length ? height : 0
    wrapperRef.current.style.bottom = height
    setRefresh(new Date())
  }



  return (
    <Wrapper ref={wrapperRef}>
      <div className="back" onClick={back}>
        <IconFont type="icon-back" />
      </div>
      <div className="switches-wrapper">
        <Switches options={switches} select={switchesIndex} switchItme={switchItme} />
      </div>
      <div className="play" onClick={randomPlay}>
        <IconFont type="icon-play" />
        <span className="text">随机播放全部</span>
      </div>
      <div className="list-wrapper">
        <ScrollList scrollRef={likeScrollObjRef} data={scrollData} refresh={refresh} selectSong={selectPlay}/>
        <div className="no-result-wrapper">
          <NoResult title={'没有记录'} show={!scrollData.length} />
        </div>
      </div>
    </Wrapper>
  )
}

function mapStateToProps(state) {
  return {
    playHistory: state.playerReducer.playHistory.map(song=>new Song(song)),
    favoriteSongs: state.playerReducer.favoriteSongs.map(song=>new Song(song)),
  }
}

function mapDispatchToProps (dispatch) {
  return {
    randomPlayAll: (value) => { dispatch(randomPlayAll(value)) },
    insertSong: (value) =>{dispatch(insertSong(value))}
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(withPlayLIst(UserPage))
