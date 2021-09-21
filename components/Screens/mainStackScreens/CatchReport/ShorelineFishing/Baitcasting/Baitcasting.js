//
import React, { useState, useContext } from 'react'
import { SafeAreaView, Dimensions, View, Text, StyleSheet } from 'react-native'
import LCRRequired from '../../LCRRequired'
import FishCarousel from '../../FishCarousel'
import { BlurView } from '@react-native-community/blur'
import { LCRContext } from '../../../../../../context/LCRContext/lcrProvider'

const Baitcasting = ({ navigation }) => {
	const { photoIsUploading } = useContext(LCRContext)

	const fishData = [
		{ image: 27, subtext: 'Omilu' },
		{ image: 28, subtext: 'White Ulua' },
		{ image: 29, subtext: 'Yellow Spot' },
		{ image: 13, subtext: 'Oio' },
		{ image: 39, subtext: 'Moi' },
		{ image: 40, subtext: 'Enenue' },
		{ image: 41, subtext: 'Mu' },
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

export default Baitcasting

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
