import {SET_SELECT_RANK} from './constant'
const initialState = {
  selectedRank: {},
}

export default function rankeReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SELECT_RANK:
      return {...state, selectedRank: action.value}
    default:
      return state
  }
}