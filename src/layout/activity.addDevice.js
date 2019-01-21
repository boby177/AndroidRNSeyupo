import React, { Component } from 'react';
import { View, BackHandler, Image } from 'react-native';
import Toolbar from '../components/toolbar'
import Row from '../components/row';
import MButton from '../components/buttons';


export default class ActivityAddDevice extends Component {
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
      this.props.navigation.navigate("Panel")
      return true
  }

  componentWillUnmount() {
      this.backButton.remove()
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
                paddingVertical: 80, flex: 2,
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
            <View style={{ paddingVertical: 30, alignItems: 'center',}}>
                <Row title={"Device Name"} value={"Nexus 5X"} />
                <Row title={"Status"} value={"Connected"} color={"#64c17a"} />
                <MButton title={"Remove Device"} onPress={() => null} style={{marginTop: 40}} />
            </View>
        </View>
      </View>
    );
  }
}
