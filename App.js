import 'react-native-gesture-handler'
import { Routes } from './components/Navigation/routes'
import React, { useEffect, useContext } from 'react'
import firebase from '@react-native-firebase/app'
import { firebaseConfig } from './firebase_config'
import { Text, View, StatusBar, Alert } from 'react-native'

import { AuthProvider, AuthContext } from './context/authProvider'
import { MemberProvider } from './context/MemberContext/memberProvider'
import { FriendsBlockedProvider } from './context/FriendsBlockedContext/friendsBlockedProvider'
import messaging from '@react-native-firebase/messaging'
import { LCRProvider } from './context/LCRContext/lcrProvider'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const App = () => {

	async function saveTokenToDatabase(token) {
		// Assume user is already signed in
		const userId = auth().currentUser.uid;
		
		// console.log('THIS RIGHT HERE RIGHT NOW', test)
	  
		// Add the token to the users datastore
		await firestore()
		  .collection('Users')
		  .doc(userId)
		  .update({
			tokens: token,
		  });
	  }
	useEffect(() => {
		// firebase.initializeApp(firebaseConfig)
		if (!firebase.apps.length) {
			firebase.initializeApp(firebaseConfig)
		} else {
			firebase.initializeApp(firebaseConfig) // if already initialized, use that one
		}
	}, [])

	useEffect(() => {
		requestUserPermission()
		return messaging().onTokenRefresh(token => {
			saveTokenToDatabase(token);
		  });
	}, [messaging])

	requestUserPermission = async () => {
		const authStatus = await messaging().requestPermission()
		const enabled = authStatus === messaging.AuthorizationStatus.AUTHORIZED || authStatus === messaging.AuthorizationStatus.PROVISIONAL
		if (enabled) {
			getFcmToken() //<---- Add this
			// console.log('Authorization status:', authStatus)
		}
	}
	let getFcmToken = async () => {
		const fcmToken = await messaging().getToken()
		if (fcmToken) {
			// console.log(fcmToken)
			// console.log('Your Firebase Token is:', fcmToken)
			return saveTokenToDatabase(fcmToken);
		} else {
			console.log('Failed', 'No token received')
		}
	}

	useEffect(() => {
		requestUserPermission()
		const unsubscribe = messaging().onMessage(async remoteMessage => {
			// Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage))
		})
		return unsubscribe
	}, [])
	useEffect(() => {
		requestUserPermission()
		const backgroundMessages = messaging().setBackgroundMessageHandler(async remoteMessage => {
			console.log('Message handled in the background!', remoteMessage);
		  })
		  return backgroundMessages
	})
	messaging().setBackgroundMessageHandler(async remoteMessage => {
		console.log('Message handled in the background!', remoteMessage);
	  });
	return (
		<AuthProvider>
			<MemberProvider>
				<LCRProvider>
					<FriendsBlockedProvider>
						<Routes />
					</FriendsBlockedProvider>
				</LCRProvider>
			</MemberProvider>
		</AuthProvider>
	)
}

export default App
