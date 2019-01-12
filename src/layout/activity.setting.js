import React, { Component } from 'react';
import { View, Text } from 'react-native';
import ToolBar from "../components/toolbar";

export default class ActivitySetting extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    console.log(this.props)
    return (
       <View style={{
          flex: 1,
            paddingTop: 20,
      }}>
        <ToolBar 
            title="Setting" 
            onPress={(e) => this.props.navigation.navigate('Panel')}
        />
        <View style={{
            alignItems: 'center',
            marginTop: 20
        }}>
            <Text style={{color: '#a8a8a8'}}>Setting Me</Text>
        </View>
      </View>
    );
  }
}
