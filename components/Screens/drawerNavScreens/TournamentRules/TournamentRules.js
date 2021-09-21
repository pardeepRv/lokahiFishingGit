import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, Dimensions, View } from 'react-native';
import Pdf from 'react-native-pdf';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

const PDFOffshore = () => {
	return <Pdf source={require('./LokahiRules&Regulations.docx.pdf')} style={styles.pdf} loading='Loading PDF...' />;
};

const PDFShoreline = () => {
	return <Pdf source={require('./Rules_&_Regulations_Shorleing_2020.docx.pdf')} style={styles.pdf} loading='Loading PDF...' />;
};

const PDFBottomFish = () => {
	return <Pdf source={require('./Rules_&_Regulations_Bottomfish_2020.docx.pdf')} style={styles.pdf} loading='Loading PDF...' />;
};

const TournamentRules = () => {
	return (
		<SafeAreaView style={styles.content}>
			<Tab.Navigator
				tabBarOptions={{
					style: {
						backgroundColor: '#2c385e',
					},
					allowFontScaling: false,
					labelStyle: {
						color: '#fff',
						fontWeight: '700',
						shadowColor: 'black',
						shadowOffset: { width: 1, height: 1 },
						shadowOpacity: 1,
						shadowRadius: 0,
						textTransform: 'none',
						fontSize: 14,
					},
					indicatorStyle: {
						backgroundColor: '#fff',
					},
				}}
			>
				<Tab.Screen name='Offshore' component={PDFOffshore} />
				<Tab.Screen name='Shoreline' component={PDFShoreline} />
				<Tab.Screen name='Deep Fish' component={PDFBottomFish} />
			</Tab.Navigator>
		</SafeAreaView>
	);
};

export default TournamentRules;

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
