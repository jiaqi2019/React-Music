import ConditionDiv from '../ConditionDiv'
import styled from 'styled-components'
import * as variable from '../../common/variable'

export default styled(ConditionDiv)`
  position: fixed;
  z-index: 800;
  background-color: ${variable.$color_background_d};
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;

  .confirm-locaton{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 900;

    .confirm-content{
        width: 270px;
        border-radius: 13px;
        background: ${variable.$color_highlight_background};
    }
    .title{
        text-align: center;
        font-size:  ${variable.$font_size_large};
        color: $color-text-l;
        line-height: 22px;
        padding: 19px 15px;
        border-bottom: 1px solid;
    }
    .options{
        display: flex;
        align-items: center;
        text-align: center;
        font-size: ${variable.$font_size_large};
        .btn{
            flex: 1;
            display: inline-block;
            color: $color-text-d;
            line-height: 22px;
            padding:  10px 0;
        }
        .cancle{
            border-right: 1px solid;
        }
    }
  }
`
