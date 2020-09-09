import {SET_HOT_KEY, SET_SEARCH_HISTORY, TYPE_SINGER, GET_SEARCH_HISTORY } from './constants'
import {getHotKey} from '../../api/search'
import { saveSearchHitory, deleteSearchHitory, clearSearchHitory } from '../../common/js/cache'



export function makeHotkey(value) {
  return {
    type: SET_HOT_KEY,
    value
  }
}

export function makeSearchHistory(value) {
  return {
    type: SET_SEARCH_HISTORY,
    value
  }
}

export function makeGetSearchHistory(value) {
  return {
    type: GET_SEARCH_HISTORY
  }
}

export function loadHotKey() {
  return async function (dispatch) {
    let res = await getHotKey()
    let hotkey = res.data.hotkey
    hotkey.length > 20 && hotkey.splice(20)
    dispatch(makeHotkey(hotkey))
  }
}


export const saveSearchHistory = (arg) => {
  return (dispatch) => {
    dispatch(makeSearchHistory(saveSearchHitory(arg)))
  }
}

export const deleteSearchHistory = (arg) => {
  return (dispatch) => {
    dispatch(makeSearchHistory(deleteSearchHitory(arg)))
  }
}

export const clearSearchHistory = () => {
  return (dispatch) => {
    dispatch(makeSearchHistory(clearSearchHitory()))
  }
}

export const getSearchHistory = () => { 
  return (dispatch) => {
    dispatch(makeGetSearchHistory())
  }
}
