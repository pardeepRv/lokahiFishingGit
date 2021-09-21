import React, { useState, useEffect } from 'react'
import { ActivityIndicator, Alert, FlatList, Text, StyleSheet, View, ScrollView, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Avatar } from 'react-native-paper'
import firestore from '@react-native-firebase/firestore'

const Dashboard = ({ navigation }) => {
	const [post, setPost] = useState('')
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const ref = firestore().collection('Posts').orderBy('createdAt', 'desc')
		return ref.onSnapshot(querySnapshot => {
			const post = []
			querySnapshot.forEach(doc => {
				const { photo, title, description } = doc.data()
				post.push({
					id: doc.id,
					photo: photo,
					title: title,
					description: description,
				})
				setPost(post)
				// console.log('this', post)
				if (loading) {
					setLoading(false)
				}
			})
		})
	}, [])

	const navigateProfile = () => {
		navigation.navigate('Profile')
	}

	const renderItem = ({ item }) => (
		<View style={styles.card}>
			<Image source={item.photo} style={styles.cardImage} />
			<View style={styles.cardHeader}>
				<Text style={{ color: 'black' }}>{item.title}</Text>
				{/* <TouchableOpacity
            onPress={navigateProfile}>
            <Avatar.Image
              source={require('../Assets/griffin.png')}
              size={54}
              style={styles.cardAvatar}
            />
          </TouchableOpacity> */}
			</View>
			<View style={styles.cardContent}>
				<Text>{item.description}</Text>
			</View>
		</View>
	)

	return <FlatList style={styles.container} data={post} renderItem={renderItem} keyExtractor={item => item.id} />
}

export default Dashboard

const styles = StyleSheet.create({
	container: {
		marginTop: 100,
		backgroundColor: '#425ec6',
		flex: 1,
	},
	card: {
		marginBottom: 55,
		backgroundColor: 'white',
	},
	cardImage: {
		width: '100%',
		height: 200,
	},
	cardHeader: {
		padding: 10,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		backgroundColor: 'white',
		borderWidth: 0.25,
		borderColor: 'black',
	},
	cardTitle: {
		color: 'black',
	},
	cardAvatar: {
		marginRight: 16,
	},
	cardContent: {
		padding: 10,
		borderWidth: 0.25,
		borderColor: 'black',
		height: 100,
	},
})
