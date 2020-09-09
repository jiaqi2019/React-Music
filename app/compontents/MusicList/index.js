import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import Wrapper from './Wrapper'
import Scroll from '../../compontents/Scroll'
import SongList from '../SongList'
import Iconfont from '../../compontents/IconFont'
import Loading from '../../compontents/Loading'
import LoadingWrapper from '../../compontents/LoadingWrapper'
import ConditionDiv from '../../compontents/ConditionDiv'
import { useHistory } from 'react-router';
import {connect} from 'react-redux'
import {selectSong, randomPlayAll} from '../../containers/Player/actions'
import withPlayLIst from '../../hoc/withPlayLIst'
import { useHandlePlayList } from '../../utils/handlePlayList'


function MusicList({ title, songs = [], img, rank, selectSong, randomPlayAll, playlist }) {
  let history = useHistory()
  const [offsetY, setOffsetY] = useState(0)
  const [imgeHeight, setImgHeight] = useState(0)
  const [minTransY, setMinTransY] = useState(0)
  
  const style = {
    backgroundImage: `url(${img})`
  }
  const bgImgRef = useRef()
  const bgLayerRef = useRef()
  const scrollRef = useRef()
  const scrollObjRef = useRef()
  const playRef = useRef()
  const maskRef = useRef()

  useLayoutEffect(() => {
    let imgHeight = bgImgRef.current.clientHeight
    setImgHeight(imgHeight)
    scrollRef.current.style.top = bgImgRef.current.clientHeight + 'px'
    //用于计算scroll滚动
    setMinTransY(-imgHeight + 40)
  },[])
  useLayoutEffect(() => {
    // 需重新刷新下 scroll wrapper的高， 否则会以原来的高为准，计算滚动的最大距离
    if (scrollObjRef.current) {
      scrollObjRef.current.refresh()
    }
  }, [])

  useLayoutEffect(() => {
    let newY = offsetY
    let translateY = Math.max(minTransY, newY)
    let scale = 1
    let blur = 0
    let zIndex = 0
    let percent = Math.abs(newY / imgeHeight)
    if(newY > 0){
        scale = 1 + newY / imgeHeight
        zIndex = 100
        scrollRef.current.style.transform =`translateY(${translateY}px)` 
    }else{
        blur = Math.min(20, percent * 20)
    }

    if(newY >= minTransY){
        zIndex = 0
        bgImgRef.current.style.paddingTop = "70%"
        playRef.current.style.display = 'block'
    }else{
        zIndex = 10
        bgImgRef.current.style.paddingTop = "40px"
        playRef.current.style.display = 'none'
    }

    bgImgRef.current.style.zIndex = zIndex
    bgImgRef.current.style.transform = `scale(${scale})`
    
    // maskRef.current.style.opacity = `${percent}`
    // maskRef.current.style.backdrop = `blur${blur}px`

    bgLayerRef.current.style.transform = `translateY(${translateY}px)` 
    
  }, [offsetY])

  function back() {
    history.goBack()
  }
  function onScroll(pos) {
    setOffsetY(pos.y)
  }

  function selectSonghandller(song, index) {
    selectSong(songs, index)
  }
  function randomPlay() {
    if (!songs.length) return 
    randomPlayAll(songs)
  }

  const [refresh, setRefresh] = useState(0)
  const MusicListRef = useRef()
  useHandlePlayList(playlist, handlePlaylist)
  function handlePlaylist(playlist, height) {
    height = playlist.length ? height : 0
    MusicListRef.current.style.bottom = height;
    setRefresh(new Date())
  }

  return (
    <Wrapper ref={MusicListRef}>
      <div className="back" onClick={back}>
        <Iconfont type='icon-back'></Iconfont>
      </div>
      <h1 className="title">{title}</h1>

      <div className="bg-img" style={style} ref={bgImgRef}>
          <div className="mask" ref={maskRef}></div>
          <div className="btn-wrapper" ref = {playRef}>
              <div className="play" onClick={randomPlay}>
                  <Iconfont type= "icon-play"></Iconfont>
                  <span className="text">随机播放全部</span>
              </div>
          </div>
      </div>

      <div className="bg-layer" ref={bgLayerRef}></div>
      <Scroll data={songs} listenSroll={true} probeType={3}
        className="list" ref={scrollRef} scrollRef={scrollObjRef}
        scrollPos={onScroll} refresh={refresh}
      >
        <div className="list-wrapper" >
          <SongList rank={rank} songs={songs} selectSong={selectSonghandller }></SongList>
        </div>
        <ConditionDiv show={!songs.length}>
          <LoadingWrapper><Loading/></LoadingWrapper>
        </ConditionDiv>
        {/* { !songs.length && <LoadingWrapper><Loading/></LoadingWrapper>} */}
      </Scroll>
    </Wrapper>
  )
}

function mapDispatchToProps(dispatch) {
  return {
    selectSong: (...args) => {
      dispatch(selectSong(...args))
    },
    randomPlayAll: (...args) => {
      dispatch(randomPlayAll(...args))
    }
  }
}

export default connect(null,mapDispatchToProps)(withPlayLIst(MusicList))
