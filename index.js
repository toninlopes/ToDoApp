import {AppRegistry} from 'react-native';
import AppNavigator from './src/routes/AppNavigator';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => AppNavigator);
