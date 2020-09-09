import React from 'react';
import styled from 'styled-components'
import * as variable from '../../common/variable'

const Wrapper = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 240px;
  margin: 0 auto;
  border: 1px solid ${variable.$color_backgroud};
  border-radius: 5px;
  .item{
    padding: 8px;
    font-size: ${variable.$font_size_medium};
    background-color: ${variable.$color_background_d};
    text-align: center;
    flex: 1;
  }
  .current{
    background-color: ${variable.$color_highlight_background};
    color: ${variable.$color_text};
  }
`


export default function Switches({ options = [], select, switchItme }) {
  function click(index) {
    if (index === select) return
    switchItme(index)
  }
  return (
    <Wrapper className="switches">
      {
        options.map((opt, index) => (
          <div className={"item " + (select === index ? 'current' : '')} key={index}
            onClick={()=>click(index)}>{opt.title}</div>
        ))
      }
    </Wrapper>
  )
}

