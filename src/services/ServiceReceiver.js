const { NativeModules } = require('react-native')
const { AsyncStorage } = require('react-native')

const SetData = async (taskData) => {

    const userId = await AsyncStorage.getItem('userId'),
        uniqueId = await AsyncStorage.getItem('deviceInfo');
    if (userId && uniqueId) {
        NativeModules.StartLockDev.setDataUser(userId.toString(), uniqueId.toString());
    }
}


module.exports = SetData
