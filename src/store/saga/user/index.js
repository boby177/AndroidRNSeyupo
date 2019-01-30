import { put, call, takeLatest } from 'redux-saga/effects'
import { logIn, register, registerDevice, checkExistDevice, deleteDevice } from './user.api';
import { AUTH_SUCCESS, AUTH_FAILED, AUTH_LOGIN, REGISTER_SUCCESS, REGISTER_USER, RESULT_REGISTER_DEVICE, REGISTER_DEVICE, RESULT_CHECK_DEVICE, CHECK_DEVICE, RESULT_DELETE_DEVICE, DELETE_DEVICE } from '../../types';
import {AsyncStorage} from 'react-native'

function* Login(action) {
    try {
        const {response, error} = yield call (logIn, action.payload)
        if(response) {
            const token = AsyncStorage.setItem("token", response.data.token);
            const id = AsyncStorage.setItem("userId", response.data._id)
            if(token && id) {
                yield put({ type: AUTH_SUCCESS, status: 200, auth: true })
            }
        } 
        yield put({type: AUTH_FAILED, auth: false, status: 401, message: error.response.data.message});
    } catch (err) {
        // console.log(err)
    }
}

function* Register (action) {
    try {
        const {response, error} = yield call (register, action.payload)
        if(response) {
            yield put({type: REGISTER_SUCCESS, regSuccess: true, message: "success register"})
        } else {
            yield put({ type: REGISTER_SUCCESS, regSuccess: false, message: error.response.data.message })
        }
    } catch (error) {
        console.log(REGISTER_USER + ' ' +error)
    }
}

function* regDevice(action) {
    const {uniqueId} = action.payload
    try {
        const {response, error} = yield call(registerDevice, action.payload)
        if(response) {
            yield put({type: RESULT_REGISTER_DEVICE, success: true})
            const {res, err} = yield call(checkExistDevice, uniqueId)
            if(res) {
                if(res.data.listDevice.length > 0) {
                    yield put({ type: RESULT_CHECK_DEVICE, status: true, message: res.data.message })
                }
                yield put({ type: RESULT_CHECK_DEVICE, status: false, message: err.response.data.message })
            }
        }
        yield put({type: RESULT_REGISTER_DEVICE, success: false})
    } catch (error) {}
}

function* chkDev(action) {
    try {
        const { response, error } = yield call(checkExistDevice, action.payload)
        if (response) {
            if(response.data.listDevice.length > 0) {
                yield put({ type: RESULT_CHECK_DEVICE, status: true, message: response.data.message })
            }
        }
        
        yield put({ type: RESULT_CHECK_DEVICE, status: false, message: error.response.data.message })
    } catch (error) {}
}

function* delDev(action) {
    const { uniqueId } = action.payload    
    try {
        const {response, error} = yield call(deleteDevice, action.payload)
        if(response) {
            yield put({type: RESULT_DELETE_DEVICE, success: true, message: response.data})
            const { res, err } = yield call(checkExistDevice, uniqueId)
            if (res) {
                if (res.data.listDevice.length > 0) {
                    yield put({ type: RESULT_CHECK_DEVICE, status: true, message: res.data.message })
                }
                yield put({ type: RESULT_CHECK_DEVICE, status: false, message: err.response.data.message })
            }
        }
        yield put({ type: RESULT_DELETE_DEVICE, success: true, message: error.response.data })
    } catch (error) {}
}

export function* userSaga() {
    yield takeLatest(AUTH_LOGIN,Login);
    yield takeLatest(REGISTER_USER, Register);
    yield takeLatest(REGISTER_DEVICE, regDevice);
    yield takeLatest(CHECK_DEVICE, chkDev);
    yield takeLatest(DELETE_DEVICE, delDev)
}