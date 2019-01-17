import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableHighlight, BackHandler, AsyncStorage } from "react-native";
import NavButton from '../components/navButton';

export default class ActivityPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentWillMount() {
      this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
          this.props.navigation.goBack()
          return true
      })
  }

  componentWillUnmount() {
      this.backHandler.remove()
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
            source={require('../assets/img/logo-revisi.png')}
            style={styles.img}
        />
        <View
            style={{
                flexDirection: 'row',
                margin: 5
            }}
        >
            <NavButton 
                title="Home"
                iconName="home"
                onPress={(e) => this.props.navigation.navigate('Home',{
                        prev: 'Panel'
                    })}
            />
            <NavButton 
                title="Maps and Actions"
                iconName="map-marked-alt"
                onPress={(e) => {
                    this.props.navigation.navigate('Maps',{
                        prev: 'Panel'
                    })
                }}
            />
        </View>
        <View
            style={{
                flexDirection: 'row',
            }}
        >
            <NavButton 
                title="Help"
                iconName="question"
                onPress={() => {
                    this.props.navigation.navigate('Help',{
                        prev: 'Panel'
                    })
                }}
            />
            <NavButton 
                title="Setting"
                iconName="cog"
                onPress={() => {
                    this.props.navigation.navigate('Setting',{
                        prev: 'Panel'
                    })
                }}
            />
        </View>
        <TouchableHighlight 
        onPress={(e) => {
            AsyncStorage.clear()
            this.props.navigation.navigate('Loading')
        }}
        style={styles.logout}>
            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Text style={{color: "#a8a8a8"}}>Logout</Text>
            </View>
        </TouchableHighlight>
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
        paddingTop: 40,
    },
    img: {
        width: 140,
        height: 80,
        marginBottom: 10,
        // padding: 100
    },
    logout: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 305,
        height: 40,
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
        marginTop: 10
    }
})
