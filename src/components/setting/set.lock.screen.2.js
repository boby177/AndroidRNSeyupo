import React, { Component } from 'react';
import { View, Text, BackHandler, TouchableWithoutFeedback, AsyncStorage } from 'react-native';
import PasswordGesture from 'react-native-gesture-password'

export default class LockScreenTwo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: 'Please input your password.',
      status: 'normal',
      success: false,
      password: ''
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
      const {navigation} = this.props
      const bPass = navigation.getParam("bPass", "")
      if (bPass !== "") {
          if(bPass !== password) {
            this.setState({
                 status: "wrong",
                 message: "Password is wrong, try again!!!"
            })
          } else {
              this.setState({
                  status: "right",
                  message: "Password correct",
                  success: true,
                  password
              })
          }
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
        <PasswordGesture 
            ref='pg'
            status={this.state.status}
            message={this.state.message}
            inputDefault='Please input your password.'
            onStart={() => this.onStart()}
            onEnd={(password) => this.onEnd(password)}
            allowCross={false}
        >
            <TouchableWithoutFeedback onPress={e => this.props.navigation.goBack()}>
                <View style={{ position: 'absolute', bottom: 10, left: 10, padding: 30 }}>
                    <Text style={{ color: '#a8a8a8', fontSize: 16 }}>Reset</Text>
                </View>
            </TouchableWithoutFeedback>
            {
                this.state.success ?
                    <TouchableWithoutFeedback onPress={async e => {
                        await AsyncStorage.setItem("lockPass", this.state.password)
                        this.props.navigation.navigate("LockScreen")
                    }}>
                        <View style={{ position: 'absolute', bottom: 10, right: 10, padding: 30 }}>
                            <Text style={{ color: '#a8a8a8', fontSize: 16 }}>Fnish</Text>
                        </View>
                    </TouchableWithoutFeedback>
                :
                null
            }
        </PasswordGesture>
    );
  }
}
