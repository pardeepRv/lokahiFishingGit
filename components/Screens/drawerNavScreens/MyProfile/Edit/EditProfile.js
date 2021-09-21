import React, { useEffect, useState, useContext } from 'react'
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
import { AuthContext } from '../../../../../context/authProvider'
import firestore from '@react-native-firebase/firestore'
import loginLogo from '../../../../../media/images/loginLogo.png'
import FastImage from 'react-native-fast-image'
import { launchImageLibrary, launchCamera } from 'react-native-image-picker'
import { BlurView } from '@react-native-community/blur'
import storage from '@react-native-firebase/storage'

const EditProfile = ({ route, navigation }) => {
	const { user } = useContext(AuthContext)
	const { CML, User_CellPhone, User_Email, User_Image, User_Name, city, fullname, island, tShirt } = user.data
	const userId = user ? user.user.uid : null

	const [cmlState, setCmlState] = useState(CML)
	const [phoneState, setPhoneState] = useState(User_CellPhone)
	const [emailState, setEmailState] = useState(User_Email)
	const [imgState, setImgState] = useState(User_Image)
	const [usernameState, setUsernameState] = useState(User_Name)
	const [cityState, setCityState] = useState(city)
	const [fullnameState, setFullnameState] = useState(fullname)
	const [islandState, setIslandState] = useState(island)
	const [tShirtState, setTShirtState] = useState(tShirt)
	const [transferred, setTransferred] = useState(0)
	const [photoIsUploading, setPhotoIsUploading] = useState(false)
	const [changedImg, setChangedImg] = useState(false)

	const userRef = firestore().collection('Users').doc(userId)

	const onSubmit = () => {
		try {
			if (changedImg) {
				setPhotoIsUploading(true)
				updateUserInfo()
				updateUserImg(imgState)
			} else {
				updateUserInfo()
				alert('User information updated!')
				navigation.navigate('MyProfile')
			}
		} catch (e) {
			console.error(e)
		}
	}

	const updateUserInfo = () => {
		userRef.update({
			CML: cmlState,
			User_CellPhone: phoneState,
			User_Email: emailState,
			User_Name: usernameState,
			city: cityState,
			fullname: fullnameState,
			island: islandState,
			tShirt: tShirtState,
		})
	}

	const updateUserImg = urlSource => {
		const filename = urlSource.substring(urlSource.lastIndexOf('/') + 1)
		const storageRef = storage().ref(`profile_pics/${filename}`)
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
						userRef
							.update({
								User_Image: url,
							})
							.then(() => {
								setPhotoIsUploading(false)
								alert('User information updated!')
								navigation.navigate('MyProfile')
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
				setImgState(source)
				setChangedImg(true)
			}
		})
	}

	return (
		<SafeAreaView style={styles.EditProfile}>
			<TouchableOpacity onPress={() => selectImage()}>
				{imgState.includes('.jpg') ? (
					<FastImage style={styles.profilePic} source={{ uri: imgState }} />
				) : (
					<View style={styles.logoView}>
						<Image source={loginLogo} style={styles.logo} />
					</View>
				)}
			</TouchableOpacity>
			<Text style={{ paddingTop: 5, marginBottom: 10, opacity: 0.6 }}>Tap photo to change</Text>
			<ScrollView contentContainerStyle={styles.profileInfo}>
				<Text style={[styles.label, { marginTop: 0 }]}>Full Name</Text>
				<TextInput
					style={styles.info}
					value={fullnameState}
					autoCapitalize='words'
					returnKeyType='done'
					onChangeText={text => setFullnameState(text)}
				/>

				<Text style={styles.label}>Username</Text>
				<TextInput style={styles.info} value={usernameState} returnKeyType='done' onChangeText={text => setUsernameState(text)} />

				<Text style={styles.label}>Email Address</Text>
				<TextInput
					style={styles.info}
					value={emailState}
					autoCapitalize='none'
					keyboardType='email-address'
					returnKeyType='done'
					onChangeText={text => setEmailState(text)}
				/>

				<Text style={styles.label}>Contact Number</Text>
				<TextInput
					style={styles.info}
					value={phoneState}
					keyboardType='number-pad'
					returnKeyType='done'
					onChangeText={text => setPhoneState(text)}
				/>

				<Text style={styles.label}>City Name</Text>
				<TextInput style={styles.info} value={cityState} autoCapitalize='words' returnKeyType='done' onChangeText={text => setCityState(text)} />

				<Text style={styles.label}>Island Name</Text>
				<TextInput
					style={styles.info}
					value={islandState}
					autoCapitalize='words'
					returnKeyType='done'
					onChangeText={text => setIslandState(text)}
				/>

				<Text style={styles.label}>T-Shirt Size:</Text>
				<View style={styles.radioView}>
					<View style={styles.radios}>
						<View style={styles.radioBtnView}>
							<TouchableOpacity
								style={styles.radioBtn}
								onPress={() => {
									setTShirtState('XXL')
								}}
							>
								{tShirtState === 'XXL' ? <View style={styles.innerRadioBtn} /> : null}
							</TouchableOpacity>
							<Text>XXL</Text>
						</View>
						<View style={styles.radioBtnView}>
							<TouchableOpacity
								style={styles.radioBtn}
								onPress={() => {
									setTShirtState('XL')
								}}
							>
								{tShirtState === 'XL' ? <View style={styles.innerRadioBtn} /> : null}
							</TouchableOpacity>
							<Text>XL</Text>
						</View>
						<View style={styles.radioBtnView}>
							<TouchableOpacity
								style={styles.radioBtn}
								onPress={() => {
									setTShirtState('L')
								}}
							>
								{tShirtState === 'L' ? <View style={styles.innerRadioBtn} /> : null}
							</TouchableOpacity>
							<Text>L</Text>
						</View>
						<View style={styles.radioBtnView}>
							<TouchableOpacity
								style={styles.radioBtn}
								onPress={() => {
									setTShirtState('M')
								}}
							>
								{tShirtState === 'M' ? <View style={styles.innerRadioBtn} /> : null}
							</TouchableOpacity>
							<Text>M</Text>
						</View>
						<View style={styles.radioBtnView}>
							<TouchableOpacity
								style={styles.radioBtn}
								onPress={() => {
									setTShirtState('S')
								}}
							>
								{tShirtState === 'S' ? <View style={styles.innerRadioBtn} /> : null}
							</TouchableOpacity>
							<Text>S</Text>
						</View>
					</View>
				</View>

				<Text style={styles.label}>CML Holder</Text>
				<View style={styles.radioView}>
					<View style={styles.radios}>
						<View style={styles.radioBtnView}>
							<TouchableOpacity
								style={styles.radioBtn}
								onPress={() => {
									setCmlState('Yes')
								}}
							>
								{cmlState === 'Yes' ? <View style={styles.innerRadioBtn} /> : null}
							</TouchableOpacity>
							<Text>Yes</Text>
						</View>
						<View style={styles.radioBtnView}>
							<TouchableOpacity
								style={styles.radioBtn}
								onPress={() => {
									setCmlState('No')
								}}
							>
								{cmlState === 'No' ? <View style={styles.innerRadioBtn} /> : null}
							</TouchableOpacity>
							<Text>No</Text>
						</View>
					</View>
					<View style={styles.radioDivider} />
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

export default EditProfile

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

const styles = StyleSheet.create({
	EditProfile: {
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
	profilePic: {
		height: windowHeight * 0.175,
		width: windowHeight * 0.175,
		borderRadius: 100,
	},
	profileInfo: {
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
	radioView: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		width: windowWidth * 0.5,
	},
	radios: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	radioBtnView: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		marginHorizontal: 10,
	},
	radioBtn: {
		width: 20,
		height: 20,
		borderRadius: 100,
		padding: 1,
		borderColor: 'black',
		borderWidth: 2,
		marginRight: 10,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	innerRadioBtn: {
		width: 10,
		height: 10,
		borderRadius: 100,
		backgroundColor: 'black',
	},
	radioDivider: {
		width: '100%',
		height: 1.75,
		backgroundColor: 'black',
		marginTop: 15,
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
	profilePic: {
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
})
