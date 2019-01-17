import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import PasswordGesture from "react-native-gesture-password";

export default class Lock extends Component {
  constructor(props) {
    super(props);
    this.state = {
        message: 'Please input your password.',
        status: 'normal',
        lock: false
    };
    this._bootstrapAsync()
  }

  _bootstrapAsync = async () => {
      const pass = await AsyncStorage.getItem("lockPass")
      console.log(pass)
      if (pass === '' || pass === null || pass === undefined) {
          this.props.navigation.navigate("BottomNavigator")
      }
  }


  async onEnd(password) {
    const MyPass = await AsyncStorage.getItem('lockPass')
    if(MyPass !== password) {
        this.setState({
            status: "wrong",
            message: "Password is wrong, try again!!!"
        })
    } else {
            this.props.navigation.navigate("BottomNavigator")
    }
  }

  onStart() {
    this.setState({
      status: 'normal',
      message: 'Please input your password.'
    });
  }

  onReset() {
    this.setState({
      status: 'normal',
      message: 'Please input your password (again).'
    });
  }

  render() {
   
    return <PasswordGesture 
            ref='pg'
            inputDefault='Please input your password.'
            status={this.state.status}
            message={this.state.message}
            onStart={() => this.onStart()}
            onEnd={(password) => this.onEnd(password)}
        />
  }
}
