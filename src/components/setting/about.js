import React, { Component } from 'react'
import { Text, View, BackHandler, Image } from 'react-native'
import ToolBar from '../toolbar';

export default class AboutSeyupo extends Component {

    constructor(props) {
      super(props)
    
      this.state = {
      };
      this.goBack = this.goBack.bind(this)
    };

    componentWillMount() {
        this.backHandler = BackHandler.addEventListener("hardwareBackPress", this.goBack)
    }

    goBack() {
        this.props.navigation.navigate("Panel")
        return true
    }

    componentWillUnmount() {
        this.backHandler.remove()
    }

  render() {
    return (
      <View style={{ flex: 1, paddingVertical: 20}}>
        <ToolBar 
            title={"About Seyupo"}
            onPress={e => this.props.navigation.navigate("Panel")}
        />
        <View style={{paddingVertical: 50, paddingHorizontal: 20, justifyContent: 'center', alignItems: 'center',}}>
            <Image 
                source={require('../../assets/img/logo-revisi.png')}
                style={{
                    width: 200,
                    height: 120,
                    marginBottom: 20
                }}
            />
            <Text style={{color: "#a8a8a8", fontSize: 16}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, dolores.</Text>
            <Text style={{color: "#a8a8a8", fontSize: 16}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, dolores.</Text>
            <Text style={{color: "#a8a8a8", fontSize: 16}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, dolores.</Text>
        </View>
      </View>
    )
  }
}
