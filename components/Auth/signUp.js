import React, { useState, useContext } from 'react'
import {
	Text,
	TextInput,
	TouchableOpacity,
	StyleSheet,
	Dimensions,
	Image,
	View,
	SafeAreaView,
	ImageBackground,
	ScrollView,
	Alert,
	KeyboardAvoidingView,
} from 'react-native'
import { RadioButton, Button } from 'react-native-paper'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import { AuthContext } from '../../context/authProvider'
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions'
import { launchImageLibrary } from 'react-native-image-picker'
import storage from '@react-native-firebase/storage'
const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height
const SignUp = ({ navigation }) => {
	const [name, setName] = useState('')
	const [username, setUsername] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [passwordConfirm, setPasswordConfirm] = useState('')
	const [city, setCity] = useState('')
	const [island, setIsland] = useState('')
	const [CML, setCML] = useState('no')
	const [hearAbout, setHearAbout] = useState('')
	const { register } = useContext(AuthContext)
	const [image, setImage] = useState(null)
	const [uploading, setUploading] = useState(false)
	const [imageUploaded, setImageUploaded] = useState(false)
	const [transferred, setTransferred] = useState(0)
	const [getUrl, setGetUrl] = useState('')
	const [tShirt, setTShirt] = useState('M')
	const signUp = async url => {
		const userObj = {
			fullname: name,
			User_Name: username,
			User_Email: email,
			city: city,
			island: island,
			CML: CML,
			hearAbout,
			User_Image: url,
			User_JoinDT: firestore.FieldValue.serverTimestamp(),
			tShirt: tShirt,
		}
		username === ''
			? Alert.alert('Lokahi', 'Please provide your Username')
			: email === ''
			? Alert.alert('Lokahi', 'Please provide your Email Id')
			: password === ''
			? Alert.alert('Lokahi', 'Please provide Passsword')
			: password !== passwordConfirm
			? Alert.alert('Lokahi', 'Confirm password does not match. Please try again')
			: city === ''
			? Alert.alert('Lokahi', 'Please provide City name')
			: island === ''
			? Alert.alert('Lokahi', 'Please provide Island name')
			: await register(email, password, userObj)
	}
	const [launchPath, setLaunchPath] = useState()
	const selectPhoto = async () => {
		launchImageLibrary(
			{
				mediaType: 'photo',
				includeBase64: false,
				maxHeight: 200,
				maxWidth: 200,
			},
			response => {
				setLaunchPath(response.assets[0].uri)
				setImageUploaded(true)
			}
		)
		// console.log('hi', launchPath)
	}
	// console.log('WHAT IS THIS LAUNCH PATH', launchPath)
	const uploadImage = async () => {
		setUploading(true)
		setTransferred(0)
		const filename = launchPath.substring(launchPath.lastIndexOf('/') + 1)
		const task = storage().ref(`profile_pics/${filename}`).putFile(launchPath)
		// set progress state
		task.on(
			'state_changed',
			snapshot => {
				setTransferred(Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000)
				// const url = storage()
				// 	.ref(`profile_pics/${filename}`)
				// 	.getDownloadURL()
				// 	.then(link => {
				// 		signUp(link);
				// 	});
			},
			error => {
				console.log(error)
			}
		)
		try {
			await task
			await storage()
				.ref(`profile_pics/${filename}`)
				.getDownloadURL()
				.then(link => {
					// console.log('This is link', link)
					signUp(link)
				})
		} catch (e) {
			console.error(e)
		}
	}
	return (
		<ImageBackground source={require('../../media/images/signup_bg.png')} style={styles.image}>
			<KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{}}>
				<SafeAreaView style={{ alignItems: 'center' }}>
					<ScrollView contentContainerStyle={styles.contentContainer}>
						<View
							style={{
								alignItems: 'center',
								justifyContent: 'center',
								// height: windowHeight * 0.4,
								marginBottom: 20,
							}}
						>
							{!imageUploaded ? (
								<TouchableOpacity style={styles.circle} onPress={() => selectPhoto()}>
									<Text style={{ color: 'black' }}>Upload Profile Picture</Text>
								</TouchableOpacity>
							) : null}
							{imageUploaded ? (
								<View
									style={{
										alignItems: 'center',
										justifyContent: 'center',
										// height: windowHeight * 0.4,
										marginBottom: 20,
									}}
								>
									<Image source={{ uri: launchPath }} resizeMode='contain' style={{ width: 200, height: 200 }} />
								</View>
							) : null}
						</View>
						<View
							style={{
								alignContent: 'center',
								// height: windowHeight * 0.7,
								justifyContent: 'flex-end',
								paddingBottom: 50,
								// width: windowWidth * 0.9,
							}}
						>
							<Text style={styles.inputTitle}>Username</Text>
							<TextInput
								style={styles.input}
								onChangeText={setUsername}
								value={username}
								placeholder='Enter Username here...'
								placeholderTextColor='lightgray'
							/>
							<Text style={styles.inputTitle}>Full Name</Text>
							<TextInput
								style={styles.input}
								onChangeText={setName}
								value={name}
								placeholder='Enter full name here...'
								placeholderTextColor='lightgray'
							/>
							<Text style={styles.inputTitle}>Email Address</Text>
							<TextInput
								style={styles.input}
								onChangeText={setEmail}
								value={email}
								autoCapitalize='none'
								placeholder='Enter email id here...'
								placeholderTextColor='lightgray'
							/>
							<Text style={styles.inputTitle}>Password</Text>
							<TextInput
								style={styles.input}
								onChangeText={setPasswordConfirm}
								value={passwordConfirm}
								secureTextEntry={true}
								placeholder='Enter password here...'
								placeholderTextColor='lightgray'
							/>
							<Text style={styles.inputTitle}>Confirm Password</Text>
							<TextInput
								style={styles.input}
								onChangeText={setPassword}
								value={password}
								secureTextEntry={true}
								placeholder='Re-enter password here...'
								placeholderTextColor='lightgray'
							/>
							<Text style={styles.inputTitle}>CML Holder</Text>
							<View style={[styles.input, { flexDirection: 'row', justifyContent: 'center' }]}>
								<View style={{ flexDirection: 'row', alignItems: 'center' }}>
									<RadioButton
										value='yes'
										status={CML === 'yes' ? 'checked' : 'unchecked'}
										onPress={() => setCML('yes')}
										color='#fff'
										uncheckedColor='#fff'
									/>
									<Text style={{ color: '#fff' }}>Yes</Text>
								</View>
								<View style={{ flexDirection: 'row', alignItems: 'center' }}>
									<RadioButton
										value='no'
										status={CML === 'no' ? 'checked' : 'unchecked'}
										onPress={() => setCML('no')}
										color='#fff'
										uncheckedColor='#fff'
									/>
									<Text style={{ color: '#fff' }}>No</Text>
								</View>
							</View>
							<Text style={styles.inputTitle}>City</Text>
							<TextInput
								style={styles.input}
								onChangeText={setCity}
								value={city}
								secureTextEntry={false}
								placeholder='Enter your city here...'
								placeholderTextColor='lightgray'
							/>
							<Text style={styles.inputTitle}>Island</Text>
							<TextInput
								style={styles.input}
								onChangeText={setIsland}
								value={island}
								secureTextEntry={false}
								placeholder='Enter Island name here...'
								placeholderTextColor='lightgray'
							/>
							<Text style={styles.inputTitle}>T-Shirt Size:</Text>
							<View style={styles.radioView}>
								<View style={styles.radios}>
									<View style={styles.radioBtnView}>
										<TouchableOpacity
											style={styles.radioBtn}
											onPress={() => {
												setTShirt('XXL')
											}}
										>
											{tShirt === 'XXL' ? <View style={styles.innerRadioBtn} /> : null}
										</TouchableOpacity>
										<Text style={styles.radioText}>XXL</Text>
									</View>
									<View style={styles.radioBtnView}>
										<TouchableOpacity
											style={styles.radioBtn}
											onPress={() => {
												setTShirt('XL')
											}}
										>
											{tShirt === 'XL' ? <View style={styles.innerRadioBtn} /> : null}
										</TouchableOpacity>
										<Text style={styles.radioText}>XL</Text>
									</View>
									<View style={styles.radioBtnView}>
										<TouchableOpacity
											style={styles.radioBtn}
											onPress={() => {
												setTShirt('L')
											}}
										>
											{tShirt === 'L' ? <View style={styles.innerRadioBtn} /> : null}
										</TouchableOpacity>
										<Text style={styles.radioText}>L</Text>
									</View>
									<View style={styles.radioBtnView}>
										<TouchableOpacity
											style={styles.radioBtn}
											onPress={() => {
												setTShirt('M')
											}}
										>
											{tShirt === 'M' ? <View style={styles.innerRadioBtn} /> : null}
										</TouchableOpacity>
										<Text style={styles.radioText}>M</Text>
									</View>
									<View style={styles.radioBtnView}>
										<TouchableOpacity
											style={styles.radioBtn}
											onPress={() => {
												setTShirt('S')
											}}
										>
											{tShirt === 'S' ? <View style={styles.innerRadioBtn} /> : null}
										</TouchableOpacity>
										<Text style={styles.radioText}>S</Text>
									</View>
								</View>
							</View>
							<Text style={styles.inputTitle}>How did you hear about Lokahi Fishing?</Text>
							<TextInput
								style={styles.input}
								onChangeText={setHearAbout}
								value={hearAbout}
								secureTextEntry={false}
								placeholder='How did you hear about Lokahi Fishing...'
								placeholderTextColor='lightgray'
							/>
							<View style={{ alignItems: 'center', marginTop: 10 }}>
								<TouchableOpacity style={styles.button} onPress={() => uploadImage()}>
									<Text style={{ color: '#fff', fontWeight: 'bold' }}>Sign Up</Text>
								</TouchableOpacity>
							</View>
							<View
								style={{
									flexDirection: 'row',
									justifyContent: 'center',
									marginTop: 15,
								}}
							>
								<Text style={{ color: '#fff' }}>Already have an account? </Text>
								<TouchableOpacity onPress={() => navigation.navigate('Login')} style={{}}>
									<Text
										style={{
											color: '#fff',
											fontWeight: 'bold',
										}}
									>
										Sign In
									</Text>
								</TouchableOpacity>
							</View>
						</View>
					</ScrollView>
				</SafeAreaView>
			</KeyboardAvoidingView>
		</ImageBackground>
	)
}
export default SignUp
const styles = StyleSheet.create({
	input: {
		margin: 6,
		borderBottomWidth: 1,
		borderColor: 'lightgray',
		height: 40,
		color: 'lightgray',
		textAlign: 'center',
		width: windowWidth * 1.0,
	},
	button: {
		height: 45,
		borderRadius: 30,
		backgroundColor: 'lightblue',
		width: windowWidth * 0.9,
		justifyContent: 'center',
		alignItems: 'center',
		margin: 12,
		marginTop: 20,
	},
	inputTitle: {
		color: 'lightgray',
		textAlign: 'center',
		fontWeight: 'bold',
	},
	image: {
		flex: 1,
		resizeMode: 'cover',
		justifyContent: 'center',
		height: '100%',
	},
	contentContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		paddingBottom: 50,
		width: windowWidth * 1.0,
	},
	imageContainer: {
		marginTop: 5,
		marginBottom: 5,
		alignItems: 'center',
	},
	imageBox: {
		width: 100,
		height: 100,
	},
	circle: {
		width: 212,
		height: 212,
		borderRadius: 212 / 2,
		backgroundColor: 'white',
		justifyContent: 'center',
		alignItems: 'center',
		// marginTop: 30,
	},
	radioView: {
		flexDirection: 'row',
		justifyContent: 'center',
		width: windowWidth,
		borderBottomWidth: 1,
		borderColor: 'lightgray',
		height: 40,
		color: 'lightgray',
		margin: 6,
	},
	radios: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		color: 'lightgray',
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
		borderColor: 'lightgray',
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
		backgroundColor: 'lightgray',
	},
	radioText: {
		color: 'lightgray',
		fontWeight: '700',
	},
})
