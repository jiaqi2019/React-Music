import styled from 'styled-components'
import {$color_text_l, $font_size_medium, $color_text_d} from '../../common/variable'

export default styled.div`
  .item{
    display: flex;
    align-items: center;
    color: ${$color_text_l};
    font-size: ${$font_size_medium};
    margin-top: 20px ;
    .text{
        flex: 1;
    }
    .icon-delete{
        color: ${$color_text_d}
    }
  }

`
