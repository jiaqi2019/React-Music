import React, { useState, useEffect, useRef } from 'react';
import { Route, useHistory } from 'react-router-dom'
import {connect} from 'react-redux'

import Slide from '../../compontents/Slider'
import RecommendWrapper from './RecommendWrapper'
import DiscListWrapper from './DiscListWrapper'
import {getSlider, getDisc, setDisc} from './actionCreators'
import Img from '../../compontents/Img'
import H1 from '../../compontents/H1'
import Scroll from '../../compontents/Scroll'
import LoadingWrapper from '../../compontents/LoadingWrapper'
import Loading from '../../compontents/Loading'
import RecommendDetail from '../RecommendDetail'
import withPlayLIst from '../../hoc/withPlayLIst'
import {useHandlePlayList} from '../../utils/handlePlayList'
import List from '../../compontents/List'
import ListItem from '../../compontents/ListItem'

function RecommendPage ({sliderList, discList=[], getSlider, getDiscList, setDisc, playlist}) {
  const [refresh, setRefresh] = useState(0)
  const history = useHistory()
  const recommendRef = useRef()

  useHandlePlayList(playlist, handlePlaylist)

  function handlePlaylist(playlist, height) {
    height = playlist.length ? height : 0
    recommendRef.current.style.bottom = height;
    setRefresh(new Date())
  }
  //请求slide数据
  useEffect(() => {
    getSlider()
  }, [])
  // 请求recommendlist数据
  useEffect(() => {
    getDiscList()
  }, [])
  

  const imgLoaded = (() => {
    var timer = 0
    return () => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        setRefresh(new Date())
      }, 500)
    }
  })()
  function selectItem(disc) {
    setDisc(disc)
    history.push('/recommend/'+disc.dissid)
  }
  return (
    <RecommendWrapper ref={recommendRef}>
      <Scroll data={discList} refresh={refresh} className ='content'>
        <div>
          {/* 因为默认0时是会渲染，使用!!转成boolean型 */}
          {!!sliderList.length && 
            <Slide>
              {sliderList.map(item => (
                <div key={item.id}>
                  <Img src={item.picUrl} onLoad={()=>imgLoaded()}/>
                </div>
                )
              )}
            </Slide>
          }
          <DiscListWrapper>
            <H1 className='list-title'>热门歌单推荐</H1>
            <List items={discList} component={(item, index) => (
              <ListItem key={index} className="item" onClick={() => selectItem(item)}>
                <div className="icon">
                    <Img src={item.imgurl} onLoad={()=>imgLoaded()}/>
                </div>
                <div className="text">
                  <H1 className="name">{item.creator.name}</H1>
                  <p className="desc">{item.dissname}</p>
                </div>
              </ListItem>
            )}/>
          </DiscListWrapper>
          <LoadingWrapper show={!discList.length}>
            <Loading />
          </LoadingWrapper>
        </div>
      </Scroll>
      <Route path='/recommend/:id' component={RecommendDetail}/>
    </RecommendWrapper>
  )
}

const stateToProps = function (state) {
  return {
    sliderList: state.RecommendReducer.sliderList,
    discList: state.RecommendReducer.discList,
  }
}

const dispatchToProps = function (dispatch) {
  return {
    getSlider: () => {
      dispatch(getSlider())
    },
    getDiscList: () => {
      dispatch(getDisc())
    },
    setDisc: (value) => {
      dispatch(setDisc(value))
    }
  }
}

export default connect(stateToProps, dispatchToProps)(withPlayLIst(RecommendPage));














