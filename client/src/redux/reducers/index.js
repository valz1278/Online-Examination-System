import { combineReducers } from 'redux'
import authReducers from './authReducers'

const rootReducers =  combineReducers({
    authState : authReducers,
})
export default rootReducers