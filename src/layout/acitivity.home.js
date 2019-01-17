import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, BackHandler} from 'react-native';

export default class ActivityHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.exitApp = this.exitApp.bind(this)
  }
  
  componentWillMount() {
    this.backButton = BackHandler.addEventListener('hardwareBackPress', this.exitApp)
  }

  exitApp() {
    
    return true
  }

  componentWillUnmount() {
    this.backButton.remove()
  }

  
  render() {
    const {active} = this.props
    return (
      <View style={styles.container}>
        <Image 
            source={require('../assets/img/logo-revisi.png')}
            style={styles.img}
        />
          <Image source={require("../assets/img/secure.gif")}/>
        <View style={styles.jumbotron}>
          <Text style={styles.texti}>Status : </Text>
          <Text style={!active ? styles.textStatusActive : styles.textStatusDeactive}>
            {!active ? "Active" : "Deactive"}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#303030",
    paddingTop: 50
  },
  img: {
    width: 200,
    height: 120
  },
  jumbotron: {
    flex: 2,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row"
  },
  texti: {
    color: "#a8a8a8",
    fontSize: 24
  },
  textStatusDeactive: {
    color: "#ec4e4e",
    fontSize: 24
  },
  textStatusActive: {
    color: "#64c17a",
    fontSize: 24
  }
});