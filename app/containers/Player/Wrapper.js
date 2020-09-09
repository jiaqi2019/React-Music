import styled from 'styled-components'
import ConditionDiv from '../../compontents/ConditionDiv'
import {
    $color_backgroud, $color_text, $color_theme, $color_text_l, $color_text_d,
    $font_size_large_x, $font_size_large, $font_size_medium,
    $color_text_ll, $color_theme_d, $color_sub_theme,
    $color_highlight_background, $font_size_small
} from '../../common/variable'

export default styled(ConditionDiv)`
  .normal{
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    background: ${$color_backgroud};
    z-index:150;
    .background{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        opacity: 0.5;
        filter: blur(20px)
    }
    .head{
        color: ${$color_text};
        position: relative;
        .back{
            position: absolute;
            left: 6px;
            .icon-back{
                display: inline-block;
                padding: 9px;
                color: ${$color_theme};
                font-size: ${$font_size_large_x};
                transform: rotate(-90deg);
            }
        }
        .title{
            text-align: center;
            width: 70%;
            margin: 0 auto;
            line-height: 40px;
            font-size: ${$font_size_large};
            /* @include no-wrap() */
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
        }
        .subtitle{
            text-align: center;
            line-height: 20px;
            font-size: ${$font_size_medium};
            width: 50%;
            margin: 0 auto;
            /* @include no-wrap() */
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
        }
    }
    .middle{
        position: fixed;
        top:80px;
        left: 0;
        width: 100%;
        bottom: 170px;

        /* // 针对 歌词 */
        white-space: nowrap

    }

    .mid-l{
      position: relative;
      width: 100%;
      padding-top: 80%;
      height: 0;
      display: inline-block;
      vertical-align: top;
      .cd-wrapper{
        position: absolute;
        top: 0;
        left: 10%;
        height: 100%;
        width: 80%;
        .cd{
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
        .image{
            width: 100%;
            height: 100%;
            border-radius: 50%;
            box-sizing: border-box;
            border: 10px solid rgba(255,255,255, 0.1);
        }
      }

    }
    .mid-lyric-wrapper{
        width: 80%;
        margin: 30px auto 0 auto;
        overflow: hidden;
        text-align: center;
        .lyric {
            font-size: ${$font_size_medium} ;
            color: ${$color_text_l};
            line-height: 20px;
        }
    }
    
    /* // 中间右边部分, */
    .mid-r{
        height: 100%;
        overflow: hidden;
        width: 100%;
        display: inline-block;
        vertical-align: top;
        .lyric-wrapper{
            width: 80%;
            text-align: center;
            margin: 0 auto;
            overflow: hidden;
        }
        .text{
            font-size: ${$font_size_medium};
            line-height: 32px;
            color: ${$color_text_l};
        }
        .current{
            color: ${$color_text}
        }
    }

    /* // 底部按钮部分 */
    .bottom{
        position: absolute;
        width: 100%;
        left: 0;
        bottom: 50px;
        .dot-wrapper{
            width: 100%;
            text-align: center;

            .dot{
                display: inline-block;
                width: 8px;
                height: 8px;
                margin: 0 4px;
                border-radius: 50%;
                background: ${$color_text_l};
                &.active{
                    width: 20px;
                    border-radius: 5px;
                    background-color: ${$color_text_ll};
                }
            }
        }
        .progress-wrapper{
            display: flex;
            width: 80%;
            margin: 0 auto;
            padding: 10px 0;
            align-items: center;
            .progress-bar-wrapper{
                flex: 1;
            }
            .time{
                flex: 0 0 30px;
                line-height: 30px;
                font-size: ${$font_size_medium};
                color: ${$color_text};
                width: 30px;
            }
            .time-l{
                text-align: left;
                margin-right: 8px;
            }
            .time-r{
                text-align: right;
                margin-left: 8px;
            }

        }
        .buttons{
            display: flex;
            align-items: center;
           
            .btn{
                flex: 1;
                color: ${$color_theme};
                font-size: 30px;
                &.disable{
                    color: ${$color_theme_d}
                }
            }
            .btn-left{
                text-align: right;
            }
            .btn-center{
                text-align: center;
                padding:0 20px;
                font-size: 40px;
            }

            .btn-right{
                text-emphasis: left;
            }
            .icon-favorite{
                color: ${$color_sub_theme};
            }
        }
    }
}

.mini{
    width: 100%;
    height: 60px;
    position: fixed;
    bottom:0;
    left: 0;
    display: flex;
    align-items: center;
    z-index: 200;
    background: ${$color_highlight_background};
    .img-l{
        flex: 0 0 40px;
        width: 40px;
        height: 40px;
        padding: 0 10px 0 20px;

        .imgwrapper{
            width: 100%;
            height: 100%;
        }
        img{
            border-radius: 50%;
            width: 100%;
            height: 100%;
            &.play{
                animation: rotate 10s linear infinite;
            }
            &.pause{
                animation-play-state: paused
            }
        }
    }
    .text{
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        line-height: 20px;
        overflow: hidden;
        .name{
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
            /* @include no-wrap(); */
          color: ${$color_text};
          font-size: ${$font_size_medium};
        }
        .desc{
            color: ${$color_text_d};
            font-size: ${$font_size_small};
        }
    }
    .control{
        flex: 0 0 30px;
        padding: 0 10px;
        height: 30px;
        .icon-play-mini, .icon-pause-mini, .icon-playlist{
          font-size: 30px;
          color: ${$color_theme_d};
        }
        /* // 定位在 progresscircle */
        .icon-mini{
            position: absolute;
            left: 0;
            top: 0;
            font-size: 32px;
        }

    }
    @keyframes rotate{
        0%{transform: rotate(0);}
        100%{transform: rotate(360deg) }
    }
    .nbsp{
        height: 20px;
    }
}
`
