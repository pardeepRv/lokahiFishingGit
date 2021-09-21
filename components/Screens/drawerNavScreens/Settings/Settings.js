import React, {useState, useEffect, useContext} from 'react';
import { View, StyleSheet, Text, Image, Pressable, Dimensions, ImageBackground} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import PushNotification from "react-native-push-notification";
import { ListItem, Icon, Switch } from 'react-native-elements'
import messaging from '@react-native-firebase/messaging';

import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../../../context/authProvider';
import { RFValue } from "react-native-responsive-fontsize"
import Modal from 'react-native-modal';





const Settings = () => {
	const [modalVisible, setModalVisible] = useState(false);
	const [notificationState, setNotificationState] = useState(false);
	const toggleSwitch = () => setNotificationState(previousState => !previousState);
	const {user, mainUser, setMainUser, logout} = useContext(AuthContext);
	const navigation = useNavigation();

	const list = [
		{
		  title: {name: 'Enable Notifications'},
		},
		{
			title: {name: 'Reset Password'},
		   
		  },
	  ]
// console.log('what is the state', notificationState)
	

	
// 	  useEffect(()=> {
// 		  if(notificationState){
// 			  console.log('what is the state?', notificationState)
// 			PushNotification.configure({
// 				// (optional) Called when Token is generated (iOS and Android)
// 				onRegister: function (token) {
// 				  console.log("TOKEN:", token);
// 				},
			  
// 				// (required) Called when a remote is received or opened, or local notification is opened
// 				onNotification: function (notification) {
// 				  console.log("NOTIFICATION:", notification);
			  
// 				  // process the notification
			  
// 				  // (required) Called when a remote is received or opened, or local notification is opened
// 				  notification.finish(PushNotificationIOS.FetchResult.NoData);
// 				},
			  
// 				// (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
// 				onAction: function (notification) {
// 				  console.log("ACTION:", notification.action);
// 				  console.log("NOTIFICATION:", notification);
			  
// 				  // process the action
// 				},
			  
// 				// (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
// 				onRegistrationError: function(err) {
// 				  console.error(err.message, err);
// 				},
			  
// 				// IOS ONLY (optional): default: all - Permissions to register.
// 				permissions: {
// 				  alert: true,
// 				  badge: true,
// 				  sound: true,
// 				},
			  
// 				// Should the initial notification be popped automatically
// 				// default: true
// 				popInitialNotification: true,
			  
// 				/**
// 				 * (optional) default: true
// 				 * - Specified if permissions (ios) and token (android and ios) will requested or not,
// 				 * - if not, you must call PushNotificationsHandler.requestPermissions() later
// 				 * - if you are not using remote notification or do not have Firebase installed, use this:
// 				 *     requestPermissions: Platform.OS === 'ios'
// 				 */
// 				requestPermissions: true,
// 			  });
// 		  } else{
// 			  return
// 		  }
	
// 	  })


	return (
		<View>
		<ImageBackground source={require('../../../../media/images/signup_bg.png')} style={styles.bgImg}>
		
			<View style={{width: windowWidth }}>
  {
    list.map((item, i) => (
      <ListItem key={i} bottomDivider containerStyle={{backgroundColor:'transparent', opacity:15}}>  
        <ListItem.Content style={{backgroundColor:'transparent'}}>
        <ListItem.Title style={{color:'white'}}>{item.title.name}</ListItem.Title> 
        </ListItem.Content>
        {item.title.name != 'Enable Notifications' ? <ListItem.Chevron size={26} /> : <Switch onValueChange={toggleSwitch}
        value={notificationState}  color="lime" />}
      </ListItem>
    ))
  }
</View>
		
		</ImageBackground>
		</View>
	);
};

export default Settings;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
	bgImg: {
		width: '100%',
		height: windowHeight,
		// flexDirection: 'column',
		// alignItems: 'center',
		// position: 'absolute',
		// top: 10,
		// left: 0,
	},
	content: {
		// position: 'relative',
		// top: windowHeight * 0.058,
	},
});
