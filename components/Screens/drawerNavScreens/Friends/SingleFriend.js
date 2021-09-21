import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from 'react-native'
import { useContext } from 'react'
import { useNavigation } from '@react-navigation/native'
import { MemberContext } from '../../../../context/MemberContext/memberProvider'
import FastImage from 'react-native-fast-image'
import { format } from 'date-fns'
import LokahiLogo from '../../../../media/images/LokahiLogo.png'

const SingleFriend = props => {
	const navigation = useNavigation()
	const { friend, filterOption } = props
	const { id, image, joinDate, username, fullname, uid, email, phone, CML, city, island } = friend
	const { selectedMember, setSelectedMember } = useContext(MemberContext)

	const displayName = () => {
		if (filterOption === 'Username' || filterOption === 'Date Joined') {
			if (username) {
				return username
			} else {
				return fullname
			}
		} else {
			if (fullname) {
				return fullname
			} else {
				return username
			}
		}
	}

	return (
		<TouchableOpacity
			style={styles.SingleFriend}
			onPress={e => {
				// e.stopPropagation();

				setSelectedMember(friend)
				// console.log('joinDate', moment(joinDate)).isValid();
				navigation.navigate('MembersStack', { screen: 'MemberProfile' })
			}}
		>
			<View style={styles.content}>
				<View style={styles.header}>
					{image.includes('.jpg') ? (
						<FastImage style={styles.image} source={{ uri: image }} />
					) : (
						<View style={{ height: windowHeight * 0.08, width: windowHeight * 0.08, justifyContent: 'center', alignItems: 'center' }}>
							<Image source={LokahiLogo} style={{ height: '100%', resizeMode: 'contain' }} />
							{/* <NoImgIcon name='image-off-outline' size={38} color={'#606060'} style={{ opacity: 0.6 }} />
							<Text style={{ color: '#606060', textAlign: 'center', fontSize: 10, opacity: 0.8 }}>Image not provided</Text> */}
						</View>
					)}
					<View style={styles.userInfo}>
						<Text style={styles.username}>{displayName()}</Text>
						<Text>{joinDate ? `Member Since ${format(new Date(joinDate.toDate()), 'MMMM dd, yyyy')}` : 'Date member joined unknown'}</Text>
					</View>
				</View>
			</View>
		</TouchableOpacity>
	)
}

export default SingleFriend

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

const styles = StyleSheet.create({
	SingleFriend: {
		backgroundColor: 'snow',
		marginBottom: 10,
		width: windowWidth * 0.95,
		borderRadius: 7,
	},
	content: {
		marginVertical: 10,
	},
	header: {
		marginHorizontal: 10,
		display: 'flex',
		flexDirection: 'row',
		width: '100%',
	},
	image: {
		height: windowHeight * 0.08,
		width: windowHeight * 0.08,
		resizeMode: 'cover',
		borderRadius: 7,
		// borderColor: '#CCCCCC',
		// borderWidth: 3,
	},
	userInfo: {
		marginLeft: 10,
	},
	username: {
		fontSize: 20,
		marginBottom: 5,
		fontWeight: '500',
	},
})
