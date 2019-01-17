import React, { Component } from 'react';
import { View, Text, StyleSheet, BackHandler, Image, Dimensions, TouchableWithoutFeedback, Keyboard, NetInfo} from 'react-native';
import {Icon} from 'react-native-elements'
import TextInput from '../components/input'
import MButton from '../components/buttons'
import ModalExample from '../components/modal';

const {width} = Dimensions.get('window')

export default class ActivityRegister extends Component {
  constructor(props) {
    super(props);
    this.state = {
        user: '',
        mail: '',
        key: '',
        checked: false,
        erroruser: false,
        errorkey: false,
        errormail: false,
        errorchecked: false,
        error: false,
        open: false
    };
      this.goBack = this.goBack.bind(this)
      
  }
    componentWillMount() {
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            this.goBack(); // works best when the goBack is async
            return true;
        });
    }

    goBack() {
        const {navigation} = this.props
        const prev = navigation.getParam('prev','Login')
        this.props.navigation.navigate(prev)
    }

    componentWillUnmount() {
        this.backHandler.remove();
    }
  send() {
    const {user,mail,key,checked,erroruser, errorkey, errormail} = this.state
    const data = { user, mail, key, checked } 
    for(let i in data) {
        if(data[i] === undefined || data[i] === '' || !data[i]) {
            this.setState({
                ['error'+i]: true,
                error: true
            })
        }
    }
    this.setState({
        open: true
    })
  }

  onClose() {
      this.setState({
          open: false
      })
      this.setState({
          error: false
      })
  }
  
  render() {
      const {erroruser, errorchecked, errorkey, errormail} = this.state
    return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>

        <Image source={require('../assets/img/logo-revisi.png')} style={styles.img}/>
        <ModalExample
            open={this.state.open} 
            title="Success"
            description="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Incidunt, quasi."
            buttonTitle="Login"
            onClose={this.onClose.bind(this)}
            error={this.state.error}
        />
        <View style={{zIndex: 1}}>
            <TextInput error={erroruser} bicon="user" brand={true} onChangeText={user => this.setState({user}, () => {
                if (this.state.user !== '') {
                    this.setState({
                        erroruser: false
                    })
                }
            })}/>
            <TextInput error={errormail} bicon="envelope" solid={true} onChangeText={mail => this.setState({mail}, () => {
                if(this.state.mail !== '') {
                    this.setState({
                        errormail: false
                    })
                }
            })}/>
            <TextInput error={errorkey} bicon="key" secure solid={true} onChangeText={key => this.setState({key}, () => {
                if(this.state.key !== '') {
                    this.setState({
                        errorkey: false
                    })
                }
            })}/>
            <TouchableWithoutFeedback onPress={() => {
                this.setState({
                    checked: !this.state.checked
                }, () => {
                    if(this.state.checked) {
                        this.setState({
                        errorchecked: false
                    })
                }
                })
            }}>
                <View style={styles.boxContainer}>
                    {
                        !this.state.checked ?
                        <View style={this.state.errorchecked ? styles.errorCheckBoxContainer : styles.checkBoxContainer}/>
                        :
                        <Icon 
                        name="circle"
                            type="font-awesome"
                            color={"#a8a8a8"}
                            size={16}
                            containerStyle={styles.checkBoxContainer}
                        />
                    }
                    <Text style={errorchecked ? styles.errorTextBox : styles.textBox}>* Agree Term and Condition</Text>
                    {
                        errorchecked ?
                        <Text style={styles.errorText}>*Required field</Text>
                        : null
                    }
                </View>
            </TouchableWithoutFeedback>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <MButton title={'Register'} onPress={this.send.bind(this)}/>
            </View>
        </View>
        <TouchableWithoutFeedback onPress={(e) => {
            this.props.navigation.navigate('Login')
        }}>
            <Text style={styles.textBox}>Have an account ?</Text>
        </TouchableWithoutFeedback>
      </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#303030",
    color: "#a8a8a8"
  },
  img: {
    width: 200,
    height: 120,
    marginBottom: 50
  },
  boxContainer: {
    flexDirection: "row",
    width: width - 110,
    marginBottom: 25
  },
  checkBoxContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 25,
    height: 25,
    left: 0,
    backgroundColor: "#2a2929",
    paddingVertical: 0,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: "#2a2929",
    borderBottomWidth: 0,
    shadowColor: "#242424",
    shadowOffset: {
      width: 6,
      height: 5
    },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 5
  },
  errorCheckBoxContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 25,
    height: 25,
    left: 0,
    backgroundColor: "#2a2929",
    paddingVertical: 0,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: "#ec4e4e",
    borderBottomWidth: 1,
    shadowColor: "#242424",
    shadowOffset: {
      width: 6,
      height: 5
    },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 5
  },
  textBox: {
    fontSize: 15,
    color: "#a8a8a8",
    marginTop: 1,
    marginLeft: 3
  },
  errorTextBox: {
    fontSize: 15,
    color: "#ec4e4e",
    marginTop: 1,
    marginLeft: 3
  },
  errorText: {
    fontSize: 12,
    top: 3,
    right: -32,
    color: "#ec4e4e",
    position: "absolute"
  }
});
