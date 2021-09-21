import React, { useState, useEffect, useContext } from 'react'
import { Image, View, TouchableOpacity, Dimensions, Modal, ActivityIndicator } from 'react-native'
import { Text, Button, TextInput } from 'react-native-paper'
import { launchImageLibrary } from 'react-native-image-picker'
import { withFirebaseHOC } from '../../../../utils/index'
import firestore from '@react-native-firebase/firestore'
import storage from '@react-native-firebase/storage'
import auth from '@react-native-firebase/auth'
import { BlurView } from '@react-native-community/blur'
import { useNavigation } from '@react-navigation/native'

import { AuthContext } from '../../../../context/authProvider'

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

const Post = () => {
	const [image, setImage] = useState(null)
	const [description, setDescription] = useState('')
	const [transferred, setTransferred] = useState(0)
	const { user, setUser } = useContext(AuthContext)
	const [photoIsUploading, setPhotoIsUploading] = useState(false)
	const navigation = useNavigation()

	const currentUserId = user?.user?._user.uid

	useEffect(() => {
		const ref = firestore().collection('Users').doc(currentUserId)
		return ref.onSnapshot(querySnapshot => {
			const data = querySnapshot.data()
			setUser({ ...user, data })
		})
	}, [])

	const onChangeDescription = description => {
		setDescription(description)
	}

	const onSubmit = async () => {
		try {
			setPhotoIsUploading(true)
			await uploadImage(image)
			setImage(null)
			setDescription('')
		} catch (e) {
			console.error(e)
		}
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
			}
		})
	}

	const uploadImage = async urlSource => {
		const filename = urlSource.substring(urlSource.lastIndexOf('/') + 1)
		const storageRef = storage().ref(`Posts/${filename}`)
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
		try {
			await task
			// const user1 = auth().currentUser
			let URL
			storageRef
				.getDownloadURL()
				.then(async url => {
					URL = url
					const ref = firestore().collection('Posts')
					await ref
						.add({
							photo: URL,
							description: description,
							createdAt: firestore.FieldValue.serverTimestamp(),
							user: { ...user.data },
						})
						.then(() => {
							firestore().collection('Users').doc(currentUserId).collection('Posts').add({
								createdAt: firestore.FieldValue.serverTimestamp(),
								description: description,
								photo: URL,
							})
						})
						.then(() => {
							setPhotoIsUploading(false)
							alert('Photo posted!')
							navigation.navigate('SharePhotos')
						})
						.catch(error => {
							console.log('Error uploading photo:', error)
						})
				})
				.catch(error => {
					console.log('Error getting document:', error)
				})
		} catch (e) {
			console.error(e)
		}
	}

	return (
		<View style={{ height: windowHeight, width: windowWidth }}>
			<View style={{ marginTop: windowHeight * 0.2 }}>
				<View style={{ width: windowWidth, alignItems: 'center' }}>
					{image ? (
						<Image source={{ uri: image }} style={{ width: windowWidth * 0.4, height: windowHeight * 0.15, resizeMode: 'contain' }} />
					) : (
						<TouchableOpacity onPress={() => selectImage()}>
							<Image
								source={require('../../../../media/images/catch-report-icons/uploadImage.png')}
								style={{ width: windowWidth * 0.4, height: windowHeight * 0.15, resizeMode: 'contain' }}
							/>
						</TouchableOpacity>
					)}
				</View>
				<View style={{ marginTop: 40 }}>
					<View style={{ paddingHorizontal: 20 }}>
						<TextInput
							placeholder='Enter caption'
							placeholderTextColor='lightgray'
							style={{
								borderWidth: 1,
								borderColor: 'lightgray',
								borderRadius: 7,
								fontSize: 16,
								color: '#000',
								fontWeight: '500',
								backgroundColor: '#fff',
								padding: 0,
								borderBottomColor: '#fff',
							}}
							selectionColor='lightgray'
							value={description}
							onChangeText={description => onChangeDescription(description)}
						/>
					</View>
					<View style={{ justifyContent: 'center', alignItems: 'center' }}>
						<TouchableOpacity
							onPress={onSubmit}
							style={{
								backgroundColor: '#2c385e',
								borderRadius: 7,
								padding: 10,
								justifyContent: 'center',
								alignItems: 'center',
								width: '40%',
								marginTop: 40,
							}}
						>
							<Text style={{ fontSize: 16, color: '#fafafa', fontWeight: '700', textDecorationLine: 'underline' }}>Add Post</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
			{photoIsUploading ? (
				<BlurView
					style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0 }}
					blurType='light'
					blurAmount={10}
					reducedTransparencyFallbackColor='white'
				/>
			) : null}
			<Modal animationType='slide' transparent={true} visible={photoIsUploading}>
				<View
					style={{
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
					}}
				>
					<View
						style={{
							padding: 20,
							backgroundColor: '#fafafa',
							borderRadius: 10,
							borderColor: 'black',
							borderWidth: 1,
							alignItems: 'center',
							elevation: 5,
						}}
					>
						<ActivityIndicator size='large' />
						<Text style={{ fontSize: 18, fontWeight: '600', paddingTop: 20 }}>Uploading photo...</Text>
						<Text style={{ fontSize: 16, fontWeight: '400', paddingTop: 10 }}>{transferred}% Uploaded</Text>
					</View>
				</View>
			</Modal>
		</View>
	)
}

export default withFirebaseHOC(Post)
