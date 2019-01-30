import {combineReducers} from 'redux'
import { navReducers } from '../../router';
import {userReducers} from './user.reducers'

const combine = combineReducers({
    nav: navReducers,
    user: userReducers
})

export default combine