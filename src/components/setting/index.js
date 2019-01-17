import React, { Component,Fragment } from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5'

export default class ViewSetting extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
    <TouchableHighlight 
        onPress={this.props.onPress}
    >
      <View style={{...styles.container}}>
        <View style={styles.content}>
            <Text style={styles.textContent}>{this.props.content}</Text>
        </View>
        <View 
            style={{ marginLeft: -10 }}
        >
            <Icon 
                name="angle-right"
                size={22}
                color={'#a8a8a8'}
                solid
                // style={{position: 'absolute', right: 0, top: -44}}
            />
        </View>
      </View>
    </TouchableHighlight>
    );
  }
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 25,
    },
    content: {
        color: '#a8a8a8',
        paddingVertical: 22,
        paddingHorizontal: 0
    },
    textContent: {
        color: '#a8a8a8',
        fontSize: 16,
    }
})