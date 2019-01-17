import React, { Component } from 'react';
import { View, Text, BackHandler, TouchableWithoutFeedback } from 'react-native';
import PasswordGesture from 'react-native-gesture-password'
import ToolBar from '../toolbar';
import MButton from '../buttons';
export default class LockScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: 'Please input your password.',
      status: 'normal'
    };
    this.goBack = this.goBack.bind(this)
    this.onEnd = this.onEnd.bind(this)
  }

  componentWillMount() {
    this.backButton = BackHandler.addEventListener("hardwareBackPress", this.goBack)
  }

  goBack() {
    const {navigation} = this.props
    const prev = navigation.getParam("prev", "Setting")
    navigation.navigate(prev)
    return true
  }

  componentWillUnmount() {
    this.backButton.remove()
  }

  onEnd(password) {
    console.log(password)
    if(password === '123') {
      this.setState({
        status: "right",
        message: "Password is right, success."
      })
    } else {
      this.setState({
        status: 'wrong',
        message: 'Password is wrong, try again.'
      });
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
    return (
        <View style={{flex: 1, paddingVertical: 20}}>
        <ToolBar title="Lock Screen" onPress={e => this.props.navigation.navigate("Setting")}/>
        {/* <View style={{alignItems: 'center', paddingTop: 20}}>
          <Text style={{ fontSize: 16,color: "#a8a8a8"}}>Status</Text>
          <Text style={{ fontSize: 16, color: "#a8a8a8" }}>No Lock Screen</Text>          
        </View> */}
          <TouchableWithoutFeedback onPress={e => this.props.navigation.navigate('LockScreenOne')}>
            <View style={{flex: 2, justifyContent: 'center',alignItems: 'center',}}>
              <Text style={{color: '#a8a8a8', fontSize: 24}}>Set Lock Screen</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
    );
  }
}
