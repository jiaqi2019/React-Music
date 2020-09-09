
import { getTopBanner, getDiscList } from '../../api/recommend' 
import {SET_SLIDER_LIST, SET_DISC_LIST, SET_DISC} from './actionTypes'

export const setSliderAction = (value) => ({type:SET_SLIDER_LIST, value})
export const setDiscAction = (value) => ({type:SET_DISC_LIST, value})
export const makeDisc = (value) => ({ type: SET_DISC, value})


export const getSlider = () => {
  return async function (dispatch) {
    let result = await getTopBanner()
    let slider = result.data.slider
    dispatch(setSliderAction(slider))
  }
}


export const getDisc = () => {
  return async function (dispatch) {
    let result = await getDiscList()
    let disclist = result.data.list
    dispatch(setDiscAction(disclist))
  }
}

export const setDisc = (value) => {
  return function (dispatch) {
    dispatch(makeDisc(value))
  }
}




