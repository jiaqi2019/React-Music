import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux'
import Wrapper from './Wrapper'
import NormalPlayer from './Normal'
import MiniPlayer from './Mini'
import {
  makeFullScreen, makeMode, makeCurrentIndex,
  makePlaying, deleteFavoriteSongs, addFavoriteSongs,
  makePlayList, savePlayHistory,
} from './actions'
import playMode from '../../common/js/config.js'
import { shuffle } from '../../common/js/util'
import Lyric from 'lyric-parser' 



function Player(props) {
  const { show, ...restProps } = props
  const audioRef = useRef()
  //状态
  const [songReady, setSongReady] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  
  // 歌词有关系
  const [currentLyric, setCurrentLyric] = useState(null)
  const [playingLyric, setPlayingLyric] = useState("")
  const [currentLineNum, setCurrentLineNum] = useState(0)
  const [canLyricPlay, setCanLyricPlay] = useState(false)
  const [isPureMusic, setIsPureMusic] = useState(false)
    // mini播放器，按钮相关
    // [timer, setTimer] = useState(0)
  var timer = 0
  //计算属性
  const percent = currentTime / props.currentSong.duration
  const duration = props.currentSong.duration
  const
    imgSrc = props.currentSong.image,
    title = props.currentSong.name,
    subtitle = props.currentSong.singer
  // console.log({ percent })

  //UI事件
  function back() { props.setFullScreen(false) }
  function open() { props.setFullScreen(true) }

  //audio控件相关事件
  function ready() {
    clearTimeout(timer)

    setSongReady(true)
    setCanLyricPlay(true)

    props.savePlayHistory(props.currentSong)

    if (currentLyric && !isPureMusic) {  //&& !this.isPureMusic
      currentLyric.seek(currentTime * 1000)
    }
  }

  function paused() { currentLyric && currentLyric.stop() }
  function ended() {
    setCurrentTime(0)
    if (props.mode === playMode.loop) {
      loop()
    } else {
      nextPlay()
    }
  }
  function error() {
    clearTimeout(timer)
    setSongReady(true)
  }
  function timeupdated(evt) { setCurrentTime(evt.target.currentTime) }

  function loop() {
    audioRef.current && (audioRef.current.currentTime = 0)
    audioRef.current && audioRef.current.play()
    setCurrentTime(0)
    // 歌词也重置
    if (currentLyric) {
      currentLyric.seek(0)
    }
  }

  // 播放按钮相关
  function restCurrentIndex(list) {
    let index = list.findIndex(item => {
      return item.id === props.currentSong.id
    })
    props.setCurrentIndex(index)
  }
  function changeMode() {
    let mode = (props.mode + 1) % 3
    let list = null;
    if (mode === playMode.random) {
      list = shuffle(props.secquenceList)
    } else {
      list = props.secquenceList
    }
    props.setPlayMode(mode)
    restCurrentIndex(list)
    props.setPlaylist(list)

  }
  function togglePlay() {
    if (!songReady) return;
    props.setPlaying(!props.playing)

    // 暂停歌词
    if (currentLyric) {
      console.log('歌词暂停');
      currentLyric.togglePlay()
    }
  }
  // 收藏or取消收藏
  function toggleFavorite() {
    if (props.favoriteSongs.findIndex(item => item.id == props.currentSong.id) > -1) {
      props.deleteFavoriteSongs(props.currentSong)
    } else {
      props.addFavoriteSongs(props.currentSong)
    }
  }

  function prevPlay() {
    if (!songReady) return

    let index = props.currentIndex - 1
    if (index < 0) {
      index = props.playlist.length - 1
    }
    props.setCurrentIndex(index)
    if (!props.playing) togglePlay()
  }

  function nextPlay() {
    if (!songReady) return

    if (props.playlist.length === 1) {
      loop()
      return
    }

    let index = props.currentIndex + 1;
    index = index >= props.playlist.length ? 0 : index;

    props.setCurrentIndex(index)
    if (!props.playing) togglePlay()
  }

  useEffect(() => {
    if (!props.currentSong) return;
    let newSong = props.currentSong
    if (!newSong.id || !newSong.url ) return; //|| newSong.id === oldSong.id
    setSongReady(false)
    audioRef.current && (audioRef.current.src = newSong.url);
    audioRef.current && audioRef.current.play()
    setCanLyricPlay(false)
    
    if (currentLyric) {
      currentLyric.stop()
      // console.log('stop set null');
      setCurrentLyric(null)

      setCurrentTime(0)
      setCurrentLineNum(0)
      setPlayingLyric('')
    }
    // this.songReady = true
    // 防止音乐加载不出来，后不能点击按钮
    clearTimeout(timer)
    // let newTimer
    timer  = setTimeout(() => {
      setSongReady(true)
    }, (500))
    // setTimer(newTimer)
  }, [props.currentSong])

  useEffect(() => {
    if(!songReady) return 
    if(props.playing){
      audioRef.current && audioRef.current.play()
    } else{
      audioRef.current && audioRef.current.pause()
    }
  }, [props.playing])

  useEffect(() => {
    if (!currentLyric && songReady) {
      // console.log(currentLyric);
      _getLyric()
    }
  }, [currentLyric, songReady])
  // 获取歌词并格式化,便于寻找
  function _getLyric() {
    props.currentSong.getLyric().then(lyric => {
      let lyricObj = new Lyric(lyric, _handleLyric)
      setCurrentLyric(lyricObj)
      // 是否为纯音乐
      let isPureMusic = !lyricObj.lines.length
      setIsPureMusic(isPureMusic)
      // console.log({xx: this.currentLyric});

      //不是纯音乐,正常播放歌词
      if (!isPureMusic) {
        props.playing && canLyricPlay && lyricObj.seek(currentTime * 1000)
      } else {
        setPlayingLyric("")
      }

    })
  }
  // 歌词播放 回调函数
  function _handleLyric({ lineNum, txt }) {
    // console.log('handle')
    setCurrentLineNum(lineNum)
    setPlayingLyric(txt)
  }

  function onPercentChange(percent){
    audioRef.current.currentTime = percent * duration;
    // this.$refs.audio.currentTime = percent * this.$refs.audio.duration;
    // 修改歌词
    if(!props.playing) {
      togglePlay()
    }

  }
  function onPercentChangeing(percent){
    setCurrentTime(percent * duration)
  }

  const commonProps = {
    imgSrc,
    title,
    subtitle,
    percent,
    playing: props.playing,
    togglePlay,
  }

  const normalPlayerProps  = {
    currentLyric,
    playingLyric,
    currentLineNum,
    currentTime,

    favoriteSongs: props.favoriteSongs,
    currentSong: props.currentSong,
    mode: props.mode,
    back,
    changeMode, prevPlay, nextPlay, toggleFavorite,
    onPercentChange, onPercentChangeing,
  }
  const MiniPlayerProps ={open}
  return (
    <Wrapper show={props.playlist.length} >
      <NormalPlayer show={props.fullScreen} {...commonProps} {...normalPlayerProps} />
      <MiniPlayer show={!props.fullScreen} {...commonProps} {...MiniPlayerProps} />
      <audio ref={audioRef} onPlaying={ready} onPause={paused} onEnded={ended} onError={error} onTimeUpdate={timeupdated} />
    </Wrapper>
  )
}


function mapStateToProps(state) {
  const { playlist, secquenceList, currentIndex,
    mode, fullScreen, playing, favoriteSongs } = state.playerReducer
  return {
    playlist,          
    secquenceList,     //改变模式时会用
    currentIndex,
    currentSong: playlist[currentIndex] || {},
    mode,
    fullScreen,
    favoriteSongs, 
    playing,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setFullScreen: (value) => { dispatch(makeFullScreen(value)) },
    setPlayMode: (value) => { dispatch(makeMode(value)) },
    setCurrentIndex: (value) => { dispatch(makeCurrentIndex(value)) },
    setPlaying: (value) => { dispatch(makePlaying(value)) },
    setPlaylist: (value) => { dispatch(makePlayList(value)) },
    deleteFavoriteSongs: (song) => { dispatch(deleteFavoriteSongs(song)) },
    addFavoriteSongs: (value) => { dispatch(addFavoriteSongs(value)) },
    savePlayHistory: (value) => { dispatch(savePlayHistory(value)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Player)