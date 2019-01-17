import React, { Component } from 'react';
import { View, Text, BackHandler, StyleSheet } from 'react-native';
import ToolBar from '../toolbar';
import TextInput from '../input';
import MButton from '../buttons';

export default class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.goBack = this.goBack.bind(this)
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

  render() {
    return (
      <View style={{flex: 1, paddingTop: 20}}>
          <ToolBar title="Change Password" onPress={e => this.props.navigation.navigate("Setting")}/>
          <View style={{justifyContent: 'center', padding: 30}}>

            <Text style={styles.text}>New Password</Text>
            <TextInput error={false} bicon="key" solid />

            <Text style={styles.text}>Re-type new password</Text>
            <TextInput error={false} bicon="key" solid />

            <View style={{alignItems: 'center'}}>
                <MButton title="Change Password"onPress={e => null} />
            </View>
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    text: {
        fontSize: 15,
        color: "#a8a8a8",
        marginBottom: 6,
    }
})
