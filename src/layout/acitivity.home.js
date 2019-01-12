import React, { Component } from 'react';
import { View, Text, StyleSheet, Image} from 'react-native';

export default class ActivityHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Image 
            source={require('../assets/img/logo-revisi.png')}
            style={styles.img}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#303030',
        paddingTop: 50,
    },
    img: {
        width: 200,
        height: 120
    }
})