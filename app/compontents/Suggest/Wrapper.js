
import styled from 'styled-components'
import Scroll from '../Scroll'
import {
  $color_text_d,
  $font_size_medium
} from '../../common/variable'

export default styled(Scroll)`
  height: 100%;
  overflow: hidden;

  .suggest-list{
      padding: 0 30px;
  }
  .item{
    display: flex;
    align-items: center;
    color: ${$color_text_d};
    font-size: ${$font_size_medium};
    padding-bottom: 20px;
    .iconfont{
      margin-right: 15px;
    }
    .icon-music{
      float: 0 0 30px;
    }
    .name{
      overflow: hidden;
    }
    .text{
      flex: 1;
      /* @include no-wrap() */
      text-overflow: ellipsis;
        overflow: hidden;
      white-space: nowrap;
    }
  }
  .footer{
    display: inline-block;
    width: 100%;
    vertical-align: top;
    text-align: center;
    margin-bottom: 20px;
    font-size: ${$font_size_medium};
    color: ${$color_text_d};
  }
`
