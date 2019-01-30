import Axios from 'axios';
import {AsyncStorage} from 'react-native'
export const logIn = async (payload) => {
    return await Axios({
        url: '/sign-in',
        method: 'post',
        data: payload
    })
    .then(response => ({response}))
    .catch(error => ({error}))
}

export const register = async (payload) => {
    return await Axios({
        url: '/sign-up',
        method: 'post',
        data: payload
    })
    .then(response => ({response}))
    .catch(error => ({error}))
}

export const registerDevice = async (payload) => {
    return await Axios({
        url: '/admin/user/'+await AsyncStorage.getItem('userId'),
        method: 'post',
        data: payload
    })
    .then(response => ({response}))
    .catch(error => ({error}))
}

export const checkExistDevice = async (payload) => {
    return await Axios({
        url: "/admin/get-spesific-device/"+await AsyncStorage.getItem('userId'),
        method: "post",
        data: payload
    })
        .then(response => ({response}))
        .catch(error => ({error}))
}

export const deleteDevice = async (payload) => {
    return await Axios({
        url: "/admin/delete-device/" + await AsyncStorage.getItem('userId'),
        method: "post",
        data: payload
    })
        .then(response => ({ response }))
        .catch(error => ({ error }))
}