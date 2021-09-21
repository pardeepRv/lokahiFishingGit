import React from 'react';
import { SafeAreaView, StyleSheet, Text, ImageBackground, Dimensions, ScrollView, View } from 'react-native';
import DotIcon from 'react-native-vector-icons/Entypo';

const About = () => {
	const FishingTools = [
		'Live Catch Report: What kind of fish are being caught, where they are being caught, what they were caught on, when and how they were caught',
		'Educational How To Videos on boating and fishing demonstrated by experts produced professionally in a simple, common-sense style',
		'News Feed on Current Issues with push notification for action needed by members',
		'Events and Meetings: Fishing and boating related community events',
		'Fishing Tournaments: Name, date and contact person',
		'Photo Gallery of recent catches and some historical shots just for fun',
		'Vessel assistance push notification safety feature: Red Alert-Mayday; Yellow Alert-Dead on the water',
	];

	const FishingToolsMapped = FishingTools.map(tool => {
		return (
			<View style={styles.listItem}>
				<DotIcon name='dot-single' size={24} color='#fff' style={{ marginTop: -2 }} />
				<Text style={styles.text}>{tool} </Text>
			</View>
		);
	});

	return (
		<ImageBackground source={require('../../../../media/images/signup_bg.png')} style={styles.bgImg}>
			<SafeAreaView style={styles.content}>
				<ScrollView>
					<Text style={[styles.text, styles.textItem, styles.title]}>Lokahi Fishing - About Us</Text>
					<Text style={[styles.text, styles.textItem]}>
						Lokahi Fishing is a communication tool to assist fishermen in having more fun sharing knowledge and information to catch more fish
						with less effort! Fishermen can unite in greater numbers by being more informed of the news and issues affecting our fisheries and
						taking effective action guided by our team of expert consultants to maintain and grow healthy fishing stocks for our generation and
						future generations of our children! Remember, Sustainability means "Eat and benefit from well managed fisheries Forever!".
					</Text>
					<Text style={[styles.text, styles.textItem, styles.toolsTitle]}>Lokahi Fishing Tools:</Text>
					<Text style={[styles.text, styles.textItem]}>Data feeds for weather, wind sun, moon, tide, sea surface temperature and currents</Text>
					<View style={styles.list}>{FishingToolsMapped}</View>
				</ScrollView>
			</SafeAreaView>
		</ImageBackground>
	);
};

export default About;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
	bgImg: {
		width: windowWidth,
		height: windowHeight,
		flexDirection: 'column',
		alignItems: 'center',
		position: 'absolute',
		top: 0,
		left: 0,
		flex: 1,
	},
	content: {
		position: 'relative',
		top: windowHeight * 0.108,
		width: windowWidth * 0.9,
		display: 'flex',
		flex: 1,
		maxHeight: windowHeight * (1 - 0.108),
	},
	text: {
		color: '#fff',
		fontSize: 18,
		fontWeight: '500',
		lineHeight: 24,
	},
	textItem: {
		paddingVertical: 10,
	},
	list: {
		width: windowWidth * 0.8,
	},
	listItem: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'flex-start',
		paddingVertical: 10,
	},
	title: {
		textAlign: 'center',
		fontSize: 28,
		fontWeight: '700',
		paddingTop: 20,
	},
	toolsTitle: {
		fontWeight: '600',
		fontSize: 22,
	},
});
