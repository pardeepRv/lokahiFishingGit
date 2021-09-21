/**
 * @format
 */


import { AppRegistry, Text, TextInput } from 'react-native';

import App from './App';
import { name as appName } from './app.json';
import { Provider as PaperProvider } from 'react-native-paper';

import messaging from '@react-native-firebase/messaging';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});

function HeadlessCheck({ isHeadless }) {
  if (isHeadless) {
    // App has been launched in the background by iOS, ignore
    return null;
  }

  return <App />;
}
  
export default function Main() {
	return (
		<PaperProvider>
			<App />
		</PaperProvider>
	);
}
Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;

TextInput.defaultProps = TextInput.defaultProps || {};
TextInput.defaultProps.allowFontScaling = false;

AppRegistry.registerComponent(appName, () => App);
