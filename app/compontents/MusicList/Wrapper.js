import styled from 'styled-components'
import {
  $color_backgroud, $font_size_large_x, $color_theme, $font_size_large,
  $color_text, $color_mask, $font_size_medium, $font_size_small
} from '../../common/variable'

export default styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color:${$color_backgroud};

  .back{
    position: absolute;
    top: 0;
    left: 6px;
    z-index: 40;
    .icon-back{
        display: inline-block;
        padding: 10px;
        font-size: ${$font_size_large_x};
        color: ${$color_theme};
    }
  }
  .title{
    z-index: 40;
    position: absolute;
    left: 10%;
    width: 80%;
    text-align: center;
    /* @include no-wrap(); */
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;

    line-height: 40px;
    font-size: ${$font_size_large} ;
    color:${$color_text};
  }
  .bg-img{
    width: 100%;
    height: 0;
    padding-top: 70%;
    transform-origin: top;
    position: relative;
    background-size: cover;
    transform-origin: top;
    .mask{
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      background-color:${ $color_mask};
    }
    .btn-wrapper{
      position: absolute;    
      left: 0;
      bottom: 20px;
      width: 100%;
    }
        
    .play{
      width: 135px;
      margin: 0 auto;
      border-radius: 100px;
      text-align: center;
      border: 1px solid ${$color_theme};
      padding: 7px;
      color: ${$color_theme};
      box-sizing: border-box;

      .icon-play{
        color: ${$color_theme};
        font-size: ${$font_size_medium};
        margin-right: 6px;
        display: inline-block;
        vertical-align: middle;
      }
      .text{
          color: ${$color_theme};
          font-size: ${$font_size_small};
          display: inline-block;
          vertical-align: middle;
      }
    }
  }

  .list{
      position: absolute;
      top: 0;
      bottom: 0;
      width: 100%;
      background: ${$color_backgroud};
      z-index: 0;
      /* // overflow: hidden; */
      .list-wrapper{
          padding: 20px 30px;
      }
  }

  .bg-layer{
      position: relative;
      height: 100%;
      background-color: ${$color_backgroud};
  }

`