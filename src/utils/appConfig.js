import Axios from "axios";
import {AsyncStorage} from 'react-native'
export const setAxiosConfig = async () => {
    const token = await AsyncStorage.getItem("token")
    Axios.defaults.baseURL = "https://seyupo-api.openode.io/";
    if(token) {
        Axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    } else {
        delete Axios.defaults.headers.common['Authorization']
    }
}
