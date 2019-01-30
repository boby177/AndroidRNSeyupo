import React, { Component } from 'react'
import { Text, View } from 'react-native'
import Row from '../row';

export default class ModalLockDevice extends Component {
  render() {
      const {title, value} = this.props
    return (
      <View style={{marginVertical: 5,width: 300,padding: 10, height: 200,backgroundColor: 'rgba(0, 0, 0, 0.3)' ,alignItems: 'center'}}>
        <Text style={{color: "#fff", fontSize: 18}}>Device</Text>
        <Row title={title ? title : 'Status'} value={value ? value : 'Disconnected'} />
      </View>
    )
  }
}
