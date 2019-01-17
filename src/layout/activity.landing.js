import React, { Component } from 'react';
import { 
    StyleSheet,
    Text,
    View,
    Animated,
    Image,
    Easing,
    Button
} from 'react-native';

const timing = 4000


export default class LandingPage extends Component {
  constructor (props) {
      super(props)

      this.state = {
          animates: true
      }
      this.animate = this.animate.bind(this)
      this.animatedValue = new Animated.Value(0)
      this.ma = Animated.timing(
          this.animatedValue,
          {
              toValue: 1,
              duration: 3000,
              easing: Easing.linear,
          }
      )
  }
  componentDidMount () {
    this.animate()
  }
  animate () {
    this.ma.stop()
    this.animatedValue.setValue(0)
    this.ma.start((o) => {if(!o.finished )this.animate()})
  }
  componentWillUnmount() {
      this.ma.stop()
  }
  render() {
      const marginLeft = this.animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 300],
      })
      const opacity = this.animatedValue.interpolate({
          inputRange: [0, 0.5, 1],
          outputRange: [0, 1, 0]
      })
      const movingMargin = this.animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 300],
      })
      const textSize = this.animatedValue.interpolate({
          inputRange: [0, 0.5, 1],
          outputRange: [18, 32, 18]
      })
      const rotateX = this.animatedValue.interpolate({
          inputRange: [0, 0.5, 1],
          outputRange: ['0deg', '180deg', '0deg']
      })
    return (
        <View style={styles.container}>
            {/* <Animated.View
                style={{
                    marginLeft,
                    height: 30,
                    width: 40,
                    backgroundColor: 'red'
                }} />
            <Animated.View
                style={{
                    opacity,
                    marginTop: 10,
                    height: 30,
                    width: 40,
                    backgroundColor: 'blue'
                }} /> */}
            <Animated.View
                style={{
                    marginLeft: movingMargin,
                    marginTop: 10,
                    height: 30,
                    width: 40,
                    backgroundColor: 'orange',
                    marginBottom: 40,
                }} />
            {/* <Button onPress={this.animate.bind(this)} title="click">

            </Button> */}
        </View>
    )
}}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 150
    }
})