import React from 'react';
import styled from 'styled-components'

import {$font_size_small, $color_text_l} from '../../common/variable'

const ContentWrapper =  styled.div`
  text-align: center;
  img{
      width: 24px;
      height: 24px;
  }
  .desc{
      line-height: 20px;
      font-size: ${$font_size_small};
      color: ${$color_text_l};
  }
`

export default ContentWrapper


