import React, { useState, useEffect, useContext } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions, ImageBackground, ActivityIndicator } from 'react-native'
import LikeIcon from 'react-native-vector-icons/FontAwesome'
import LikedIcon from 'react-native-vector-icons/FontAwesome'
import CommentIcon from 'react-native-vector-icons/Octicons'
import { MemberContext } from '../../../../../context/MemberContext/memberProvider'
import { format } from 'date-fns'

const MySinglePhoto = props => {
	const { selectedPhoto } = useContext(MemberContext)
	const [imgIsLoading, setImgIsLoading] = useState(false)
	const [liked, setLiked] = useState(false)
	return (
		<ImageBackground source={{ uri: selectedPhoto.photo }} style={styles.bgImg} resizeMode={'cover'} blurRadius={6} opacity={0.8}>
			<View style={styles.content}>
				<View style={styles.picView}>
					<Image
						source={{ uri: selectedPhoto.photo }}
						onLoadStart={() => setImgIsLoading(true)}
						onLoadEnd={() => setImgIsLoading(false)}
						style={imgIsLoading ? { display: 'none' } : styles.pic}
					/>
					<ActivityIndicator size='large' color='#ffffff' style={imgIsLoading ? styles.loading : { display: 'none' }} />
				</View>
				<View style={{ alignItems: 'center' }}>
					<Text style={[styles.text, styles.date]}>Posted on:</Text>
					<Text style={[styles.text, styles.date]}>{format(new Date(selectedPhoto.createdAt.toDate()), 'MMMM dd, yyyy')}</Text>
				</View>
				<View style={styles.commentView}>
					<Text style={selectedPhoto.description ? [styles.text, styles.comment] : [styles.text, styles.noComment]}>
						{selectedPhoto.description ? selectedPhoto.description : 'No caption'}
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
						<Text style={[styles.likecommenttext, styles.text]}>comments</Text>
					</View>
				</View>
			</View>
		</ImageBackground>
	)
}

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

export default MySinglePhoto

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
	info: {
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
	date: {
		fontSize: 20,
		fontWeight: '500',
		shadowColor: 'black',
		shadowOffset: { width: 2, height: 2 },
		shadowOpacity: 1,
		shadowRadius: 2,
	},
	commentView: {
		width: windowWidth * 0.9,
		justifyContent: 'center',
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: { width: 2, height: 2 },
		shadowOpacity: 1,
		shadowRadius: 2,
	},
	comment: {
		fontSize: 22,
		fontWeight: '700',
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
	},
	likecommenttext: {
		paddingTop: 5,
		fontSize: 18,
	},
})
