
import React from 'react';
import styled from 'styled-components'
import {$font_size_medium, $color_text_l, $color_theme} from '../../common/variable'
import { NavLink } from 'react-router-dom'

const TabWrapper = styled.div`
  display: flex;
  font-size: ${ $font_size_medium };
  height: 44px;
  line-height: 44px;
`
const TabLink = styled(NavLink )`
  flex: 1;
  text-align: center;
  color: ${$color_text_l};
  &.active{
    color: ${$color_theme};
    span{
      border-bottom: 2px solid ${ $color_theme };
    }
  }
`

const TabText = styled.span`
  padding-bottom: 5px;
`


export default function Tab () {
  return (
    <TabWrapper>
      <TabLink to="/recommend" activeClassName='active'><TabText>推荐</TabText></TabLink>
      <TabLink to="/singer" activeClassName='active'><TabText>歌手</TabText></TabLink>
      <TabLink to="/rank" activeClassName='active'><TabText>排行</TabText></TabLink>
      <TabLink to="/search" activeClassName='active'><TabText>搜索</TabText></TabLink>
    </TabWrapper>
  )
}




















