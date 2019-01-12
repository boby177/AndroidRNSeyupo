import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import Maps from '../components/maps'
import Icon from "react-native-vector-icons/FontAwesome5";

export default class ActivityMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return <View style={styles.container}>
        <Maps />
        <View style={styles.wrapFloat}>
            <TouchableHighlight style={styles.btn}>
                <View style={{justifyContent: 'center', alignItems: 'center',}}>
                    <Icon name={'bell'} size={20} color={'#a8a8a8'} />
                    <Text style={styles.text}>Alarm</Text>
                </View>
            </TouchableHighlight>
            <TouchableHighlight style={styles.btn}>
                <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                    <Icon name={'lock'} size={20} color={'#a8a8a8'} />
                    <Text style={styles.text}>Lock</Text>
                </View>
            </TouchableHighlight>
            <TouchableHighlight 
            onPress={(e) => this.props.navigation.navigate('Panel')}
            style={styles.btn}>
                <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                    <Icon name={'arrow-left'} size={20} color={'#a8a8a8'} />
                    <Text style={styles.text}>Back</Text>
                </View>
            </TouchableHighlight>
        </View>
      </View>;
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#303030',
    },
    wrapFloat: {
        position: 'absolute',
        zIndex: 99999,
        right: 0
    },
    btn: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 63,
        height: 93,
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
        marginVertical: 10,
    },
    text: {
        color: '#a8a8a8',
        fontSize: 12,
        marginTop: 7,
    }
})