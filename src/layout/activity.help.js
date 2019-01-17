import React, { Component } from 'react';
import { View, Text, BackHandler, TouchableWithoutFeedback, Keyboard } from 'react-native';
import ToolBar from '../components/toolbar';
import HelpMe from '../components/help';

export default class ActivityHelp extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.goBack = this.goBack.bind(this)
  }
    componentWillMount() {
        this.backButton = BackHandler.addEventListener('hardwareBackPress', this.goBack)
    }

    goBack() {
        const { navigation } = this.props
        const prev = navigation.getParam('prev', 'Panel')
        this.props.navigation.navigate(prev)
        return true
    }

    componentWillUnmount() {
        this.backButton.remove()
    }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{
          flex: 1,
          paddingTop: 20,
        }}>
          <ToolBar 
              title="Help" 
              onPress={(e) => this.props.navigation.navigate('Panel')}
              />
          <View style={{
            padding: 26,
              alignItems: 'flex-start',
              marginTop: 20
          }}>
              {/* <Text style={{color: '#a8a8a8'}}>Help me</Text> */}
              <HelpMe/>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
