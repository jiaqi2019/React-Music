import {SET_SLIDER_LIST, SET_DISC_LIST, SET_DISC} from './actionTypes.js'

const initialState = {
  sliderList: [],
  discList: [],
  disc: {}
}

const RecommendReducer = (state=initialState, action) => {
  switch (action.type) {
    case SET_SLIDER_LIST:
      return { ...state, sliderList: action.value }
    case SET_DISC_LIST:
      return { ...state, discList: action.value }
    case SET_DISC:
      return { ...state, disc: action.value }
    default:
      return state
  }
}

export default RecommendReducer