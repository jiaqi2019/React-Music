import {SET_HOT_KEY, SET_SEARCH_HISTORY, GET_SEARCH_HISTORY} from './constants'
import {loadSearchHitory} from '../../common/js/cache'

const initialState = {
  hotKey: [],
  searchHistory: loadSearchHitory(),
}


export default function searchReducer(state = initialState, action){
  switch (action.type) {
    case SET_HOT_KEY :
      return { ...state, hotKey: action.value }
    case SET_SEARCH_HISTORY:
      return { ...state, searchHistory: action.value }
    case GET_SEARCH_HISTORY: 
      return {...state, searchHistory: loadSearchHitory()}
    default: 
      return state
  }
}