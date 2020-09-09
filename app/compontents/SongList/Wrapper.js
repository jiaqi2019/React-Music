import styled from 'styled-components'
import {
  $color_theme, $font_size_large,
  $font_size_medium, $color_text, $color_text_d,
} from '../../common/variable'
import firstpng from './first@2x.png'
import secondpng from './second@2x.png'
import thirdpng from './third@2x.png'

export default styled.div`
  .item{
        display: flex;
        align-items: center;
        height: 64px;
        box-sizing: border-box;
    }
    .rank{
        flex: 0 0 25px;
        width: 25px;
        margin-right: 30px;
        text-align: center;
        .icon{
            display: inline-block;
            width: 25px;
            height: 24px;
            background-size: 100% 100%;
            &.icon0{
              background-image: url(${firstpng});
              @media all and (-webkit-min-device-pixel-ratio: 3) and (min-device-pixel-ratio: 3){
                background-image: url(${firstpng});
              }
            }
            &.icon1{
                /* @include bg-image('second') */
              background-image: url(${secondpng});
              @media all and (-webkit-min-device-pixel-ratio: 3) and (min-device-pixel-ratio: 3){
                background-image: url(${secondpng});
              }
            }
            &.icon2{
                /* @include bg-image('third') */
              background-image: url(${thirdpng});
              @media all and (-webkit-min-device-pixel-ratio: 3) and (min-device-pixel-ratio: 3){
                background-image: url(${thirdpng});
              }
            }

        }
        .text{
            color: ${$color_theme} ;
            font-size: ${ $font_size_large};
        }
    }
    .content{
        flex: 1;
        line-height: 20px;
        overflow: hidden;
        .name{
            /* @include no-wrap(); */
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;

            color: ${$color_text};
            font-size: ${$font_size_medium};
        }
        .desc{
            /* @include no-wrap(); */
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;

            color: ${$color_text_d};
            margin-top: 4px;
            font-size: ${$font_size_medium};
        }
    }

`