import React, { useEffect, useState, useLayoutEffect } from 'react';
import BScroll from '@better-scroll/core'

const Scroll = (props, ref) => {
  const {
    data = [],
    scrollY = true,
    click = true,
    listenSroll = false,
    probeType = 1,
    scrollDelay = 20,
    pollup = false,
    scrollPos = (pos) => { return pos },
    scrollEnd = () => { },
    refresh = 0,
    scrollRef = {},
  } = props  
  const wrapperRef = ref || React.createRef(null)
  const [scroll, setScroll] = useState(null)

  useEffect(() => {
    _createScroll()
  }, [])

  useEffect(() => {
    // console.log(scroll);
    if (scroll) {
      _initScroll()
      _refresh()
      scrollRef.current = scroll
      return ()=>{scroll.destroy()}
    }
  }, [scroll])

  useLayoutEffect(() => {
    console.log('refresh');
    _refresh()
  },[data, refresh])

  function _createScroll() {
    let scroll = new BScroll(wrapperRef.current, {
      scrollY: scrollY,
      click: click,
      probeType: probeType,
    })
    setScroll(scroll)
  }

  function _initScroll() {
    if(listenSroll){
      scroll.on('scroll', (pos)=>{
          // this.$emit("scroll", pos)
        scrollPos(pos)
      })
    }
    if(pollup){
      scroll.on('scrollEnd',()=>{
        if(scroll.y <= scroll.maxScrollY+50){
            // this.$emit('scrollEnd')
          scrollEnd(new Date())
        }
      })
    }
  }
  const _refresh = () => {
    if (scroll) {
      // console.log('refersh');
      setTimeout(() => {
        scroll.refresh()
      }, scrollDelay)
    }
  }

  return (
    <div ref = {wrapperRef} className={props.className}>
      {props.children}
    </div>
  )
}


export default React.forwardRef(Scroll)