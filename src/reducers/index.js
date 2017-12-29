import { combineReducers } from 'redux'
import appReducer from './app'

const Reducers = combineReducers({
  app: appReducer
})

export default Reducers