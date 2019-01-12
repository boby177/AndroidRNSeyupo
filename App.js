/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import ActivityLogin from './src/layout/activity.login.js';
import ActivityRegister from './src/layout/activity.register.js';
import Test from './src/layout/activity.test.js';
import ActivityHome from './src/layout/acitivity.home.js';
import {Provider} from 'react-redux'
import {AppWithNavigationState, store} from './src/router';

export default class App extends Component {
  render() {
    return <Provider store={store}>
      <AppWithNavigationState />
    </Provider>
    //<RouterHome />
  }
}