import React, {useEffect, useState, useRef} from 'react';
import BScroll from '@better-scroll/core'
import Slide from '@better-scroll/slide'

import SlideWrapper from './SlideWrapper'
import SlideGroup from './SlideGroup'
import Dots from './Dots'


import { addClass } from '../../common/js/dom'

BScroll.use(Slide)

export default function ({ autoPlay = true, children, loop = true, delay = 3000 }) {
  const [slide, setSlide] = useState(null)
  const [currentPage, setCurrentPage] = useState(0)
  const [dots, setDots] = useState(0)
  const [refresh, setRefresh] = useState(0)

  const sliderGroupRef = useRef(null)
  const slideRef = useRef(null)
  // const [timer, setTimer] = useState(0)

  var timer = 0
  //初始化宽度，样式
  useEffect(() => {
    //初始化slider
    setSlideWidth()
    //新建slide对象
    createSlide()
    return () => {
      if (slide) {
        slide.destroy()
      }
    }
  }, [])
  
  //初始化slide,一些监听事件，自动播放等
  useEffect(() => {
    // 创建slide后执行此effect
    if (slide) {
      _initSlider()
      if (autoPlay) {
        _play()
      }
    }
    // return () => {
    //   if (slide) {
    //     console.log('slide destroy');
    //     slide.destroy()
    //   }
    // }
  }, [slide])

  useEffect(() => {
    // let timer
    function resize() {
      // if (slide) {
      // console.log('resize');
        // clearTimeout(timer)
        // timer = setTimeout(() => {
          setSlideWidth(true)
        // }, 500)
      // }
    }
    window.addEventListener('resize', resize)
    return () => {
      window.removeEventListener('resize',resize)
    }
  }, [])

  useEffect(() => {
    if (slide) {
      slide.refresh()
    }
  },[refresh])
  

  //定时器得销毁
  // useEffect(() => {
  //   return () => clearTimeout(timer)
  // }, [])

  function setSlideWidth(resize) {
    // let children = sliderGroupRef.current.children
    let children = sliderGroupRef.current.children;
    let slideWidth = slideRef.current.clientWidth;
    let width = 0
    let dot = children.length
    // 修改每个item得宽度，并添加class
    for(let child of children){
      child.style.width = slideWidth + 'px';
      if (!resize) {
        addClass(child, 'slide-item')
      }
      width += slideWidth
    }
    // 如果是重现调整窗口，就已经添加过两个chilren
    if(loop && !resize){
      width += 2 * slideWidth
      dot += 2
    }
    setDots(dot - 2)

    sliderGroupRef.current.style.width = width +'px'
    if (resize) {
      setRefresh(new Date())
    }
  }

  function createSlide(){
    setSlide(new BScroll('.slide', {
      scrollX: true,
      scrollY: false,
      slide: {
        loop: true,
        threshold: 100
      },
      useTransition: true,
      momentum: false,
      bounce: false,
      stopPropagation: true,
      probeType: 2
    }))
  }

  function _initSlider() {
    slide.on('slideWillChange', (page) => {
      setCurrentPage(page.pageX)
    });
    slide.on('beforeScrollStart',()=>{
      if(autoPlay) clearTimeout(timer)                
    })
    slide.on("scrollEnd", () => {
      if(autoPlay){
        _play()
      }
    })
  }

  function _play() {
    clearTimeout(timer)
    // let newtimer
    timer = setTimeout(() => {
      _nextPage()
    }, delay) 
    // setTimer(newtimer)
  }

  function _nextPage() {
    slide.next()
  }

  function goToPage(index) {
    slide.goToPage(index)
    setCurrentPage(index)
  }

  return (
    <SlideWrapper className='slide' ref={slideRef}>
      <SlideGroup ref={sliderGroupRef}>
        {children}
      </SlideGroup>
      <Dots current={currentPage} dots={dots} goTopage={goToPage}/>
    </SlideWrapper>
  )
}



