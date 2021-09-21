import React from 'react';
import { SafeAreaView, StyleSheet, Text, ImageBackground, Dimensions } from 'react-native';
import Pdf from 'react-native-pdf';

const PrivacyPolicy = () => {
	return (
		<SafeAreaView style={styles.content}>
			<Pdf source={require('./Lokahi_Fishing_Privacy_Policy_v1_042319.pdf')} style={styles.pdf} loading='Loading PDF...' />
		</SafeAreaView>
	);
};

export default PrivacyPolicy;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
	content: {
		height: '100%',
		width: '100%',
		flex: 1,
		backgroundColor: '#2c385e',
	},
	pdf: {
		flex: 1,
		width: '100%',
	},
});
