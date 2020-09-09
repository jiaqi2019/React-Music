import styled from 'styled-components'
import {
    $color_backgroud, $color_theme, $color_text_l, 
    $font_size_large_x, $font_size_medium_x,
    $font_size_small
} from '../../common/variable'

export default styled.div`

  position: fixed;
  top:0;
  bottom: 0;
  width: 100%;
  z-index: 100;
  background-color: ${$color_backgroud};
  .back{
      position: absolute;
      left: 6px;
      top: 0;
      padding: 15px 10px;
      font-size: ${$font_size_large_x};
      color: ${$color_theme};
  }

  .switches-wrapper{
      margin: 10px 0 30px 0;
  }
  .play{
      width: 135px;
      margin: 0 auto;
      border: 1px solid ${$color_text_l};
      border-radius: 100px;
      text-align: center;
      color: $color-text-l;
      padding: 7px 0;
      .icon-play{
          display: inline-block;
          margin-right: 6px;
          vertical-align: middle;;
          font-size: ${$font_size_medium_x}
      }
      .text{
          display: inline-block;
          vertical-align: middle;
          font-size: ${$font_size_small}
      }

  }
  .list-wrapper{
      position: absolute;
      top: 110px;
      bottom : 0;
      width: 100%;
      .list-scroll {
          height: 100%;
          overflow: hidden;
      }
      .list-inner{
          padding: 20px 30px;
      }
      .no-result-wrapper{
          width: 100%;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
      }
  }
`