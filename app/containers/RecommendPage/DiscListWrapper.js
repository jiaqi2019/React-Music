import styled from 'styled-components'
import {$color_theme, $font_size_medium ,$font_size_small, $color_text, $color_text_d} from '../../common/variable'

export default styled.div`
  width:100%;
  .list-title{
      line-height: 65px;
      text-align: center;
      color: ${$color_theme};
      font-size: ${ $font_size_medium};
  }
  .item{
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding: 0 20px 20px 20px;
      .icon{
          width: 60px;
          flex: 0 0 60px;
          padding-right: 20px;
          img{
              width:100%
          }
      }
      .text{
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        font-size: ${ $font_size_small};
        line-height: 20px;
        .name{
            font-size: ${ $font_size_medium};
            color: ${$color_text};
            margin-bottom: 10px;
        }
        .desc{
            color: ${$color_text_d};
        }
      }
  }
`


















