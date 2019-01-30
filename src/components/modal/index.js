import React, { Component } from 'react';
import { Dimensions, Text, TouchableHighlight, View, Alert } from 'react-native';
import MButton from '../buttons'
import Modal from 'react-native-modalbox'
const { width } = Dimensions.get('window')
export default class ModalExample extends Component {
  constructor(props) {
    super(props)
    this.showModal = this.showModal.bind(this)
  }
  state = {
    modalVisible: false,
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  showModal() {
    this.refs.myModal.open()
  }

  hideModal() {
    this.refs.myModal.close()
  }

  componentWillReceiveProps(props) {
    if (props.open) {
      this.showModal()
    } else {
      this.hideModal()
    }
  }

  render() {
    const { error, buttonTitle, description } = this.props
    return (
      <Modal
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          width: width - 80,
          height: 200,
          padding: 18,
          backgroundColor: '#2a2929',
          paddingVertical: 0,
          borderWidth: 1,
          borderRadius: 3,
          borderColor: '#2a2929',
          borderBottomWidth: 0,
          shadowOffset: {
            height: 2,
            width: 2
          },
          shadowOpacity: 0.7,
          shadowRadius: 4,
          elevation: 5,
          zIndex: 99999
        }}

        ref={'myModal'}
        position={'center'}
        backdrop={true}
        onClosed={this.props.onClose}
        swipeToClose={true}
        backButtonClose={false}
      >
        <Text style={{
          fontSize: 32,
          fontWeight: '400',
          paddingTop: 20,
          color: error ? '#ec4e4e' : '#64c17a'
        }}>{error ? 'Failed' : 'Success'}</Text>
        {
          error ?
            <Text
              style={{
                marginTop: 15,
                color: '#a8a8a8',
              }}
            >Oops.</Text>
            :
            null
        }
        <Text
          style={{
            marginBottom: 22,
            color: '#a8a8a8',
            textAlign: 'center'
          }}
        >{description}</Text>
        <MButton 
        error={error ? error : false} 
        title={error ? 'Try Again' : buttonTitle} 
        onPress={this.props.onPress}></MButton>
      </Modal>
    );
  }
}