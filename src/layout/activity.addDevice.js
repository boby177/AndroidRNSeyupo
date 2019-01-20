import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import Toolbar from '../components/toolbar'


export default class ActivityAddDevice extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={{
          flex: 1,
          paddingVertical: 20
      }}>
        <Toolbar 
            title="Add Device" 
            onPress={(e) => this.props.navigation.navigate('Panel')}
        />  
            <View style={{
                padding: 20, flex: 2,
                alignItems: 'center',}}>
            <Image 
                source={{
                    uri: "https://cdn1.iconfinder.com/data/icons/screen-1/640/iphone6s-black-fixed-512.png"
                }}
                style={{
                    
                    width: 60,
                    height: 140
                }}
            />
        </View>
      </View>
    );
  }
}
