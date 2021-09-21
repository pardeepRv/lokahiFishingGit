import React from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, ImageBackground, Dimensions, FlatList, View } from 'react-native';
import { Card } from 'react-native-elements';
import { ListItem, Icon, Switch } from 'react-native-elements'
import { WebView } from 'react-native-webview';

const linkList = [
	{
		id: 1,
		description: 'Hawaii State Legislature Website Url',
		title: 'Hawaii State Legislature',
		link: 'https://www.capitol.hawaii.gov/',
		screen: 'HawaiiLegislature',
	},
	{
		id: 2,
		description: 'Lokahi Fishing website Url',
		title: 'Lokahi Fishing website',
		link: 'https://lokahifishing.com/',
		screen: 'FishingWebsite',
	},
];
const list = [
	{
		id: 1,
		description: 'Hawaii State Legislature Website Url',
		title: 'Hawaii State Legislature',
		link: 'https://www.capitol.hawaii.gov/',
		screen: 'HawaiiLegislature',
	},
	{
		id: 2,
		description: 'Lokahi Fishing website Url',
		title: 'Lokahi Fishing website',
		link: 'https://lokahifishing.com/',
		screen: 'FishingWebsite',
	},
  ]

const ImportantLinks = ({ navigation }) => {
	return (
		<ImageBackground source={require('../../../../media/images/signup_bg.png')} style={styles.bgImg}>
			<SafeAreaView style={styles.content}>
				{/* <FlatList
					data={linkList}
					keyExtractor={item => item.id}
					renderItem={({ item }) => (
						<TouchableOpacity
							onPress={() => {
								navigation.navigate(item.screen, { link: item.link });
							}}
						>
							<Card
								wrapperStyle={{ flexDirection: 'row', width: windowWidth * 0.8, flexWrap: 'wrap' }}
								containerStyle={{ borderRadius: 20, width: windowWidth * 0.9 }}
							>
								<Text style={{ left: 14, fontSize: 18, color: 'black' }}>{item.title}</Text>
								<Text style={{ left: 14, fontSize: 16, color: 'lightgray' }}>{item.description}</Text>
							</Card>
						</TouchableOpacity>
					)}
				/> */}
				<View style={{width: windowWidth,  textAlign:'left'}}>
				{
    list.map((item, i) => (
		<TouchableOpacity
							onPress={() => {
								navigation.navigate(item.screen, { link: item.link });
							}}
						>
      <ListItem key={i} bottomDivider >  
        <ListItem.Content containerStyle={{ borderRadius: 20, width: windowWidth, marginLeft: windowWidth * .1 }}>
        <ListItem.Title style={{ left: 14, fontSize: 18, color: 'black' }}>{item.title}</ListItem.Title> 
		<ListItem.Title style={{ left: 14, fontSize: 16, color: 'lightgray' }}>{item.description}</ListItem.Title>
        </ListItem.Content>
      </ListItem>
	  </TouchableOpacity>
    ))
  }
  </View>
			</SafeAreaView>
		</ImageBackground>
	);
};

export default ImportantLinks;

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
