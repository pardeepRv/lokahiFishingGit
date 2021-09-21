//
import React, { useState, useContext } from 'react'
import { SafeAreaView, Dimensions, View, Text, StyleSheet } from 'react-native'
import LCRRequired from '../../LCRRequired'
import FishCarousel from '../../FishCarousel'
import { BlurView } from '@react-native-community/blur'
import { LCRContext } from '../../../../../../context/LCRContext/lcrProvider'

const DeepBottom = ({ navigation }) => {
	const { photoIsUploading } = useContext(LCRContext)

	const fishData = [
		{ image: 10, subtext: 'Opakapaka' },
		{ image: 16, subtext: 'Onaga' },
		{ image: 11, subtext: 'Ehu' },
		{ image: 12, subtext: 'Uku' },
		{ image: 17, subtext: 'Kale Kale' },
		{ image: 18, subtext: 'Kahala' },
		{ image: 19, subtext: 'Gindai' },
		{ image: 20, subtext: 'Hapuupuu' },
		{ image: 21, subtext: 'Lehi' },
		{ image: 22, subtext: 'Alphonsin' },
		{ image: 23, subtext: 'Deep Sea Aweoweo' },
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

export default DeepBottom

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
