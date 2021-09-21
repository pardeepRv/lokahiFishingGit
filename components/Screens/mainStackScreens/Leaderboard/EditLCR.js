import React, { useEffect, useState, useContext, useCallback } from 'react'
import {
	Image,
	SafeAreaView,
	Text,
	View,
	StyleSheet,
	ScrollView,
	Dimensions,
	TouchableOpacity,
	TextInput,
	Modal,
	ActivityIndicator,
} from 'react-native'
import firestore from '@react-native-firebase/firestore'
import loginLogo from '../../../../media/images/loginLogo.png'
import FastImage from 'react-native-fast-image'
import { launchImageLibrary, launchCamera } from 'react-native-image-picker'
import { BlurView } from '@react-native-community/blur'
import storage from '@react-native-firebase/storage'
import DateTimePicker from '@react-native-community/datetimepicker'
import { LCRContext } from '../../../../context/LCRContext/lcrProvider'
import CircularPicker from 'react-native-circular-picker'
import DropDownPicker from 'react-native-dropdown-picker'
import { useFocusEffect } from '@react-navigation/core'

const EditLCR = ({ route, navigation }) => {
	const { selectedLCR } = useContext(LCRContext)

	const lcrRef = firestore().collection('LCRPosts').doc(selectedLCR.id)
	// const [currentLCR, setCurrentLCR] = useState(selectedLCR)

	useFocusEffect(
		useCallback(() => {
			lcrRef.get().then(res => {
				// setCurrentLCR(res.data())
				const { postedAt } = res.data()
				const { photo, fishType, boatFishingType, effortHrs, fishingType, fishWeight, createdAt } = res.data().requiredInfo
				setFishTypeState(fishType)
				setPhotoState(photo)
				setDate(createdAt ? createdAt.toDate() : postedAt.toDate())
				setFishWeightState(fishWeight)
				setEffortHrsState(effortHrs)
				setFishingTypeState(fishingType)
				setBoatFishingTypeState(boatFishingType)
			})
		}, [])
	)

	// console.log('currentLCR', currentLCR)

	// const { postedAt } = currentLCR
	// const { photo, fishType, boatFishingType, effortHrs, fishingType, fishWeight, createdAt } = currentLCR.requiredInfo

	// const createdDate = createdAt ? createdAt.toDate() : postedAt.toDate()
	const sLCRReq = selectedLCR.requiredInfo
	console.log('~ sLCRReq', sLCRReq)
	// console.log('sLCRReq.createdAt', sLCRReq.createdAt)
	// console.log('sLCRReq.postedAt', sLCRReq.postedAt)

	const [fishTypeState, setFishTypeState] = useState(sLCRReq.fishType)
	const [photoState, setPhotoState] = useState(sLCRReq.photo)
	// const [date, setDate] = useState(sLCRReq.createdAt ? sLCRReq.createdAt.toDate() : sLCRReq.postedAt.toDate())
	const [date, setDate] = useState(new Date())
	const [fishWeightState, setFishWeightState] = useState(sLCRReq.fishWeight)
	const [effortHrsState, setEffortHrsState] = useState(sLCRReq.effortHrs)
	const [fishingTypeState, setFishingTypeState] = useState(sLCRReq.fishingType)
	const [boatFishingTypeState, setBoatFishingTypeState] = useState(sLCRReq.boatFishingType)

	const [transferred, setTransferred] = useState(0)
	const [photoIsUploading, setPhotoIsUploading] = useState(false)
	const [changedImg, setChangedImg] = useState(false)

	const [fishingTypeOpen, setFishingTypeOpen] = useState(false)
	const [boatFishingTypeOpen, setBoatFishingTypeOpen] = useState(false)
	const [fishingTypeItems, setFishingTypeItems] = useState([
		{ label: 'Boat Fishing', value: 'Boat Fishing' },
		{ label: 'Shoreline Fishing', value: 'Shoreline Fishing' },
	])
	const [boatFishingTypeItems, setBoatFishingTypeItems] = useState([
		{ label: 'Offshore Fishing', value: 'Offshore Fishing' },
		{ label: 'Bottom Fishing', value: 'Bottom Fishing' },
	])
	const [defaultFishingTypeItems, setDefaultFishingTypeItems] = useState([
		{ label: 'Offshore Fishing', value: 'Offshore Fishing' },
		{ label: 'Bottom Fishing', value: 'Bottom Fishing' },
		{ label: 'Whipping', value: 'Whipping' },
		{ label: 'Baitcasting', value: 'Baitcasting' },
		{ label: 'Slide Bait', value: 'Slide Bait' },
	])

	const [shorelineFishingTypeItems, setShorelineFishingTypeItems] = useState([
		{ label: 'Whipping', value: 'Whipping' },
		{ label: 'Baitcasting', value: 'Baitcasting' },
		{ label: 'Slide Bait', value: 'Slide Bait' },
	])

	const onSubmit = () => {
		try {
			if (changedImg) {
				setPhotoIsUploading(true)
				updateLCRImg(photoState)
			} else {
				updateLCRInfo()
				alert('Catch report updated!')
				navigation.navigate('SingleLCR')
			}
		} catch (e) {
			console.error(e)
		}
	}

	const updateLCRInfo = () => {
		lcrRef.update({
			requiredInfo: {
				createdAt: date,
				fishingType: fishingTypeState,
				boatFishingType: boatFishingTypeState,
				photo: photoState,
				fishType: fishTypeState,
				fishWeight: fishWeightState,
				effortHrs: effortHrsState,
			},
		})
	}

	const updateLCRImg = urlSource => {
		const filename = urlSource.substring(urlSource.lastIndexOf('/') + 1)
		console.log('~ filename', filename)
		const storageRef = storage().ref(`LCRs/${filename}`)
		console.log('~ storageRef', storageRef)
		const task = storageRef.putFile(urlSource)
		setTransferred(0)
		task.on(
			'state_changed',
			snapshot => {
				setTransferred(Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100)
				console.log('transferred', transferred)
			},
			error => {
				console.log(error)
			}
		)
		task
			.then(() => {
				storageRef
					.getDownloadURL()
					.then(url => {
						console.log('~ url', url)
						setPhotoState(url)
						lcrRef
							.update({
								requiredInfo: {
									photo: url,
									createdAt: date,
									fishingType: fishingTypeState,
									boatFishingType: boatFishingTypeState,
									fishType: fishTypeState,
									fishWeight: fishWeightState,
									effortHrs: effortHrsState,
								},
							})
							.then(() => {
								setPhotoIsUploading(false)
								alert('Catch report updated!')
								navigation.navigate('SingleLCR')
							})
					})
					.catch(error => {
						console.log('Error getting document:', error)
					})
			})
			.catch(e => console.error(e))
	}

	const selectImage = () => {
		const options = {
			noData: true,
		}
		launchImageLibrary(options, async response => {
			if (response.didCancel) {
				console.log('User cancelled image picker')
			} else if (response.error) {
				console.log('ImagePicker Error: ', response.error)
			} else if (response.customButton) {
				console.log('User tapped custom button: ', response.customButton)
			} else {
				const source = response.assets[0].uri
				console.log('selectImage -> source', source)
				setPhotoState(source)
				setChangedImg(true)
			}
		})
	}

	const onChangeDate = (event, selectedDate) => {
		setDate(selectedDate)
	}

	const handleEffortChange = v => setEffortHrsState((v * 0.24).toFixed(0))

	return (
		<SafeAreaView style={styles.EditLCR}>
			<TouchableOpacity onPress={() => selectImage()}>
				{photoState?.includes('.jpg') ? (
					<FastImage style={styles.lcrPic} source={{ uri: photoState }} />
				) : (
					<View style={styles.logoView}>
						<Image source={loginLogo} style={styles.logo} />
					</View>
				)}
			</TouchableOpacity>
			<Text style={{ paddingTop: 5, marginBottom: 10, opacity: 0.6 }}>Tap photo to change</Text>
			<ScrollView contentContainerStyle={styles.lcrInfo}>
				<Text style={[styles.label, { marginTop: 0 }]}>Date & Time</Text>
				<View>
					<DateTimePicker
						testID='dateTimePicker'
						value={date}
						mode={'date'}
						display='spinner'
						onChange={onChangeDate}
						style={{ height: windowHeight * 0.2, marginVertical: -10, width: windowWidth * 0.9 }}
					/>
					<DateTimePicker
						testID='dateTimePicker'
						value={date}
						mode={'time'}
						display='spinner'
						onChange={onChangeDate}
						style={{ height: windowHeight * 0.2, marginTop: -10, marginBottom: -20 }}
					/>
				</View>

				<Text style={styles.label}>Fish Type</Text>
				<TextInput
					style={styles.info}
					value={fishTypeState}
					autoCorrect={false}
					autoCapitalize='words'
					returnKeyType='done'
					onChangeText={text => setFishTypeState(text)}
				/>

				<Text style={styles.label}>Fish Weight</Text>
				<TextInput
					style={styles.info}
					value={fishWeightState}
					keyboardType='decimal-pad'
					returnKeyType='done'
					onChangeText={text => setFishWeightState(text)}
				/>

				<View style={styles.effortTitle}>
					<Text style={styles.label}>Effort</Text>
					<Text style={styles.effortSubtext}>(fishing time only, not travel time)</Text>
				</View>
				<CircularPicker
					defaultPos={effortHrsState / 0.24}
					size={270}
					strokeWidth={40}
					steps={[4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 68, 72, 76, 80, 84, 88, 92, 96, 100]}
					gradients={{
						0: ['#2c385e', '#2c385e'],
						25: ['rgb(255, 204, 0)', 'rgb(255, 214, 10)'],
						50: ['rgb(52, 199, 89)', 'rgb(48, 209, 88)'],
						75: ['rgb(0, 122, 255)', 'rgb(10, 132, 255)'],
					}}
					onChange={handleEffortChange}
				>
					<Text style={{ textAlign: 'center', fontSize: 24, fontWeight: '600', marginBottom: 8 }}>{effortHrsState} hr(s)</Text>
				</CircularPicker>

				<Text style={styles.label}>Fishing Type</Text>
				<View>
					<DropDownPicker
						open={fishingTypeOpen}
						value={fishingTypeState}
						items={fishingTypeItems}
						setOpen={setFishingTypeOpen}
						setValue={setFishingTypeState}
						setItems={setFishingTypeItems}
						containerStyle={{ width: windowWidth * 0.9 }}
						zIndex={1000}
						dropDownDirection={'TOP'}
					/>
				</View>
				<Text style={styles.label}>Boat Fishing Type</Text>
				<View>
					<DropDownPicker
						open={boatFishingTypeOpen}
						value={boatFishingTypeState}
						items={
							fishingTypeState === 'Boat Fishing'
								? boatFishingTypeItems
								: fishingTypeState === 'Shoreline Fishing'
								? shorelineFishingTypeItems
								: defaultFishingTypeItems
						}
						setOpen={setBoatFishingTypeOpen}
						setValue={setBoatFishingTypeState}
						setItems={
							fishingTypeState === 'Boat Fishing'
								? setBoatFishingTypeItems
								: fishingTypeState === 'Shoreline Fishing'
								? setShorelineFishingTypeItems
								: setDefaultFishingTypeItems
						}
						style={{ width: windowWidth * 0.9 }}
						containerStyle={{ width: windowWidth * 0.9 }}
						zIndex={1000}
						dropDownDirection={'TOP'}
					/>
				</View>

				<TouchableOpacity style={styles.saveBtn} onPress={() => onSubmit()}>
					<Text style={styles.saveText}>Save</Text>
				</TouchableOpacity>
			</ScrollView>
			{photoIsUploading ? <BlurView style={styles.blurView} blurType='light' blurAmount={10} reducedTransparencyFallbackColor='white' /> : null}
			<Modal animationType='slide' transparent={true} visible={photoIsUploading}>
				<View style={styles.centeredView}>
					<View style={styles.modalView}>
						<ActivityIndicator size='large' />
						<Text style={{ fontSize: 18, fontWeight: '600', paddingTop: 20 }}>Uploading photo...</Text>
						<Text style={{ fontSize: 16, fontWeight: '400', paddingTop: 10 }}>{transferred}% Uploaded</Text>
					</View>
				</View>
			</Modal>
		</SafeAreaView>
	)
}

export default EditLCR

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

const styles = StyleSheet.create({
	EditLCR: {
		position: 'relative',
		top: windowHeight * 0.108,
		width: windowWidth,
		height: windowHeight * (1 - 0.108),
		display: 'flex',
		alignItems: 'center',
		flex: 1,
	},
	picView: {
		width: '100%',
		height: windowHeight * 0.2,
		backgroundColor: '#2c385e',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-around',
	},
	title: {
		color: 'white',
		fontSize: 26,
		fontWeight: '700',
	},
	lcrPic: {
		height: windowHeight * 0.175,
		width: windowHeight * 0.175,
		borderRadius: 100,
	},
	lcrInfo: {
		display: 'flex',
		alignItems: 'center',
		width: windowWidth,
	},
	label: {
		fontWeight: '500',
		fontSize: 18,
		color: '#533655',
		shadowColor: '#bb4e54',
		shadowOffset: { width: 1.25, height: 1.25 },
		shadowOpacity: 0.75,
		shadowRadius: 0,
		marginVertical: 15,
	},
	info: {
		backgroundColor: 'lightgray',
		padding: 10,
		width: windowWidth * 0.6,
		fontWeight: '800',
		color: '#2c385e',
	},
	saveBtn: {
		marginTop: 35,
		borderWidth: 1.75,
		borderColor: 'black',
		paddingHorizontal: 30,
		paddingVertical: 2,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 10,
		marginBottom: 125,
	},
	saveText: {
		fontWeight: '800',
		fontSize: 16,
		color: '#533655',
		shadowColor: '#bb4e54',
		shadowOffset: { width: 2, height: 2 },
		shadowOpacity: 0.75,
		shadowRadius: 0,
	},
	logoView: {
		height: windowHeight * 0.2,
		width: windowHeight * 0.2,
		justifyContent: 'center',
		alignItems: 'center',
	},
	logo: {
		height: '100%',
		width: '100%',
		resizeMode: 'contain',
	},
	lcrPic: {
		height: windowHeight * 0.175,
		width: windowHeight * 0.175,
		borderColor: '#fff',
		borderWidth: 2,
		borderRadius: 7,
	},
	blurView: {
		position: 'absolute',
		top: 0,
		left: 0,
		bottom: 0,
		right: 0,
		zIndex: 1000,
	},
	centeredView: {
		width: windowWidth,
		height: windowHeight,
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 10,
		shadowColor: '#000',
		shadowOffset: {
			width: 10,
			height: 10,
		},
		shadowOpacity: 0.75,
		shadowRadius: 4,
	},
	modalView: {
		// width: windowWidth * 0.,
		// height: windowHeight * 0.6,
		padding: 20,
		backgroundColor: '#fafafa',
		borderRadius: 10,
		borderColor: 'black',
		borderWidth: 1,
		alignItems: 'center',
		elevation: 5,
	},
	section: {
		marginVertical: 10,
	},
	title: {
		fontWeight: '700',
		fontSize: 18,
		marginBottom: 10,
	},
	effortTitle: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: 10,
	},
	effortSubtext: {
		marginLeft: 5,
	},
})
