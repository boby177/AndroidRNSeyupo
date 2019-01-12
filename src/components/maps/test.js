
import React from "react";
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Platform
} from "react-native";
import MapView, { Marker, AnimatedRegion, Polyline } from "react-native-maps";
import haversine from "haversine";

const LATITUDE = -6.914744;
const LONGITUDE = 107.60981;
const LATITUDE_DELTA = 0.009;
const LONGITUDE_DELTA = 0.009;

class AnimatedMarkers extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            latitude: -6.914744,
            longitude: 107.60981,
            routeCoordinates: [],
            distanceTravelled: 0,
            prevLatLng: {},
            coordinate: new AnimatedRegion({
                latitude: -6.914744,
                longitude: 107.60981
            }),
            region: {
                latitude: parseFloat(-6.914744),
                longitude: parseFloat(107.60981),
                latitudeDelta: parseFloat(0.009),
                longitudeDelta: parseFloat(0.009)
            }
        };
        this.getMapRegion = this.getMapRegion.bind(this)
    }

    componentWillMount() {
        navigator.geolocation.getCurrentPosition(
            position => { },
            // error => alert(error.message),
            // {
            //     enableHighAccuracy: true,
            //     timeout: 20000,
            //     maximumAge: 1000
            // }
        );
    }

    componentDidMount() {
        const { coordinate } = this.state;
        this.watchID = navigator.geolocation.watchPosition(
            position => {
                console.log(position)
                const { coordinate, routeCoordinates, distanceTravelled } = this.state;
                const { latitude, longitude } = position.coords;
                const newCoordinate = {
                    latitude: parseFloat(latitude),
                    longitude: parseFloat(longitude)
                };
                console.log(newCoordinate)
                if (Platform.OS === "android") {
                    if (this.marker) {
                        this.marker._component.animateMarkerToCoordinate(
                            newCoordinate,
                            500
                        );
                    }
                } else {
                    coordinate.timing(newCoordinate).start();
                }

                this.setState({
                    // region: {
                    //     ...newCoordinate,
                    //     latitudeDelta: parseFloat(0.009),
                    //     longitudeDelta: parseFloat(0.009)
                    // },
                    latitude,
                    longitude,
                    routeCoordinates: routeCoordinates.concat(newCoordinate),
                    distanceTravelled:
                        distanceTravelled + this.calcDistance(newCoordinate),
                    prevLatLng: newCoordinate
                });
            },
            error => console.log(error),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
    }

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchID);
    }

    calcDistance = newLatLng => {
        const { prevLatLng } = this.state;
        return haversine(prevLatLng, newLatLng) || 0;
    };

    getMapRegion() {
        return {
            latitude: parseFloat(this.state.latitude),
            longitude: parseFloat(this.state.longitude),
            latitudeDelta: parseFloat(LATITUDE_DELTA),
            longitudeDelta: parseFloat(LONGITUDE_DELTA)
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <MapView
                    style={styles.map}
                    followsUserLocation
                    loadingEnabled
                    loadingBackgroundColor={'#303030'}
                    showsUserLocation
                    region={this.state.region}
                    customMapStyle={require('./dark_map_style.json')}
                    zoomControlEnabled
                    zoomEnabled
                // region={this.getMapRegion()}
                >
                    <Polyline coordinates={this.state.routeCoordinates} strokeWidth={5} />
                    <Marker.Animated
                        ref={marker => {
                            console.log(marker)
                            this.marker = marker;
                        }}
                        coordinate={this.state.coordinate} />
                </MapView>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={[styles.bubble, styles.button]}>
                        <Text style={styles.bottomBarContent}>
                            {parseFloat(this.state.distanceTravelled).toFixed(2)} km
            </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        // justifyContent: "flex-end",
        // alignItems: "center"
        flex: 1
    },
    map: {
        ...StyleSheet.absoluteFillObject
    },
    bubble: {
        flex: 1,
        backgroundColor: "rgba(255,255,255,0.7)",
        paddingHorizontal: 18,
        paddingVertical: 12,
        borderRadius: 20
    },
    latlng: {
        width: 200,
        alignItems: "stretch"
    },
    button: {
        width: 80,
        paddingHorizontal: 12,
        alignItems: "center",
        marginHorizontal: 10
    },
    buttonContainer: {
        flexDirection: "row",
        marginVertical: 20,
        backgroundColor: "transparent"
    }
});

export default AnimatedMarkers;