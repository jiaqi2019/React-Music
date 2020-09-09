import React from 'react';
import Wrapper from './Wrapper'
import IconFont from '../IconFont'
import List from '../List'
import ListItem from '../ListItem'


export default  function HistoryList ({ selectItem, deleteOne, searchHistory= [] }) {
  
  function onDelete(search,e) {
    e.stopPropagation()
    deleteOne(search)
  }

  return (
    <Wrapper>
      <List items={searchHistory} component={(search, index) => (
        <ListItem className="item" onClick={() => selectItem(search)} key={index}>
          <span className="text">{search}</span>
          <span className="delete" onClick={(e) => onDelete(search, e)}>
            <IconFont type="icon-delete" />
          </span>
        </ListItem>
      )} />
    </Wrapper>
  )
}