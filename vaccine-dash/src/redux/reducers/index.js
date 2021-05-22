import { combineReducers } from 'redux'
import regionReducer from './region'
import vaccineReducer from './vaccine'

export default combineReducers({
    region: regionReducer,
    vaccine: vaccineReducer
})