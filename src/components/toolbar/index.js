import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5'
export default class ToolBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight 
        style={styles.icon}
        onPress={(e) => this.props.onPress ? this.props.onPress(e) : null}>
            <Icon 
                size={36}
                color={'#a8a8a8'}
                name={'angle-left'}
                solid
            />
        </TouchableHighlight>
        <Text style={styles.title}> {this.props.title} </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    icon: {
        position: 'absolute',
        top: -4,
        left: 15
    },
    title: {
        fontSize: 24,
        color: '#a8a8a8'
    }
})