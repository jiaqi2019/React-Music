
import {combineReducers} from 'redux'
import RecommendReducer from '../containers/RecommendPage/reducer'
import SingerReducer from '../containers/SingerPage/reducer'
import rankReducer from '../containers/RankPage/reducer'
import searchReducer from '../containers/SearchPage/reducer'
import playerReducer from '../containers/Player/reducer'

const rootReducer = combineReducers({
  RecommendReducer,
  SingerReducer,
  rankReducer,
  searchReducer,
  playerReducer,
})

export default rootReducer










