import React, { useState, useCallback, useEffect, useContext } from 'react'
import { Text, TouchableOpacity, View, StyleSheet, Dimensions, Image } from 'react-native'
import LokahiLogo from '../../../../media/images/loginLogo.png'
import { LCRContext } from '../../../../context/LCRContext/lcrProvider'
import { useNavigation } from '@react-navigation/native'
import { format } from 'date-fns'

const LeaderboardCard = props => {
	// console.log('props', props)

	const { rank } = props
	const { post } = props
	const { postedAt } = post
	const { createdAt } = post.requiredInfo

	const createdDate = createdAt ? createdAt.toDate() : postedAt.toDate()

	const { photo, fishWeight } = post.requiredInfo
	const { fullname, User_Name } = post.user
	const { setSelectedLCR } = useContext(LCRContext)

	const navigation = useNavigation()

	const displayName = () => {
		if (User_Name) {
			return User_Name
		} else if (fullname) {
			return fullname
		} else {
			return 'Name not provided'
		}
	}

	const handlePostPress = () => {
		setSelectedLCR(props.post)
		navigation.navigate('SingleLCR')
	}

	return (
		<TouchableOpacity style={styles.LCRPost} onPress={handlePostPress}>
			<View style={styles.content}>
				<View style={styles.rankingView}>
					<View style={styles.rankCircle}>
						<Text style={styles.rank}>#{rank}</Text>
					</View>
					<Text style={styles.weight}>{fishWeight} lbs</Text>
				</View>

				<View style={styles.userInfo}>
					<Text style={styles.fullname}>{displayName()}</Text>
					<Text style={styles.time}>Caught on:</Text>
					<Text style={styles.time}>{format(createdDate, 'MMMM dd, yyyy')}</Text>
				</View>

				<View style={styles.imgView}>
					{photo ? <Image style={styles.image} source={{ uri: photo }} /> : <Image source={LokahiLogo} style={styles.image} />}
				</View>
			</View>
		</TouchableOpacity>
	)
}

export default LeaderboardCard

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

const styles = StyleSheet.create({
	LCRPost: {
		backgroundColor: '#fafafa',
		marginVertical: 10,
		width: windowWidth,
	},
	content: {
		flexDirection: 'row',
		width: '100%',
		paddingVertical: 10,
		paddingHorizontal: '2%',
		justifyContent: 'space-between',
	},
	rankingView: {
		justifyContent: 'space-between',
		width: '23%',
	},
	rankCircle: {
		backgroundColor: '#ffe347',
		width: 40,
		height: 40,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 20,
		// padding: 5,
		shadowColor: '#000',
		shadowOffset: { width: 2, height: 2 },
		// shadowRadius: 0
		shadowOpacity: 1,
	},
	rank: {
		fontSize: 16,
	},
	weight: {
		fontSize: 18,
		fontWeight: '500',
	},
	userInfo: {
		// flexDirection: 'row',
		alignItems: 'flex-start',
		justifyContent: 'space-between',
		width: '51%',
		// height: '100%',
		// marginLeft: 10,
		// maxWidth: '55%',
	},
	imgView: {
		width: '22%',
		justifyContent: 'center',
		alignItems: 'flex-end',
	},
	image: {
		width: 75,
		height: 75,
		resizeMode: 'cover',
	},
	fullname: {
		fontSize: 20,
		marginBottom: 5,
		fontWeight: '600',
	},
	fishType: {
		fontSize: 20,
		marginBottom: 5,
		fontWeight: '400',
	},
})
