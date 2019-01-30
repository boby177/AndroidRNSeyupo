/** @format */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerHeadlessTask(
    "SetData",
    require("./src/services/ServiceReceiver")
);

AppRegistry.registerHeadlessTask("GeoLocation", require("./src/services/GeoLocation"));
// Component

AppRegistry.registerComponent(appName, () => App);
