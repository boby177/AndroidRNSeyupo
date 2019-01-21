import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableHighlight } from 'react-native'

export default class MButton extends Component {
  render() {
      const {error} = this.props
      let a = true
    return (
        <TouchableHighlight 
        style={error ? {...styles.errorTouch,...this.props.style} : {...styles.touch,...this.props.style}} 
        onPress={(e) => {
            this.props.onPress ? this.props.onPress(e) : null
        }}>
            <View style={styles.container}>
                <Text style={styles.text}>{this.props.title}</Text>
            </View>
        </TouchableHighlight>
    )
  }
}

const styles = StyleSheet.create({
    touch: {
        backgroundColor: "#74d6a9",
        width: 220,
        height: 42,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 30,
    },
    errorTouch: {
        backgroundColor:'#ec4e4e',
        width: 220,
        height: 42,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 30,
    },
    container: {        
        padding: 1,
    },
    text: {
        fontSize: 16,
        color: '#2d2624'
    }
})