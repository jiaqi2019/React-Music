import { SET_SELECT_SINGER, HOT_NAME, HOT_SINGER_LEN} from './constants'


export function setSelectSinger(value) {
  return {
    type: SET_SELECT_SINGER,
    value: value
  }
}


