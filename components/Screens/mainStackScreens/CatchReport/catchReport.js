import React, { useContext } from 'react'
import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet, Dimensions, ImageBackground, Image } from 'react-native'
import { LCRContext } from '../../../../context/LCRContext/lcrProvider'

const CatchReport = ({ navigation }) => {
	const { setFishingType } = useContext(LCRContext)

	return (
		<ImageBackground source={require('../../../../media/images/signup_bg.png')} style={styles.bgImg}>
			<View style={styles.content}>
				<TouchableOpacity
					onPress={() => {
						setFishingType('Boat Fishing')
						navigation.navigate('BoatFishing')
					}}
				>
					<Image source={require('../../../../media/images/catch-report-icons/BoatFishing.png')} style={styles.blockButton} />
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => {
						setFishingType('Shoreline Fishing')
						navigation.navigate('ShorelineFishing')
					}}
				>
					<Image source={require('../../../../media/images/catch-report-icons/ShorelineFishing.png')} style={styles.blockButton} />
				</TouchableOpacity>
			</View>
		</ImageBackground>
	)
}

export default CatchReport

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

const styles = StyleSheet.create({
	bgImg: {
		width: '100%',
		height: '100%',
	},
	content: {
		position: 'relative',
		top: windowHeight * 0.108,
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'space-evenly',
		height: windowHeight * (1 - 0.108),
	},
	blockButton: {
		borderRadius: 5,
		height: 250,
		width: 250,
		marginVertical: windowHeight * 0.015,
		marginHorizontal: windowWidth * 0.025,
		alignItems: 'center',
		justifyContent: 'center',
	},
	text: {
		fontSize: 18,
		color: '#fff',
		fontWeight: '600',
		shadowColor: '#000',
		shadowOffset: { width: 2, height: 2 },
		shadowOpacity: 1,
		shadowRadius: 0,
	},
	icon: {
		height: 150,
		width: 150,
		resizeMode: 'contain',
	},
})
