import React, { useState } from 'react'
import auth from '@react-native-firebase/auth'
import { View, Text, TextInput, Dimensions, StyleSheet, TouchableOpacity, ImageBackground, SafeAreaView, Image, Linking } from 'react-native'

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

const ForgotPassword = ({ navigation }) => {
	const [email, setEmail] = useState('')

	const sendEmail = () => {
		auth().sendPasswordResetEmail(email)
	}

	const navLogin = () => {
		navigation.navigate('Login')
	}

	const bothFuncs = () => {
		sendEmail()
		navLogin()
	}

	const handleContact = () => {
		Linking.openURL('https://forms.gle/VPZd1dCWPArNbfCE7')
	}

	return (
		<ImageBackground source={require('../../media/images/signup_bg.png')} style={styles.bgImg}>
			<View style={{ alignItems: 'center' }}>
				{/* <Text style={{ fontSize: 30, color: '#fff', marginBottom: 30, fontWeight: '600' }}>Forgot Password</Text> */}
				<Text style={{ color: 'lightgray', textAlign: 'center', fontWeight: '700', fontSize: 20 }}>Enter your email address:</Text>
				<TextInput
					style={styles.input}
					onChangeText={setEmail}
					value={email}
					title='Email Address'
					autoCapitalize='none'
					placeholder='email'
					placeholderTextColor='lightgray'
				/>

				<View style={{ alignItems: 'center' }}>
					<TouchableOpacity style={styles.button} onPress={bothFuncs}>
						<Text style={{ color: '#fff', fontSize: 18, fontWeight: '600' }}>Send</Text>
					</TouchableOpacity>
					<TouchableOpacity style={{ paddingVertical: 30 }} onPress={handleContact}>
						<Text style={{ fontSize: 18, color: '#fafafa', fontWeight: '600' }}>Contact us for help</Text>
					</TouchableOpacity>
				</View>
			</View>
		</ImageBackground>
	)
}
export default ForgotPassword

const styles = StyleSheet.create({
	bgImg: {
		width: windowWidth,
		height: windowHeight,
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
	},
	input: {
		margin: 6,
		height: 40,
		color: 'lightgray',
		textAlign: 'center',
		width: windowWidth * 0.9,
		fontSize: 18,
		fontWeight: '500',
		borderBottomColor: '#fff',
		borderBottomWidth: 1,
	},
	button: {
		paddingVertical: 10,
		paddingHorizontal: 40,
		borderRadius: 10,
		backgroundColor: 'lightblue',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 20,
	},
})
