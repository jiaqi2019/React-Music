import React, { useEffect, useState } from 'react';
import MusicList from "../../compontents/MusicList";
import {connect} from 'react-redux';
import {loadSongs} from './proccessData'
import { useRouteMatch, useHistory  } from 'react-router-dom'

function SingerDetail({ singer }) {
  const [songs, setSongs] = useState([])
  let match1 = useRouteMatch('/singer/' + singer.id)
  let match2 = useRouteMatch('/search/' + singer.id)
  let history = useHistory()
  
  let match = match1 || match2
 
  useEffect(() => {
     //路径匹配不成功，则返回
    if (!match) {
      history.push('/singer')
    }
    //路径是由点击产生，而不是手动输入地址栏
    //匹配成功才请求
    else {
      (async function() {
        let songs = await loadSongs(singer.id)
        setSongs(songs)
      })()
    }
  }, [])

  return (
    <div>
        <MusicList songs={songs} rank={false} img={singer.avatar} title={singer.name}></MusicList>
    </div>
  )
}


function mapStateToProps(state) {
  return {
    singer: state.SingerReducer.selectSinger,
  }
}


export default connect(mapStateToProps, null)(SingerDetail)