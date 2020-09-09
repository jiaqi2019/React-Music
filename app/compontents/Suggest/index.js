import React, { useEffect, useRef, useState, useLayoutEffect }from 'react';
import Wrapper from './Wrapper'
import Loading from '../../compontents/Loading'
import IconFont from '../../compontents/IconFont'
import {TYPE_SINGER} from '../../containers/SearchPage/constants'
import { search } from '../../api/search'
import Singer from '../../common/js/singer'
import { isValidMusic, processSongsUrl, createSong } from '../../common/js/song'
import { connect } from 'react-redux'
import { setSelectSinger } from '../../containers/SingerPage/actions'
import { insertSong } from '../../containers/Player/actions'
import { useHistory } from 'react-router';

const perpage = 100

function Suggest(props) {
  const scrollObjRef = useRef()
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(1)
  const [result, setResult] = useState([])
  const [scrollEnd, setScrollEnd] = useState(0)
  const history = useHistory()
  useEffect(() => {
    if (!props.query) {
      setResult([])
      return;
    }
    if (props.query) {
      setHasMore(true)
      setResult([])
      firstSearch()
    }
  },[props.query])

  function firstSearch() {
    setPage(1)
    loadSuggest(props.query, 1)
  }
  function selectItem(item) {
    if(item.type === TYPE_SINGER){
      const singer = new Singer(item.singermid, item.singername)
      props.setSelectSinger(singer);
      history.push(`/search/${singer.id}`)
    }else{
      props.insertSong(item)
    }
    props.selectItem(item)
  }

  //子组件执行该函数中，page永远是1，不知道为什么
  // 子组件获取不到父组件中状态
  // 所以这就是class组件的优势，可以通过bind this去访问并设置状态，要方便
  //所以传入子组件的函数，只能是对某个状态的改变，并不能获取父组件的实时状态
  // 然后父组件监听状态，去做事情，而不能把该事情放在传入子组件的函数中
  function searchMore(isEnd) {
    setScrollEnd(isEnd)
  }
  useEffect(() => {
    setPage(page+1);
  }, [scrollEnd])

  useEffect(() => {
    if (page && hasMore) {
      loadSuggest()
    }
  }, [page])


  // 注意在子组件执行这种函数，是没用的
  async function loadSuggest() {
    let res = await search(props.query, page, props.showSinger, perpage)
    let list = await _getResult(res.data, page)
    // console.log({result});
    setResult(result.concat(list))
    //检查还有没有
    // this.result = res.data.song.
    setTimeout(() => {
      _checkmore(res.data)
    }, 20)
  }

  async function _getResult(data, page){
    let ret = []
    if(data.zhida && data.zhida.singerid && page === 1){
        ret.push({...data.zhida, type: TYPE_SINGER})
    }
    let songs = await processSongsUrl(_normalizeSongs(data.song.list))
    return  ret.concat(songs)
  }

  function _normalizeSongs(list){
    let ret = []
    list.forEach(item =>{
      if(isValidMusic(item)){
          ret.push(createSong(item))
      }
    })
    return ret
  }

  function _checkmore(data) {
    let song = data.song;
    if (!song.list.length || ((song.curpage - 1) * perpage + song.curnum) > song.totalnum) {
      setHasMore(false)
    }
  }
  

  return (
    <Wrapper scrollRef={scrollObjRef} data={result} pollup={true} scrollEnd={searchMore} refresh={props.refresh}>
      <ul className="suggest-list">
      {
        result.map((item, index) => (
          <li className="item" onClick={()=>selectItem(item)} key={index}>
            <IconFont type={getIconCls(item)} />
            <div className="name">
              <span className="text">{getDisplayName(item)}</span>
            </div>
          </li>
        ))
      }
      {!hasMore &&  <div className="footer">-- 没有更多了 --</div>}
      { hasMore &&
        <li style={{ positoin: 'relative' }}><Loading /></li>
      }
      </ul>
    </Wrapper>
  )
}

function getIconCls(item) {
  return item.type === TYPE_SINGER ? 'icon-mine' : 'icon-music'
}

function getDisplayName(item) {
  return item.type === TYPE_SINGER ? item.singername : item.name
}

function mapDispatchToProps(dispatch) {
  return {
    setSelectSinger: (value)=>{dispatch(setSelectSinger(value))},
    insertSong: (value) => { dispatch(insertSong(value)) }
  }
}



export default connect(null, mapDispatchToProps)(Suggest)











