import React from 'react'
import { StyleSheet, View, Text, Dimensions } from 'react-native'
import MapView, { Marker, AnimatedRegion, Polyline, PROVIDER_GOOGLE } from "react-native-maps";


const {width, height} = Dimensions.get('window')
const ASPECT_RASIO = width / height
const LATITUDE = -6.914744;
const LONGITUDE = 107.60981;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RASIO;

export default class LMaps extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            region: {
                latitude: LATITUDE,
                longitude: LONGITUDE,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA
            },
            markerPosition: {
                latitude: 37.42199, //LATITUDE,
                longitude: -122.08400, // LONGITUDE
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA
            }
        };
    }

    componentDidMount() {
        this.getLocation()
        // console.log(this.state.regional)
    }

    getLocation() {
        navigator.geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords
                console.log(position.coords)
                this.setState({
                    region: {
                        latitude: parseFloat(latitude),
                        longitude: parseFloat(longitude),
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA
                    }
                })
              this.setState({
                markerPosition: {
                      latitude: parseFloat(latitude),
                      longitude: parseFloat(longitude),
                      latitudeDelta: LATITUDE_DELTA,
                      longitudeDelta: LONGITUDE_DELTA
                }
              })  
            },
            error => { 
                console.log(error) 
            },
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        )
    }

    render() {
        return (
            <MapView
                provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                style={styles.map}
                region={this.state.region}
                showsUserLocation={true}
                showsCompass={true}
                customMapStyle={require('./dark_map_style.json')}
                renderToHardwareTextureAndroid
            >
                <Marker
                    coordinate={this.state.markerPosition}
                    title={'Me'}
                    renderToHardwareTextureAndroid
                />
            </MapView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        ...StyleSheet.absoluteFillObject,
        justifyContent: "center",
        alignItems: "center"
    },
  map: {
    ...StyleSheet.absoluteFillObject,
    flex: 1
  },
  marker: {
    backgroundColor: "#550bbc",
    padding: 5,
    borderRadius: 5,
  },
  text: {
    color: "#FFF",
    fontWeight: "bold"
  }
});
