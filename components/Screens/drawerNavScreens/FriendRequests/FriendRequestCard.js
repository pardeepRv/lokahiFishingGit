import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, Text, Dimensions, TouchableOpacity, View, Image } from 'react-native'
import FastImage from 'react-native-fast-image'
import LokahiLogo from '../../../../media/images/LokahiLogo.png'
import firestore from '@react-native-firebase/firestore'
import { AuthContext } from '../../../../context/authProvider'
import CheckMark from 'react-native-vector-icons/MaterialCommunityIcons'

const userRef = firestore().collection('Users')

const FriendRequestsCard = props => {
	const { id, img, name, reqDate } = props
	const { user } = useContext(AuthContext)
	const [accepted, setAccepted] = useState(false)
	const [declined, setDeclined] = useState(false)

	const enUSFormatter = new Intl.DateTimeFormat('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	})
	const formattedDate = enUSFormatter.format(reqDate)

	const acceptReq = () => {
		userRef
			.doc(user.user.uid)
			.collection('Received_Friend_Requests')
			.get()
			.then(res => {
				res.forEach(recReq => {
					if (recReq.data().User_Id === id) {
						userRef.doc(user.user.uid).collection('Received_Friend_Requests').doc(recReq.id).delete()
						userRef.doc(user.user.uid).collection('Friends').add({
							User_Id: recReq.data().User_Id,
							DateTime: firestore.FieldValue.serverTimestamp(),
						})
						userRef.doc(id).collection('Friends').add({
							User_Id: user.user.uid,
							DateTime: firestore.FieldValue.serverTimestamp(),
						})
						userRef
							.doc(id)
							.collection('Sent_Friends_Requests')
							.get()
							.then(res => {
								res.forEach(sentReq => {
									if (sentReq.data().User_Id === user.user.uid) {
										userRef.doc(id).collection('Sent_Friend_Requests').doc(sentReq.id).delete()
									}
								})
							})
					}
				})
			})
			.then(setAccepted(true))
	}

	const declineReq = () => {
		userRef
			.doc(user.user.uid)
			.collection('Received_Friend_Requests')
			.get()
			.then(res => {
				res.forEach(recReq => {
					if (recReq.data().User_Id === id) {
						userRef.doc(user.user.uid).collection('Received_Friend_Requests').doc(recReq.id).delete()
						userRef
							.doc(id)
							.collection('Sent_Friends_Requests')
							.get()
							.then(res => {
								res.forEach(sentReq => {
									if (sentReq.data().User_Id === user.user.uid) {
										userRef.doc(id).collection('Sent_Friend_Requests').doc(sentReq.id).delete()
									}
								})
							})
					}
				})
			})
			.then(setDeclined(true))
	}

	return (
		<View style={styles.FriendRequestCard}>
			<View style={styles.content}>
				{img ? (
					<TouchableOpacity
						onPress={e => {
							// // e.stopPropagation();
							// setSelectedMember(member);
							// // console.log('joinDate', moment(joinDate)).isValid();
							// navigation.navigate('MemberProfile');
						}}
					>
						<FastImage style={styles.image} source={{ uri: img }} />
					</TouchableOpacity>
				) : (
					<View style={{ height: windowHeight * 0.08, width: windowHeight * 0.08, justifyContent: 'center', alignItems: 'center' }}>
						<Image source={LokahiLogo} style={{ height: '100%', resizeMode: 'contain' }} />
					</View>
				)}
				<View style={styles.userInfo}>
					<Text style={styles.username}>{name}</Text>
					<View>
						<Text style={styles.dateText}>Request sent:</Text>
						<Text style={styles.dateText}>{formattedDate} </Text>
					</View>
				</View>
				{accepted ? (
					<View style={styles.singleBtnView}>
						<TouchableOpacity style={styles.friendsBtn} onPress={() => addFriend()}>
							<CheckMark name='check' size={20} color='#fff' />
							<Text style={styles.friendsText}>Friends</Text>
						</TouchableOpacity>
					</View>
				) : declined ? (
					<View style={styles.singleBtnView}>
						<TouchableOpacity style={styles.declinedBtn} onPress={() => addFriend()}>
							<Text style={styles.friendsText}>Declined</Text>
						</TouchableOpacity>
					</View>
				) : (
					<View style={styles.btnsView}>
						<TouchableOpacity style={styles.acceptBtn} onPress={acceptReq}>
							<Text style={styles.acceptText}>Accept</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.declineBtn} onPress={declineReq}>
							<Text style={styles.declineText}>Decline</Text>
						</TouchableOpacity>
					</View>
				)}
			</View>
		</View>
	)
}

export default FriendRequestsCard

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

const styles = StyleSheet.create({
	FriendRequestCard: {
		backgroundColor: 'snow',
		marginBottom: 10,
		width: windowWidth * 0.92,
		borderRadius: 7,
		justifyContent: 'center',
	},
	content: {
		padding: 15,
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row',
	},
	header: {
		marginHorizontal: 10,
		display: 'flex',
		flexDirection: 'row',
		width: '100%',
	},
	image: {
		height: windowHeight * 0.09,
		width: windowHeight * 0.09,
		resizeMode: 'cover',
		borderRadius: 7,
	},
	userInfo: {
		marginLeft: 10,
		justifyContent: 'space-between',
		alignItems: 'flex-start',
		width: windowWidth * 0.4,
		height: windowHeight * 0.09,
	},
	username: {
		fontSize: 20,
		fontWeight: '500',
		textAlign: 'center',
	},
	dateText: {
		fontSize: 16,
	},
	btnsView: {
		height: windowHeight * 0.09,
		justifyContent: 'space-between',
	},
	singleBtnView: {},
	declinedBtn: {
		padding: 5,
		width: windowWidth * 0.25,
		borderRadius: 7,
		backgroundColor: '#707070',
		flexDirection: 'row',
		justifyContent: 'space-evenly',
	},
	friendsText: {
		color: '#fff',
		fontSize: 18,
		fontWeight: '700',
	},
	friendsBtn: {
		padding: 5,
		width: windowWidth * 0.25,
		borderRadius: 7,
		backgroundColor: '#6fc4ea',
		flexDirection: 'row',
		justifyContent: 'space-evenly',
	},
	friendsText: {
		color: '#fff',
		fontSize: 18,
		fontWeight: '700',
	},
	acceptBtn: {
		padding: 5,
		width: windowWidth * 0.25,
		backgroundColor: '#45d98f',
		borderRadius: 7,
	},
	acceptText: {
		color: '#fff',
		fontSize: 18,
		fontWeight: '600',
		justifyContent: 'center',
		alignItems: 'center',
		textAlign: 'center',
	},
	declineBtn: {
		padding: 5,
		width: windowWidth * 0.25,
		backgroundColor: '#F55451',
		borderRadius: 7,
	},
	declineText: {
		color: '#fff',
		fontSize: 18,
		fontWeight: '600',
		justifyContent: 'center',
		alignItems: 'center',
		textAlign: 'center',
	},
})
