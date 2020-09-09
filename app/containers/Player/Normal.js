import React, { useState, useRef, useEffect, useLayoutEffect } from 'react'
import Scroll from '../../compontents/Scroll'
import ConditionDiv from '../../compontents/ConditionDiv'
import Img from '../../compontents/Img'
import IconFont from '../../compontents/IconFont'
import playMode from '../../common/js/config.js'
import ProgressBar from '../../compontents/ProgressBar'

function formatTime(time) {
  let minute = (time / 60) | 0;
  let second = _pad(time % 60 | 0);
  return `${minute}:${second}`
}
function _pad (num, n = 2){
  num += '';
  while(num.length < n){
      num = "0" + num
  }
  return num
}


export default function Normal(props) {
  const {  playingLyric = '', currentLineNum = 0, 
  back, duration, imgSrc,
  title,
  subtitle,
  changeMode, songReady, prevPlay, togglePlay, nextPlay, toggleFavorite,  } = props

  // 滑动相关
  const [currentShow, setCurrentShow] = useState('cd')
  const [touch, setTouch] =useState({})

  const middleRef = useRef()
  const midLRef = useRef()
  const lyricListRef = useRef()
  const lyricLineRef = useRef()
  const scrollObjRef = useRef()

  /*********touch相关********* */
  function midTouchStart(evt) {
    // evt.stopPropagation()
    touch.inited = true
    touch.startX = evt.touches[0].clientX
    touch.startY = evt.touches[0].clientY
    touch.moved = false
  }
  function midTouchMove(evt) {
    // evt.stopPropagation()
    // let MaxWidth = middleRef.currrent.clientWidth
    let newX = evt.touches[0].clientX
    let newY = evt.touches[0].clientY
    let deltaX = newX - touch.startX
    let deltaY = newY - touch.startY
    if(Math.abs(deltaX) < Math.abs(deltaY)){
        touch.percent = 0   
        touch.moved = false         
        return 
    } 
    touch.moved = true
    let left = currentShow === 'cd' ? 0 : -window.innerWidth
    let offsetX = Math.min(0, Math.max(left+deltaX, -window.innerWidth))

    touch.percent = Math.abs(offsetX  / window.innerWidth)

    lyricListRef.current.style.transform = `translateX(${offsetX}px)`
    lyricListRef.current.style.transitionDuration = 0

    midLRef.current.style.opacity = 1 - touch.percent
    midLRef.current.style.transitionDuration = 0
  }
  function midTouchEnd(evt) {
    // evt.stopPropagation()
    if (!touch.moved) return
    let offsetX = 0
    let opacity
    if (currentShow === 'cd') {
      if (touch.percent > 0.1) {
        offsetX = -window.innerWidth
        opacity = 0
        setCurrentShow('lyric')
      } else {
        offsetX = 0
        opacity = 1
      }
    } else {
      if (touch.percent < 0.9) {
        offsetX = 0
        opacity = 1
        setCurrentShow('cd')
      } else {
        offsetX = -window.innerWidth
        opacity = 0
      }
    }

    lyricListRef.current.style.transform = `translateX(${offsetX}px)`
    lyricListRef.current.style.transitionDuration = 0

    midLRef.current.style.opacity = opacity
    midLRef.current.style.transitionDuration = 0

    touch.inited = false
  }
  

  //计算属性
  const songReadyCls = songReady === false ? "disable" : ""
  // 
  //播放按钮样式
  const iconPlayCls = props.playing ?  "icon-pause" : 'icon-play'
  // const iconFavoriteCls = ''
  // 播放模式样式
  const iconModeCls = props.mode == playMode.random ? "icon-random" : props.mode === playMode.loop ? 'icon-loop' : 'icon-sequence'
  // 收藏按钮样式 
  const iconFavoriteCls = props.favoriteSongs.findIndex(item =>item.id == props.currentSong.id) > -1 ? 'icon-favorite' : 'icon-not-favorite'

  
  
  useEffect(() => {
    if(!lyricLineRef.current ) return
    // console.log('子组件');
    let lineNum = props.currentLineNum
    if (lineNum > 5) {
      let lineEl = lyricLineRef.current.children[lineNum - 5]
      scrollObjRef.current && scrollObjRef.current.scrollToElement(lineEl, 1000)
    } else {
      scrollObjRef.current && scrollObjRef.current.scrollBy(0, 0, 1000)
    }
  }, [props.currentLineNum])
  // useEffect(()=>{console.log(props.currentLyric);}, [props.currentLyric])
  
  return (
    <ConditionDiv className="normal" show={props.show}>
      <div className="background">
        <Img src={imgSrc} width="100%" height="100%" />
      </div>
      <div className="head">
        <div className="back" onClick={back}>
            <IconFont type="icon-back" />
        </div>
        <h1 className="title">{title}</h1>
        <h2 className="subtitle">{subtitle}</h2>
      </div>
      
      <div className="middle" 
        onTouchStart= {midTouchStart}
        onTouchMove = {midTouchMove}
        onTouchEnd =  {midTouchEnd}
        ref={middleRef}
      >
        <div className="mid-l" ref={midLRef}>
          <div className="cd-wrapper">
            <div className="cd">
              <Img src = {imgSrc} className="image" />
            </div>
          </div>
          <div className="mid-lyric-wrapper">
            <div className="lyric">
              {playingLyric}
            </div>
          </div>
        </div>
        <Scroll className="mid-r" data={props.currentLyric && props.currentLyric.lines} scrollRef={scrollObjRef} ref={lyricListRef} >
          <div className="lyric-wrapper">
            {props.currentLyric && 
              <div ref={lyricLineRef}>
                {
                  props.currentLyric.lines.map((line, index) => (
                    <p key={index} className={"text " + (currentLineNum === index ? "current" : '') } ref={lyricLineRef} >{line.txt}</p>
                  ))
                }
                <p className="text" dangerouslySetInnerHTML={{__html:"&nbsp"}}></p>
                <p className="text" dangerouslySetInnerHTML={{__html:"&nbsp"}}></p>
                <p className="text" dangerouslySetInnerHTML={{__html:"&nbsp"}}></p>
                <p className="text" dangerouslySetInnerHTML={{__html:"&nbsp"}}></p>
                <p className="text" dangerouslySetInnerHTML={{__html:"&nbsp"}}></p>
              </div>
            }
          </div>
        </Scroll>
      </div>
      <div className="bottom">
        <div className="dot-wrapper">
          <span className={"dot " + (currentShow =='cd'   ? 'active':'')} />
          <span className={"dot " + (currentShow =='lyric'? 'active':'')} />
        </div>
        <div className="progress-wrapper" >
          <span className="time time-l">{formatTime(props.currentTime)}</span>
          <div className="progress-bar-wrapper">
            <ProgressBar percent={props.percent}     
              percentChange={props.onPercentChange}
              percentChangeing={props.onPercentChangeing} />
          </div>
          <span className="time time-r">{formatTime(props.currentSong.duration)}</span>
        </div>
        <div className="buttons">
          <div className="btn btn-left">
            <IconFont type={iconModeCls} onClick={()=>changeMode()}/>
          </div>
          <div className={"btn btn-left" + songReadyCls }>
            <IconFont type="icon-prev" onClick={()=>prevPlay()}/>
          </div>
          <div className={"btn btn-center" + songReadyCls }>
            <IconFont type={iconPlayCls}  onClick={()=>togglePlay()}/>
          </div>
          <div className={"btn btn-right" + songReadyCls}>
            <IconFont type="icon-next" onClick={()=>nextPlay()} />
          </div>
          <div className="btn btn-right">
            <IconFont type={iconFavoriteCls} onClick={()=>toggleFavorite()}/>
          </div>
        </div>
      </div>
    </ConditionDiv>
  )
        
}
