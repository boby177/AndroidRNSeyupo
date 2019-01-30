import { AUTH_SUCCESS, AUTH_FAILED, REGISTER_SUCCESS, REGISTER_FAILED, RESULT_REGISTER_DEVICE, AUTH_RESULTS, RESULT_CHECK_DEVICE, RESULT_DELETE_DEVICE } from "../types";
const initialState = {
    auth: false,
    regSuccess: false,
    device: false,
    message: '',
    deviceExist: false,
    isDelDevice: false
}
export const userReducers = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_SUCCESS: 
        return {
            ...state,
            auth: action.auth,
            status: action.status
        }
        case AUTH_FAILED:
        return {
            ...state,
            auth: action.auth,
            status: action.status,
            message: action.message
        }
        case REGISTER_SUCCESS:
        return {
            ...state,
            regSuccess: action.regSuccess,
            message: action.message            
        }
        case REGISTER_FAILED:
        return {
            ...state,
            regSuccess: false,
        }
        case RESULT_REGISTER_DEVICE:
        return {
            ...state,
            device: action.success
        }
        case RESULT_CHECK_DEVICE:
        console.log(action)
        return {
            ...state,
            deviceExist: action.status,
            message: action.message
        }
        case RESULT_DELETE_DEVICE:
        return {
            ...state,
            isDelDevice: action.status,
            message: action.message
        }
        default: 
        return state
    }
}