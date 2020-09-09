import styled from 'styled-components'
import {
  $color_text_d, $font_size_medium, $color_highlight_background
} from '../../common/variable'

export default styled.div`
    position: fixed;
    top: 88px;
    bottom: 0;
    width: 100%;
    .toplist{
      overflow: hidden;
      height: 100%;
      .rank-item{
        display: flex;
        margin: 0px 20px;
        padding-top: 20px;
        height: 100px;
        &:last-child{
            padding-bottom: 20px;
        }
        .item-img{
            flex: 0 0 100px;
            width: 100px;
            height: 100px;
        }
        .item-songList{
          height: 100px;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 0 20px;
          font-size: ${$font_size_medium};
          color: ${$color_text_d};
          background-color: ${$color_highlight_background};
          
          overflow: hidden; //给song文字折行用的
          .song{
              line-height: 26px;
              /* @include no-wrap() */
              text-overflow: ellipsis;
              overflow: hidden;
              white-space: nowrap;
          }
        }
      }
    }
` 











