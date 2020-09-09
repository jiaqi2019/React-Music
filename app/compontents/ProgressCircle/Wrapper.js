import styled from 'styled-components'
import { $color_theme_d, $color_theme } from '../../common/variable'

export default styled.div`
  &.progress-circle{
    position: relative;
    overflow: visible;
  }

  circle{
    stroke-width: 8px;
    transform-origin: center;
  }

  .progress-background{
    transform: scale(0.9);
    stroke: ${$color_theme_d}
  }

  .progress{
    transform: scale(0.9) rotate(-90deg);
    stroke: ${$color_theme}
  }
`



