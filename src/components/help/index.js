import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TextInput from '../input'
import Button from '../buttons'
export default class HelpMe extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View>
        <Text style={styles.title}> FAQ </Text>
        <View style={{alignContent: 'center', padding: 11}}>
            <Text style={{fontSize: 18, color: '#64c17a', marginBottom: 7}}>How do i get my phone back if it's lost ?</Text>
            <Text style={{color: '#a8a8a8'}}>Open our web www.seyupo.com, and login, see right side and then hit "Track Device"</Text>
        </View>
        <View style={{alignContent: 'center', padding: 11, marginBottom: 35}}>
            <Text style={{fontSize: 18, color: '#64c17a', marginBottom: 7}}>How to register more than one device ?</Text>
            <Text style={{color: '#a8a8a8'}}>Install Seyupo App in your device and just login</Text>
        </View>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <TextInput bicon="question" brand={true}/>
            <Button title={'Submit'}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    title: {
        fontSize: 26,
        color: '#a8a8a8',
        fontWeight: '400',
        letterSpacing: 2
    }
})