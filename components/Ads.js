import React, { useEffect, useContext, useState, useRef } from 'react'
import { View, StyleSheet, Dimensions, Text, SafeAreaView } from 'react-native'
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import Image from 'react-native-auto-scale-image'
import Carousel from 'react-native-snap-carousel'
const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

const Ads = props => {
	const [active, setActive] = useState(0)
	const [carousel, setCarousel] = useState('')

	const renderImage = img => {
		switch (img) {
			case 4:
				return (
					<View>
						<Image style={{ width: windowWidth, backgroundColor: 'rgba(52, 52, 52, 0.8)' }} uri={props.adsRef} />
					</View>
				)
		}
	}

	renderContent = data => {
	
		return (
			<View style={styles.carouselContainer}>
				<View>{renderImage(data.item.image)}</View>
			</View>
		)
	}

	return (
		<Carousel
			ref={c => {
				setCarousel(c)
			}}
			data={[{ image: 4 }]}
			renderItem={data => renderContent(data)}
			sliderWidth={windowWidth}
			itemWidth={windowWidth}
			autoplay={true}
			autoplayInterval={8500}
			autoplayDelay={2000}
			loop={true}
			onSnapToItem={index => {
				setActive(index)
			}}
		/>
	)
}

export default Ads

const styles = StyleSheet.create({
	cardView: {
		flex: 1,
		width: '90%',
		marginLeft: 20,
	},
	cardStyle: { marginTop: 20, height: 100 },
	peopleNeedStyle: {
		backgroundColor: '#274BDB',
		width: 80,
		color: 'white',
		marginTop: 20,
		marginBottom: -20,
		paddingLeft: 8,
	},
	carouselContainer: {
		width: windowWidth,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(52, 52, 52, 0.8)',
	},
})
