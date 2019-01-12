import React, { Component } from 'react'
import {View, Text, TextInput, StyleSheet, Dimensions} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'

const {width} = Dimensions.get('window')

export default class Input extends Component {
  render() {

    const {bicon, title, secure, error, solid, brand} = this.props

    return (
      <View style={error ? styles.containerError : styles.container}>
        <Icon 
          style={styles.icon}
          size={22}
          name={bicon}
          color={!error ? '#a8a8a8' : '#ec4e4e'}
          solid={solid ? solid : false}
          brand={brand ? brand : false}
        />
        <TextInput 
        style={styles.input} 
        underlineColorAndroid="transparent" 
        placeholder={title}
        placeholderTextColor={'#a8a8a8'} 
        autoCapitalize="none"
        secureTextEntry={secure ? secure : false}
        onChangeText={e => this.props.onChangeText ? this.props.onChangeText(e) : null}
        onChange={e => this.props.onChange ? this.props.onChange(e) : null}
        selectionColor={'#a8a8a8'}
        />
        {
          error ?
          <Text style={styles.text}>*Required Field</Text>
          :
          null
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      backgroundColor: '#2a2929',
      paddingVertical: 0,
      borderWidth: 1,
      borderRadius: 3,
      borderColor: '#2a2929',
      borderBottomWidth: 0,
      shadowColor: '#242424',
      color: '#a8a8a8',
      shadowOffset: {
          width: 2,
          height: 2
      },        
      shadowOpacity: 0.7,
      shadowRadius: 4,
      elevation: 5,
      marginBottom: 36,
      zIndex: 1
    },
    containerError: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      backgroundColor: '#2a2929',
      paddingVertical: 0,
      borderWidth: 1,
      borderRadius: 3,
      borderColor: '#ec4e4e',
      shadowColor: '#242424',
      color: '#a8a8a8',
      shadowOffset: {
          width: 2,
          height: 2
      },        
      shadowOpacity: 0.7,
      shadowRadius: 4,
      elevation: 5,
      marginBottom: 30,
    },
    icon: {
      fontSize: 18,
      paddingTop: 8,
      paddingLeft: 10,
      paddingRight: 10,
    },
    input: { 
        fontSize: 16,
        paddingLeft: 5,
        color: '#a8a8a8',
        width: width - 110,
        height: 40,
    },
    text: {
      fontSize: 12,
      top: -20,
      position: 'absolute',
      right: 5,
      color: '#ec4e4e'
    }
})