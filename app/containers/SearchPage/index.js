import React, { useRef, useState, useEffect } from 'react';
import { connect } from 'react-redux'

import Wrapper from './Wrapper'
import IconFont from '../../compontents/IconFont'
import ConditionDiv from '../../compontents/ConditionDiv'
import HistotyList from '../../compontents/HistoryList'
import List from '../../compontents/List'
import ListItem from '../../compontents/ListItem'
import H1 from '../../compontents/H1'
import {Route} from 'react-router-dom'
import Scroll from '../../compontents/Scroll'
import SearchBox from '../../compontents/SearchBox'
import Suggest from '../../compontents/Suggest'
import Confirm from '../../compontents/Confirm'
import SingerDetail from '../SingerDetail'
import {loadHotKey, saveSearchHistory, makeGetSearchHistory, deleteSearchHistory,clearSearchHistory} from './actions'
import withPlayLIst from '../../hoc/withPlayLIst'
import {useHandlePlayList} from '../../utils/handlePlayList'


function SearchPage({ hotKey = [], searchHistory = [], loadHotKey, saveSearchHistory, deleteSearchHistory, clearSearchHistory, playlist }) {
  const [query, setQuery] = useState('')
  const [suggestQuery, setSuggestQuery] = useState('')
  const [timer, setTimer] = useState(0)   //用于
  const [confirmShow, setConfirmShow] = useState(0)

  const scrollObjRef = useRef()
  const shoutcutWrapperRef = useRef()
  const suggestRef = useRef()

  useEffect(() => {
    loadHotKey()
  }, [])

  // 注意不能使用 防抖函数，来实现防抖
  // 因为useEffect时异步执行的，没有办法通过闭包timer去清楚上一个timer
  // 所以起不到效果
  useEffect(() => {
    clearTimeout(timer)
    let newtimer = setTimeout(() => {
      setSuggestQuery(query)
    }, 500)
    setTimer(newtimer)
  }, [query])


  function selectHotKey(key) {
    setQuery(key)
  }
  function selectResult() {
    saveSearchHistory(query)
  }
  function deletOneHis(item) {
    deleteSearchHistory(item)
  }
  function confirmClear() {
    closeConfirm()
    clearSearchHistory()
  }
  function showConfirm() {
    setConfirmShow(true)
  }
  function closeConfirm() {
    setConfirmShow(false)
  }

  // 因为条件渲染的scroll
  const [refresh, setRefresh] = useState(0)
  useHandlePlayList(playlist, handlePlaylist)
  function handlePlaylist(playlist, height) {
    height = playlist.length ? height : 0
    shoutcutWrapperRef.current && (shoutcutWrapperRef.current.style.bottom = height)
    suggestRef.current && (suggestRef.current.style.bottom = height)
    setRefresh(new Date())
  }

  return (
    <Wrapper>
      <div className="search"> 
        <div className="search-box-wrapper">
          <SearchBox setQuery={setQuery} query={query}/>
        </div>
        <ConditionDiv show={!query } className="shoutcut-wrapper" ref={shoutcutWrapperRef}>
          <Scroll data={[]} ref={scrollObjRef} className="shoutcut" refresh={refresh}>
            <div className="shoutcut-inner">
              <div className="hot">
                <H1 className="title">热门搜索</H1>
                <List items={hotKey} component={(key, index) => (
                  <ListItem className="item" onClick={() => selectHotKey(key.k)} key={index}>
                    {key.k}
                  </ListItem>
                )}/>
              </div>
              <ConditionDiv className="history" show={searchHistory.length}>
                <H1 className="title">
                  <span className="text">搜索历史</span>
                  <span className="clear" onClick={showConfirm}>
                    <IconFont type="icon-clear" />
                  </span>   
                </H1>
                <HistotyList selectItem={selectHotKey} deleteOne={deletOneHis} searchHistory={searchHistory}/>
              </ConditionDiv>
            </div>
          </Scroll>
        </ConditionDiv>
        <ConditionDiv show={query} className="suggest-wrapper" ref={suggestRef}>
          <Suggest query={suggestQuery} selectItem={selectResult} showSinger={true} refresh={refresh}/>
        </ConditionDiv>
        <Confirm showflg={confirmShow} title="是否清空历史" okTxt="清空" ok={confirmClear} cancle={closeConfirm} />
        <Route path="/search/:id" component={SingerDetail}/>
      </div>
    </Wrapper>
  )
}


function matStateToProps(state) {
  return {
    hotKey: state.searchReducer.hotKey,
    searchHistory: state.searchReducer.searchHistory,
  }
}



function matDispatchToProps(dispatch) {
  return {
    loadHotKey: () => {
      dispatch(loadHotKey())
    },
    saveSearchHistory: (value) => { dispatch(saveSearchHistory(value)) },
    getSearchHistory: () => { dispatch(makeGetSearchHistory()) },
    deleteSearchHistory: (value) => { dispatch(deleteSearchHistory(value)) },
    clearSearchHistory: () => {dispatch(clearSearchHistory())}
  }
}

export default connect(matStateToProps, matDispatchToProps)(withPlayLIst(SearchPage))




