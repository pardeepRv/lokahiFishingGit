import React, { useState, useCallback, useEffect } from 'react'
import { SafeAreaView, StyleSheet, Text, ImageBackground, Dimensions, FlatList } from 'react-native'
import firestore from '@react-native-firebase/firestore'
import VideoCard from './Video'
const VideoTips = () => {
	const [ad, setAd] = useState('')

	useEffect(() => {
		const ref = firestore().collection('VideoTips').orderBy('Title', 'asc')
		return ref.onSnapshot(querySnapshot => {
			const list1 = []
			querySnapshot.forEach(doc => {
				const { Title, Video } = doc.data()
				list1.push({
					id: doc.id,
					name: Title,
					video: Video,
				})
				setAd(list1)
				// console.log('this one is ads', list1)
			})
		})
	}, [])

	return (
		// <ImageBackground source={require('../../../../media/images/signup_bg.png')} style={styles.bgImg}>
		<FlatList
			data={ad}
			keyExtractor={item => item.id}
			// style={{marginBottom:1}}
			renderItem={({ item }) => <VideoCard {...item} />}
		/>
		// </ImageBackground>
	)
}

export default VideoTips

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

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
	},
})
