import React, { useState } from 'react'
import auth from '@react-native-firebase/auth'
import { View, Text, TextInput, Dimensions, StyleSheet, TouchableOpacity, ImageBackground, FlatList, Linking } from 'react-native'

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

const ResetPassword = ({ navigation }) => {
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
		<ImageBackground source={require('../../media/images/signup_bg.png')} style={styles.image}>
			<View style={{ alignItems: 'center', position: 'absolute', top: windowHeight * 0.108, width: '100%', height: '100%' }}>
				{/* <Text style={{ fontSize: 30, color: '#fafafa', fontWeight: '600' }}>Reset Password</Text> */}
				<View
					style={{
						height: windowHeight * (1 - 0.3 - 0.108),
						width: windowWidth * 0.9,
						// backgroundColor: 'green',
					}}
				>
					<Text style={{ color: '#fafafa', fontSize: 20, fontWeight: '700', paddingBottom: 10 }}>Instructions:</Text>
					<FlatList
						data={[
							{ key: '1.  Enter your email address below (the same one you use for your Lokahi account).' },
							{ key: '2.  Go to to your email account and look for an email from noreply@lokahirn.firebaseapp.com.' },
							{ key: '3.  Open that email, and tap on the link inside the email.' },
							{ key: `4.  The link should open a webpage that says "Reset your password".` },
							{ key: '5.  Enter your password in the input field, you may use your previous password or a new one. Then tap Save.' },
							{ key: '6.  Return to the Lokahi Fishing app and log in with your email and password.' },
							{
								key: `6.  You should be able to log in to the app now! If you're still having problem, tap the button below to 'Contact us for help'.`,
							},
						]}
						renderItem={({ item }) => <Text style={styles.instructions}>{item.key}</Text>}
					/>
				</View>
				<View
					style={{
						height: windowHeight * 0.3,
						position: 'absolute',
						bottom: windowHeight * 0.108,
						width: windowWidth * 0.9,
						alignItems: 'center',
						justifyContent: 'center',
						// backgroundColor: 'red',
					}}
				>
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
							<Text style={{ color: '#fafafa', fontSize: 18, fontWeight: '600' }}>Send</Text>
						</TouchableOpacity>
					</View>
					<TouchableOpacity style={{ paddingVertical: 30 }} onPress={handleContact}>
						<Text style={{ fontSize: 18, color: '#fafafa', fontWeight: '600' }}>Contact us for help</Text>
					</TouchableOpacity>
				</View>
			</View>
		</ImageBackground>
	)
}
export default ResetPassword

const styles = StyleSheet.create({
	input: {
		margin: 6,
		height: 40,
		color: 'lightgray',
		textAlign: 'center',
		width: '100%',
		fontSize: 18,
		fontWeight: '500',
		borderBottomColor: '#fafafa',
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
	image: {
		flex: 1,
		resizeMode: 'cover',
		justifyContent: 'center',
		height: '100%',
	},
	instructions: {
		color: '#fafafa',
		fontSize: 18,
		width: '100%',
		textAlign: 'left',
		paddingVertical: 5,
		paddingHorizontal: 20,
	},
})
