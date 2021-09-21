//
import React, { useState, useContext } from 'react'
import { SafeAreaView, Dimensions, View, Text, StyleSheet } from 'react-native'
import LCRRequired from '../../LCRRequired'
import FishCarousel from '../../FishCarousel'
import { BlurView } from '@react-native-community/blur'
import { LCRContext } from '../../../../../../context/LCRContext/lcrProvider'

const Whipping = ({ navigation }) => {
	const { photoIsUploading } = useContext(LCRContext)

	const fishData = [
		{ image: 27, subtext: 'Omilu' },
		{ image: 28, subtext: 'White Ulua' },
		{ image: 29, subtext: 'Yellow Spot' },
		{ image: 30, subtext: 'Weke' },
		{ image: 26, subtext: 'Moano' },
		{ image: 13, subtext: 'Oio' },
		{ image: 39, subtext: 'Moi' },
		{ image: 34, subtext: 'Barracuda' },
		{ image: 40, subtext: 'Enenue' },
		{ image: 14, subtext: 'Menpachi' },
		{ image: 42, subtext: 'Aweoweo' },
		{ image: 43, subtext: 'Aholehole' },
		{ image: 32, subtext: 'Taape' },
		{ image: 33, subtext: 'Toau' },
		{ image: 44, subtext: 'PooPaa' },
		{ image: 17, subtext: 'Kala' },
		{ image: 45, subtext: 'Palani' },
		{ image: 38, subtext: 'Hage/Triggerfish' },
		{ image: 8, subtext: 'Other' },
		{ image: 9, subtext: 'Multiple' },
		{ image: 15, subtext: 'No Fish' },
	]

	return (
		<SafeAreaView style={{ height: windowHeight, backgroundColor: '#fff' }}>
			{photoIsUploading ? <BlurView style={styles.blurView} blurType='light' blurAmount={10} reducedTransparencyFallbackColor='white' /> : null}
			<View
				style={{
					borderTopWidth: 1,
					borderBottomWidth: 1,
					borderColor: 'lightgray',
					paddingVertical: 15,
					alignItems: 'center',
					justifyContent: 'center',
					position: 'relative',
					top: windowHeight * 0.06,
				}}
			>
				<Text>Info below is required & will be viewable by public</Text>
			</View>
			<FishCarousel fishData={fishData} />
			<LCRRequired />
		</SafeAreaView>
	)
}

export default Whipping

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

const styles = StyleSheet.create({
	blurView: {
		position: 'absolute',
		top: 0,
		left: 0,
		bottom: 0,
		right: 0,
		zIndex: 1000,
	},
})
