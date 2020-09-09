import styled from 'styled-components'
import {
  $color_highlight_background,
  $color_backgroud,
  $font_size_medium,
  $color_text,
  $color_text_d,
} from '../../common/variable'

export default styled.div`
  background-color: ${$color_highlight_background};
  height: 40px;
  border-radius: 6px;
  padding: 0 6px;
  display: flex;
  align-items: center;

  .icon-search{
    font-size: 24px;
    color: ${$color_backgroud}
  }

  .box{
    flex: 1;
    font-size: ${$font_size_medium};
    color: ${$color_text};
    outline: 0;
    background-color: ${$color_highlight_background};
    line-height: 18px;
    margin: 0 5px;
    &::placeholder{
        color: ${$color_text_d}
    }
  }

  .icon-dismiss{
    font-size: 16px;
    color: ${$color_backgroud};
  }
`


