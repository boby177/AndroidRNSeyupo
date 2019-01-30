import React, { Component } from 'react'
import { Dimensions } from 'react-native'
import Modal from "react-native-modalbox";

const { width, height } = Dimensions.get("window");

export default class ModalKu extends Component {
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
    this.refs.mModal.open()
  }

  hideModal() {
    this.refs.mModal.close()
  }

  componentWillReceiveProps(props) {
    if (props.open) {
      this.showModal()
    } else {
      this.hideModal()
    }
  }
  render() {
    return (
        <Modal
            backButtonClose={true}
            swipeToClose={false}
            style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: width - 80,
                height: height-80,
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

            ref={'mModal'}
            position={'center'}
            backdrop={true}
            onClosed={this.props.onClose}
        >
            {this.props.children}
        </Modal>
    )
  }
}
