import {createStore, compose, applyMiddleware} from 'redux'
import rootReducer from './reducers'
// import createSagaMiddleware from 'redux-saga'
import Thunk from 'redux-thunk'

// const sagaMiddleware = createSagaMiddleware()
let composeEnhancers = compose
if (process.env.NODE_ENV !== 'production' && typeof window == 'object') {
  if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) 
  }
}

// const middleware = [sagaMiddleware,]
const middleware = [Thunk]
const enhencers = [applyMiddleware(...middleware)]

const store = createStore(
  rootReducer,
  composeEnhancers(...enhencers)
)

export default store