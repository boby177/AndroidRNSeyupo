import React from 'react';
import {createBottomTabNavigator, createStackNavigator,createAppContainer,createSwitchNavigator} from 'react-navigation'
import Icon from 'react-native-vector-icons/FontAwesome5'

import {createStore, applyMiddleware, combineReducers} from 'redux'
import {reduxifyNavigator, createNavigationReducer, createReactNavigationReduxMiddleware} from 'react-navigation-redux-helpers'
import {connect} from 'react-redux'




import ActivityHome from '../layout/acitivity.home';
import ActivityPanel from '../layout/activity.panel';
import ActivityHelp from '../layout/activity.help';
import ActivitySetting from '../layout/activity.setting';
import ActivityMap from '../layout/activity.map';
import ActivityLogin from '../layout/activity.login';
import ActivityRegister from '../layout/activity.register';

const StackNavigator = createStackNavigator({
    Help: {
        screen: ActivityHelp
    },
    Setting: {
        screen: ActivitySetting
    },
    Maps: {
        screen: ActivityMap
    }
}, {
    headerMode: 'none',
    containerOptions: {
        headerVisible: false
    },
    cardStyle: {
        backgroundColor: '#303030'
    },
})

const BottomNavigator = createBottomTabNavigator({
    Home: ActivityHome,
    Panel: ActivityPanel
}, {
    defaultNavigationOptions: ({navigation}) => ({
        tabBarIcon: ({focused, horizontal, tintColor}) => {
            let iconName = `home`
            const {routeName} = navigation.state
            if (routeName === 'Home') {
                iconName = 'home'
            } else {
                iconName = 'th-large'
            }
            return <Icon name={iconName} size={16} color={focused ? '#fff' : tintColor}/>
        }
    }),
    tabBarOptions: {
        inactiveBackgroundColor: '#2a2929',
        activeTintColor: '#fff',
        inactiveTintColor: '#a8a8a8',
        tabStyle: {
            margin: 20
        },
        style: {
            height: 85,
            paddingVertical: 0,
            backgroundColor: '#2a2929',
            borderWidth: 1,
            borderColor: '#242424',
            borderTopWidth: 0,
            borderBottomWidth: 0,
            shadowColor: '#242424',
            color: '#a8a8a8',
            shadowOffset: {
                width: 2,
                height: 2
            },
            shadowOpacity: 0.7,
            elevation: 5,
        }
    },
})

const GuestNavigator = createStackNavigator({
    Login: {
        screen: ActivityLogin
    },
    Register: {
        screen: ActivityRegister
    }
},{
    headerMode: 'none',
    containerOptions: {
        headerVisible: false
    },
    initialRouteName: 'Login',
    defaultNavigationOptions: {
        swipeEnabled: true,
    },
})

const RootRouter = createSwitchNavigator({
    BottomNavigator,
    StackNavigator,
    GuestNavigator
}, {
    initialRouteName: 'GuestNavigator'
})

/**
 * Redux Integration
 */

const navReducers = createNavigationReducer(RootRouter)
const appReducers = combineReducers({
    nav: navReducers
})

const middleware = createReactNavigationReduxMiddleware("root", state => state.nav)

const App = reduxifyNavigator(RootRouter, "root")

const mapStateToProps = (state) => ({
    state: state.nav
})

const AppWithNavigationState = connect(mapStateToProps)(App)

const store = createStore(
    appReducers,
    applyMiddleware(middleware)
)

export {
    AppWithNavigationState,
    store
}

