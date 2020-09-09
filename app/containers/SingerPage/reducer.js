import {SET_SELECT_SINGER} from './constants'

const initialState = {
  selectSinger: {}
}

export default function singerReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SELECT_SINGER:
      return {...state, selectSinger: action.value}
    default:
      return state
  }
}



