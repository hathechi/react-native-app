import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import LoginScreen from './Components/LoginScreen';

AppRegistry.registerComponent(appName, () => gestureHandlerRootHOC(App));
