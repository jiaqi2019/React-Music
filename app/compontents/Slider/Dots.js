
import styled from 'styled-components'
import {$color_text_l, $color_text} from '../../common/variable'
import React from 'react';

const DotsWrapper = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 12px;
  text-align: center;
  .dot{
      width: 8px;
      height: 8px;
      border-radius: 50%;
      display: inline-block;
      margin: 0 4px;
      background-color: ${$color_text_l};
      &.active{
          background-color: ${$color_text};
          width: 20px;
          border-radius: 5px;
      }
  }
`

export default function Dots({ dots=0, current=0, gotoPage }) {
  let dotsList = new Array(dots).fill(0)
  function hadleClick(index, event) {
    // console.log({event});
    event.stopPropagation()
    console.log(121312312);
    gotoPage(index)
  }

  return (
    <DotsWrapper>
        {dotsList.map((item,index) => {
          let active = index === current ? 'active' : ''
          return <span className={'dot ' + active} onClick={(e)=>{hadleClick(index,e)}} key={index}></span>
        })}
    </DotsWrapper>
  )
}


