import React, { useState, useEffect, useContext, useCallback } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions, ImageBackground, ActivityIndicator } from 'react-native'
import LikeIcon from 'react-native-vector-icons/FontAwesome'
import LikedIcon from 'react-native-vector-icons/FontAwesome'
import CommentIcon from 'react-native-vector-icons/Octicons'
import { LCRContext } from '../../../../context/LCRContext/lcrProvider'
import { format } from 'date-fns'
import { useFocusEffect } from '@react-navigation/core'
import firestore from '@react-native-firebase/firestore'

const SingleLCR = props => {
	const [liked, setLiked] = useState(false)
	const [imgIsLoading, setImgIsLoading] = useState(false)
	const { selectedLCR } = useContext(LCRContext)
	const [currentLCR, setCurrentLCR] = useState(selectedLCR)

	const lcrRef = firestore().collection('LCRPosts').doc(selectedLCR.id)

	useFocusEffect(
		useCallback(() => {
			lcrRef.get().then(res => {
				setCurrentLCR(res.data())
			})
		})
	)

	// console.log('currentLCR', currentLCR)

	const { postedAt } = currentLCR
	const { photo, fishType, boatFishingType, effortHrs, fishingType, fishWeight, createdAt } = currentLCR.requiredInfo
	const { User_Image, User_Name, fullname } = currentLCR.user

	const createdDate = createdAt ? createdAt.toDate() : postedAt.toDate()
	// console.log('~ createdDate', createdDate)
	// console.log('createdAt', createdAt)
	// console.log('currentLCR.requiredInfo', currentLCR.requiredInfo)

	const displayName = () => {
		if (User_Name) {
			return User_Name
		} else if (fullname) {
			return fullname
		} else {
			return 'Name not provided'
		}
	}

	return (
		<ImageBackground source={{ uri: photo }} style={styles.bgImg} resizeMode={'cover'} blurRadius={6} opacity={0.8}>
			<View style={styles.content}>
				<View style={styles.picView}>
					<Image
						source={{ uri: photo }}
						// onLoadStart={() => setImgIsLoading(true)}
						// onLoadEnd={() => setImgIsLoading(false)}
						// style={imgIsLoading ? { display: 'none' } : styles.pic}
						style={styles.pic}
					/>
					{/* <ActivityIndicator size='large' color='#ffffff' style={imgIsLoading ? styles.loading : { display: 'none' }} /> */}
				</View>
				<View style={styles.userInfo}>
					<Image source={{ uri: User_Image }} style={styles.profilePic} />
					<Text style={[styles.username, styles.text]}>{displayName()}</Text>
				</View>
				<View style={{ alignItems: 'center' }}>
					<Text style={[styles.text, styles.date]}>Caught on:</Text>
					<Text style={[styles.text, styles.date]}>{format(createdDate, 'MMMM dd, yyyy')}</Text>
				</View>
				<View style={styles.commentView}>
					<Text style={[styles.text, styles.fishText]}>
						{fishType}, {fishWeight ? `${fishWeight} lbs` : 'weight not given'}
					</Text>
					<Text style={[styles.text, styles.comment]}>Effort: {effortHrs ? `${parseFloat(effortHrs)} hours` : 'not given'}</Text>
					<Text style={fishingType ? [styles.text, styles.comment] : [styles.text, styles.noComment]}>
						Fishing type:{' '}
						{fishingType && boatFishingType ? (fishingType ? `${fishingType}, ` + (boatFishingType ? boatFishingType : '') : '') : 'none'}
					</Text>
				</View>
				<View style={styles.likecommentview}>
					<View style={styles.likecomment}>
						<TouchableOpacity onPress={() => setLiked(!liked)}>
							{liked ? <LikedIcon name='heart' size={34} color='#E60026' /> : <LikeIcon name='heart-o' size={34} color='#fafafa' />}
						</TouchableOpacity>
						<Text style={[styles.likecommenttext, styles.text]}>Likes</Text>
					</View>
					<View style={styles.likecomment}>
						<TouchableOpacity>
							<CommentIcon name='comment' size={34} color='#fafafa' />
						</TouchableOpacity>
						<Text style={[styles.likecommenttext, styles.text]}>Comments</Text>
					</View>
				</View>
			</View>
		</ImageBackground>
	)
}

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

export default SingleLCR

const styles = StyleSheet.create({
	bgImg: {
		width: '100%',
		height: '100%',
		flexDirection: 'column',
		alignItems: 'center',
		position: 'absolute',
		top: 0,
		left: 0,
	},
	content: {
		position: 'relative',
		top: windowHeight * 0.108,
		height: windowHeight * (1 - 0.108),
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	text: {
		color: '#fafafa',
		textAlign: 'center',
	},
	picView: {
		height: windowWidth * 0.8,
		width: windowWidth * 0.8,
		shadowColor: 'black',
		shadowOffset: { width: 2, height: 2 },
		shadowOpacity: 1,
		shadowRadius: 2,
	},
	pic: {
		borderColor: '#fff',
		borderWidth: 2,
		borderRadius: 7,
		height: '100%',
		width: '100%',
	},
	loading: {
		borderColor: '#fff',
		borderWidth: 2,
		borderRadius: 7,
		height: '100%',
		width: '100%',
	},
	userInfo: {
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		alignItems: 'center',
		width: windowWidth * 0.9,
		shadowColor: 'black',
		shadowOffset: { width: 2, height: 2 },
		shadowOpacity: 1,
		shadowRadius: 2,
		height: windowHeight * 0.1,
	},
	profilePic: {
		height: windowHeight * 0.1,
		width: windowHeight * 0.1,
		borderColor: '#fff',
		borderWidth: 2,
		borderRadius: 7,
	},
	username: {
		fontSize: 32,
		fontWeight: '600',
	},
	date: {
		fontSize: 20,
		fontWeight: '500',
		shadowColor: 'black',
		shadowOffset: { width: 2, height: 2 },
		shadowOpacity: 1,
		shadowRadius: 2,
	},
	commentView: {
		width: windowWidth * 0.8,
		justifyContent: 'center',
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: { width: 2, height: 2 },
		shadowOpacity: 1,
		shadowRadius: 2,
	},
	comment: {
		fontSize: 20,
		fontWeight: '600',
	},
	fishText: {
		fontSize: 24,
		fontWeight: '700',
		marginBottom: 10,
	},
	noComment: {
		fontSize: 22,
		fontWeight: '500',
		color: '#C2C2C2',
		fontStyle: 'italic',
	},
	likecommentview: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-around',
		width: windowWidth * 0.9,
		paddingBottom: 20,
		shadowColor: 'black',
		shadowOffset: { width: 2, height: 2 },
		shadowOpacity: 1,
		shadowRadius: 2,
	},
	likecomment: {
		display: 'flex',
		alignItems: 'center',
		// justifyContent: 'center',
	},
	likecommenttext: {
		paddingTop: 5,
		fontSize: 18,
	},
})
