import styled from 'styled-components'
import { $color_theme } from "../../common/variable";

const IconFont = styled.i.attrs(({ type }) => ({
  className: 'iconfont ' + type,
}))`
  color: ${props => props.color || $color_theme};
  display: inline-block;
`;


export default IconFont

