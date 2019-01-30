import React, { Component } from 'react';
import { View, Text, AsyncStorage, NativeModules, BackHandler } from 'react-native';
import IO from 'socket.io-client'


export default class ActivityLockDevice extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };

    this.socket = IO("http://192.168.122.1:4001/");
    this.socket = this.socket.connect();
  }

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff'}}>
        <Text style={{fontSize: 28}}> Locked </Text>
      </View>
    );
  }
}
