import React, { Component } from 'react'
import { Text, View, Dimensions } from 'react-native'

const {width} = Dimensions.get("window")

export default class Row extends Component {
  render() {
    return (
      <View style={{width, paddingHorizontal: 50, paddingVertical: 5, flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={{color: "#fff", fontSize: 16}}> {this.props.title} </Text>
        <Text style={{color: this.props.color ? this.props.color : "#fff", fontSize: 16}}> {this.props.value} </Text>
      </View>
    )
  }
}
