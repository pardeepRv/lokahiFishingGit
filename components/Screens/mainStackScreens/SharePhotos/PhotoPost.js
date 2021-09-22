import React from 'react'
import { SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity, Dimensions, ActionSheetIOS } from 'react-native'
import { useEffect, useState, useContext } from 'react'
import firestore from '@react-native-firebase/firestore'
import { Avatar } from 'react-native-paper'
import LikeIcon from 'react-native-vector-icons/FontAwesome'
import LikedIcon from 'react-native-vector-icons/FontAwesome'
import CommentIcon from 'react-native-vector-icons/Octicons'
import ShareIcon from 'react-native-vector-icons/Ionicons'
import FastImage from 'react-native-fast-image'
import { useNavigation } from '@react-navigation/native'
import auth from '@react-native-firebase/auth'
import { AuthContext } from '../../../../context/authProvider'
import { format } from 'date-fns'
import Share from 'react-native-share'
import { notificationManager } from '../../../../utils/notificationManager'
import LokahiLogo from '../../../../media/images/loginLogo.png'
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
const PhotoPost = props => {
	const { user, setUser } = useContext(AuthContext)
	const [comment, setComment] = useState('')
	const [date, setDate] = useState({})
	const [amPm, setAmPm] = useState('')
	const [liked, setLiked] = useState(false)
	const [liked_list, setLiked_list] = useState([])
	const navigation = useNavigation()
	const [loading, setLoading] = useState(false)
	const [comments_list, setComments_list] = useState([])
	const [recipient, setRecipient] = useState('')
	const [result, setResult] = useState('')

	console.log('props',props, props.id, 'liked_list', liked_list)

	const displayName = () => {
		if (props?.user?.User_Name) {
			return props.user.User_Name
		} else if (props?.user?.fullname) {
			return props.user.fullname
		} else {
			return 'Name not provided'
		}
	}

	const fun = async () => {
		const shareOptions = {
			title: 'Share file',
			message: 'Post from Lokahi Fishing',
			url: props.photo,
			failOnCancel: false,
			social: Share.Social,
		}
		try {
			const ShareResponse = await Share.open(shareOptions)
			setResult(JSON.stringify(ShareResponse, null, 2))
		} catch (error) {
			console.log('Error =>', error)
			setResult('error: '.concat(getErrorString(error)))
		}
	}

	const navigateComments = () => {
		// validate form values
		navigation.navigate('Comments', { params: props })
	}

	const s4 = () => {
		return Math.floor((1 + Math.random()) * 0x10000)
			.toString(16)
			.substring(1)
	}
	const uniqueId = () => {
		return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4()
	}

	// useEffect(() => {
	// 	const ref = firestore().collection('Posts').doc(props.id).collection('likes')
	// 	return ref.onSnapshot(querySnapshot => {
	// 		const likedList = []
	// 		querySnapshot.forEach(doc => {
	// 			const { userImage, author, likeId } = doc.data()
	// 			likedList.push({
	// 				photoId: userImage,
	// 				author: author,
	// 				likeId: likeId,
	// 			})
	// 			setLiked_list(likedList)
	// 			if (loading) {
	// 				setLoading(false)
	// 			}
	// 		})
	// 	})
	// }, [liked_list])

	// useEffect(() => {
	// 	const ref = firestore().collection('Posts').doc(props.id).collection('comments')
	// 	return ref.onSnapshot(querySnapshot => {
	// 		const commentsList = []
	// 		querySnapshot.forEach(doc => {
	// 			const { userImage, author, commentId } = doc.data()
	// 			commentsList.push({
	// 				photoId: userImage,
	// 				author: author,
	// 				commentId: commentId,
	// 			})
	// 			setComments_list(commentsList)
	// 			if (loading) {
	// 				setLoading(false)
	// 			}
	// 		})
	// 	})
	// }, [comments_list])

	useFocusEffect(React.useCallback(() => {
		let active = true ;
			
	
		(async () => {
			try {
				
				if (active) {
					
					const ref = firestore().collection('Posts').doc(props.id).collection('comments')
					return ref.onSnapshot(querySnapshot => {
						const commentsList = []
						querySnapshot.forEach(doc => {
							const { userImage, author, commentId } = doc.data()
							commentsList.push({
								photoId: userImage,
								author: author,
								commentId: commentId,
							})
							setComments_list(commentsList)
							if (loading) {
								setLoading(false)
							}
						})
					})
				
			}} catch(e) {
				console.log('this is an error', e);
			}
		})();
		
		return () => {
			active = false
		}
	}, []));

	useFocusEffect(React.useCallback(() => {
		let active = true ;
			
	
		(async () => {
			try {
				
				if (active) {
					
					const ref = firestore().collection('Posts').doc(props.id).collection('likes')
					return ref.onSnapshot(querySnapshot => {
						const likedList = []
			querySnapshot.forEach(doc => {
				const { userImage, author, likeId } = doc.data()
				likedList.push({
					photoId: userImage,
					author: author,
					likeId: likeId,
				})
				setLiked_list(likedList)
							if (loading) {
								setLoading(false)
							}
						})
					})
				
			}} catch(e) {
				console.log('this is an error', e);
			}
		})();
		
		return () => {
			active = false
		}
	}, []));

	const onLikePress = async () => {
		const user1 = auth().currentUser
		try {
			const userId = user1.uid
			const likeId = uniqueId()
			const dateTime = Date.now()
			const timestamp = Math.floor(dateTime / 1000)
			await firestore().collection('Posts').doc(props.id).collection('likes').doc(userId).set({
				author: user?.data?.fullname,
				likeId: likeId,
				userImage: user?.data?.User_Image,
				userId: userId,
				createdAt: firestore.FieldValue.serverTimestamp(),
				posted: timestamp,
			})
			var notificationBody = `${user?.data?.fullname} Liked your post!`
			notificationManager.sendPushNotification(props, user?.data?.fullname, notificationBody, { userId }, { userId })
			setLiked(true)
		} catch (e) {
			console.error('what is this', e)
		}
	}

	const onDislikePress = async () => {
		const user1 = auth().currentUser
		try {
			const userId = user1.uid

			await firestore().collection('Posts').doc(props.id).collection('likes').doc(userId).delete()

			setLiked(false)
		} catch (e) {
			console.error('what is this', e)
		}
	}

	return (
		<View style={styles.PhotoPost}>
			<View style={styles.content}>
				<View style={styles.header}>
					<Avatar.Image
						size={52}
						source={props?.user?.User_Image ? { uri: props.user.User_Image } : LokahiLogo}
						style={{ backgroundColor: '#fafafa' }}
					/>
					<View style={styles.usercomment}>
						<Text style={styles.username}>{displayName()}</Text>
						<Text style={props.description ? styles.postcomment : styles.noComment}>
							{props.description ? props.description : 'No caption'}
						</Text>
						<Text style={{ fontSize: 16 }}>{props.createdAt ? format(props?.createdAt?.toDate(), 'MMMM dd, yyyy') : null}</Text>
					</View>
					<TouchableOpacity style={styles.shareIcon} onPress={fun}>
						<ShareIcon name='share-outline' size={30} color='#000' />
					</TouchableOpacity>
				</View>
				<View style={styles.images}>
					<FastImage style={{ width: '50%', height: 200 }} resizeMode={'cover'} source={{ uri: props.photo }} />
				</View>
				<View style={styles.likecommentview}>
					<View style={styles.likecomment}>
						{liked ? (
							<TouchableOpacity onPress={() => onDislikePress()}>
								<LikedIcon name='heart' size={30} color='#E60026' />
							</TouchableOpacity>
						) : (
							<TouchableOpacity onPress={() => onLikePress()}>
								<LikeIcon name='heart-o' size={30} color='#000' />
							</TouchableOpacity>
						)}
						<Text style={styles.likecommenttext}>{liked_list.length} Likes</Text>
					</View>
					<View style={styles.likecomment}>
						<TouchableOpacity onPress={navigateComments}>
							<CommentIcon name='comment' size={30} color='#000' />
						</TouchableOpacity>
						<Text style={styles.likecommenttext}>{comments_list.length} Comments</Text>
					</View>
				</View>
			</View>
		</View>
	)
}

export default PhotoPost
const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height
const styles = StyleSheet.create({
	PhotoPost: {
		backgroundColor: '#fafafa',
		marginVertical: 10,
		width: windowWidth,
	},
	content: {
		marginVertical: 5,
	},
	header: {
		marginHorizontal: 10,
		display: 'flex',
		flexDirection: 'row',
		marginTop: 10,
		width: '100%',
	},
	usercomment: {
		marginLeft: 10,
	},
	username: {
		fontSize: 20,
		marginBottom: 5,
		fontWeight: '600',
	},
	postcomment: {
		width: windowWidth * 0.75,
		marginBottom: 5,
		fontSize: 16,
	},
	noComment: {
		color: '#C2C2C2',
		fontStyle: 'italic',
		fontSize: 16,
		marginBottom: 5,
	},
	shareIcon: {
		position: 'absolute',
		top: 0,
		right: 20,
	},
	images: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-around',
		width: '100%',
		marginVertical: 10,
	},
	likecommentview: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		marginTop: 10,
		marginBottom: 10,
	},
	likecomment: {
		display: 'flex',
		alignItems: 'center',
		marginHorizontal: 40,
	},
	likecommenttext: {
		marginTop: 5,
	},
})
