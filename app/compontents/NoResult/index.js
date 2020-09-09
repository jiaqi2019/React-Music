import React from 'react';
import styled from 'styled-components'
import ConditionDiv from '../../compontents/ConditionDiv'
import Icon from '../Icon'
import {$font_size_medium, $color_text_d} from '../../common/variable'

const Wrapper = styled(ConditionDiv)`
  &.no-result{
    text-align: center;
    .icon{
        width: 86px;
        height: 90px;
        display: inline-block;
        background-size: 100%;
    }
    .title{
        margin-top: 30px;
        font-size: ${$font_size_medium};
        color:  ${$color_text_d};
    }   
}
`

export default function NoResult({title, show}) {
  return (
    <Wrapper className="no-result" show={show}>
        <Icon className="icon" bgsrc='./no-result' />
        <p className="title">{title}</p>
    </Wrapper>
  )
}









