import React from 'react'
import Wrapper from './Wrapper'
import List from '../../compontents/List'
import ListItem from '../../compontents/ListItem'
import ConditionDiv from '../../compontents/ConditionDiv'

export default function SongList({songs=[], rank = false, selectSong}) {
  function renderItem(item, index) {
    return (
      <SongListItem key={index} item={item} index={index} rank={rank} selectItem={selectSong} />
    )
  }

  return (
    <Wrapper>
      <List items={songs} component={renderItem} />
    </Wrapper>
  )  
}

function SongListItem(props) {
  const { item: song, index, selectItem, rank } = props
  
  const content = (
    <div className="item" onClick={()=>selectItem(song,index)}>
      <ConditionDiv show={rank} className="rank">
        <span className={getClass(index)}>{getText(index)}</span>
      </ConditionDiv>
      <div className="content">
        <h2 className="name">{song.name}</h2>
        <p className="desc">{getDesc(song)}</p>
      </div>
    </div>
  )
  return <ListItem item={content} />
}


function getClass(index){
  return index < 3 ? `icon icon${index}` : 'text'
}
function getText(index){
  return index < 3 ? '' : index+1
}

function getDesc(song){
  return `${song.singer}·${song.album}`
}
