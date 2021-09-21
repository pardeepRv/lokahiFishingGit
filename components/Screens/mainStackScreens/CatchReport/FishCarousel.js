import React, { useState, useContext, useEffect } from 'react'
import { View, Dimensions, StyleSheet, TextInput } from 'react-native'
import Carousel from 'react-native-snap-carousel'
import { LCRContext } from '../../../../context/LCRContext/lcrProvider'

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

const FishCarousel = ({ fishData }) => {
	const [carousel, setCarousel] = useState('')
	const { fishType, setFishType, renderContent } = useContext(LCRContext)
	const [fishInput, setFishInput] = useState('')

	console.log('fishType', fishType)

	const fish = fishData[carousel.currentIndex]?.subtext
	useEffect(() => {
		setFishType(fishData[carousel.currentIndex]?.subtext)
		if (fish === 'Multiple') {
			setFishType('Multiple: ' + fishInput)
		} else if (fish === 'Other') {
			setFishType('Other: ' + fishInput)
		}
	})

	return (
		<View style={{ marginVertical: 10, alignItems: 'center' }}>
			<Carousel
				style={{ alignContent: 'center', borderWidth: 1, borderColor: 'blue' }}
				ref={c => {
					setCarousel(c)
				}}
				data={fishData}
				renderItem={data => renderContent(data)}
				sliderWidth={windowWidth}
				itemWidth={windowWidth * 0.65}
				autoplay={false}
				loop={true}
				onSnapToItem={index => {
					setFishType(fishData[index].subtext)
					setFishInput('')
				}}
			/>
			{fish === 'Multiple' ? (
				<View style={{ zIndex: 1, paddingHorizontal: 20, width: '100%' }}>
					<TextInput
						style={{
							borderWidth: 1,
							borderColor: 'lightgray',
							borderRadius: 7,
							padding: 5,
							fontSize: 16,
							color: '#000',
							fontWeight: '500',
							marginTop: 20,
						}}
						onChangeText={text => setFishInput(text)}
						multiline={true}
						placeholder='Enter multiple fish catches'
						placeholderTextColor='lightgray'
						value={fishInput}
					/>
				</View>
			) : null}
			{fish === 'Other' ? (
				<View style={{ zIndex: 1, paddingHorizontal: 20, width: '100%' }}>
					<TextInput
						style={{
							borderWidth: 1,
							borderColor: 'lightgray',
							borderRadius: 7,
							padding: 5,
							fontSize: 16,
							color: '#000',
							fontWeight: '500',
							marginTop: 20,
						}}
						onChangeText={text => setFishInput(text)}
						multiline={true}
						placeholder='Enter other fish type'
						placeholderTextColor='lightgray'
						value={fishInput}
					/>
				</View>
			) : null}
		</View>
	)
}

export default FishCarousel
