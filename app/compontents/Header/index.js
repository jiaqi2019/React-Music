import React from 'react';
import styled from 'styled-components'
import Icon from '../Icon'
import H1 from './H1'
import HeaderLink from './HeaderLink'
import HeaderIconFont from './HeaderIconFont'
import { $color_theme } from "../../common/variable";

const HeadrStyle = styled.div`
    height: 44px;
    color: ${props => props.color || $color_theme};
    text-align: center;
    position: relative;
`;


export default function Header() {
  return (
    <HeadrStyle>
      {/* <Icon bgsrc={'./logo'}/> */}
      <H1>React Music</H1>
      <HeaderLink to="/user">
        <HeaderIconFont type='icon-mine'/>
      </HeaderLink>
    </HeadrStyle>
  )
}

