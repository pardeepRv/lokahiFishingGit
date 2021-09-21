import React, { useState, useContext, useEffect } from 'react'
import {
	SafeAreaView,
	TextInput,
	Text,
	View,
	StyleSheet,
	Dimensions,
	Keyboard,
	ActivityIndicator,
	Switch,
	KeyboardAvoidingView,
	Modal,
} from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import DropDownPicker from 'react-native-dropdown-picker'
import FastImage from 'react-native-fast-image'
import { AuthContext } from '../../../../context/authProvider'
import GetLocation from 'react-native-get-location'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { LCRContext } from '../../../../context/LCRContext/lcrProvider'
import { ScrollView } from 'react-native'
import { BlurView } from '@react-native-community/blur'

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

const LCROptional = props => {
	const { user, setUser } = useContext(AuthContext)
	const { LCRPostOptional, setLCRPostOptional, postToPhotos, setPostToPhotos, LCRIsPosting, LCRPostRequired } = useContext(LCRContext)
	const [sign, setSign] = useState('')
	const [method, setMethod] = useState('')
	const [weather, setWeather] = useState('')
	const [tide, setTide] = useState('')
	const [additionalNotes, setAdditionalNotes] = useState('')
	const [degrees, setDegrees] = useState('')
	const [miles, setMiles] = useState('')
	const [harbor, setHarbor] = useState('')
	const [open, setOpen] = useState(false)
	const [location, setLocation] = useState({})
	const [harborItems, setHarborItems] = useState([
		{ label: 'Hawaii Kai', value: 'Hawaii Kai' },
		{ label: 'Keehi', value: 'Keehi' },
		{ label: 'Kaneohe', value: 'Kaneohe' },
		{ label: 'Haleiwa', value: 'Haleiwa' },
		{ label: 'Waianae', value: 'Waianae' },
	])

	useEffect(() => {
		setLCRPostOptional({
			sign: sign,
			method: method,
			weather: weather,
			tide: tide,
			additionalNotes: additionalNotes,
			hawaiiLocation: {
				degrees: degrees,
				miles: miles,
				harbor: harbor,
			},
			gpsLocation: location,
		})
	}, [sign, method, weather, tide, additionalNotes, degrees, miles, harbor, location])

	useEffect(() => {
		GetLocation.getCurrentPosition({
			enableHighAccuracy: true,
			//I'm not sure what is best for the timeout to be set as. Some more testing could be beneficial here
			timeout: 15000,
		})
			.then(location => {
				setLocation(location)
				// console.log('location', location)
			})
			.catch(error => {
				const { code, message } = error
				// console.warn(code, message);
			})
		// I set this so that the region could update as we move the map around and it seems to break the map. Setting the actual <MapView> region to this seems to work but then the pin only stays at the users current location. Maybe the map will be good if they make the post at the spot of location and use the other method if it is created later.
	}, [])

	const [region, setRegion] = useState({
		latitude: location?.latitude,
		longitude: location?.longitude,
		latitudeDelta: 0.009,
		longitudeDelta: 0.009,
	})

	const onChangeLatitude = text => {
		setLocation({ ...location, latitude: text === '-' ? '1' : parseFloat(text) })
	}

	const onChangeLongitude = text => {
		setLocation({ ...location, longitude: text === '-' ? '1' : parseFloat(text) })
	}

	return (
		// 		            <KeyboardAvoidingView
		//              behavior={Platform.OS === "ios" ? "padding" : "height"}
		//   style={{ }}

		// >
		<SafeAreaView style={styles.safeAreaView}>
			<KeyboardAwareScrollView>
				<ScrollView>
					<View style={[styles.textSection, { justifyContent: 'center' }]}>
						<Text>Info below is optional & will be private to user only</Text>
					</View>
					{/* <View style={styles.profileInfo}>
					<Text style={{ marginRight: 10, fontWeight: '600', fontSize: 18 }}>{user.dbData.fullname}</Text>
					<FastImage style={styles.profilePic} source={{ uri: user.dbData.User_Image }} />
				</View> */}
					<View style={[styles.textSection, { justifyContent: 'space-evenly', alignItems: 'center', paddingVertical: 5 }]}>
						<Text>Post Catch Report to Photo Sharing?</Text>
						<Switch
							trackColor={{ false: '#767577', true: '#34C759' }}
							thumbColor={'#f4f3f4'}
							ios_backgroundColor='#767577'
							onValueChange={() => setPostToPhotos(!postToPhotos)}
							value={postToPhotos}
						/>
					</View>
					<View style={styles.textSection}>
						<Text style={styles.title}>Sign</Text>
						<TextInput
							placeholder='Add sign info (optional)'
							autoCapitalize='sentences'
							style={{ fontSize: 16 }}
							returnKeyType='done'
							blurOnSubmit={true}
							onSubmitEditing={() => {
								Keyboard.dismiss()
							}}
							onChangeText={text => setSign(text)}
						/>
					</View>
					<View style={styles.textSection}>
						<Text style={styles.title}>Method</Text>
						<TextInput
							placeholder='Add info about method (optional)'
							autoCapitalize='sentences'
							style={{ fontSize: 16 }}
							returnKeyType='done'
							blurOnSubmit={true}
							onSubmitEditing={() => {
								Keyboard.dismiss()
							}}
							onChangeText={text => setMethod(text)}
						/>
					</View>
					<View style={styles.textSection}>
						<Text style={styles.title}>Weather</Text>
						<TextInput
							placeholder='Add weather info (optional)'
							autoCapitalize='sentences'
							style={{ fontSize: 16 }}
							returnKeyType='done'
							blurOnSubmit={true}
							onSubmitEditing={() => {
								Keyboard.dismiss()
							}}
							onChangeText={text => setWeather(text)}
						/>
					</View>
					<View style={styles.textSection}>
						<Text style={styles.title}>Tide</Text>
						<TextInput
							placeholder='Add tide info (optional)'
							autoCapitalize='sentences'
							style={{ fontSize: 16 }}
							returnKeyType='done'
							blurOnSubmit={true}
							onSubmitEditing={() => {
								Keyboard.dismiss()
							}}
							onChangeText={text => setTide(text)}
						/>
					</View>
					<View style={styles.textSection}>
						<Text style={styles.title}>Location</Text>
					</View>
					<View style={styles.mapContainer}>
						<MapView
							style={styles.map}
							region={{
								latitude: location?.latitude,
								longitude: location?.longitude,
								latitudeDelta: 0.009,
								longitudeDelta: 0.009,
							}}
							// onRegionChangeComplete={region => setRegion(region)}
						>
							{/* Seems like this could be dynamic for the pin to change locations instead of only staying at the geolocation of the phone */}
							<Marker coordinate={{ latitude: location?.latitude, longitude: location?.longitude }} />
						</MapView>
					</View>
					{location ? (
						<View style={{ flexDirection: 'row', alignItems: 'flex-end', paddingHorizontal: 10 }}>
							<TextInput
								returnKeyType='done'
								blurOnSubmit={true}
								onSubmitEditing={() => {
									Keyboard.dismiss()
								}}
								style={styles.locationTextInput}
								placeholder={location?.latitude?.toString()}
								onChangeText={text => onChangeLatitude(text)}
								keyboardType={Platform.OS === 'ios' ? 'numbers-and-punctuation' : 'default'}
							/>
							<Text style={{ fontSize: 16, marginRight: 10, paddingBottom: 2 }}>latitude</Text>
							<TextInput
								style={{ fontSize: 16 }}
								returnKeyType='done'
								blurOnSubmit={true}
								onSubmitEditing={() => {
									Keyboard.dismiss()
								}}
								style={styles.locationTextInput}
								placeholder={location?.longitude?.toString()}
								onChangeText={text => onChangeLongitude(text)}
								keyboardType={Platform.OS === 'ios' ? 'numbers-and-punctuation' : 'default'}
							/>
							<Text style={{ fontSize: 16, paddingBottom: 2 }}>longitude</Text>
						</View>
					) : (
						<View style={{ flexDirection: 'row', marginTop: 20, paddingHorizontal: 10 }}>
							<ActivityIndicator />
							<Text style={{ fontSize: 16, marginLeft: 10 }}>getting location...</Text>
						</View>
					)}
					<Text style={styles.or}>OR</Text>
					<View style={{ zIndex: 1, paddingHorizontal: 10 }}>
						<View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
							<TextInput
								returnKeyType='done'
								blurOnSubmit={true}
								onSubmitEditing={() => {
									Keyboard.dismiss()
								}}
								style={styles.degreesTextInput}
								placeholder='#'
								onChangeText={text => setDegrees(text)}
								keyboardType='decimal-pad'
							/>
							<Text style={{ fontSize: 16, marginRight: 5, paddingBottom: 2 }}> degree(s) and </Text>
							<TextInput
								returnKeyType='done'
								blurOnSubmit={true}
								onSubmitEditing={() => {
									Keyboard.dismiss()
								}}
								style={styles.degreesTextInput}
								placeholder='#'
								onChangeText={text => setMiles(text)}
								keyboardType='decimal-pad'
							/>
							<Text style={{ fontSize: 16, paddingBottom: 2 }}> miles from: </Text>
						</View>
						<View style={{ zIndex: 1 }}>
							<DropDownPicker
								style={{ backgroundColor: '#fafafa' }}
								theme='LIGHT'
								containerStyle={{ width: '50%', marginVertical: 10 }}
								labelStyle={{
									fontWeight: 'bold',
									fontSize: 16,
								}}
								textStyle={{
									fontSize: 16,
								}}
								dropDownContainerStyle={{
									backgroundColor: '#fafafa',
								}}
								zIndex={1000}
								open={open}
								value={harbor}
								items={harborItems}
								setOpen={setOpen}
								setValue={setHarbor}
								setItems={setHarborItems}
								placeholder={'Choose Harbor'}
								dropDownDirection='AUTO'
							/>
						</View>
					</View>
					{/* <View style={{ borderTopWidth: 1, borderColor: 'lightgray', paddingTop: 15, paddingBottom: 15, height: windowHeight * 0.25 }}> */}
					<TextInput
						placeholder='Add any additional notes you would like'
						autoCapitalize='sentences'
						style={{
							fontSize: 16,
							paddingHorizontal: 10,
							borderTopWidth: 1,
							borderBottomWidth: 1,
							borderColor: 'lightgray',
							paddingTop: 15,
							paddingBottom: 15,
							height: windowHeight * 0.25,
						}}
						returnKeyType='done'
						multiline={true}
						blurOnSubmit={true}
						onSubmitEditing={() => {
							Keyboard.dismiss()
						}}
						onChangeText={text => setAdditionalNotes(text)}
					/>
					{/* </View> */}
					{/* <View style={{ borderTopWidth: 1, borderColor: 'lightgray', paddingTop: 5, paddingBottom: 15 }} />
				<View style={{ flex: 1 }} /> */}
				</ScrollView>

				{/* </KeyboardAvoidingView> */}
			</KeyboardAwareScrollView>
			{LCRIsPosting ? <BlurView style={styles.blurView} blurType='light' blurAmount={10} reducedTransparencyFallbackColor='white' /> : null}
			<Modal animationType='slide' transparent={true} visible={LCRIsPosting}>
				<View style={styles.centeredView}>
					<View style={styles.modalView}>
						<ActivityIndicator size='large' />
						<Text style={{ fontSize: 18, fontWeight: '600', paddingTop: 20 }}>Posting catch report...</Text>
					</View>
				</View>
			</Modal>
		</SafeAreaView>
	)
}

export default LCROptional

const styles = StyleSheet.create({
	safeAreaView: {
		marginTop: 100,

		justifyContent: 'center',
		alignItems: 'center',
	},
	mapContainer: {
		height: windowHeight * 0.4,
		width: windowWidth,
		justifyContent: 'flex-end',
		alignItems: 'center',
		borderColor: '#fafafa',
		borderWidth: 2,
	},
	map: {
		...StyleSheet.absoluteFillObject,
	},
	profileInfo: {
		borderTopWidth: 1,
		borderColor: 'lightgray',
		paddingTop: 15,
		paddingBottom: 15,
		flexDirection: 'row',
		justifyContent: 'flex-end',
		alignItems: 'center',
	},
	profilePic: {
		height: windowHeight * 0.05,
		width: windowHeight * 0.05,
		borderColor: '#fff',
		borderWidth: 2,
		borderRadius: 50,
	},
	title: {
		fontWeight: '700',
		fontSize: 18,
	},
	textSection: {
		borderTopWidth: 1,
		borderColor: 'lightgray',
		paddingVertical: 15,
		paddingHorizontal: 10,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	or: {
		fontSize: 18,
		fontWeight: '700',
		marginVertical: 20,
		paddingHorizontal: 10,
	},
	locationTextInput: {
		borderBottomWidth: 1,
		// borderWidth: 1,
		// borderColor: 'gray',
		// backgroundColor: '#fff',
		fontSize: 16,
		// padding: 3,
		justifyContent: 'flex-end',
		alignItems: 'flex-end',
		minWidth: 80,
		marginTop: 20,
		marginRight: 10,
		paddingBottom: 2,
	},
	degreesTextInput: {
		borderBottomWidth: 1,
		// borderWidth: 1,
		// borderColor: 'gray',
		// backgroundColor: '#fff',
		fontSize: 16,
		// padding: 3,
		justifyContent: 'flex-end',
		alignItems: 'flex-end',
		minWidth: 40,
		paddingBottom: 2,
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
})
