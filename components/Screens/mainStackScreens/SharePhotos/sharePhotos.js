import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ImageBackground, FlatList, ActivityIndicator } from 'react-native'
import { Avatar } from 'react-native-paper'
import { useEffect, useState, useContext } from 'react'
import PhotoPost from './PhotoPost'
import PaperIcon from 'react-native-vector-icons/FontAwesome'
import VideoIcon from 'react-native-vector-icons/Ionicons'
import firestore from '@react-native-firebase/firestore'
import { AuthContext } from '../../../../context/authProvider'
import firebase from 'firebase'
import LokahiLogo from '../../../../media/images/loginLogo.png'
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
const SharePhotos = ({ navigation, props }) => {
	const [postList, setPostList] = useState('')
	const { user, setUser } = useContext(AuthContext)
	const [currentUserLike, setCurrentUserLike] = useState(false)

	const userImg = user?.data?.User_Image
	// console.log('~ userImg', userImg)

	useEffect(() => {
		const ref = firestore().collection('Users').doc(user.user?._user.uid)
		return ref.onSnapshot(querySnapshot => {
			const data = querySnapshot.data()
			setUser({ ...user, data })
		})
	}, [])

	// useEffect(() => {
	// 	const ref = firestore().collection('Posts').orderBy('createdAt', 'desc')
	// 	return ref.onSnapshot(querySnapshot => {
	// 		const posts = []
	// 		querySnapshot.forEach(doc => {
	// 			posts.push({
	// 				id: doc.id,
	// 				...doc.data(),
	// 			})
	// 		})
	// 		console.log('posts', posts)
	// 		setPostList(posts)
	// 	})
	// }, [firebase])

	// console.log('postList', postList)

	const navigatePost = () => {
		// validate form values
		navigation.navigate('Post')
	}

	useFocusEffect(React.useCallback(() => {
		let active = true ;	
		(async () => {
			try {	
				if (active) {	
					const ref = firestore().collection('Posts').orderBy('createdAt', 'desc')
		return ref.onSnapshot(querySnapshot => {
			const posts = []
			querySnapshot.forEach(doc => {
				posts.push({
					id: doc.id,
					...doc.data(),
				})
			})
			setPostList(posts)
							
						})
				
			}} catch(e) {
				console.log('this is an error', e);
			}
		})();
		
		return () => {
			active = false
		}
	}, []));

	return (
		<ImageBackground source={require('../../../../media/images/signup_bg.png')} style={styles.bgImg}>
			<View style={styles.content}>
				<View style={styles.share}>
					<View style={styles.shareheader}>
						<Avatar.Image size={40} source={userImg ? { uri: userImg } : LokahiLogo} />
						<Text style={styles.sharecatch}>Share your catch memories.</Text>
					</View>
					<View style={styles.buttons}>
						<TouchableOpacity style={styles.button} onPress={() => navigatePost()}>
							<PaperIcon name='image' size={20} color='#606060' />
							<Text style={styles.buttonText}>Photos</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.button} onPress={() => alert('Video posting coming soon!')}>
							<VideoIcon name='videocam-outline' size={26} color='#606060' />
							<Text style={styles.buttonText}>Videos</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
			{postList.length !== 0 ? (
				<FlatList data={postList} keyExtractor={item => item.id} style={{ marginTop: 60 }} renderItem={({ item }) => <PhotoPost {...item} />} />
			) : (
				<ActivityIndicator size='large' style={{ marginTop: windowHeight * 0.3 }} />
			)}
		</ImageBackground>
	)
}

export default SharePhotos

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

const styles = StyleSheet.create({
	bgImg: {
		width: windowWidth,
		height: windowHeight,
		flexDirection: 'column',
		alignItems: 'center',
	},
	content: {
		// position: 'relative',
		top: windowHeight * 0.108,
		marginBottom: windowHeight * 0.02,
		// bottom: windowHeight * 0.1
		paddingHorizontal: 15,
		paddingBottom: 20,
	},
	share: {
		backgroundColor: 'snow',
		// borderRadius: 10,
		padding: 10,
		marginBottom: 5,
		width: windowWidth,
	},
	shareheader: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
	},
	sharecatch: {
		fontSize: 20,
		marginLeft: 10,
	},
	buttons: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-around',
	},
	button: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		width: '50%',
	},
	buttonText: {
		fontSize: 16,
		marginLeft: 8,
	},
	scrollViewContainer: {
		// flex: 1,
		// height: windowHeight * 0.7,
		// paddingBottom: windowWidth,
	},
})
