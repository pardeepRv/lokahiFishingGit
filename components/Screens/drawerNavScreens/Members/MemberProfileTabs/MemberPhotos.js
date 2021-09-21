import React from 'react'
import { View, TouchableOpacity, StyleSheet, Image, ScrollView, Dimensions, ActivityIndicator } from 'react-native'
import { useEffect, useState, useContext } from 'react'
import { useNavigation } from '@react-navigation/native'
import firestore from '@react-native-firebase/firestore'
import { MemberContext } from '../../../../../context/MemberContext/memberProvider'

const MemberPhotos = () => {
	const { selectedMember, setSelectedPhoto } = useContext(MemberContext)
	const navigation = useNavigation()
	const [posts, setPosts] = useState()
	const [postComments, setPostComments] = useState([])

	useEffect(() => {
		let allPosts = []

		firestore()
			.collection('Users')
			.doc(selectedMember.uid)
			.collection('Posts')
			.get()
			.then(res => {
				res.forEach(post => {
					allPosts.push({
						id: post.id,
						...post.data(),
					})
				})
				setPosts(allPosts)
			})
	}, [])

	const imgsMapped = posts?.map(img =>
		img.photo.includes('mov') ? null : (
			<TouchableOpacity
				key={img.id}
				onPress={() => {
					navigation.navigate('MemberSinglePhoto')
					setSelectedPhoto(img)
				}}
			>
				<Image resizeMode={'cover'} source={{ uri: img.photo }} style={styles.img} />
			</TouchableOpacity>
		)
	)

	return (
		<ScrollView style={{ backgroundColor: '#2c385e' }}>
			<View style={posts?.length === 0 ? styles.loading : styles.scrollView}>
				{posts?.length === 0 ? <ActivityIndicator size='large' color='#ffffff' style={{ marginBottom: windowHeight * 0.1 }} /> : imgsMapped}
			</View>
		</ScrollView>
	)
}

export default MemberPhotos

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

const styles = StyleSheet.create({
	scrollView: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		flexWrap: 'wrap',
		width: windowWidth,
		height: '100%',
	},
	loading: {
		justifyContent: 'center',
		alignItems: 'center',
		width: windowWidth,
		height: windowHeight * (1 - 0.108 - 0.35),
	},
	img: {
		height: windowWidth * 0.33333,
		width: windowWidth * 0.33333,
	},
})
