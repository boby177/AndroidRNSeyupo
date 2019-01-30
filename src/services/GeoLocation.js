window.navigator.userAgent = "react-native";
require('react-native');
const { AsyncStorage } = require('react-native')
const io = require("socket.io-client");

const socketPath = "https://seyupo-api.openode.io/";
const socket = io(socketPath);
const GeoLocation = async (taskData) => {
    try {
        
        const userId = await AsyncStorage.getItem("userId"),
            uniqueId = await AsyncStorage.getItem("deviceInfo");
            
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords
                socket.emit("track-device-" + userId, { latitude, longitude });
                socket.emit('test', { latitude, longitude, userId })
            },
            (error) => {
                socket.emit("test", { type: "error", error: error.message })
            }, {
                enableHighAccuracy: true,
                maximumAge: 10000,
                timeout: 20000
            }
        )
    } catch (error) {
        console.log(error)
    }
}


module.exports = GeoLocation
