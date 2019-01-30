import React, { Component } from 'react';
import { View, AsyncStorage, ActivityIndicator } from "react-native";
import { connect } from 'react-redux'

class ActivityLoading extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
      this._bootstrapAsync();
  }

    async componentDidMount() {
      await this._bootstrapAsync();
    }

    _bootstrapAsync = async () => {
        const userToken = await AsyncStorage.getItem('token');
        // This will switch to the App screen or Auth screen and this loading
        // screen will be unmounted and thrown away.
        this.props.navigation.navigate(userToken ? "LockNavigator" : "GuestNavigator");
    };

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center',}}>
        <ActivityIndicator color={"#a8a8a8"} size={48}/>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: {...state.user}
  }
}

export default connect(mapStateToProps)(ActivityLoading)