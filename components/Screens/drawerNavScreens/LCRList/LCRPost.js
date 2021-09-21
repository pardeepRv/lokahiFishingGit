import React from 'react'
import { SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from 'react-native'
import { useEffect, useState, useContext } from 'react'
import LikeIcon from 'react-native-vector-icons/FontAwesome'
import LikedIcon from 'react-native-vector-icons/FontAwesome'
import CommentIcon from 'react-native-vector-icons/Octicons'
import ShareIcon from 'react-native-vector-icons/Ionicons'
import ArrowRightIcon from 'react-native-vector-icons/SimpleLineIcons'
import LokahiLogo from '../../../../media/images/loginLogo.png'
import { LCRContext } from '../../../../context/LCRContext/lcrProvider'
import { useNavigation } from '@react-navigation/native'
import { format } from 'date-fns'

const LCRPost = props => {
	const [liked, setLiked] = useState(false)
	const { setSelectedLCR } = useContext(LCRContext)
	const navigation = useNavigation()

	const { post } = props
	const { postedAt } = post
	const { photo, fishType, createdAt } = post.requiredInfo
	const { fullname, User_Name } = post.user

	const createdDate = createdAt ? createdAt.toDate() : postedAt.toDate()

	// const postedAt = props?.post?.postedAt
	// const photo = props?.post?.requiredInfo?.photo
	// const fishType = props?.post?.requiredInfo?.fishType
	// const fullname = props?.post?.user?.fullname
	// const User_Name = props?.post?.user?.User_Name

	const handlePostPress = () => {
		setSelectedLCR(post)
		navigation.navigate('LCRStack', { screen: 'SingleLCR' })
	}

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
		<View style={styles.LCRPost}>
			<View style={styles.content}>
				<TouchableOpacity style={styles.header} onPress={handlePostPress}>
					<View style={styles.headerContent}>
						{photo ? <Image style={styles.image} source={{ uri: photo }} /> : <Image source={LokahiLogo} style={styles.image} />}
						<View style={styles.fishTime}>
							<Text style={styles.fullname}>{displayName()}</Text>
							<Text style={styles.fishType}>{fishType}</Text>
							<Text style={styles.time}>Caught on: {format(createdDate, 'MMMM dd, yyyy')}</Text>
						</View>
						<ArrowRightIcon name='arrow-right' size={16} color='#fafafa' />
					</View>
				</TouchableOpacity>
				<View style={styles.likecommentview}>
					<View style={styles.likecomment}>
						<TouchableOpacity onPress={() => setLiked(!liked)}>
							{liked ? <LikedIcon name='heart' size={24} color='#E60026' /> : <LikeIcon name='heart-o' size={24} color='#fafafa' />}
						</TouchableOpacity>
						<Text style={styles.likecommenttext}>0 Likes</Text>
					</View>
					<View style={styles.likecomment}>
						<TouchableOpacity>
							<CommentIcon name='comment' size={24} color='#fafafa' />
						</TouchableOpacity>
						<Text style={styles.likecommenttext}>0 Comments</Text>
					</View>
					{/* <TouchableOpacity style={styles.shareIcon}>
						<ShareIcon name='share-outline' size={24} color='#fafafa' />
					</TouchableOpacity> */}
				</View>
			</View>
		</View>
	)
}

export default LCRPost

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

const styles = StyleSheet.create({
	LCRPost: {
		backgroundColor: '#2c385e',
		marginVertical: 10,
		width: windowWidth,
	},
	content: {
		marginVertical: 10,
	},
	header: {
		marginHorizontal: 10,
		display: 'flex',
		flexDirection: 'row',
		marginBottom: 5,
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	headerContent: {
		flexDirection: 'row',
		alignItems: 'center',
		height: '100%',
		width: '100%',
	},
	image: {
		width: windowWidth * 0.2,
		height: windowWidth * 0.2,
		resizeMode: 'cover',
	},
	fishTime: {
		marginLeft: 10,
	},
	fullname: {
		fontSize: 20,
		marginBottom: 5,
		fontWeight: '600',
		color: '#fafafa',
	},
	fishType: {
		fontSize: 20,
		marginBottom: 5,
		fontWeight: '400',
		color: '#fafafa',
		width: windowWidth * 0.7,
	},
	time: {
		color: '#fafafa',
	},
	likecommentview: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 10,
		marginHorizontal: 10,
	},
	likecomment: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		marginHorizontal: 10,
	},
	likecommenttext: {
		color: '#fafafa',
		marginHorizontal: 10,
	},
})
