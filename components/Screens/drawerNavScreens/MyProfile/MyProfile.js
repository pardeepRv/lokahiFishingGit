import React from 'react'
import { useState, useEffect, useContext } from 'react'
import { Dimensions, StyleSheet, Text, View, Image, ImageBackground, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import BoatInfo from './MyProfileTabs/BoatInfo'
import MyPhotos from './MyProfileTabs/MyPhotos'
import FastImage from 'react-native-fast-image'
import { AuthContext } from '../../../../context/authProvider'
import loginLogo from '../../../../media/images/loginLogo.png'
import { BlurView } from '@react-native-community/blur'
import CrossIcon from 'react-native-vector-icons/Entypo'
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
const Tab = createMaterialTopTabNavigator()

const MyProfile = ({ navigation }) => {
	const { user, setUser } = useContext(AuthContext)
	const [imgModalVisible, setImgModalVisible] = useState(false)

	return (
		<View style={styles.bg}>
			<View style={styles.content}>
				<ImageBackground source={{ uri: user?.data?.User_Image }} style={styles.backgroundProfilePic} blurRadius={10}>
					<View style={styles.profileInfo}>
						{user?.data?.User_Image.includes('.jpg') ? (
							<TouchableOpacity onPress={() => setImgModalVisible(!imgModalVisible)}>
								<FastImage style={styles.profilePic} source={{ uri: user?.data?.User_Image }} />
							</TouchableOpacity>
						) : (
							<View style={styles.logoView}>
								<Image source={loginLogo} style={styles.logo} />
							</View>
						)}
						<Text style={styles.infoText}>{user?.data?.fullname}</Text>
						<Text style={styles.infoText}>{user?.data?.User_Name}</Text>
						<Text style={styles.infoText}>CML Holder: {user?.data?.CML}</Text>
						<Text style={styles.infoText}>City: {user?.data?.city}</Text>
						<Text style={styles.infoText}>Island: {user?.data?.island}</Text>
						<Text style={styles.infoText}>T-Shirt Size: {user?.data?.tShirt}</Text>
					</View>
				</ImageBackground>
				<View style={styles.tabView}>
					<Tab.Navigator
						style={styles.tabNav}
						tabBarOptions={{
							style: {
								backgroundColor: '#2c385e',
							},
							allowFontScaling: false,
							labelStyle: {
								color: '#fff',
								fontWeight: '700',
								shadowColor: '#2c385e',
								shadowOffset: { width: 1, height: 1 },
								shadowOpacity: 1,
								shadowRadius: 0,
								textTransform: 'none',
								fontSize: 18,
								
							},
							indicatorStyle: {
								backgroundColor: '#fff',
							},
						}}
					>
						<Tab.Screen name='Boat Info' component={BoatInfo} />
						<Tab.Screen name='Photos' component={MyPhotos} />
					</Tab.Navigator>
				</View>
			</View>
			{imgModalVisible ? <BlurView style={styles.blurView} blurType='light' blurAmount={10} reducedTransparencyFallbackColor='white' /> : null}
			<Modal
				animationType='slide'
				transparent={true}
				visible={imgModalVisible}
				onRequestClose={() => {
					setImgModalVisible(!imgModalVisible)
				}}
			>
				<TouchableWithoutFeedback onPressOut={() => setImgModalVisible(!imgModalVisible)}>
					<View style={styles.centeredView}>
						<View style={styles.modalView}>
							<FastImage style={styles.modalImg} source={{ uri: user?.data?.User_Image }}>
								<TouchableOpacity onPress={() => setImgModalVisible(!imgModalVisible)}>
									<CrossIcon name='cross' color='#fafafa' size={42} style={styles.closeImgModal} />
								</TouchableOpacity>
							</FastImage>
						</View>
					</View>
				</TouchableWithoutFeedback>
			</Modal>
		</View>
	)
}

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

export default MyProfile

const styles = StyleSheet.create({
	bg: {
		width: '100%',
		height: '100%',
		flexDirection: 'column',
		alignItems: 'center',
		position: 'absolute',
		top: 0,
		left: 0,
	},
	content: {
		height: '100%',
		width: '100%',
	},
	backgroundProfilePic: {
		height: windowHeight * 0.458,
		width: '100%',
		display: 'flex',
		flexDirection: 'row',
	},
	profileInfo: {
		position: 'absolute',
		top: windowHeight * 0.09,
		height: windowHeight * (0.458 - 0.09),
		width: windowWidth,
		display: 'flex',
		justifyContent: 'space-around',
		alignItems: 'center',
		padding: 10,
	},
	profilePic: {
		height: windowHeight * 0.175,
		width: windowHeight * 0.175,
		borderColor: '#fff',
		borderWidth: 2,
		borderRadius: 7,
	},
	infoText: {
		color: '#fff',
		fontWeight: '600',
		shadowColor: 'black',
		shadowOffset: { width: 2, height: 2 },
		shadowOpacity: 1,
		shadowRadius: 2,
		fontSize: 16,
	},
	tabView: {
		width: '100%',
		height: windowHeight * (1 - 0.108 - 0.35),
	},
	backgroundProfilePic: {
		height: windowHeight * 0.458,
		width: '100%',
		display: 'flex',
		flexDirection: 'row',
	},
	logoView: {
		height: windowHeight * 0.15,
		width: windowHeight * 0.15,
		justifyContent: 'center',
		alignItems: 'center',
	},
	logo: {
		height: '100%',
		width: '100%',
		resizeMode: 'contain',
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
		width: windowWidth * 0.9,
		height: windowHeight * 0.6,
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
	closeImgModal: {
		marginLeft: 5,
		marginTop: 5,
	},
	blurView: {
		position: 'absolute',
		top: 0,
		left: 0,
		bottom: 0,
		right: 0,
		zIndex: 1000,
	},
})
