import React, { useState, useCallback, useEffect, useContext } from 'react'
import {
	SafeAreaView,
	ActivityIndicator,
	Text,
	Image,
	TouchableOpacity,
	View,
	StyleSheet,
	Dimensions,
	FlatList,
	Modal,
	TouchableWithoutFeedback,
} from 'react-native'
import MonthPicker from 'react-native-month-year-picker'
import moment from 'moment'
import Carousel from 'react-native-snap-carousel'
import LeaderboardCard from './leaderboardCard'
import { LCRContext } from '../../../../context/LCRContext/lcrProvider'
import { useFocusEffect, useIsFocused } from '@react-navigation/native'
import firestore from '@react-native-firebase/firestore'

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

const MONTHLY_OUTPUT_FORMAT = 'MMMM YYYY'
const YEAR_OUTPUT_FORMAT = 'YYYY'

const fishData = [
	{ image: 0, subtext: 'Blue Marlin' },
	{ image: 1, subtext: 'Striped Marlin' },
	{ image: 2, subtext: 'Spearfish' },
	{ image: 3, subtext: 'Ahi' },
	{ image: 4, subtext: 'Mahi Mahi' },
	{ image: 5, subtext: 'Ono' },
	{ image: 6, subtext: 'Aku' },
	{ image: 7, subtext: 'Ulua' },
	{ image: 8, subtext: 'Omilu' },
	{ image: 9, subtext: 'Onaga' },
	{ image: 10, subtext: 'Opakapaka' },
	{ image: 11, subtext: 'Ehu' },
	{ image: 12, subtext: 'Uku' },
	{ image: 13, subtext: 'Oio' },
	// { image: 14, subtext: 'Menpachi' },
	{ image: 15, subtext: 'No Fish' },
]

const Leaderboard = ({ navigation }) => {
	const [fishType, setFishType] = useState('Blue Marlin')
	const [carousel, setCarousel] = useState('')
	const [annual, setAnnual] = useState(true)
	const [monthly, setMonthly] = useState(false)
	const [lcrData, setLCRData] = useState([])
	const [date, setDate] = useState(new Date())
	const [showPicker, setShowPicker] = useState(false)
	const { lcrList, imgModalVisible, setImgModalVisible, modalImg, setModalImg } = useContext(LCRContext)

	const month = date.getMonth()
	const year = date.getFullYear()

	// console.log('annual', annual)
	// console.log('monthly', monthly)

	console.log('lcrData.length', lcrData.length, 'lcrList.length', lcrList.length)

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

							const lcrListArr = []
							lcrs.map((lcr, index) => {
								// console.log('lcr', lcr)

								const { postedAt } = lcr
								const { createdAt } = lcr.requiredInfo
								const createdDate = createdAt ? createdAt.toDate() : postedAt.toDate()
								const typeOfFish = lcr.requiredInfo.fishType
								const lcrMonth = createdDate.getMonth()
								const lcrYear = createdDate.getFullYear()

								// console.log('createdAt', createdAt)
								// console.log('postedAt', postedAt)
								// console.log('createdDate', createdDate)
								// console.log('month', month, typeof month)
								// console.log('lcrMonth', lcrMonth, typeof lcrMonth)
								// console.log('year', year)
								// console.log('lcrYear', lcrYear)

								// console.log('typeOfFish', typeOfFish)
								// console.log('fishType', fishType)

								if (typeOfFish.includes(fishType)) {
									// console.log(typeOfFish, 'includes', fishType)
									// console.log('year', year, typeof year)
									// console.log('lcrYear', lcrYear, typeof lcrYear)
									// console.log('annual:', annual, 'monthly:', monthly)
									if (annual && !monthly) {
										// console.log('year', year, typeof year)
										// console.log('lcrYear', lcrYear, typeof lcrYear)
										// console.log('annual:', annual, 'monthly:', monthly)
										if (year === lcrYear) {
											lcrListArr.push({ ...lcr })
											// console.log(typeOfFish, 'includes', fishType)
											// console.log('annual:', annual, 'monthly:', monthly)
											// console.log(year, '===', lcrYear)
										}
										// 	// console.log('annual')
									} else {
										// console.log(typeOfFish, 'includes', fishType)
										// console.log('annual:', annual, 'monthly:', monthly)
										// if (year === lcrYear) {
										// 	console.log(typeOfFish, 'includes', fishType)
										// 	console.log('annual:', annual, 'monthly:', monthly)
										// 	console.log(year, '===', lcrYear)
										// 	console.log('month:', month, 'lcrMonth:', lcrMonth)

										// 	// if (month === lcrMonth) {
										// 	// 	console.log(month, '===', lcrMonth)
										// 	// }
										// }
										if (month === lcrMonth && year === lcrYear) {
											lcrListArr.push({ ...lcr })
											// console.log(month, '===', lcrMonth, '&&', year, '===', lcrYear)
										}
										// 	// console.log('monthly')
									}
								}
							})

							lcrListArr.sort((a, b) => (parseFloat(a.requiredInfo.fishWeight) > parseFloat(b.requiredInfo.fishWeight) ? -1 : 1))

							// console.log('lcrListArr', lcrListArr)

							setLCRData(lcrListArr)
							// setLCRData(lcrs)
						})
					}
				} catch (e) {
					console.log('this is an error', e)
				}
			})()

			return () => {
				active = false
			}
		}, [annual, monthly, fishType, month, year])
	)

	// useEffect(() => {
	// 	const lcrListArr = []
	// 	lcrList.map((lcr, index) => {
	// 		console.log('lcr', lcr)

	// 		const { postedAt } = lcr
	// 		const { createdAt } = lcr.requiredInfo
	// 		const createdDate = createdAt ? createdAt.toDate() : postedAt.toDate()
	// 		const typeOfFish = lcr.requiredInfo.fishType
	// 		const month = date.getMonth()
	// 		const lcrMonth = createdDate.getMonth()
	// 		const year = date.getFullYear()
	// 		const lcrYear = createdDate.getFullYear()

	// 		if (typeOfFish.includes(fishType)) {
	// 			if (annual && !monthly) {
	// 				if (year === lcrYear) {
	// 					lcrListArr.push({ ...lcr })
	// 				}
	// 			} else if (!annual && monthly) {
	// 				if (month === lcrMonth && year === lcrYear) {
	// 					lcrListArr.push({ ...lcr })
	// 				}
	// 			}
	// 		}
	// 	})

	// 	lcrListArr.sort((a, b) => (parseFloat(a.requiredInfo.fishWeight) > parseFloat(b.requiredInfo.fishWeight) ? -1 : 1))
	// 	setLCRData(lcrListArr)
	// }, [lcrList, fishType, annual, monthly, date])

	const toggleAnnual = () => {
		setAnnual(true)
		setMonthly(false)
		setShowPicker(true)
	}

	const toggleMonthly = () => {
		setAnnual(false)
		setMonthly(true)
		setShowPicker(true)
	}

	const onValueChange = useCallback(
		(event, newDate) => {
			const selectedDate = newDate || date

			setShowPicker(false)
			setDate(selectedDate)
		},
		[date, setShowPicker]
	)

	const renderImage = img => {
		switch (img) {
			case 0:
				return (
					<View style={styles.scrollImageCtn}>
						<Image style={styles.imageRender} source={require('../../../../media/images/leaderboardImages/BluemarlinFish.png')} />
					</View>
				)
			case 1:
				return (
					<View style={styles.scrollImageCtn}>
						<Image style={styles.imageRender} source={require('../../../../media/images/leaderboardImages/StripedMarlinFish.png')} />
					</View>
				)
			case 2:
				return (
					<View style={styles.scrollImageCtn}>
						<Image style={styles.imageRender} source={require('../../../../media/images/leaderboardImages/SPEARFISH.png')} />
					</View>
				)
			case 3:
				return (
					<View style={styles.scrollImageCtn}>
						<Image style={styles.imageRender} source={require('../../../../media/images/leaderboardImages/AhiFish.png')} />
					</View>
				)
			case 4:
				return (
					<View style={styles.scrollImageCtn}>
						<Image style={styles.imageRender} source={require('../../../../media/images/leaderboardImages/MahiFish.png')} />
					</View>
				)
			case 5:
				return (
					<View style={styles.scrollImageCtn}>
						<Image style={styles.imageRender} source={require('../../../../media/images/leaderboardImages/OnoFish.png')} />
					</View>
				)
			case 6:
				return (
					<View style={styles.scrollImageCtn}>
						<Image style={styles.imageRender} source={require('../../../../media/images/leaderboardImages/AkuFish.png')} />
					</View>
				)
			case 7:
				return (
					<View style={styles.scrollImageCtn}>
						<Image style={styles.imageRender} source={require('../../../../media/images/leaderboardImages/UluaFish.png')} />
					</View>
				)
			case 8:
				return (
					<View style={styles.scrollImageCtn}>
						<Image style={styles.imageRender} source={require('../../../../media/images/leaderboardImages/omilu.png')} />
					</View>
				)
			case 9:
				return (
					<View style={styles.scrollImageCtn}>
						<Image style={styles.imageRender} source={require('../../../../media/images/leaderboardImages/OnagaFish.png')} />
					</View>
				)
			case 10:
				return (
					<View style={styles.scrollImageCtn}>
						<Image style={styles.imageRender} source={require('../../../../media/images/leaderboardImages/OpakapakaFish.png')} />
					</View>
				)
			case 11:
				return (
					<View style={styles.scrollImageCtn}>
						<Image style={styles.imageRender} source={require('../../../../media/images/leaderboardImages/EhuFish.png')} />
					</View>
				)
			case 12:
				return (
					<View style={styles.scrollImageCtn}>
						<Image style={styles.imageRender} source={require('../../../../media/images/leaderboardImages/UkuFish.png')} />
					</View>
				)
			case 13:
				return (
					<View style={styles.scrollImageCtn}>
						<Image style={styles.imageRender} source={require('../../../../media/images/leaderboardImages/OioFish.png')} />
					</View>
				)
			case 14:
				return (
					<View style={styles.scrollImageCtn}>
						<Image style={styles.imageRender} source={require('../../../../media/images/leaderboardImages/MenpachiFish.png')} />
					</View>
				)
			case 15:
				return (
					<View style={styles.scrollImageCtn}>
						<Image style={styles.imageRender} source={require('../../../../media/images/leaderboardImages/NoFish.png')} />
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

	return (
		<View style={{ height: windowHeight, backgroundColor: '#fff' }}>
			<View style={styles.content}>
				{/* TOP THIRD */}
				<View>
					<Carousel
						style={{ alignContent: 'center', borderWidth: 1, borderColor: 'blue' }}
						ref={c => {
							setCarousel(c)
						}}
						data={fishData}
						renderItem={data => renderContent(data)}
						sliderWidth={windowWidth}
						itemWidth={windowWidth * 0.65}
						autoplay={false}
						loop={true}
						onSnapToItem={(item, index) => setFishType(fishData[item].subtext)}
					/>
				</View>
				{/* MIDDLE THIRD */}
				<View>
					<View style={{ alignItems: 'center', backgroundColor: '#fff' }}>
						<View style={{ flexDirection: 'row' }}>
							<TouchableOpacity onPress={toggleAnnual} style={annual === true ? styles.clickedButton : styles.button}>
								<Text style={annual === true ? styles.clickedButtonText : styles.buttonText}>Annual</Text>
							</TouchableOpacity>
							<TouchableOpacity onPress={toggleMonthly} style={monthly === true ? styles.clickedButton : styles.button}>
								<Text style={monthly === true ? styles.clickedButtonText : styles.buttonText}>Monthly</Text>
							</TouchableOpacity>
						</View>
						<Text style={{ fontSize: 22, fontWeight: '600', marginBottom: 10 }}>
							{monthly === true ? moment(date).format(MONTHLY_OUTPUT_FORMAT) : moment(date).format(YEAR_OUTPUT_FORMAT)} Leaderboard
						</Text>
					</View>
				</View>
				{/* BOTTOM THIRD */}
				<View style={{ backgroundColor: '#2c385e', flex: 1, paddingBottom: 50 }}>
					{lcrData.length !== 0 && lcrList.length !== 0 ? (
						<FlatList
							data={lcrData}
							keyExtractor={item => item.id}
							renderItem={({ item, index }) => <LeaderboardCard post={item} rank={index + 1} />}
							style={{ marginTop: 5 }}
						/>
					) : lcrData.length === 0 && lcrList.length !== 0 ? (
						<View
							style={{
								width: '100%',
								height: '100%',
								justifyContent: 'center',
								alignItems: 'center',
							}}
						>
							<Text
								style={{
									fontSize: 24,
									color: '#fafafa',
									textAlign: 'center',
									marginBottom: windowHeight * 0.5,
									paddingHorizontal: windowWidth * 0.1,
								}}
							>
								No catches for this fish type and time period
							</Text>
						</View>
					) : (
						lcrData.length === 0 && lcrList.length === 0(<ActivityIndicator size='large' style={{ marginTop: windowHeight * 0.2 }} />)
					)}
					{showPicker ? (
						<View style={{ position: 'absolute', bottom: windowHeight * 0.05 }}>
							<MonthPicker
								onChange={onValueChange}
								value={date}
								minimumDate={new Date(2017, 0)}
								maximumDate={new Date()}
								locale='en'
								mode='full'
								autoTheme={false}
								okButton='Done'
							/>
						</View>
					) : null}
				</View>
			</View>
		</View>
	)
}

export default Leaderboard

const styles = StyleSheet.create({
	content: {
		height: '100%',
		position: 'relative',
		top: windowHeight * 0.05,
		flex: 1,
	},
	scrollImageCtn: {
		alignItems: 'center',
		height: 143,
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
	imageRender: {
		height: '60%',
		width: '100%',
	},
	button: {
		borderWidth: 1,
		borderColor: '#2c385e',
		borderRadius: 8,
		width: '40%',
		height: 40,
		marginHorizontal: 20,
		marginVertical: 10,
		alignItems: 'center',
		justifyContent: 'center',
	},
	clickedButton: {
		borderWidth: 1,
		borderColor: '#2c385e',
		backgroundColor: '#2c385e',
		borderRadius: 8,
		width: '40%',
		height: 40,
		marginHorizontal: 20,
		marginVertical: 10,
		alignItems: 'center',
		justifyContent: 'center',
	},
	buttonText: {
		color: '#2c385e',
		textDecorationLine: 'underline',
		textDecorationColor: '#000',
		fontWeight: 'bold',
	},
	clickedButtonText: {
		color: '#fff',
		textDecorationLine: 'underline',
		textDecorationColor: '#fff',
		fontWeight: 'bold',
	},
})
