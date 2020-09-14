import styled from 'styled-components'
import Scroll from '../../compontents/Scroll'

import {
  $font_size_small,
  $font_size_medium,
  $color_text_l,
  $color_theme,
  $color_backgroud,
  $color_highlight_background,
  $color_background_d
} from '../../common/variable'

export default styled(Scroll)`
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
  color: ${$color_text_l};
  background-color: ${$color_backgroud};
  .list-group{
      width: 100%;
      /* padding-bottom: 30px; */
      .list-group-title {
          line-height: 30px;
          padding-left: 20px;
          // margin-bottom: 15px;
          font-size: ${$font_size_small};
          background-color: ${$color_highlight_background}; 
      }
  }
  .list-group-item {
      display: flex;
      justify-content: flex-start;
      padding: 20px 0 0 30px;
      align-items: center;
      
      &:last-child{
          padding-bottom: 20px;
      }
      .ava{
          flex: 0 0;
        //   width: 50px;
          height: 50px;
          border-radius: 50%;
      }
      .name{
          margin-left: 20px;
          font-size: ${$font_size_medium} ;
      }
  }

  .list-shorcut{
      position: absolute;
      top: 50%;
      right: 5px;
      transform: translateY(-50%);
      width: 20px;
      padding: 20px 0;
      background: ${$color_background_d};
      border-radius: 10px;
      text-align: center;
      font-size:  ${$font_size_small};
      .item{
          padding: 3px;
          line-height: 1;
          &.current{
              color: ${$color_theme};
          }
      }
  }
  .fixed{
      width: 100%;
      position: absolute;
      top: -1px;
      left: 0;
      .title{
          line-height: 30px;
          padding-left: 20px;
          font-size: ${$font_size_small};
          background-color: ${$color_highlight_background};  
      }
  }

`
