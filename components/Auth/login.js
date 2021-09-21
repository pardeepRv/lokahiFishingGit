import React, { useState, useContext, useEffect } from 'react'
import auth from '@react-native-firebase/auth'
import {
	View,
	Text,
	TextInput,
	Dimensions,
	StyleSheet,
	TouchableOpacity,
	ImageBackground,
	SafeAreaView,
	Image,
	Modal,
	TouchableWithoutFeedback,
	KeyboardAvoidingView,
	Animated,
	Keyboard,
} from 'react-native'
import { AuthContext } from '../../context/authProvider'
import { BlurView } from '@react-native-community/blur'
import CrossIcon from 'react-native-vector-icons/Entypo'

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

const window = Dimensions.get('window')
const IMAGE_HEIGHT = window.width / 2
const IMAGE_HEIGHT_SMALL = window.width / 3

const Login = ({ navigation }) => {
	const [email, setEmail] = useState('apiexperts@rvtechnologies.com')
	const [password, setPassword] = useState('Lokahi123')
	const { user, mainUser, setMainUser, login } = useContext(AuthContext)
	const [showModal, setShowModal] = useState(false)
	const imageHeight = new Animated.Value(IMAGE_HEIGHT)
	const handleReset = () => {
		setShowModal(false)
		navigation.navigate('ResetPassword')
	}

	useEffect(() => {
		const keyboardWillShowSub = Keyboard.addListener('keyboardWillShow', keyboardWillShow)
		const keyboardWillHideSub = Keyboard.addListener('keyboardWillHide', keyboardWillHide)
	})
	const keyboardWillShow = event => {
		Animated.timing(imageHeight, {
			duration: event.duration,
			toValue: IMAGE_HEIGHT_SMALL,
		}).start()
	}

	const keyboardWillHide = event => {
		Animated.timing(imageHeight, {
			duration: event.duration,
			toValue: IMAGE_HEIGHT,
		}).start()
	}

	return (
		<ImageBackground source={require('../../media/images/signup_bg.png')} style={styles.image}>
			<KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{}}>
				<SafeAreaView style={{ alignItems: 'center' }}>
					<View
						style={{
							alignItems: 'center',
							// height: windowHeight * 0.20,
							// justifyContent: 'flex-end',
							// paddingBottom: 50,
						}}
					>
						<View
							style={{
								Top: 10,
							}}
						>
							<Animated.Image source={require('../../media/images/loginLogo.png')} style={[styles.logo, { height: imageHeight }]} />
							{/* <Image source={require('../../media/images/loginLogo.png')} style={{marginBottom:20}}/> */}
						</View>
						<TextInput
							style={styles.input}
							onChangeText={setEmail}
							value={email}
							autoCapitalize='none'
							placeholder='Email Id'
							placeholderTextColor='lightgray'
							onFocus={() => setShowModal(true)}
						/>
						<TextInput
							style={styles.input1}
							onChangeText={setPassword}
							value={password}
							secureTextEntry={true}
							placeholder='Password'
							placeholderTextColor='lightgray'
						/>
						<View style={{ alignItems: 'center' }}>
							<TouchableOpacity
								style={styles.button}
								onPress={() => {
									login(email, password)
								}}
							>
								<Text style={{ color: '#fff', fontWeight: 'bold', textDecorationLine: 'underline' }}>Sign In</Text>
							</TouchableOpacity>
						</View>

						<View style={{ flexDirection: 'row', justifyContent: 'center' }}>
							<Text style={{ color: '#fff' }}>Don't have an account? </Text>
							<TouchableOpacity onPress={() => navigation.navigate('SignUp')} style={{}}>
								<Text style={{ color: '#fff', fontWeight: 'bold' }}>Sign up</Text>
							</TouchableOpacity>
						</View>
						<View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 15 }}>
							<TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')} style={{ color: 'blue' }}>
								<Text style={{ color: '#fff', fontWeight: 'bold' }}>Forgot Password?</Text>
							</TouchableOpacity>
						</View>
					</View>
				</SafeAreaView>
			</KeyboardAvoidingView>
			{showModal ? <BlurView style={styles.blurViewStyle} blurType='light' blurAmount={10} reducedTransparencyFallbackColor='white' /> : null}
			<Modal
				animationType='slide'
				transparent={true}
				visible={showModal}
				onRequestClose={() => {
					setShowModal(!showModal)
				}}
			>
				<TouchableWithoutFeedback onPressOut={() => setShowModal(!showModal)}>
					<View style={styles.centeredView}>
						<View style={styles.modalView}>
							<TouchableOpacity onPress={() => setShowModal(!showModal)} style={{ width: '100%', padding: 3 }}>
								<CrossIcon name='cross' color='#000' size={36} />
							</TouchableOpacity>
							<View style={{ paddingHorizontal: 20 }}>
								<View style={{ alignItems: 'center' }}>
									<Text style={{ color: '#000', fontWeight: 'bold', fontSize: 24, paddingBottom: 20 }}>Returning Users:</Text>
								</View>
								<Text style={{ marginBottom: 20, fontSize: 16 }}>
									If this is your first time logging into our new app, please tap the button below to reset your password and follow the
									instructions on the following page:
								</Text>
								<View style={{ alignItems: 'center' }}>
									<Text style={{ fontSize: 18, fontWeight: '600' }}>Welcome back!</Text>
								</View>
							</View>
							<View
								style={{
									flexDirection: 'row',
									justifyContent: 'center',
									paddingHorizontal: 10,
									paddingVertical: 5,
									marginHorizontal: 20,
									marginVertical: 20,
									borderWidth: 1,
									borderColor: '#000',
									borderRadius: 10,
								}}
							>
								<TouchableOpacity onPress={handleReset} style={{ color: 'blue' }}>
									<Text style={{ color: '#000', fontWeight: 'bold', fontSize: 20 }}>Reset Password</Text>
								</TouchableOpacity>
							</View>
						</View>
					</View>
				</TouchableWithoutFeedback>
			</Modal>
		</ImageBackground>
	)
}
export default Login

const styles = StyleSheet.create({
	input: {
		margin: 6,
		borderBottomWidth: 1,
		borderColor: 'lightgray',
		height: 40,
		color: 'lightgray',
		textAlign: 'center',
		width: windowWidth * 1.0,
		marginTop: 30,
	},
	logo: {
		height: IMAGE_HEIGHT,
		resizeMode: 'contain',
		marginBottom: 20,
		padding: 10,
		marginTop: 20,
	},
	input1: {
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
	image: {
		flex: 1,
		resizeMode: 'cover',
		justifyContent: 'center',
		height: '100%',
	},
	blurViewStyle: {
		position: 'absolute',
		left: 0,
		top: 0,
		height: windowHeight,
		width: windowWidth,
	},
	centeredView: {
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
		width: windowWidth * 0.75,
		backgroundColor: 'white',
		borderRadius: 10,
		alignItems: 'center',
		elevation: 5,
	},
	modalImg: {
		width: '100%',
		height: '100%',
		borderRadius: 10,
		borderColor: 'white',
		borderWidth: 5,
	},
})
