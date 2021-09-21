import React, { useState, useContext } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ImageBackground, Image } from 'react-native'
import Carousel from 'react-native-snap-carousel'

const BoatFishing = ({ navigation }) => {
	const [carousel, setCarousel] = useState('')

	const renderImage = img => {
		switch (img) {
			case 0:
				// return <View style={[styles.scrollIcon, styles.offshoreIcon]}></View>;
				return <Image source={require('../../../../../../media/images/catch-report-icons/DeepBottom.png')} style={styles.scrollIcon} />
			case 1:
				// return <View style={[styles.scrollIcon, styles.bottomIcon]}></View>;
				return <Image source={require('../../../../../../media/images/catch-report-icons/ShallowBottom.png')} style={styles.scrollIcon} />
		}
	}

	renderContent = data => {
		return (
			<TouchableOpacity
				style={styles.scrollContent}
				onPress={() => {
					navigation.navigate(data.item.link)
				}}
			>
				<View>{renderImage(data.item.image)}</View>
				<View></View>
				<Text style={styles.subtext}>{data.item.subtext}</Text>
			</TouchableOpacity>
		)
	}
	return (
		<View style={styles.bg}>
			<ImageBackground style={styles.bgImg} source={require('../../../../../../media/images/backgroundBubble.png')} />
			<View style={styles.content}>
				<Carousel
					ref={c => {
						setCarousel(c)
					}}
					data={[
						{ image: 0, subtext: 'Deep Bottom', link: 'DeepBottom' },
						{ image: 1, subtext: 'Shallow Bottom', link: 'ShallowBottom' },
						// { image: 2, subtext: 'Tag and Release', link: 'TagAndRelease' },
					]}
					renderItem={data => renderContent(data)}
					sliderWidth={windowWidth}
					itemWidth={windowWidth * 0.65}
					removeClippedSubviews={false}
				/>
			</View>
		</View>
	)
}

export default BoatFishing

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

const styles = StyleSheet.create({
	bg: {
		backgroundColor: '#fff',
		width: '100%',
		height: '100%',
	},
	bgImg: {
		width: windowWidth,
		height: 115,
		position: 'absolute',
		bottom: 0,
	},
	content: {
		position: 'relative',
		top: windowHeight * 0.108,
		height: windowHeight * (1 - 0.108),
	},
	scrollContent: {
		alignItems: 'center',
	},
	subtext: {
		marginTop: 50,
		fontSize: 20,
		fontWeight: '600',
		textAlign: 'center',
		color: '#2c385e',
		shadowOpacity: 0.7,
		shadowColor: '#000',
		shadowOffset: { height: 1, width: 1 },
		shadowRadius: 0,
	},
	scrollIcon: {
		alignItems: 'center',
		height: 200,
		width: 200,
		marginTop: 40,
		borderRadius: 10,
	},
})
