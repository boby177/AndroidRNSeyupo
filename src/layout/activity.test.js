import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ModalExample from '../components/modal';
import ToolBar from '../components/toolbar';

export default class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <ToolBar title={'Help'}></ToolBar>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#303030',
    paddingTop: 20,
  }
})