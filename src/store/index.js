import {createStore, applyMiddleware} from 'redux'
import reducers from './reducers'
import createSagaMiddleware from "redux-saga";
import { middleware } from '../router';
import rootSaga from './saga'

const sagaMiddleware = createSagaMiddleware()
const mMiddleware = [middleware,sagaMiddleware]

export const configureStore = () => {
    const store = createStore(reducers, applyMiddleware(...mMiddleware))
    sagaMiddleware.run(rootSaga)
    return store
}

// sagaMiddleware.run(rootSaga);