import React from 'react'
import { useState, useEffect, useContext } from 'react'
import {
	Dimensions,
	SafeAreaView,
	StyleSheet,
	Text,
	View,
	Image,
	ImageBackground,
	TouchableOpacity,
	Modal,
	Alert,
	TouchableWithoutFeedback,
} from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import BoatInfo from './MemberProfileTabs/MemberBoatInfo.js'
import MyPhotos from './MemberProfileTabs/MemberPhotos.js'
import FastImage from 'react-native-fast-image'
import CrossIcon from 'react-native-vector-icons/Entypo'
import CheckMark from 'react-native-vector-icons/MaterialCommunityIcons'
import loginLogo from '../../../../media/images/loginLogo.png'
import { format } from 'date-fns'
import { MemberContext } from '../../../../context/MemberContext/memberProvider'
import firestore from '@react-native-firebase/firestore'
import { AuthContext } from '../../../../context/authProvider.js'
import { FriendsBlockedContext } from '../../../../context/FriendsBlockedContext/friendsBlockedProvider.js'
import { notificationManager } from '../../../../utils/notificationManager'
import { BlurView } from '@react-native-community/blur'
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
const Tab = createMaterialTopTabNavigator()

const MemberProfile = ({ navigation }) => {
	const { selectedMember } = useContext(MemberContext)
	const { id, image, joinDate, username, fullname, uid, tokens } = selectedMember
	const [imgModalVisible, setImgModalVisible] = useState(false)
	const { user } = useContext(AuthContext)
	const { friendsList, blockedList } = useContext(FriendsBlockedContext)
	const [areFriends, setAreFriends] = useState(false)
	const [isBlocked, setIsBlocked] = useState(false)

	const ref = firestore().collection('Users')
	const userId = user.user.uid
	const userOldId = user.dbData.User_Id
	const timestamp = firestore.FieldValue.serverTimestamp()
	const friendsRef = ref.doc(userId).collection('Friends')
	const blockedRef = ref.doc(userId).collection('Blocked_Users')
	// console.log('what is this', userId)
	// useEffect(() => {
	// 	console.log('selectedMember', selectedMember)
	// 	console.log('blockedList', blockedList)
	// 	console.log('friendsList', friendsList)
	// })
	// console.log('WHAT IS THIS', user?.data?.User_Image)
	useEffect(() => {
		friendsList.map(friend => {
			if (friend.id === selectedMember.id) {
				setAreFriends(true)
			}
		})
	}, [user, friendsList])

	useEffect(() => {
		blockedList.map(blockedUser => {
			if (blockedUser.id === selectedMember.id) {
				setIsBlocked(true)
			}
		})
	}, [user, blockedList])

	const addFriend = async () => {
		if (areFriends) {
			alert(`${username} is already your friend`)
			// console.log('DateTime', timestamp)
			// console.log('User_Id', userId)
		} else {
			await ref.doc(userId).collection('Sent_Friend_Requests').add({
				DateTime: timestamp,
				User_Id: userId,
				User_Image: user.dbData.User_Image,
				User_Name: user.dbData.User_Name,
				fullname: user.dbData.fullname,
			})

			await ref.doc(uid).collection('Received_Friend_Requests').add({
				DateTime: timestamp,
				User_Id: userId,
				User_Image: user.dbData.User_Image,
				User_Name: user.dbData.User_Name,
				fullname: user.dbData.fullname,
			})
			alert(`Sent friend request to ${username}!`)
			var notificationBody = `Received friend request from ${user.dbData.fullname}!`
			notificationManager.sendPushNotification(selectedMember, fullname, notificationBody, { userId }, { userId })
		}
	}

	const blockUser = () => {
		if (isBlocked) {
			Alert.alert('Unblock', `Are you sure you want to unblock ${username}?`, [
				{
					text: 'Cancel',
					style: 'cancel',
				},
				{
					text: 'Yes',
					onPress: async () => {
						setIsBlocked(false)
						const blockedUsers = await blockedRef.get()
						blockedUsers.forEach(doc => {
							if (doc.data().User_Id === id) {
								blockedRef.doc(doc.id).delete()
								setIsBlocked(false)
							}
						})
					},
				},
			])
		} else {
			Alert.alert('Block', `Are you sure you want to block ${username}?`, [
				{
					text: 'Cancel',
					style: 'cancel',
				},
				{
					text: 'Yes',
					onPress: async () => {
						await blockedRef.add({
							DateTime: timestamp,
							User_Id: id,
						})
						setIsBlocked(true)
					},
				},
			])
		}
	}

	const s4 = () => {
		return Math.floor((1 + Math.random()) * 0x10000)
			.toString(16)
			.substring(1)
	}
	const uniqueId = () => {
		return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4()
	}

	const pluralCheck = s => {
		if (s == 1) {
			return ''
		} else {
			return 's'
		}
	}

	const timeConverter = timestamp => {
		const a = new Date(timestamp * 1000)
		const seconds = Math.floor((new Date() - a) / 1000)

		let interval = Math.floor(seconds / 31536000)
		if (interval > 1) {
			return interval + ' year' + pluralCheck(interval)
		}
		interval = Math.floor(seconds / 2592000)
		if (interval > 1) {
			return interval + ' month' + pluralCheck(interval)
		}
		interval = Math.floor(seconds / 86400)
		if (interval > 1) {
			return interval + ' day' + pluralCheck(interval)
		}
		interval = Math.floor(seconds / 3600)
		if (interval > 1) {
			return interval + ' hour' + pluralCheck(interval) + ' ago'
		}
		interval = Math.floor(seconds / 60)
		if (interval > 1) {
			return interval + ' minute' + pluralCheck(interval) + ' ago'
		}
		return Math.floor(seconds) + ' second' + pluralCheck(seconds)
	}

	return (
		<View style={styles.bg}>
			<View style={styles.content}>
				<ImageBackground source={{ uri: image }} style={styles.backgroundProfilePic} blurRadius={10}>
					<View style={styles.profileInfo}>
						{image.includes('.jpg') ? (
							<TouchableOpacity onPress={() => setImgModalVisible(!imgModalVisible)}>
								<FastImage style={styles.profilePic} source={{ uri: image }} />
							</TouchableOpacity>
						) : (
							<View style={styles.logoView}>
								<Image source={loginLogo} style={styles.logo} />
							</View>
						)}
						<Text style={styles.nameText}>{fullname !== ' ' ? fullname : 'full name not provided'}</Text>
						<Text style={styles.nameText}>{username !== ' ' ? username : 'username not provided'}</Text>
						<Text style={styles.infoText}>
							<Text>{joinDate ? `Member Since ${format(new Date(joinDate.toDate()), 'MMMM dd, yyyy')}` : 'Date member joined unknown'}</Text>
						</Text>
						<View style={styles.buttons}>
							{isBlocked ? null : areFriends ? (
								<TouchableOpacity
									style={[styles.button, { backgroundColor: '#6fc4ea', flexDirection: 'row', justifyContent: 'space-evenly' }]}
									onPress={() => addFriend()}
								>
									<CheckMark name='check' size={20} color='#fff' />
									<Text style={styles.buttonText}>Friends</Text>
								</TouchableOpacity>
							) : (
								<TouchableOpacity style={[styles.button, { backgroundColor: '#45d98f' }]} onPress={() => addFriend()}>
									<Text style={styles.buttonText}>Add</Text>
								</TouchableOpacity>
							)}
							{isBlocked ? (
								<TouchableOpacity style={[styles.button, { backgroundColor: '#000' }]} onPress={() => blockUser()}>
									<Text style={styles.buttonText}>Blocked</Text>
								</TouchableOpacity>
							) : (
								<TouchableOpacity style={[styles.button, { backgroundColor: '#F55451' }]} onPress={() => blockUser()}>
									<Text style={styles.buttonText}>Block</Text>
								</TouchableOpacity>
							)}
						</View>
					</View>
				</ImageBackground>
				<View style={styles.tabView}>
					<Tab.Navigator
						style={styles.tabNav}
						tabBarOptions={{
							style: {
								backgroundColor: '#2c385e',
							},
							allowFontScaling: false,
							labelStyle: {
								color: '#fff',
								fontWeight: '700',
								shadowColor: 'black',
								shadowOffset: { width: 1, height: 1 },
								shadowOpacity: 1,
								shadowRadius: 0,
								textTransform: 'none',
								fontSize: 18,
							},
							indicatorStyle: {
								backgroundColor: '#fff',
							},
						}}
					>
						<Tab.Screen name='Boat Info' component={BoatInfo} />
						<Tab.Screen name='Photos' component={MyPhotos} />
					</Tab.Navigator>
				</View>
				{imgModalVisible ? <BlurView style={styles.blurView} blurType='light' blurAmount={10} reducedTransparencyFallbackColor='white' /> : null}
				<Modal
					animationType='slide'
					transparent={true}
					visible={imgModalVisible}
					onRequestClose={() => {
						setImgModalVisible(!imgModalVisible)
					}}
				>
					<TouchableWithoutFeedback onPressOut={() => setImgModalVisible(!imgModalVisible)}>
						<View style={styles.centeredView}>
							<View style={styles.modalView}>
								<FastImage style={styles.modalImg} source={{ uri: image }}>
									<TouchableOpacity onPress={() => setImgModalVisible(!imgModalVisible)}>
										<CrossIcon name='cross' color='#fafafa' size={42} style={styles.closeImgModal} />
									</TouchableOpacity>
								</FastImage>
							</View>
						</View>
					</TouchableWithoutFeedback>
				</Modal>
			</View>
		</View>
	)
}

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

export default MemberProfile

const styles = StyleSheet.create({
	bg: {
		width: '100%',
		height: '100%',
		flexDirection: 'column',
		alignItems: 'center',
		position: 'absolute',
		top: 0,
		left: 0,
	},
	content: {
		height: '100%',
		width: '100%',
		backgroundColor: '#2c385e',
	},
	backgroundProfilePic: {
		height: windowHeight * 0.458,
		width: '100%',
		display: 'flex',
		flexDirection: 'row',
	},
	profileInfo: {
		position: 'absolute',
		top: windowHeight * 0.05,
		height: windowHeight * (0.458 - 0.05),
		width: windowWidth,
		display: 'flex',
		justifyContent: 'space-around',
		alignItems: 'center',
		padding: 10,
	},
	profilePic: {
		height: windowHeight * 0.175,
		width: windowHeight * 0.175,
		borderColor: '#fff',
		borderWidth: 2,
		borderRadius: 7,
	},
	nameText: {
		color: '#fff',
		fontWeight: '800',
		shadowColor: 'black',
		shadowOffset: { width: 2, height: 2 },
		shadowOpacity: 1,
		shadowRadius: 2,
		fontSize: 18,
	},
	infoText: {
		color: '#fff',
		fontWeight: '600',
		shadowColor: 'black',
		shadowOffset: { width: 2, height: 2 },
		shadowOpacity: 1,
		shadowRadius: 2,
		fontSize: 16,
	},
	buttons: {
		flexDirection: 'row',
	},
	button: {
		marginHorizontal: 10,
		width: 100,
		height: 40,
		borderRadius: 5,
		justifyContent: 'center',
		alignItems: 'center',
	},
	buttonText: {
		color: '#fff',
		fontSize: 18,
		fontWeight: '700',
	},
	tabView: {
		width: '100%',
		height: windowHeight * (1 - 0.108 - 0.35),
	},
	centeredView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 10,
		shadowColor: '#000',
		shadowOffset: {
			width: 10,
			height: 10,
		},
		shadowOpacity: 0.75,
		shadowRadius: 4,
	},
	modalView: {
		width: windowWidth * 0.9,
		height: windowHeight * 0.6,
		backgroundColor: 'white',
		borderRadius: 10,
		alignItems: 'center',
		elevation: 5,
	},
	modalImg: {
		width: '100%',
		height: '100%',
		borderRadius: 10,
		borderColor: 'white',
		borderWidth: 5,
	},
	closeImgModal: {
		marginLeft: 5,
		marginTop: 5,
	},
	logoView: {
		height: windowHeight * 0.2,
		width: windowHeight * 0.2,
		justifyContent: 'center',
		alignItems: 'center',
	},
	logo: {
		height: '100%',
		width: '100%',
		resizeMode: 'contain',
	},
	blurView: {
		position: 'absolute',
		top: 0,
		left: 0,
		bottom: 0,
		right: 0,
		zIndex: 1000,
	},
})
