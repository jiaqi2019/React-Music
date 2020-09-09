import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import Scroll from './Scroll'
import Loading from '../../compontents/Loading'
import LoadingWrapper from '../../compontents/LoadingWrapper'
import ConditionDiv from '../../compontents/ConditionDiv'
import List from '../../compontents/List'
import ListItem from '../../compontents/ListItem'
import Img from '../../compontents/Img'

import {ANCHIR_HEIGHT, TITLE_HEIGHT} from './constants'
import PropTypes from 'prop-types'

function IndexList({ data: singerList = [], selectItem, refresh }) {
  const [shortcutList, setShortcut] = useState([])     // 右侧索引值，通过singerList得到
  const [currentIndex, setCurrentIndex] = useState(0)  // 记录当前索引
  const [fixedTitle, setFixedTitle] = useState('')   //用于 顶部每组title，碰撞时得动画
  const [offsetY, setOffsetY] = useState(0)        //页面滑动Y轴得便宜量，用于计算当前索引
  const [groupHeight, setGroupHeight] = useState([0])
  const [fixedTrans, setFixedTrans] = useState(0)
  const [touches, setTouches] = useState({})

  const listGroupRef = useRef(null)  
  const fixedTitleRef = useRef(null)
  const scrollRef = useRef(null)
  //每次依赖数据的 布局改变后， 获取每组的实际高度
  // 布局变化后才会执行，不是数据变化后，
  // 数据变化后，布局还不一定渲染完成, 所以不能用useEffect
  // 类似Vue中this.$nextTick()
  useLayoutEffect(() => {
    let height = 0
    let heightArray = [0]
    for (let child of listGroupRef.current.children) {
      let group = child
      height += group.clientHeight
      heightArray.push(height)
    }
    setGroupHeight(heightArray)
  },[singerList])

  //动态获取右侧索引
  useEffect(() => {
    setShortcut(singerList.map(group => group.title.substr(0,1)))
  }, [singerList])

  
  useLayoutEffect(() => {
    let fixedTitle = singerList.length && singerList[currentIndex].title
    setFixedTitle(fixedTitle)
  }, [currentIndex, singerList.length])
  
  useLayoutEffect(() => {
    let newY = offsetY
    if(newY > 0) {
      setCurrentIndex(0);
      return 
    }
    
    for(const [index, height] of groupHeight.entries()) {
        if(newY <= -height && newY > -groupHeight[index + 1]){
          setCurrentIndex(index) 
          setFixedTrans(groupHeight[index + 1] + newY) 
        }
    }
    return 
  }, [offsetY])
  
  useLayoutEffect(() => {
    let translateY = 0
    if( fixedTrans > 0 && fixedTrans < TITLE_HEIGHT) {
        translateY = fixedTrans - TITLE_HEIGHT
    }else{
        translateY = 0
    }
    fixedTitleRef.current && (fixedTitleRef.current.style.transform = `translateY(${translateY}px)`)
    // fixedTitleRef.current && (fixedTitleRef.current.style.transform = `translateY(${fixedTrans}px)`)
  }, [fixedTrans])
  
  // const onScroll = (() => {
  //   let timer 
  //   return function (pos){
  //     clearTimeout(timer)
  //     timer = setTimeout(() => {
  //       setOffsetY(pos.y)
  //     }, 8)
  //   }
  // })()
  const onScroll = (pos) => {
    setOffsetY(pos.y)
  }

  function _scrollto(index){
    index = index < 0 ? 0 : index
    index = index >= singerList.length ? singerList.length - 1 : index
    let el = listGroupRef.current.children[index]
    scrollRef.current.scrollToElement(el, 0)
  }
  function onTouchStart(event) {
    event.stopPropagation()
    // event.preventDefault()

    let newTouches = {}
    newTouches.startY = event.touches[0].clientY
    
    let index = event.target.dataset['index'];
    if(index === undefined) return;
    newTouches.startIndex = +index  //转换为数字
    
    setTouches(newTouches)
    _scrollto(index);
  }
  function onTouchMove(event) {
    event.stopPropagation()
    // event.preventDefault()

    if(touches.startIndex === undefined) return;
    
    let index = touches.startIndex
    let startY = touches.startY
    let endY = event.touches[0].clientY
    let endindex = index + (((endY - startY) / ANCHIR_HEIGHT) | 0)//取整 
    _scrollto(endindex);
  }
  function onTouchEnd(event) {
    event.stopPropagation()
    // event.preventDefault()
    // touch结束后，清空start,end
    setTouches({})
  }


  return (
    <Scroll data={singerList} listenSroll={true} probeType={3}
      scrollPos={onScroll} scrollRef = {scrollRef} refresh={refresh}
    >
       <List ref={listGroupRef} items={singerList} component={(group, index) => (
        <ListItem key={index} className='list-group'>
          <h2 className="list-group-title">{group.title}</h2>
          <List items={group.items} component={(singer) => (
            <ListItem key={singer.id} className="list-group-item"  onClick={()=>selectItem(singer)}>
              <Img className="ava" src={singer.avatar} />
              <span className="name">{singer.name}</span>
            </ListItem>
          )}/>
        </ListItem>
      )}/>
      <div className="list-shorcut" >
        <List items={shortcutList} component={(title, index) => (
          <ListItem key={index} data-index={index}
            className={"item " + (currentIndex === index ? 'current' : '')}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            item={title}/>
        )} />
      </div>
      <ConditionDiv show={!!fixedTitle && !(offsetY > 0)} className="fixed" ref={fixedTitleRef}>
        <h2 className="title">{fixedTitle}</h2>
      </ConditionDiv>
      <LoadingWrapper show={!singerList.length}>
        <Loading />
      </LoadingWrapper>
    </Scroll>
  )
} 

IndexList.propTypes  = {
  data: PropTypes.array,
  selectItem: PropTypes.func
}

export default IndexList

