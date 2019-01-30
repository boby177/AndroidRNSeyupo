import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, TouchableWithoutFeedback, AsyncStorage, Keyboard } from 'react-native';
import TextInput from "../components/input";
import MButton from "../components/buttons";
import ModalExample from '../components/modal';
import { connect } from 'react-redux'
import { Login } from '../store/action';
import { toUnicode } from 'punycode';
class ActivityLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
        error: false,
        user: "",
        pass: "",
        errorUser: false,
        errorPass: false,
        open: false,
        message: ''
    };
  }

  onClose() {
      this.setState({open: false})
  }

  componentWillReceiveProps(props) {
      console.log(props)
      if(props.user) {
          if(props.user.message !== '') {
              this.setState({
                  error: true,
                  open: true,
                  message: props.user.message
              })
          }
          if(props.user.auth) {
              this.props.navigation.navigate("Loading")
          } else {
              this.setState({
                  open: true
              })
          }
      }
  }

  render() {
    return <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.container}>
        <ModalExample 
            open={false}
            title={"Oops"}
            description={this.state.message}
            error={this.state.error}
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
            const data = {
                username: this.state.user,
                password: this.state.pass
            }
            
            if(data.username === "" && data.password === "") {
                this.setState({
                    errorUser: true,
                    errorPass: true
                })
            } else if(data.username === "") {
                this.setState({
                    errorUser: true,
                })
            } else if(data.password === "") {
                this.setState({
                    errorPass: true
                })
            } else {
                this.props.onLogin(data);
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


const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogin: (payload) => dispatch(Login(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ActivityLogin);

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