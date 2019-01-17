import {combineReducers} from 'redux'
import { navReducers } from '../../router';

const combine = combineReducers({
    nav: navReducers
})

export default combine