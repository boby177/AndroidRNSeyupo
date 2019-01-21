import React, { Component } from 'react';
import { View, Dimensions, BackHandler, ScrollView } from 'react-native';
import ToolBar from "../components/toolbar";
import ViewSetting from '../components/setting';

const {height, width} = Dimensions.get('window')

export default class ActivitySetting extends Component {
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
            paddingVertical: 20
        }}>
        
        <ScrollView zoomScale={0} style={{height: height + 50, width}}>
          <ViewSetting content={"Change Password"} onPress={(e) => this.props.navigation.navigate("ChangePass", {prev: "Setting"})} />
          <ViewSetting content={"Set Lock Screen"} onPress={(e) => this.props.navigation.navigate("LockScreen", {prev: "Setting"})} />
          <ViewSetting content={"About Seyupo"} onPress={(e) => this.props.navigation.navigate("About")} />
        </ScrollView>
        </View>
      </View>
    );
  }
}
