import React, { useEffect, useState, useContext, useRef } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet, Dimensions, ImageBackground } from 'react-native';
import { WebView } from 'react-native-webview';

const SeaTemp = ({ navigation }) => {
	const [webPage, setWebPage] = useState('http://www.pacioos.hawaii.edu/water/model-temperature-hawaii/');
	const [prevWebPage, setPrevWebPage] = useState(null);
	const webEl = useRef(null);

	useEffect(() => {
        setWebPage('http://www.pacioos.hawaii.edu/water/model-temperature-hawaii/')
    }, []);

	const handleWebViewNavChange = (newState) => {
        let { title, url } = newState;
        if (url !== prevWebPage) {
            setPrevWebPage(webPage);
            setWebPage(url);
        }
    }
	return (
		<ImageBackground source={require('../../../../media/images/signup_bg.png')} style={styles.bgImg}>
			<View style={styles.content}>
			<WebView
            startInLoadingState={true}
                ref={webEl}
                onNavigationStateChange={handleWebViewNavChange}
                mediaPlaybackRequiresUserAction={true}
                originWhitelist={['*']}
                source={{ uri: webPage  }}
               
                style={{ height: windowHeight * 0.95, width: windowWidth, marginTop: 10, marginBottom:97 }}
            />
			</View>
		</ImageBackground>
	);
};

export default SeaTemp;

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
