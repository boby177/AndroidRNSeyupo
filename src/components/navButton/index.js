import React, { Component } from 'react';
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5'
export default class NavButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
        <TouchableHighlight 
        style={styles.container} 
        onPress={(e) => this.props.onPress ? this.props.onPress(e) : null}>
            <View style={styles.con}>
                <Icon color={'#a8a8a8'} name={this.props.iconName} size={36} solind={this.props.solid} brand={this.props.brand} />
                <Text style={{ fontSize: 10 ,color: '#a8a8a8', marginTop: 10}}>{this.props.title}</Text>
            </View>
        </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 141,
        height: 138,
        backgroundColor: '#2a2929',
        paddingVertical: 0,
        borderWidth: 1,
        borderRadius: 3,
        borderColor: '#2a2929',
        borderBottomWidth: 0,
        shadowColor: '#242424',
        shadowOffset: {
            width: 2,
            height: 2
        },
        shadowOpacity: 0.7,
        shadowRadius: 4,
        elevation: 5,
        margin: 10
    },
    con: { 
        justifyContent: 'center', 
        alignItems: 'center', 
    }
})