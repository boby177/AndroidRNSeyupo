import React, { Component } from 'react';
import { View, BackHandler, Image } from 'react-native';
import DeviceInfo from 'react-native-device-info'
import Toolbar from '../components/toolbar'
import Row from '../components/row';
import MButton from '../components/buttons';
import { connect } from 'react-redux'
import { registerDevice, checkDevice, deleteDevice } from '../store/action';


class ActivityAddDevice extends Component {
  constructor(props) {
    super(props);
    this.state = {
        connected: false,
        deviceName : DeviceInfo.getDeviceName(),
        systemVersion : DeviceInfo.getSystemVersion(),
        uniqueId : DeviceInfo.getUniqueID()
    };
    this.goBack = this.goBack.bind(this)
  }

  componentWillMount() {
      this.backButton = BackHandler.addEventListener("hardwareBackPress", this.goBack)
  }

  goBack() {
      this.props.navigation.navigate("Panel")
      return true
  }

  componentWillUnmount() {
      this.backButton.remove()
  }

  componentDidMount() {
      this.props.onCheckDevice({uniqueId: this.state.uniqueId})
  }

  componentWillReceiveProps(props) {
        this.setState({ connected: props.user.deviceExist });
  }

  render() {
      const { connected, deviceName, systemVersion, uniqueId} = this.state
    return (
      <View style={{
          flex: 1,
          paddingVertical: 20
      }}>
        <Toolbar 
            title="Add Device" 
            onPress={(e) => this.props.navigation.navigate('Panel')}
        />  
            <View style={{
                paddingVertical: 50, flex: 2,
                alignItems: 'center',}}>
            <Image 
                source={{
                    uri: "https://cdn1.iconfinder.com/data/icons/screen-1/640/iphone6s-black-fixed-512.png"
                }}
                style={{
                    width: 60,
                    height: 140
                }}
            />
            <View style={{ paddingVertical: 30, alignItems: 'center'}}>
                <Row title={"ID"} value={uniqueId} />
                <Row title={"Device Name"} value={deviceName} />
                <Row title={"System Version"} value={systemVersion} />
                <Row title={"Status"} value={connected ? "Connected" : "Disconnected"} color={connected ? "#64c17a" : "#ec4e4e"} />
                {
                    connected ?
                    <MButton title={"Remove Device"} onPress={() => {
                        this.props.onDeleteDevice({uniqueId})
                        this.props.onCheckDevice({uniqueId})
                    }} style={{marginTop: 40}} error={true} />
                    :
                    <MButton title={"Add Device"} onPress={() => {
                        const data = {
                            name: deviceName,
                            uniqueId,
                            systemVersion
                        }
                        this.props.onAddDevice(data)
                        this.props.onCheckDevice(uniqueId)
                    }} style={{marginTop: 40}} />
                }
            </View>
        </View>
      </View>
    );
  }
}


const mapStateToProps = state => {
    console.log(state)
    return {
        user: {
            ...state.user
        }
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddDevice: (payload) => dispatch(registerDevice(payload)),
        onCheckDevice: (payload) => dispatch(checkDevice(payload)),
        onDeleteDevice: (payload) => dispatch(deleteDevice(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ActivityAddDevice);
