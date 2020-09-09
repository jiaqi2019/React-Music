import styled from 'styled-components'
import {
  $font_size_medium,
  $color_highlight_background,
  $color_text_l,
  $color_text_d,
} from '../../common/variable'

export default styled.div`
.search-box-wrapper{
    margin: 20px;
}
.shoutcut-wrapper{
    position: fixed;
    top: 178px;
    bottom: 0;
    width: 100%;
}
.suggest-wrapper{
    position: fixed;
    top: 178px;
    bottom: 0;
    width: 100%;
}

.shoutcut{
    height: 100%;
    overflow: hidden;
    .shoutcut-inner{
        padding-bottom: 10px;
    }
    .hot{
        margin: 0 20px 20px 20px;
        .title{
            font-size: ${$font_size_medium};
            margin-bottom: 20px;
            color: ${$color_text_l};
        }
        .item{
            background-color: ${$color_highlight_background};
            font-size: ${$font_size_medium};
            padding: 5px 10px;
            display: inline-block;
            margin: 0 20px 10px 0;
            color: ${$color_text_d};
            border-radius: 5px;
        }
    }
    .history{
        margin: 20px 20px;
        .title{
            display: flex;
            align-items: center;
            color: ${$color_text_l};
            height: 40px;
            font-size: ${$font_size_medium};
            .text{
                flex: 1;
            }
            .icon-clear{
                color: ${$color_text_d};
            }
        }
    }
}


`