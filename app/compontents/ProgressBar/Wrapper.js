
import styled from 'styled-components'
import {$color_background_d, $color_theme, $color_text } from '../../common/variable'

export default styled.div`
  &.progress-bar{
    height: 30px;
  }

  .inner{
      position: relative;
      height: 5px;
      top: 50%;
      transform: translateY(-50%);  
      background-color: ${$color_background_d};
  }

  .progress{
      height: 100%;
      background-color:${$color_theme};
      position: absolute;
      border-radius: 5px;;
  }
  .progress-btn-wrapper{
      width: 30px;
      height: 30px;
      position: absolute;
      left: -15px;
      top: -12px;
  }

  .progress-btn{
      position: relative;
      left: 50%;
      top: 50%;
      transform: translate3d(-50%,-50%, 0);
      width: 17px;
      height: 17px;
      border-radius: 50%;
      border: 4px solid ${$color_text};
      box-sizing: border-box;
      background-color: ${$color_theme};
  }

`
















