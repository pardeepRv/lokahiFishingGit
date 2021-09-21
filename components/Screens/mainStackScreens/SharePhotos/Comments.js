import React, { useState, useEffect, useContext } from 'react'
import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity, TextInput, KeyboardAvoidingView, Dimensions, ImageBackground } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'
import { AuthContext } from '../../../../context/authProvider'
import { withFirebaseHOC } from '../../../../utils/index'
import { Avatar } from 'react-native-paper'
import { notificationManager } from '../../../../utils/notificationManager'

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height
const Comment = ({ navigation }) => {
	const [comments_list, setComments_list] = useState([])
	const [userImage, setUserImage] = useState()
	const [refresh, setRefresh] = useState(false)
	const [loading, setLoading] = useState(false)
	const { user, setUser } = useContext(AuthContext)
	const [comment, setComment] = useState('')
	const userId = user.user.uid
	const route = useRoute()
	console.log('what is this right here', route.params.params)
	useEffect(() => {
		const ref = firestore().collection('Users').doc(user?.user?._user.uid)
		return ref.onSnapshot(querySnapshot => {
			const data = querySnapshot.data()
			setUser({ ...user, data })
		})
	}, [])
	const checkParams = () => {
		let params = user?.data?.User_Image.includes('appspot') ? user?.data?.User_Image : user?.data?.User_Image.slice(0, 78)
		if (params) {
			setUserImage(params)
			fetchComments(params)
		}
	}
	useEffect(() => {
		const ref = firestore().collection('Posts').doc(route.params.params.id).collection('comments')

		return ref.onSnapshot(querySnapshot => {
			const comments_list = []
			querySnapshot.forEach(doc => {
				const { userImage, posted, author, comment, commentId } = doc.data()
				comments_list.push({
					photoId: userImage,
					posted: timeConverter(posted),
					author: author,
					comment: comment,
					commentId: commentId,
				})
				setComments_list(comments_list)
				if (loading) {
					setLoading(false)
				}
			})
		})
	}, [])

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

	const postComment = async () => {
		const user1 = auth().currentUser
		try {
			const userId = user1.uid
			const commentId = uniqueId()
			const dateTime = Date.now()
			const timestamp = Math.floor(dateTime / 1000)

			await firestore().collection('Posts').doc(route.params.params.id).collection('comments').add({
				author: user?.data?.fullname,
				comment: comment,
				commentId: commentId,
				userImage: user?.data?.User_Image,
				userId: userId,
				createdAt: firestore.FieldValue.serverTimestamp(),
				posted: timestamp,
			})
			var notificationBody = `${user.dbData.fullname} Commented on your post!`
			notificationManager.sendPushNotification(route.params.params, user?.data?.fullname, notificationBody, { userId }, { userId })
			setComment('')
		} catch (e) {
			console.error('what is this', e)
		}
	}

	return (
		<View style={styles.container}>
			<View style={styles.title}>
				<View></View>
				<TouchableOpacity></TouchableOpacity>
			</View>
			<KeyboardAvoidingView behavior='padding' enabled style={{ flex: 1 }}>
				<View style={{ flex: 1 }}>
					{comments_list.length == 0 ? (
						// no comments show empty state
						<View style={styles.nocommentfound}>
							<Text style={styles.nocommentfoundText}>No comments found 🙄</Text>
							<Text style={styles.nocommentfoundText}>
								Be the first to <Text style={{ fontWeight: 'bold' }}>Comment Below</Text> 😁
							</Text>
						</View>
					) : (
						// are comments
						// <ImageBackground source={require('../../../../media/images/signup_bg.png')} style={styles.bgImg}>
						<FlatList
							data={comments_list}
							keyExtractor={(item, index) => index.toString()}
							style={{ flex: 1, backgroundColor: '#fafafa' }}
							renderItem={({ item, index }) => (
								<View key={index} style={styles.commentList}>
									<View style={styles.comment_IDContainer}>
										<Avatar.Image size={48} source={{ uri: item.photoId }} />
										<View style={{ flexDirection: 'row', alignItems: 'center' }}>
											<Text style={{ fontSize: 12, fontWeight: 'bold', color: 'blue', padding: 10 }}>{item.author}</Text>

											<Text style={{ fontSize: 14 }}>{item.comment}</Text>
										</View>
									</View>
									<View style={{ padding: 5 }}>
										<Text style={{ fontSize: 10 }}>{item.posted}</Text>
									</View>
								</View>
							)}
						/>
						// </ImageBackground>
					)}
				</View>
				<View>
					<View style={styles.postingComment}>
						<Text style={{ fontWeight: 'bold' }}>Post Comment</Text>
						<View style={{ flexDirection: 'row' }}>
							<TextInput
								editable={true}
								placeholder={'Enter your comment here ...'}
								onChangeText={comment => setComment(comment)}
								maxLength={1500}
								value={comment}
								style={styles.postingCommentInput}
							/>
							<TouchableOpacity onPress={postComment} style={styles.postingCommentButton}>
								<Text style={{ color: 'white', textAlign: 'center' }}>Post</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</KeyboardAvoidingView>
		</View>
	)
}

function CommentScreen(props) {
	const navigation = useNavigation()
	const route = useRoute()
	return <Comment {...props} navigation={navigation} route={route} />
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	bgImg: {
		width: windowWidth,

		// flexDirection: 'column',
		// alignItems: 'center',
	},
	title: {
		height: 90,
		paddingTop: 30,
		backgroundColor: '#fff',
		borderBottomColor: 'grey',
		borderBottomWidth: 0.5,
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingHorizontal: 10,
	},
	titleText: {
		fontWeight: 'bold',
		fontSize: 20,
	},
	nocommentfound: {
		alignItems: 'center',
		justifyContent: 'center',
		paddingTop: 20,
	},
	nocommentfoundText: {
		fontWeight: '200',
	},
	commentList: {
		width: '98%',
		backgroundColor: '#eee',
		alignSelf: 'center',
		overflow: 'hidden',
		marginVertical: 2.5,
		justifyContent: 'space-between',
		borderWidth: 1,
		borderColor: 'lightgrey',
		borderRadius: 5,
	},
	comment_IDContainer: {
		padding: 5,
		width: '100%',
		flexDirection: 'row',
	},
	comment_ID: {
		backgroundColor: '#fafafa',
		borderColor: '#fafafa',
		borderWidth: 0.5,
		paddingHorizontal: 5,
		paddingVertical: 3,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 5,
		shadowRadius: 1,
		shadowOpacity: 0.5,
		shadowOffset: {
			height: 0,
			width: 0,
		},
		elevation: 5,
	},
	postingComment: {
		borderTopWidth: 0.5,
		borderTopColor: 'grey',
		padding: 10,
	},
	postingCommentInput: {
		flex: 9,
		marginVertical: 10,
		height: 50,
		padding: 5,
		borderColor: 'grey',
		borderWidth: 1,
		borderRadius: 3,
		backgroundColor: 'white',
		color: 'black',
	},
	postingCommentButton: {
		flex: 1,
		paddingVertical: 10,
		paddingHorizontal: 20,
		backgroundColor: 'blue',
		borderRadius: 5,
		justifyContent: 'center',
		alignSelf: 'center',
		marginLeft: 5,
		height: 50,
	},
	notLoggedIn: {
		alignItems: 'center',
		padding: 10,
		borderColor: 'grey',
		borderWidth: 0.5,
		borderRadius: 10,
		width: '90%',
		alignSelf: 'center',
		backgroundColor: '#eee',
		marginVertical: 5,
	},
	notLoggedInText: {
		fontWeight: '200',
	},
})

export default withFirebaseHOC(CommentScreen)
