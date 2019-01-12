import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import TextInput from "../components/input";
import MButton from "../components/buttons";

export default class ActivityLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
        error: false
    };
  }

  render() {
      console.log(this.props)
    return <View style={styles.container}>
        <Image source={require("../assets/img/logo-revisi.png")} style={styles.img} />
        <TextInput bicon="user" brand={true} error={this.state.error} />
        <TextInput bicon="lock" secure={true} error={this.state.error} />
        <MButton title={"Login"} onPress={(e) => {
            this.props.navigation.navigate('BottomNavigator')
        }} />
        <TouchableWithoutFeedback onPress={(e) => {console.log('e')}}>
            <Text style={styles.text}>Forget Password ?</Text>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback 
        onPress={(e) => {this.props.navigation.navigate('Register')}}>
            <Text style={styles.text}>Doesn't have an account ? </Text>
        </TouchableWithoutFeedback>
      </View>;
  }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#303030",
        color: '#a8a8a8',
    },
    welcome: {
        fontSize: 20,
        textAlign: "center",
        margin: 10,
        color: "#a8a8a8"
    },
    instructions: {
        textAlign: "center",
        color: "#a8a8a8",
        marginBottom: 5
    },
    img: {
        width: 200,
        height: 120,
        marginBottom: 50,
        marginTop: 0,
    },
    text: {
        fontSize: 16,
        color: '#a8a8a8',
        marginTop: 30,
        marginBottom: 30
    }
});