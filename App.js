/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { AsyncStorage, PermissionsAndroid } from 'react-native'
import {Provider} from 'react-redux'
import {AppWithNavigationState} from './src/router';
import DeviceInfo from 'react-native-device-info'
import {configureStore} from './src/store'
import { setAxiosConfig } from './src/utils/appConfig';
console.disableYellowBox = true;
const store = configureStore()
setAxiosConfig()

const requestNewPermission = async () => {
  try {
    const granted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
    const granted2 = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION);
    if(granted !== PermissionsAndroid.RESULTS.GRANTED) {
      await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
    }
    if (granted2 !== PermissionsAndroid.RESULTS.GRANTED) {
      await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION);
    }
  } catch (error) {
    console.warn(error)
  }
}
export default class App extends Component {
  async componentWillMount() {
    await requestNewPermission()
  }

  componentDidMount() {
    AsyncStorage.setItem('deviceInfo', DeviceInfo.getUniqueID());
  }

  render() {
    return <Provider store={store}>
        <AppWithNavigationState />
      </Provider>;
  }
}
