import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, ImageBackground, Dimensions, FlatList, View, ActivityIndicator } from 'react-native'
import { FriendsBlockedContext } from '../../../../context/FriendsBlockedContext/friendsBlockedProvider.js'
import FriendRequestsCard from './FriendRequestCard.js'
import { AuthContext } from '../../../../context/authProvider'
import firestore from '@react-native-firebase/firestore'
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
const userRef = firestore().collection('Users')

const FriendRequests = () => {
	const [notify, setNotify] = useState([])
	const { user } = useContext(AuthContext)
	const userId = user ? user.user.uid : null
	const [friendsReqList, setFriendsReqList] = useState([])
	// const { friendsReqList, blockedList } = useContext(FriendsBlockedContext)
	const [reqList, setReqList] = useState([])
	// const friendsReqRef = firestore().collection('Users').doc(userId).collection('Received_Friend_Requests').get()
	// console.log('what is this right here right now', reqList)

	// useEffect(() => {
	// 	const notify = []
	// }, [friendsReqList])
 
	// useEffect(() => {
	// 	console.log('reqList', reqList)
	// })

	// useEffect(() => {
	// 	setTimeout(() => {
	// 		console.log('Hello, World!')
	// 	}, 3000)
	// }, [])

	// useEffect(() => {
	// 	userRef.get().then(res => {
	// 		const reqArr = []
	// 		res.forEach(user => {
	// 			friendsReqList.map(req => {
	// 				// console.log('req', req._data)
	// 				if (req._data.User_Id === user.id) {
	// 					reqArr.push({
	// 						id: user.id,
	// 						img: user._data.User_Image,
	// 						name: user._data.fullname,
	// 						reqDate: req._data.DateTime.toDate(),
	// 					})
	// 					reqArr.sort((a, b) => (a.reqDate > b.reqDate ? -1 : 1))
	// 					setReqList(reqArr)
	// 				}
	// 			})
	// 		})
	// 	})
	// }, [friendsReqList])

	// useEffect(() => {
	// 	friendsReqRef.then(res => {
	// 		let friendsReqList = []

	// 		res.forEach(doc => {
	// 			friendsReqList.push(doc)
	// 		})
	// 		setFriendsReqList(friendsReqList)
	// 	})
	// }, [friendsReqList])

	useFocusEffect(React.useCallback(() => {
		let active = true ;	
		(async () => {
			try {	
				if (active) {	
	const friendsReqRef = firestore().collection('Users').doc(userId).collection('Received_Friend_Requests').get()
		friendsReqRef.then(res => {
			let friendsReqList = []

			res.forEach(doc => {
				friendsReqList.push(doc)
			})
			setFriendsReqList(friendsReqList)
		})
				
			}} catch(e) {
				console.log('this is an error', e);
			}
		})();
		
		return () => {
			active = false
		}
	}));

	useFocusEffect(React.useCallback(() => {
		let active = true ;	
		(async () => {
			try {	
				if (active) {	
		// const userRef = firestore().collection('Users')	
		return userRef.get().then(res => {
			console.log(res)
			const reqArr = []
			res.forEach(user => {
				friendsReqList.map(req => {
					// console.log('req', req._data)
					if (req._data.User_Id === user.id) {
						reqArr.push({
							id: user.id,
							img: user._data.User_Image,
							name: user._data.fullname,
							reqDate: req._data.DateTime.toDate(),
						})
						reqArr.sort((a, b) => (a.reqDate > b.reqDate ? -1 : 1))
						setReqList(reqArr)
					}
				})
			})
		})
				
			}} catch(e) {
				console.log('this is an error', e);
			}
		})();
		
		return () => {
			active = false
		}
	}));

	return (
		<View style={{ justifyContent: 'center', alignItems: 'center' }}>
			<ImageBackground source={require('../../../../media/images/signup_bg.png')} style={styles.bgImg}>
				{reqList.length === 0 ? (
					<ActivityIndicator size='large' style={{ marginBottom: windowHeight * 0.4 }} />
				) : (
					<FlatList
						data={reqList}
						keyExtractor={item => item.id}
						renderItem={({ item }) => <FriendRequestsCard {...item} />}
						style={{ marginTop: 10 }}
					/>
				)}
			</ImageBackground>
		</View>
	)
}

export default FriendRequests

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

const styles = StyleSheet.create({
	bgImg: {
		width: windowWidth,
		height: windowHeight,
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
	},
})
