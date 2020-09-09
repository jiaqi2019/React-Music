import React, { useState, useRef, useEffect } from 'react';
import Wrapper from './Wrapper'

export default function ({ percent = 0, percentChange, percentChangeing}) {
  const [touch, setTouch] = useState({})
  const progressBarRef = useRef()
  const progressRef = useRef()
  const progressBtnRef = useRef()

  function touchstart(evt) {
    evt.stopPropagation()
    touch.inited = true
    touch.startX = evt.touches[0].clientX
    touch.left = progressRef.current.clientWidth
  }
  function touchmove(evt){
    evt.stopPropagation()
    if(!touch.inited) return;
    let deltaX = evt.touches[0].clientX - touch.startX
    let offsetX = Math.min( Math.max(deltaX+touch.left, 0), progressBarRef.current.clientWidth)
    
    _setProgressWidth( offsetX)
    // 触发进度正在改变,外部只改变当前进度时间
    percentChangeing(_getPercent())
  }
  function touchend(evt){
    evt.stopPropagation()
    touch.inited = false
    // 滑动结束后,才真正触发进度改变
    percentChange(_getPercent())
  }

  /********************点击事件相关**************** */
  async function progressClick(e){
    let rect = progressBarRef.current.getBoundingClientRect()
    let offsetX = e.pageX - rect.x;
    // 设置进度条宽度
    await _setProgressWidth(offsetX);

    // 触发外部事件
    percentChange(_getPercent())
  }
  function _setProgressWidth(width){
    progressRef.current.style.width = width + 'px';
    progressBtnRef.current.style.transform = `translateX(${width}px)`;
  }

  function _getPercent(){
    let barWidth = progressBarRef.current.clientWidth
    return progressRef.current.clientWidth / barWidth
  }

// 接受外部percent,改变progress宽度
  function _setProgressOffset(percent){
    if(percent < 0 || touch.inited) return
    let offsetX = percent * (progressBarRef.current.clientWidth)
    _setProgressWidth(offsetX)
  }
  useEffect(() => {
    _setProgressOffset(percent)
  }, [percent])
  
  return (
    <Wrapper>
      <div className="inner" ref={progressBarRef} onClick={progressClick}>
        <div className="progress" ref={progressRef} />
        <div className="progress-btn-wrapper" 
          ref={progressBtnRef} 
          onTouchStart={touchstart}
          onTouchMove={touchmove}
          onTouchEnd={touchend}>
          <div className="progress-btn" />
        </div>
      </div>
    </Wrapper>
  )
}







