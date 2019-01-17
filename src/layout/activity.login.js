import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, TouchableWithoutFeedback, AsyncStorage, Keyboard } from 'react-native';
import TextInput from "../components/input";
import MButton from "../components/buttons";
import ModalExample from '../components/modal';

export default class ActivityLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
        error: false,
        user: "",
        pass: "",
        errorUser: false,
        errorPass: false,
        open: false
    };
  }

  onClose() {
      this.setState({open: false})
  }

  render() {
    return <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.container}>
        <ModalExample 
            open={this.state.open}
            title={"Oops"}
            description="Username or Password incorrect"
            error={true}
            onClose={this.onClose.bind(this)}
            onPress={this.onClose.bind(this)}
        />
        <Image source={require("../assets/img/logo-revisi.png")} style={styles.img} />
        <View style={{zIndex: 1}}>
            <TextInput 
                bicon="user" 
                brand={true} 
                error={this.state.errorUser} 
                onChangeText={(v) => this.setState({user: v},
                     () => this.state.user !== "" ? this.setState({errorUser: false}) : null) //this.setState({errorUser: true}))
                } 
            />
            <TextInput 
                bicon="lock" 
                secure={true} 
                error={this.state.errorPass} 
                onChangeText={v => this.setState({pass: v},
                    () => this.state.pass !== "" ? this.setState({errorPass: false}) : null) // this.setState({errorPass: true}))
                }
            />
        </View>
        <MButton title={"Login"} onPress={e => {
            console.log(this.state)
            const data = {
                user: this.state.user,
                pass: this.state.pass
            }

            if(data.user === 'admin' && data.pass === 'admin') {
                AsyncStorage.setItem("token", "1234567")
                this.props.navigation.navigate("Loading", {
                  prev: "Login"
                });
            } else if(data.user === "" && data.pass === "") {
                this.setState({
                    errorUser: true,
                    errorPass: true
                })
            } else if(data.user === "") {
                this.setState({
                    errorUser: true,
                })
            } else if(data.pass === "") {
                this.setState({
                    errorPass: true
                })
            } else {
                this.setState({
                    open: true
                })
            }
          }} />
        <TouchableWithoutFeedback onPress={e => {
            console.log("e");
          }}>
          <Text style={styles.text}>Forget Password ?</Text>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={e => {
            this.props.navigation.navigate("Register");
          }}>
          <Text style={styles.text}>Doesn't have an account ? </Text>
        </TouchableWithoutFeedback>
      </View>
    </TouchableWithoutFeedback>;
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