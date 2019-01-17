import React, { Component } from 'react';
import { View, Text, BackHandler, TouchableWithoutFeedback } from 'react-native';
import PasswordGesture from 'react-native-gesture-password'

export default class LockScreenOne extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: 'Please input your password.',
      status: 'normal',
      password: ""
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
    this.setState({
        password
    })
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
        <PasswordGesture 
            ref='pg'
            inputDefault='Please input your password.'
            onStart={() => this.onStart()}
            onEnd={(password) => this.onEnd(password)}
            onReset={() => this.onReset()}
            allowCross={false}            
        >
            
        {
            this.state.password !== "" ?
            <TouchableWithoutFeedback onPress={e => this.props.navigation.navigate("LockScreenTwo",{bPass: this.state.password})}>
            <View style={{position: 'absolute', bottom: 10, right: 10, padding: 30}}>
                <Text style={{color: '#a8a8a8', fontSize: 16}}>Next</Text>
            </View>
            </TouchableWithoutFeedback>
            :
            null
        }
        </PasswordGesture>
    );
  }
}
