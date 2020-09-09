import React, { useState, useEffect, useRef } from 'react';
import ConditionDiv from '../../compontents/ConditionDiv'
import IconFont from '../../compontents/IconFont'
import Img from '../../compontents/Img'
import ProgressCircle from '../../compontents/ProgressCircle'

const RADIUS = 32

export default function Mini(props) {
  const { imgSrc, percent, togglePlay, title, subtitle, open} = props
  const minTextRef = useRef()
  const miniNameRef = useRef()
 //mini播放样式
  const miniPlayClass = props.playing ? "icon-pause-mini" : "icon-play-mini"

  function showPlayList(evt) { 
    evt.stopPropagation()
  }

  function clickHandle(evt) {
    evt.stopPropagation()
    open()
  }
  function puause(evt) {
    evt.stopPropagation()
    togglePlay()
  }
  return (
    <ConditionDiv show={props.show} className="mini" onClick={clickHandle}>
      <div className="img-l">
        <div className="imgwrapper">
          <Img src={imgSrc} />
        </div>
      </div>
      <div className="text" ref={minTextRef}>
        <h2 behavior="scroll" className="name" ref={miniNameRef}>{title}</h2>
        <h2 className='desc'>{subtitle}</h2>
      </div>
      <div className="control">
        <ProgressCircle percent={percent} radius={RADIUS}>
          <IconFont className="icon-mini" onClick={puause} type={miniPlayClass} />
        </ProgressCircle>
      </div>
      <div className="control" onClick={showPlayList}>
        <IconFont type="icon-playlist" />
      </div>
    </ConditionDiv>
  )
}





