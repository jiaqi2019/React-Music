import React, {useEffect, useState, useRef} from 'react';
import styled from 'styled-components'
import {Route} from 'react-router-dom'
import IndexList from '../IndexList'
import {connect} from 'react-redux'
import {setSelectSinger} from './actions'
import { useHistory } from "react-router-dom";
import SingerDetail from '../SingerDetail'
import {LoadSingerList} from './processData'
import withPlayLIst from '../../hoc/withPlayLIst'
import { useHandlePlayList } from '../../utils/handlePlayList'


const SingerWapper = styled.div`
  position: absolute;
  top: 88px;
  bottom: 0;
  width: 100%;
`

function SingerPage({ setSelectSinger, playlist }) {
  const [singerList, setSingerList] = useState([])
  const [refresh, setRefresh] = useState(0)

  const singerRef = useRef()
  let history = useHistory()


  useEffect(() => {
    async function fetchData() {
      let list = await LoadSingerList()
      setSingerList(list)
    }
    fetchData()
  }, [])

  function selectItem(singer) {
    setSelectSinger(singer)
    history.push('/singer/'+ singer.id)
  }

  useHandlePlayList(playlist, handlePlaylist)
  function handlePlaylist(playlist, height) {
    console.log('handle');
    height = playlist.length ? height : 0
    singerRef.current.style.bottom = height;
    setRefresh(new Date())
  }

  return (
    <SingerWapper ref={singerRef}>
      <IndexList data={singerList} selectItem={selectItem} refresh={refresh}/>
      <Route path='/singer/:id' component={SingerDetail}/>
    </SingerWapper>
  )
}


function dispatchToProps(dispatch) {
  return {
    setSelectSinger: (value) => {
      dispatch(setSelectSinger(value))
    }
  }
}



export default connect(null, dispatchToProps)(withPlayLIst(SingerPage))
