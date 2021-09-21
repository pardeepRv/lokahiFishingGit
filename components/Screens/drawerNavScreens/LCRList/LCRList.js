import React from 'react'
import {
	View,
	Text,
	TouchableOpacity,
	SafeAreaView,
	StyleSheet,
	Image,
	ScrollView,
	Dimensions,
	ImageBackground,
	FlatList,
	ActivityIndicator,
} from 'react-native'
import { useEffect, useState, useContext } from 'react'
import { useFocusEffect, useIsFocused } from '@react-navigation/native'
import LCRPost from './LCRPost'
import firestore from '@react-native-firebase/firestore'
import { LCRContext } from '../../../../context/LCRContext/lcrProvider'

const userRef = firestore().collection('Users')

const SharePhotos = ({ navigation }) => {
	const { lcrList } = useContext(LCRContext)
	const [lcrData, setLCRData] = useState([])
	// console.log('~ lcrList', lcrList)

	useFocusEffect(
		React.useCallback(() => {
			let active = true
			;(async () => {
				try {
					if (active) {
						const ref = firestore().collection('LCRPosts').orderBy('postedAt', 'desc')
						return ref.onSnapshot(querySnapshot => {
							const lcrs = []
							querySnapshot.forEach(doc => {
								lcrs.push({
									id: doc.id,
									...doc.data(),
								})
							})
							setLCRData(lcrs)
						})
					}
				} catch (e) {
					console.log('this is an error', e)
				}
			})()

			return () => {
				active = false
			}
		})
	)

	return (
		<View style={styles.bg}>
			{lcrList.length !== 0 && lcrData !== 0 ? (
				<FlatList data={lcrData} keyExtractor={item => item.id} renderItem={({ item }) => <LCRPost post={item} />} style={styles.flatList} />
			) : (
				<ActivityIndicator size='large' style={{ marginTop: windowHeight * 0.3 }} />
			)}
		</View>
	)
}

export default SharePhotos

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

const styles = StyleSheet.create({
	bg: {
		width: windowWidth,
		height: windowHeight,
		flexDirection: 'column',
		alignItems: 'center',
		backgroundColor: '#fafafa',
		flex: 1,
	},
	flatList: {
		flex: 1,
	},
})
