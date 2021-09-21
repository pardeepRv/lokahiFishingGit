import React, { createContext, useEffect, useState, useContext } from 'react'
import firestore from '@react-native-firebase/firestore'
import { View, Image, StyleSheet, Text, Alert } from 'react-native'
import { AuthContext } from '../authProvider'
import firebase from 'firebase'

export const LCRContext = createContext({})

export const LCRProvider = ({ children }) => {
	const [lcrList, setLCRList] = useState([])
	const [effortHrs, setEffortHrs] = useState(0)
	const [LCRPostRequired, setLCRPostRequired] = useState({})
	const [LCRPostOptional, setLCRPostOptional] = useState({})
	const [fishType, setFishType] = useState('')
	const [fishingType, setFishingType] = useState('')
	const [boatFishingType, setBoatFishingType] = useState('')
	const [postToPhotos, setPostToPhotos] = useState(true)
	const [imgModalVisible, setImgModalVisible] = useState(false)
	const [modalImg, setModalImg] = useState('')
	const [photoIsUploading, setPhotoIsUploading] = useState(false)
	const [selectedLCR, setSelectedLCR] = useState({})
	const [LCRIsPosting, setLCRIsPosting] = useState(false)

	const { user, setUser } = useContext(AuthContext)

	const timestamp = firestore.FieldValue.serverTimestamp()

	const userRef = firestore().collection('Users')
	const lcrRef = firestore().collection('LCRPosts')

	const postLCRtoFB = async () => {
		const userId = user.user._user.uid

		await lcrRef
			.add({
				postedAt: timestamp,
				requiredInfo: {
					...LCRPostRequired,
				},
				optionalInfo: {
					...LCRPostOptional,
				},
				user: { ...user.dbData },
				userId: userId,
			})
			.then(() => {
				userRef
					.doc(userId)
					.collection('LCRPosts')
					.add({ postedAt: timestamp })
					.then(doc => {
						userRef.doc(userId).collection('LCRPosts').doc(doc.id).collection('Required Info').add(LCRPostRequired)
						userRef.doc(userId).collection('LCRPosts').doc(doc.id).collection('Optional Info').add(LCRPostOptional)
					})
					.catch(error => {
						console.error('Error adding document: ', error)
					})
			})
			.then(() => {
				console.log('lcr posts successful')
			})
			.catch(error => {
				console.error('Error adding document: ', error)
			})
	}

	const postLCRtoPhotosFB = async () => {
		const { photo } = LCRPostRequired
		const ref = firestore().collection('Posts')
		await ref
			.add({
				photo: photo,
				createdAt: firestore.FieldValue.serverTimestamp(),
				user: { ...user.dbData },
			})
			.then(doc => {
				console.log('Photo post added to firebase:', doc.id)
			})
	}

	useEffect(() => {
		const lcrArr = []

		lcrRef
			.orderBy('postedAt', 'desc')
			.get()
			.then(res => {
				res.forEach(lcr => {
					lcrArr.push({
						id: lcr.id,
						...lcr.data(),
					})
				})
				setLCRList(lcrArr)
			})
	}, [firebase])

	const renderImage = img => {
		switch (img) {
			case 0:
				return (
					<View style={styles.scrollImageCtn}>
						<Image style={styles.imageRender} source={require('../../media/images/leaderboardImages/BluemarlinFish.png')} />
					</View>
				)
			case 1:
				return (
					<View style={styles.scrollImageCtn}>
						<Image style={styles.imageRender} source={require('../../media/images/leaderboardImages/StripedMarlinFish.png')} />
					</View>
				)
			case 2:
				return (
					<View style={styles.scrollImageCtn}>
						<Image style={styles.imageRender} source={require('../../media/images/leaderboardImages/SPEARFISH.png')} />
					</View>
				)
			case 3:
				return (
					<View style={styles.scrollImageCtn}>
						<Image style={styles.imageRender} source={require('../../media/images/leaderboardImages/AhiFish.png')} />
					</View>
				)
			case 4:
				return (
					<View style={styles.scrollImageCtn}>
						<Image style={styles.imageRender} source={require('../../media/images/leaderboardImages/MahiFish.png')} />
					</View>
				)
			case 5:
				return (
					<View style={styles.scrollImageCtn}>
						<Image style={styles.imageRender} source={require('../../media/images/leaderboardImages/OnoFish.png')} />
					</View>
				)
			case 6:
				return (
					<View style={styles.scrollImageCtn}>
						<Image style={styles.imageRender} source={require('../../media/images/leaderboardImages/AkuFish.png')} />
					</View>
				)
			case 7:
				return (
					<View style={styles.scrollImageCtn}>
						<Image style={styles.imageRender} source={require('../../media/images/leaderboardImages/KawakawaFish.png')} />
					</View>
				)
			case 8:
				return (
					<View style={styles.scrollImageCtn}>
						<Image style={styles.imageRender} source={require('../../media/images/leaderboardImages/Other_fish.png')} />
					</View>
				)
			case 9:
				return (
					<View style={styles.scrollImageCtn}>
						<Image style={styles.imageRender} source={require('../../media/images/leaderboardImages/MultipleFishes.png')} />
					</View>
				)
			case 10:
				return (
					<View style={styles.scrollImageCtn}>
						<Image style={styles.imageRender} source={require('../../media/images/leaderboardImages/OpakapakaFish.png')} />
					</View>
				)
			case 11:
				return (
					<View style={styles.scrollImageCtn}>
						<Image style={styles.imageRender} source={require('../../media/images/leaderboardImages/EhuFish.png')} />
					</View>
				)
			case 12:
				return (
					<View style={styles.scrollImageCtn}>
						<Image style={styles.imageRender} source={require('../../media/images/leaderboardImages/UkuFish.png')} />
					</View>
				)
			case 13:
				return (
					<View style={styles.scrollImageCtn}>
						<Image style={styles.imageRender} source={require('../../media/images/leaderboardImages/OioFish.png')} />
					</View>
				)
			case 14:
				return (
					<View style={styles.scrollImageCtn}>
						<Image style={styles.imageRender} source={require('../../media/images/leaderboardImages/MenpachiFish.png')} />
					</View>
				)
			case 15:
				return (
					<View style={styles.scrollImageCtn}>
						<Image style={styles.imageRender} source={require('../../media/images/leaderboardImages/NoFish.png')} />
					</View>
				)
			case 16:
				return (
					<View style={styles.scrollImageCtn}>
						<Image style={styles.imageRender} source={require('../../media/images/leaderboardImages/OnagaFish.png')} />
					</View>
				)
			case 17:
				return (
					<View style={styles.scrollImageCtn}>
						<Image style={styles.imageRender} source={require('../../media/images/leaderboardImages/KaleFish.png')} />
					</View>
				)
			case 18:
				return (
					<View style={styles.scrollImageCtn}>
						<Image style={styles.imageRender} source={require('../../media/images/leaderboardImages/KahalaFish.png')} />
					</View>
				)
			case 19:
				return (
					<View style={styles.scrollImageCtn}>
						<Image style={styles.imageRender} source={require('../../media/images/leaderboardImages/GindaiFish.png')} />
					</View>
				)
			case 20:
				return (
					<View style={styles.scrollImageCtn}>
						<Image style={styles.imageRender} source={require('../../media/images/leaderboardImages/HapuupuuFish.png')} />
					</View>
				)
			case 21:
				return (
					<View style={styles.scrollImageCtn}>
						<Image style={styles.imageRender} source={require('../../media/images/leaderboardImages/LehiFish.png')} />
					</View>
				)
			case 22:
				return (
					<View style={styles.scrollImageCtn}>
						<Image style={styles.imageRender} source={require('../../media/images/leaderboardImages/AlphonsinFish.png')} />
					</View>
				)
			case 23:
				return (
					<View style={styles.scrollImageCtn}>
						<Image style={styles.imageRender} source={require('../../media/images/leaderboardImages/DeepSeaAweoweo.png')} />
					</View>
				)
			case 24:
				return (
					<View style={styles.scrollImageCtn}>
						<Image style={styles.imageRender} source={require('../../media/images/leaderboardImages/AkuleFish.png')} />
					</View>
				)
			case 25:
				return (
					<View style={styles.scrollImageCtn}>
						<Image style={styles.imageRender} source={require('../../media/images/leaderboardImages/OpeluFish.png')} />
					</View>
				)
			case 26:
				return (
					<View style={styles.scrollImageCtn}>
						<Image style={styles.imageRender} source={require('../../media/images/leaderboardImages/MoanoFish.png')} />
					</View>
				)
			case 27:
				return (
					<View style={styles.scrollImageCtn}>
						<Image style={styles.imageRender} source={require('../../media/images/leaderboardImages/omilu.png')} />
					</View>
				)
			case 28:
				return (
					<View style={styles.scrollImageCtn}>
						<Image style={styles.imageRender} source={require('../../media/images/leaderboardImages/WhiteUlua.png')} />
					</View>
				)
			case 29:
				return (
					<View style={styles.scrollImageCtn}>
						<Image style={styles.imageRender} source={require('../../media/images/leaderboardImages/Yellowspot.png')} />
					</View>
				)
			case 30:
				return (
					<View style={styles.scrollImageCtn}>
						<Image style={styles.imageRender} source={require('../../media/images/leaderboardImages/WekeFish.png')} />
					</View>
				)
			case 31:
				return (
					<View style={styles.scrollImageCtn}>
						<Image style={styles.imageRender} source={require('../../media/images/leaderboardImages/MoanaKaliFish.png')} />
					</View>
				)
			case 32:
				return (
					<View style={styles.scrollImageCtn}>
						<Image style={styles.imageRender} source={require('../../media/images/leaderboardImages/TaapeFish.png')} />
					</View>
				)
			case 33:
				return (
					<View style={styles.scrollImageCtn}>
						<Image style={styles.imageRender} source={require('../../media/images/leaderboardImages/ToauFish.png')} />
					</View>
				)
			case 34:
				return (
					<View style={styles.scrollImageCtn}>
						<Image style={styles.imageRender} source={require('../../media/images/leaderboardImages/BarracudaFish.png')} />
					</View>
				)
			case 35:
				return (
					<View style={styles.scrollImageCtn}>
						<Image style={styles.imageRender} source={require('../../media/images/leaderboardImages/RoiFish.png')} />
					</View>
				)
			case 36:
				return (
					<View style={styles.scrollImageCtn}>
						<Image style={styles.imageRender} source={require('../../media/images/leaderboardImages/KumaFish.png')} />
					</View>
				)
			case 37:
				return (
					<View style={styles.scrollImageCtn}>
						<Image style={styles.imageRender} source={require('../../media/images/leaderboardImages/MaluFish.png')} />
					</View>
				)
			case 38:
				return (
					<View style={styles.scrollImageCtn}>
						<Image style={styles.imageRender} source={require('../../media/images/leaderboardImages/Hage_Triggerfish.png')} />
					</View>
				)
			case 39:
				return (
					<View style={styles.scrollImageCtn}>
						<Image style={styles.imageRender} source={require('../../media/images/leaderboardImages/MoiFish.png')} />
					</View>
				)
			case 40:
				return (
					<View style={styles.scrollImageCtn}>
						<Image style={styles.imageRender} source={require('../../media/images/leaderboardImages/EnenueFish.png')} />
					</View>
				)
			case 41:
				return (
					<View style={styles.scrollImageCtn}>
						<Image style={styles.imageRender} source={require('../../media/images/leaderboardImages/MuFish.png')} />
					</View>
				)
			case 42:
				return (
					<View style={styles.scrollImageCtn}>
						<Image style={styles.imageRender} source={require('../../media/images/leaderboardImages/AweoweoFish.png')} />
					</View>
				)
			case 43:
				return (
					<View style={styles.scrollImageCtn}>
						<Image style={styles.imageRender} source={require('../../media/images/leaderboardImages/AholeholeFish.png')} />
					</View>
				)
			case 44:
				return (
					<View style={styles.scrollImageCtn}>
						<Image style={styles.imageRender} source={require('../../media/images/leaderboardImages/PoopaaFish.png')} />
					</View>
				)
			case 45:
				return (
					<View style={styles.scrollImageCtn}>
						<Image style={styles.imageRender} source={require('../../media/images/leaderboardImages/PalaniFish.png')} />
					</View>
				)
		}
	}

	const renderContent = data => {
		return (
			<View style={{ justifyContent: 'center', paddingTop: 35 }}>
				<View style={{ padding: 20 }}>{renderImage(data.item.image)}</View>
				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'center',
						alignItems: 'center',
						marginTop: -80,
					}}
				></View>
				<Text style={styles.subtext}>{data.item.subtext}</Text>
			</View>
		)
	}

	const styles = StyleSheet.create({
		scrollImageCtn: {
			alignItems: 'center',
			height: 143,
		},
		imageRender: {
			height: '60%',
			width: '100%',
		},
		subtext: {
			marginTop: 15,
			fontSize: 18,
			fontWeight: 'bold',
			textAlign: 'center',
			color: '#2c385e',
			shadowOpacity: 0.7,
			shadowColor: '#000',
			shadowOffset: { height: 1, width: 1 },
			shadowRadius: 0,
		},
	})

	return (
		<LCRContext.Provider
			value={{
				lcrList,
				effortHrs,
				setEffortHrs,
				LCRPostRequired,
				setLCRPostRequired,
				fishType,
				setFishType,
				renderImage,
				renderContent,
				fishingType,
				setFishingType,
				boatFishingType,
				setBoatFishingType,
				postLCRtoFB,
				postLCRtoPhotosFB,
				LCRPostOptional,
				setLCRPostOptional,
				postToPhotos,
				setPostToPhotos,
				imgModalVisible,
				setImgModalVisible,
				modalImg,
				setModalImg,
				photoIsUploading,
				setPhotoIsUploading,
				selectedLCR,
				setSelectedLCR,
				LCRIsPosting,
				setLCRIsPosting,
			}}
		>
			{children}
		</LCRContext.Provider>
	)
}
