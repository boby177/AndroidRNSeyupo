import { AUTH_LOGIN, AUTH_SUCCESS, AUTH_FAILED, REGISTER_SUCCESS, REGISTER_USER, REGISTER_FAILED, REGISTER_DEVICE, CHECK_DEVICE, DELETE_DEVICE } from "../types";

export const Login = ({username, password}) => {
    return {
        type: AUTH_LOGIN,
        payload: {username, password}
    }
}

export const sucessAuth = (payload) => {
    return {
        type: AUTH_SUCCESS,
        payload
    }
}

export const registerDevice = (payload) => {
    return {
        type: REGISTER_DEVICE,
        payload
    }
}

export const failedAuth = (payload) => {
    return {
        type: AUTH_FAILED,
        payload
    }
}

export const registerUser = (payload) => {
    return {
        type: REGISTER_USER,
        payload
    }
}

export const registerSuccess = (payload) => {
    return {
        type: REGISTER_SUCCESS,
        payload
    }
}

export const registerFailed = payload => {
    return {
        type: REGISTER_FAILED,
        payload
    }
}

export const checkDevice = payload => {
    return {
        type: CHECK_DEVICE,
        payload
    }
}

export const deleteDevice = payload => {
    return {
        type: DELETE_DEVICE,
        payload
    }
}