import React, { useState, useRef, useEffect } from 'react';
import Wrapper from './Wrapper'
import IconFont from '../IconFont'

export default function SearchBox({placeholder="搜索歌曲、歌手", query, setQuery}) {

  function onChange(e) {
    setQuery(e.target.value)
    // setSeach()
  }
  function clearInput() {
    setQuery('')
  }
  
  return (
    <Wrapper>
      <IconFont type="icon-search"/>
      <input type="text" value={query} onChange={onChange} 
        className="box" placeholder={placeholder}/>
      <IconFont type="icon-dismiss" onClick={clearInput} />
    </Wrapper>
  )


}
















