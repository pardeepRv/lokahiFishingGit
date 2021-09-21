import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet, ImageBackground, Dimensions, StatusBar } from 'react-native'
import firestore from '@react-native-firebase/firestore'
import Carousel from 'react-native-snap-carousel'
const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height
import ChevronRight from 'react-native-vector-icons/Entypo'
import { Button } from 'react-native-paper'
import Image from 'react-native-auto-scale-image'
const DataFeeds = ({ navigation }) => {
	const [active, setActive] = useState(0)
	const [carousel, setCarousel] = useState('')
	const [ad, setAd] = useState('')

	useEffect(() => {
		const ref = firestore().collection('offer').orderBy('title', 'asc')
		return ref.onSnapshot(querySnapshot => {
			const list1 = []
			querySnapshot.forEach(doc => {
				const { title, adsRef } = doc.data()
				list1.push({
					id: doc.id,
					name: title,
					adsRef: adsRef,
				})
				setAd(list1)
				// console.log('this one is ads', list1);
			})
		})
	}, [])

	const renderImage = img => {
		switch (img) {
			case 0:
				return (
					<View>
						<TouchableOpacity onPress={() => navigation.navigate('Tsutomu')}>
							<Image
								style={{ width: windowWidth * 0.5 }}
								uri={
									'https://firebasestorage.googleapis.com/v0/b/lokahirn.appspot.com/o/Ads%2Fahieps.jpeg?alt=media&token=3e6cec51-1108-418e-b8b7-864018291b52'
								}
							/>
						</TouchableOpacity>
					</View>
				)
			case 1:
				return (
					<View>
						<TouchableOpacity>
							<Image
								style={{ width: windowWidth }}
								uri={
									'https://firebasestorage.googleapis.com/v0/b/lokahirn.appspot.com/o/Ads%2FRFS-LOGO.jpeg?alt=media&token=a8947c9b-7a58-4b64-9f26-c54fabef298e'
								}
							/>
						</TouchableOpacity>
					</View>
				)
			case 2:
				return (
					<View>
						<TouchableOpacity onPress={() => navigation.navigate('NittaFishing')}>
							<Image
								style={{ width: windowWidth }}
								uri={
									'https://firebasestorage.googleapis.com/v0/b/lokahirn.appspot.com/o/Ads%2FNitta.png?alt=media&token=539517af-96d3-41ba-bb33-f7b5cb1619e9'
								}
							/>
						</TouchableOpacity>
					</View>
				)
			case 3:
				return (
					<View>
						<TouchableOpacity onPress={() => navigation.navigate('MorrisLures')}>
							<Image
								style={{ width: windowWidth }}
								uri={
									'https://firebasestorage.googleapis.com/v0/b/lokahirn.appspot.com/o/Ads%2FMorrisLuresBanner.jpeg?alt=media&token=e8810d4f-c390-400f-8906-bfbc432e73e7'
								}
							/>
						</TouchableOpacity>
					</View>
				)

			case 4:
				return (
					<View>
						<TouchableOpacity onPress={() => navigation.navigate('Hobbietat')}>
							<Image
								style={{ width: windowWidth }}
								uri={
									'https://firebasestorage.googleapis.com/v0/b/lokahirn.appspot.com/o/Ads%2FBannerRoy.jpeg?alt=media&token=cd55dd05-ea11-4988-84d4-29b794872023'
								}
							/>
						</TouchableOpacity>
					</View>
				)
			case 5:
				return (
					<View>
						<TouchableOpacity onPress={() => navigation.navigate('WestMarine')}>
							<Image
								style={{ width: windowWidth }}
								uri={
									'https://firebasestorage.googleapis.com/v0/b/lokahirn.appspot.com/o/Ads%2FWestMarine.jpeg?alt=media&token=33c9e774-ce33-4403-a0c0-d61da6fa7e6a'
								}
							/>
						</TouchableOpacity>
					</View>
				)
			case 6:
				return (
					<View>
						<TouchableOpacity onPress={() => navigation.navigate('PopHawaii')}>
							<Image
								style={{ width: windowWidth }}
								uri={
									'https://firebasestorage.googleapis.com/v0/b/lokahirn.appspot.com/o/Ads%2FBannerShane.jpeg?alt=media&token=6270df57-b5a3-43bb-b0f2-365958875db7'
								}
							/>
						</TouchableOpacity>
					</View>
				)
			case 7:
				return (
					<View>
						<TouchableOpacity onPress={() => navigation.navigate('ArcSolutions')}>
							<Image
								style={{ width: windowWidth }}
								uri={
									'https://firebasestorage.googleapis.com/v0/b/lokahirn.appspot.com/o/Ads%2FARCLogo.jpeg?alt=media&token=c6aff811-9140-423f-b903-1ef782f40fa6'
								}
							/>
						</TouchableOpacity>
					</View>
				)
			case 8:
				return (
					<View>
						<TouchableOpacity onPress={() => navigation.navigate('Gyotaku')}>
							<Image
								style={{ width: windowWidth }}
								uri={
									'https://firebasestorage.googleapis.com/v0/b/lokahirn.appspot.com/o/Ads%2Fgotaku-logo-redo.jpeg?alt=media&token=e145cc5d-5004-4565-a815-eedb7b81b766'
								}
							/>
						</TouchableOpacity>
					</View>
				)
			case 9:
				return (
					<View>
						<TouchableOpacity onPress={() => navigation.navigate('PacificRim')}>
							<Image
								style={{ width: windowWidth }}
								uri={
									'https://firebasestorage.googleapis.com/v0/b/lokahirn.appspot.com/o/Ads%2FPacificRim.jpeg?alt=media&token=f673cb81-51a8-40ba-bccb-c02b2fc984ec'
								}
							/>
						</TouchableOpacity>
					</View>
				)
			case 10:
				return (
					<View>
						<TouchableOpacity onPress={() => navigation.navigate('STokunagaStore')}>
							<Image
								style={{ width: windowWidth * 0.45 }}
								uri={
									'https://firebasestorage.googleapis.com/v0/b/lokahirn.appspot.com/o/Ads%2FSTokunaga.jpeg?alt=media&token=dd2a51b5-8f85-4957-8496-5010410ad71f'
								}
							/>
						</TouchableOpacity>
					</View>
				)
			case 12:
				return (
					<View>
						<TouchableOpacity onPress={() => navigation.navigate('Nicos')}>
							<Image
								style={{ width: windowWidth * 0.5 }}
								uri={
									'https://firebasestorage.googleapis.com/v0/b/lokahirn.appspot.com/o/Ads%2FNicosLogo.jpeg?alt=media&token=85bb2d5c-635b-415e-abff-3e22e7225db1'
								}
							/>
						</TouchableOpacity>
					</View>
				)
			case 13:
				return (
					<View>
						<TouchableOpacity onPress={() => navigation.navigate('Hobbietat')}>
							<Image
								style={{ width: windowWidth }}
								uri={
									'https://firebasestorage.googleapis.com/v0/b/lokahirn.appspot.com/o/Ads%2FHobbietatLogo.jpeg?alt=media&token=f7374e93-5d27-412d-9331-061c614769ec'
								}
							/>
						</TouchableOpacity>
					</View>
				)
		}
	}

	const renderContent = data => {
		return (
			<View>
				<View style={styles.carouselContainer}>{renderImage(data.item.image)}</View>
				<View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}></View>
			</View>
		)
	}

	return (
		<ImageBackground source={require('../../../../media/images/signup_bg.png')} style={styles.image}>
			<StatusBar hidden />
			<SafeAreaView>
				<View style={{ marginBottom: windowWidth * 0.394, marginTop: 30 }}>
					<Button
						mode='contained'
						onPress={() => navigation.navigate('Tide')}
						icon='chevron-right'
						contentStyle={{ flexDirection: 'row-reverse', justifyContent: 'space-between' }}
						color={'rgba(203, 103, 105, 0.75)'}
						style={{ width: windowWidth * 0.95, margin: 15 }}
						labelStyle={{ color: 'white' }}
					>
						Tide/Sun/Moon
					</Button>
					<Button
						mode='contained'
						onPress={() => navigation.navigate('SeaTemp')}
						icon='chevron-right'
						contentStyle={{ flexDirection: 'row-reverse', justifyContent: 'space-between' }}
						color={'rgba(62, 30, 76, 0.75)'}
						style={{ width: windowWidth * 0.95, margin: 15 }}
						labelStyle={{ color: 'white' }}
					>
						Sea Surface Temperature
					</Button>
					<Button
						mode='contained'
						onPress={() => navigation.navigate('Wind')}
						icon='chevron-right'
						contentStyle={{ flexDirection: 'row-reverse', justifyContent: 'space-between' }}
						color={'rgba(203, 103, 105, 0.75)'}
						style={{ width: windowWidth * 0.95, margin: 15 }}
						labelStyle={{ color: 'white' }}
					>
						Wind
					</Button>
					<Button
						mode='contained'
						onPress={() => navigation.navigate('Current')}
						icon='chevron-right'
						contentStyle={{ flexDirection: 'row-reverse', justifyContent: 'space-between' }}
						color={'rgba(62, 30, 76, 0.75)'}
						style={{ width: windowWidth * 0.95, margin: 15 }}
						labelStyle={{ color: 'white' }}
					>
						Current
					</Button>
					<Button
						mode='contained'
						onPress={() => navigation.navigate('Radar')}
						icon='chevron-right'
						contentStyle={{ flexDirection: 'row-reverse', justifyContent: 'space-between' }}
						color={'rgba(203, 103, 105, 0.75)'}
						style={{ width: windowWidth * 0.95, margin: 15 }}
						labelStyle={{ color: 'white' }}
					>
						Radar
					</Button>
					<Button
						mode='contained'
						onPress={() => navigation.navigate('Weather')}
						icon='chevron-right'
						contentStyle={{ flexDirection: 'row-reverse', justifyContent: 'space-between' }}
						color={'rgba(62, 30, 76, 0.75)'}
						style={{ width: windowWidth * 0.95, margin: 15 }}
						labelStyle={{ color: 'white' }}
					>
						Weather
					</Button>
				</View>

				{/* <View style={{ marginBottom: 10 }}></View> */}
			</SafeAreaView>
			<Carousel
				ref={c => {
					setCarousel(c)
				}}
				data={[
					{ image: 0 },
					{ image: 1 },
					{ image: 2 },
					{ image: 3 },
					{ image: 4 },
					{ image: 5 },
					{ image: 6 },
					{ image: 7 },
					{ image: 8 },
					{ image: 9 },
					{ image: 10 },
					{ image: 12 },
					{ image: 13 },
				]}
				renderItem={data => renderContent(data)}
				sliderWidth={windowWidth}
				itemWidth={windowWidth}
				autoplay={true}
				autoplayInterval={3500}
				loop={true}
				onSnapToItem={index => {
					setActive(index)
				}}
			/>
		</ImageBackground>
	)
}

export default DataFeeds

const styles = StyleSheet.create({
	blockButton: {
		borderColor: 'blue',
		borderWidth: 1,
		height: 188,
		width: 153,
		margin: 15,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'white',
		borderRadius: 8,
	},
	blockRow: {
		flexDirection: 'row',
	},
	image: {
		flex: 1,
		resizeMode: 'cover',
		justifyContent: 'center',
		height: windowHeight,
	},
	carouselContainer: {
		width: windowWidth,
		justifyContent: 'center',
		alignItems: 'center',
		// position: 'absolute', //Here is the trick
		// bottom: 10, //Here is the trick
		// height: '100%',
		backgroundColor: 'white',
		flex: 1,
		marginBottom: 100,
	},
})
