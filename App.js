/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {TouchableWithoutFeedback, Keyboard, AppRegistry} from 'react-native'
import {Provider} from 'react-redux'
import {AppWithNavigationState} from './src/router';
import store from './src/store'

// const LogLocation = async data => {
//   navigator.geolocation.getCurrentPosition(position => {
//     console.log(position.coords);
//   });
// };
// AppRegistry.registerHeadlessTask("LogLocation", () => LogLocation);
export default class App extends Component {
  render() {
    return <Provider store={store}>
      <AppWithNavigationState />
    </Provider>
  }
}