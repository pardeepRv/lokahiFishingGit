import React, { useState, useEffect, useContext } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Dimensions, Image } from 'react-native'

import { MainStack } from '../../Navigation/mainStack'
import messaging from '@react-native-firebase/messaging'
import CatchIcon from '../../../media/images/home-icons/CatchIcon.png'
import TidesIcon from '../../../media/images/home-icons/TidesIcon2.png'
import PhotoIcon from '../../../media/images/home-icons/PhotoIcon.png'
import NewsIcon from '../../../media/images/home-icons/NewsIcon.png'
// import LeaderIcon from '../../../media/images/home-icons/LeaderIcon.png'
import LeaderIcon from '../../../media/images/loginLogo.png'
import TournamentIcon from '../../../media/images/home-icons/TournamentIcon.png'

const Home = ({ navigation }) => {
	return (
		<View style={{ flexDirection: 'column', alignItems: 'center', backgroundColor: '#fff', height: '100%' }}>
			<ImageBackground source={require('../../../media/images/signup_bg.png')} style={styles.bgImg}>
				<View style={styles.content}>
					<View style={styles.blockRow}>
						<TouchableOpacity
							style={[styles.blockButton, styles.btnLCR]}
							onPress={() => {
								navigation.navigate('CatchReport')
							}}
						>
							<Image source={CatchIcon} style={[styles.icon, styles.iconLCR]} />
							<Text style={styles.text}>Local Catch Report</Text>
							<Text style={styles.smalltext}>(LCR)</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={[styles.blockButton, styles.btnTides]}
							onPress={() => {
								navigation.navigate('TidesandWeather')
							}}
						>
							<Image source={TidesIcon} style={[styles.icon, styles.iconTides]} />
							<Text style={[styles.text, styles.blueText]}>Tides and Weather</Text>
						</TouchableOpacity>
					</View>
					<View style={styles.blockRow}>
						<TouchableOpacity
							style={[styles.blockButton, styles.btnPhotos]}
							onPress={() => {
								navigation.navigate('SharePhotos')
							}}
						>
							<Image source={PhotoIcon} style={[styles.icon, styles.iconPhotos]} />
							<Text style={styles.text}>Photo Sharing</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={[styles.blockButton, styles.btnNews]}
							onPress={() => {
								navigation.navigate('News')
							}}
						>
							<Image source={NewsIcon} style={[styles.icon, styles.iconNews]} />
							<Text style={[styles.text, styles.blueText]}>News</Text>
						</TouchableOpacity>
					</View>
					<View style={styles.blockRow}>
						<TouchableOpacity
							style={[styles.blockButton, styles.btnLeader]}
							onPress={() => {
								navigation.navigate('LCRStack')
							}}
						>
							<Image source={LeaderIcon} style={[styles.icon, styles.iconLeader]} />
							<Text style={styles.text}>Leaderboard</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={[styles.blockButton, styles.btnTourney]}
							onPress={() => {
								navigation.navigate('Tournament')
							}}
						>
							<Image source={TournamentIcon} style={[styles.icon, styles.iconTourney]} />
							<Text style={styles.text}>Tournament</Text>
						</TouchableOpacity>
					</View>
				</View>
			</ImageBackground>
		</View>
	)
}

export default Home

const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
	bgImg: {
		width: '100%',
		height: '100%',
		flexDirection: 'column',
		alignItems: 'center',
	},
	content: {
		position: 'relative',
		top: windowHeight * 0.108,
	},
	blockButton: {
		borderRadius: 5,
		height: windowHeight * 0.25,
		width: windowWidth * 0.45,
		marginVertical: windowHeight * 0.015,
		marginHorizontal: windowWidth * 0.025,
		alignItems: 'center',
		justifyContent: 'center',
	},
	blockRow: {
		flexDirection: 'row',
	},
	text: {
		fontSize: 18,
		color: '#fff',
		fontWeight: '600',
		shadowColor: '#000',
		shadowOffset: { width: 1.5, height: 1.5 },
		shadowOpacity: 0.75,
		shadowRadius: 0.5,
	},
	smalltext: {
		fontSize: 14,
		color: '#fff',
		fontWeight: '600',
		shadowColor: '#000',
		shadowOffset: { width: 1.5, height: 1.5 },
		shadowOpacity: 0.75,
		shadowRadius: 0.5,
	},
	blueText: {
		color: '#2c385e',
		shadowOffset: { width: 1.5, height: 1.5 },
		shadowOpacity: 0.25,
		shadowRadius: 0.5,
	},
	btnLCR: {
		backgroundColor: 'rgb(2,19,66)',
	},
	btnTourney: {
		backgroundColor: 'rgb(246, 88, 28)',
	},
	btnPhotos: {
		backgroundColor: 'rgb(100, 42, 141)',
	},
	btnNews: {
		backgroundColor: 'rgb(254, 222, 0)',
	},
	btnLeader: {
		backgroundColor: '#708199',
	},
	btnTides: {
		backgroundColor: '#fafafa',
	},
	icon: {
		height: 150,
		width: 150,
		resizeMode: 'contain',
		// shadowOffset: { width: 4, height: 4 },
		// shadowOpacity: 0.75,
		// shadowRadius: 2.5,
		// shadowColor: '#000',
		// shadowOffset: { width: 4, height: 4 },
		// shadowOpacity: 0.7,
		// shadowRadius: 2,
	},
	// iconLCR: {},
	// iconTides: {},
	iconPhotos: {
		height: 150,
		width: 170,
	},
	// iconNews: {},
	iconLeader: {
		// shadowOffset: { width: 2, height: 2 },
		// shadowOpacity: 0.75,
		// shadowRadius: 1.5,
		// height: 150,
		// width: 'auto',
	},
	// iconTourney: {},
})
