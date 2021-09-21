import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet, Dimensions, ImageBackground } from 'react-native';

const Dashboard = ({ navigation }) => {
	return (
		<ImageBackground source={require('../../../media/images/signup_bg.png')} style={styles.bgImg}>
			<View style={styles.content}>
				<TouchableOpacity
					onPress={() => {
						navigation.navigate('Login');
					}}
				>
					<Text>Terms</Text>
				</TouchableOpacity>
			</View>
		</ImageBackground>
	);
};

export default Dashboard;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

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
});
