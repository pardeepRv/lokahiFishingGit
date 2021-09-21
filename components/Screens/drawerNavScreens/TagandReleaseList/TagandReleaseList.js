import React from 'react';
import { SafeAreaView, StyleSheet, Text, ImageBackground, Dimensions } from 'react-native';

const TagandReleaseList = () => {
	return (
		<ImageBackground source={require('../../../../media/images/signup_bg.png')} style={styles.bgImg}>
			<SafeAreaView style={styles.content}>
				<Text>TagandReleaseList.js</Text>
			</SafeAreaView>
		</ImageBackground>
	);
};

export default TagandReleaseList;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
	bgImg: {
		width: '100%',
		height: '100%',
		flexDirection: 'column',
		alignItems: 'center',
		position: 'absolute',
		top: 0,
		left: 0,
	},
	content: {
		position: 'relative',
		top: windowHeight * 0.108,
	},
});
