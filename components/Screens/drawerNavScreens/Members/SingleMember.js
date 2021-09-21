import React from 'react'
import { SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from 'react-native'
import { useEffect, useState, useContext } from 'react'
import { useNavigation } from '@react-navigation/native'
import { MemberContext } from '../../../../context/MemberContext/memberProvider'
import FastImage from 'react-native-fast-image'
import { format } from 'date-fns'
import LokahiLogo from '../../../../media/images/LokahiLogo.png'

const SingleMember = props => {
	const navigation = useNavigation()
	const { member, filterOption } = props
	const { id, image, joinDate, username, fullname, uid, email, phone, CML, city, island } = member
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
		<TouchableOpacity
			style={styles.SingleMember}
			onPress={e => {
				// e.stopPropagation();

				setSelectedMember(member)
				// console.log('joinDate', moment(joinDate)).isValid();
				navigation.navigate('MemberProfile')
			}}
		>
			<View style={styles.content}>
				<View style={styles.header}>
					{image.includes('.jpg') ? (
						<FastImage style={styles.image} source={{ uri: image }} />
					) : (
						<View style={{ height: windowHeight * 0.08, width: windowHeight * 0.08, justifyContent: 'center', alignItems: 'center' }}>
							<Image source={LokahiLogo} style={{ height: '100%', resizeMode: 'contain' }} />
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

export default SingleMember

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

const styles = StyleSheet.create({
	SingleMember: {
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
