import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ImageBackground, Image } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const TagAndRelease = ({ navigation }) => {
	return (
		<View style={styles.bg}>
			<ImageBackground style={styles.bgImg} source={require('../../../../media/images/backgroundBubble.png')} />
			<View style={styles.content}>
				<View style={styles.profileHeader}></View>
				<View style={styles.imageUpload}>
					<Image source={require('../../../../media/images/catch-report-icons/uploadImage.png')} style={styles.imagePlaceholder} />
				</View>
				<View style={styles.form}>
					<View style={styles.formRow}></View>
					<View style={styles.formRow}></View>
					<View style={styles.formRow}></View>
					<View style={styles.formRow}></View>
					<View style={styles.formRow}></View>
				</View>
			</View>
		</View>
	);
};

export default TagAndRelease;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const borderColor = '#ebebeb';

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
		// justifyContent: 'center',
		alignItems: 'center',
		position: 'relative',
		top: windowHeight * 0.108,
		height: windowHeight * (1 - 0.108),
	},
	profileHeader: {
		width: windowWidth,
		height: windowHeight * 0.075,
		borderBottomColor: borderColor,
		borderBottomWidth: 1,
		borderTopColor: borderColor,
		borderTopWidth: 1,
	},
	imageUpload: {
		justifyContent: 'center',
		alignItems: 'center',
		width: windowWidth,
		height: windowHeight * 0.25,
		borderBottomColor: borderColor,
		borderBottomWidth: 1,
	},
	imagePlaceholder: {
		// width: 150,
		// height: 'auto',
		width: '40%',
		resizeMode: 'contain',
		opacity: 0.8,
	},
	form: {
		width: windowWidth,
		height: windowHeight * (1 - 0.108 - 0.075 - 0.25),
	},
	formRow: {
		width: windowWidth,
		height: windowHeight * 0.075,
		borderBottomColor: borderColor,
		borderBottomWidth: 1,
	},
});
