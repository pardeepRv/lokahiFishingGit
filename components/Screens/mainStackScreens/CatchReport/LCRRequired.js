import React, { useState, useCallback, useEffect, useContext } from 'react'
import {
	SafeAreaView,
	TextInput,
	Text,
	Image,
	TouchableOpacity,
	View,
	StyleSheet,
	Dimensions,
	ScrollView,
	Modal,
	ActivityIndicator,
} from 'react-native'
import Effort from './Effort'
import { launchImageLibrary, launchCamera } from 'react-native-image-picker'
import DateTimePicker from '@react-native-community/datetimepicker'
import moment from 'moment'
import { AuthContext } from '../../../../context/authProvider'
import firestore from '@react-native-firebase/firestore'
import storage from '@react-native-firebase/storage'
import auth from '@react-native-firebase/auth'
import { withFirebaseHOC } from '../../../../utils/index'
import { LCRContext } from '../../../../context/LCRContext/lcrProvider'
import { useNavigation } from '@react-navigation/native'
import { BlurView } from '@react-native-community/blur'

const LCRRequired = props => {
	const [weight, setWeight] = useState(0)
	const [date, setDate] = useState(new Date())
	const [image, setImage] = useState('')
	const [transferred, setTransferred] = useState(0)
	const { user, setUser } = useContext(AuthContext)
	const {
		effortHrs,
		setEffortHrs,
		LCRPostRequired,
		setLCRPostRequired,
		fishingType,
		boatFishingType,
		fishType,
		photoIsUploading,
		setPhotoIsUploading,
	} = useContext(LCRContext)
	const navigation = useNavigation()

	const onChange = (event, selectedDate) => {
		// const currentDate = selectedDate || date
		setDate(selectedDate)
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
				console.log(source)
				setImage(source)
				// setPhotoIsUploading(true)
			}
		})
	}

	const navigateLCROptional = () => {
		navigation.navigate('LCROptional')
	}

	const onSubmit = () => {
		try {
			setPhotoIsUploading(true)
			createLCR(image)
		} catch (e) {
			console.error(e)
		}
	}

	const createLCR = urlSource => {
		const filename = urlSource.substring(urlSource.lastIndexOf('/') + 1)
		const storageRef = storage().ref(`LCRs/${filename}`)
		const task = storageRef.putFile(urlSource)

		task.on(
			'state_changed',
			snapshot => {
				setTransferred(Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100)
			},
			error => {
				console.log(error)
			}
		)
		task
			.then(() => {
				let URL
				storageRef
					.getDownloadURL()
					.then(url => {
						setLCRPostRequired({
							photo: url,
							createdAt: firestore.Timestamp.fromDate(date),
							fishingType: fishingType,
							boatFishingType: boatFishingType,
							fishType: fishType,
							fishWeight: weight,
							effortHrs: effortHrs,
						})
						setPhotoIsUploading(false)
						navigateLCROptional()
					})
					.catch(error => {
						console.log('Error getting document:', error)
					})
			})
			.catch(e => console.error(e))
	}

	return (
		<View style={styles.bg} blurRadius={4}>
			<ScrollView style={styles.scrollView}>
				<View style={styles.section}>
					<Text style={styles.title}>Enter Fish Weight</Text>
					<TextInput
						style={styles.weightInput}
						onChangeText={setWeight}
						keyboardType='numeric'
						value={weight}
						placeholder='Enter fish weight here'
						placeholderTextColor='lightgray'
					/>
				</View>
				<View style={styles.section}>
					<Text style={styles.title}>Upload Image</Text>
					{!image ? (
						<View style={styles.imgView}>
							<TouchableOpacity onPress={() => selectImage()}>
								<Image source={require('../../../../media/images/catch-report-icons/uploadImage.png')} style={styles.img} />
							</TouchableOpacity>
						</View>
					) : null}
					{image ? (
						<View style={styles.imgView}>
							<Image source={{ uri: image }} resizeMode='contain' style={styles.img} />
						</View>
					) : null}
				</View>
				<View style={styles.section}>
					<View style={styles.effortTitle}>
						<Text style={[styles.title, { marginBottom: 0 }]}>Effort</Text>
						<Text style={styles.effortSubtext}>(fishing time only, not travel time)</Text>
					</View>
					<View style={styles.subsection}>
						<Effort />
					</View>
				</View>
				<View style={styles.section}>
					<Text style={styles.title}>Date & Time</Text>
					<View>
						<DateTimePicker
							testID='dateTimePicker'
							value={date}
							mode={'date'}
							display='spinner'
							onChange={onChange}
							style={{ height: windowHeight * 0.2, marginVertical: -10 }}
						/>
						<DateTimePicker
							testID='dateTimePicker'
							value={date}
							mode={'time'}
							display='spinner'
							onChange={onChange}
							style={{ height: windowHeight * 0.2, marginTop: -10, marginBottom: -20 }}
						/>
					</View>
				</View>
				<View style={[styles.section, { justifyContent: 'center', alignItems: 'center' }]}>
					<TouchableOpacity onPress={onSubmit} style={styles.confirmBtn}>
						<Text style={styles.confirmText}>Confirm</Text>
					</TouchableOpacity>
				</View>
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
		</View>
	)
}

export default withFirebaseHOC(LCRRequired)

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

const styles = StyleSheet.create({
	bg: {
		flex: 1,
		width: windowWidth,
		height: windowHeight,
		justifyContent: 'center',
		alignItems: 'center',
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
		padding: 20,
		backgroundColor: '#fafafa',
		borderRadius: 10,
		borderColor: 'black',
		borderWidth: 1,
		alignItems: 'center',
		elevation: 5,
	},
	blurView: {
		position: 'absolute',
		top: 0,
		left: 0,
		bottom: 0,
		right: 0,
	},
	scrollView: {
		width: windowWidth,
		paddingHorizontal: 20,
	},
	section: {
		marginVertical: 10,
	},
	title: {
		fontWeight: '700',
		fontSize: 18,
		marginBottom: 10,
	},
	weightInput: {
		borderWidth: 1,
		borderColor: 'lightgray',
		borderRadius: 7,
		padding: 5,
		fontSize: 16,
		color: '#000',
		fontWeight: '500',
	},
	imgView: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	img: {
		width: windowWidth * 0.4,
		height: windowHeight * 0.15,
		resizeMode: 'contain',
	},
	subsection: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	effortTitle: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 10,
	},
	effortSubtext: {
		marginLeft: 5,
	},
	confirmBtn: {
		backgroundColor: '#2c385e',
		borderRadius: 7,
		padding: 10,
		justifyContent: 'center',
		alignItems: 'center',
		width: '40%',
		marginTop: 10,
	},
	confirmText: {
		fontSize: 16,
		color: '#fafafa',
		fontWeight: '700',
		textDecorationLine: 'underline',
	},
})
