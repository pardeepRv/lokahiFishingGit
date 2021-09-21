import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, SafeAreaView, StyleSheet, Dimensions, ImageBackground, TouchableOpacity } from 'react-native'
import Image from 'react-native-auto-scale-image'
import Carousel from 'react-native-snap-carousel'
import firestore from '@react-native-firebase/firestore'
import NewsList from './NewsList'
import { Card, ListItem, Button, Icon } from 'react-native-elements'
const News = ({ navigation }) => {
  const [active, setActive] = useState(0)
  const [carousel, setCarousel] = useState('');
  const [ad, setAd] = useState('');
  useEffect(() => {
    const ref = firestore().collection('news').orderBy('title', 'asc');
    return ref.onSnapshot(querySnapshot => {
      const list1 = [];
      querySnapshot.forEach(doc => {
        const {
          title,
          newsRef,
          body
        } = doc.data();
        list1.push({
          id: doc.id,
          name: title,
          image: newsRef,
          body: body
        });
        setAd(list1);
     
      });
    });
  }, []);
  
  const renderImage = img => {
		switch (img) {
			case 0:
				return (
					<View>
						<TouchableOpacity onPress={() => navigation.navigate('Tsutomu')}>
							<Image
								style={{ width: windowWidth * 0.5 }}
								uri={
									'https://firebasestorage.googleapis.com/v0/b/lokahirn.appspot.com/o/ahieps.jpg?alt=media&token=14b95bc2-1229-41bb-9cbe-ca03c10231f0'
								}
							/>
						</TouchableOpacity>
					</View>
				)
			case 1:
				return (
					<View>
						<TouchableOpacity>
							<Image
								style={{ width: windowWidth }}
								uri={
									'https://firebasestorage.googleapis.com/v0/b/lokahirn.appspot.com/o/RFS-LOGO.jpg?alt=media&token=5f7f1e67-0037-4221-971f-73515af9c075'
								}
							/>
						</TouchableOpacity>
					</View>
				)
			case 2:
				return (
					<View>
						<TouchableOpacity onPress={() => navigation.navigate('NittaFishing')}>
							<Image
								style={{ width: windowWidth }}
								uri={
									'https://firebasestorage.googleapis.com/v0/b/lokahirn.appspot.com/o/Nitta.png?alt=media&token=4c7cf8ed-30b4-4482-8ec5-d54d5d89311d'
								}
							/>
						</TouchableOpacity>
					</View>
				)
			case 3:
				return (
					<View>
						<TouchableOpacity onPress={() => navigation.navigate('MorrisLures')}>
							<Image
								style={{ width: windowWidth }}
								uri={
									'https://firebasestorage.googleapis.com/v0/b/lokahirn.appspot.com/o/MorrisLuresBanner.jpg?alt=media&token=16823a36-eab7-4f85-8d0d-e7b317aa2569'
								}
							/>
						</TouchableOpacity>
					</View>
				)

			case 4:
				return (
					<View>
						<TouchableOpacity onPress={() => navigation.navigate('Hobbietat')}>
							<Image
								style={{ width: windowWidth }}
								uri={
									'https://firebasestorage.googleapis.com/v0/b/lokahirn.appspot.com/o/BannerRoy.jpg?alt=media&token=a8cd8a0a-03b6-4a56-8461-581d350cb430'
								}
							/>
						</TouchableOpacity>
					</View>
				)
			case 5:
				return (
					<View>
						<TouchableOpacity onPress={() => navigation.navigate('WestMarine')}>
							<Image
								style={{ width: windowWidth }}
								uri={
									'https://firebasestorage.googleapis.com/v0/b/lokahirn.appspot.com/o/WestMarine.jpg?alt=media&token=ab6fcce7-0685-4c35-ac78-2db91a13affb'
								}
							/>
						</TouchableOpacity>
					</View>
				)
			case 6:
				return (
					<View>
						<TouchableOpacity onPress={() => navigation.navigate('PopHawaii')}>
							<Image
								style={{ width: windowWidth }}
								uri={
									'https://firebasestorage.googleapis.com/v0/b/lokahirn.appspot.com/o/BannerShane.jpg?alt=media&token=2c74adbb-23ab-4832-8cc5-4f3163a741fb'
								}
							/>
						</TouchableOpacity>
					</View>
				)
			case 7:
				return (
					<View>
						<TouchableOpacity onPress={() => navigation.navigate('ArcSolutions')}>
							<Image
								style={{ width: windowWidth }}
								uri={
									'https://firebasestorage.googleapis.com/v0/b/lokahirn.appspot.com/o/ARCLogo.jpg?alt=media&token=8c033acf-130c-49df-b123-a7c197609e4e'
								}
							/>
						</TouchableOpacity>
					</View>
				)
			case 8:
				return (
					<View>
						<TouchableOpacity onPress={() => navigation.navigate('Gyotaku')}>
							<Image
								style={{ width: windowWidth }}
								uri={
									'https://firebasestorage.googleapis.com/v0/b/lokahirn.appspot.com/o/gotaku-logo-redo.jpg?alt=media&token=f47339c9-9e5c-4c53-8c8b-ce5f48bded44'
								}
							/>
						</TouchableOpacity>
					</View>
				)
			case 9:
				return (
					<View>
						<TouchableOpacity onPress={() => navigation.navigate('PacificRim')}>
							<Image
								style={{ width: windowWidth }}
								uri={
									'https://firebasestorage.googleapis.com/v0/b/lokahirn.appspot.com/o/PacificRim.jpg?alt=media&token=c8a12d3a-9b1e-4d33-9de8-c08a04b1a693'
								}
							/>
						</TouchableOpacity>
					</View>
				)
			case 10:
				return (
					<View>
						<TouchableOpacity onPress={() => navigation.navigate('STokunagaStore')}>
							<Image
								style={{ width: windowWidth * 0.45 }}
								uri={
									'https://firebasestorage.googleapis.com/v0/b/lokahirn.appspot.com/o/STokunaga.jpg?alt=media&token=c585274e-df95-4c9d-829b-0477d8d69d7d'
								}
							/>
						</TouchableOpacity>
					</View>
				)
			case 12:
				return (
					<View>
						<TouchableOpacity onPress={() => navigation.navigate('Nicos')}>
							<Image
								style={{ width: windowWidth * 0.5 }}
								uri={
									'https://firebasestorage.googleapis.com/v0/b/lokahirn.appspot.com/o/NicosLogo.jpg?alt=media&token=14e9188c-f871-4448-8629-493c1dae9247'
								}
							/>
						</TouchableOpacity>
					</View>
				)
			case 13:
				return (
					<View>
						<TouchableOpacity onPress={() => navigation.navigate('Hobbietat')}>
							<Image
								style={{ width: windowWidth }}
								uri={
									'https://firebasestorage.googleapis.com/v0/b/lokahirn.appspot.com/o/HobbietatLogo.jpg?alt=media&token=e0388782-e16e-42f8-a87d-7f71da65f27c'
								}
							/>
						</TouchableOpacity>
					</View>
				)
		}
	}

	renderContent = data => {
		return (
			<View>
				<View style={styles.carouselContainer}>{renderImage(data.item.image)}</View>
			</View>
		)
	}
	return (
		<ImageBackground source={require('../../../../media/images/signup_bg.png')} style={styles.image}>
			<SafeAreaView style={{ flex: 5, alignItems: 'center' }}>
				<View style={{ marginBottom: windowWidth * 0.594, marginTop: windowWidth * 0.194, height: windowHeight * 0.6 }}>
					<FlatList data={ad} keyExtractor={item => item.id} renderItem={({ item }) => <NewsList {...item} />} />
				</View>
			</SafeAreaView>
			<Carousel
				ref={c => {
					setCarousel(c)
				}}
				data={[
					{ image: 0 },
					{ image: 1 },
					{ image: 2 },
					{ image: 3 },
					{ image: 4 },
					{ image: 5 },
					{ image: 6 },
					{ image: 7 },
					{ image: 8 },
					{ image: 9 },
					{ image: 10 },
					{ image: 12 },
					{ image: 13 },
				]}
				renderItem={data => renderContent(data)}
				sliderWidth={windowWidth}
				itemWidth={windowWidth}
				autoplay={true}
				autoplayInterval={3500}
				loop={true}
				onSnapToItem={index => {
					setActive(index)
				}}
			/>
		</ImageBackground>
	)
}
export default News
const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height
const styles = StyleSheet.create({
	bgImg: {
		width: '100%',
		height: '100%',
		// flexDirection: 'column',
		// alignItems: 'center',
	},
	content: {
		// position: 'relative',
		// top: windowHeight * 0.108,
	},
	image: {
		flex: 1,
		resizeMode: 'cover',
		justifyContent: 'center',
		height: windowHeight,
	},
	carouselContainer: {
		width: windowWidth,
		justifyContent: 'center',
		alignItems: 'center',
		// position: 'absolute', //Here is the trick
		// bottom: 10, //Here is the trick
		// height: '100%',
		backgroundColor: 'transparent',
		flex: 1,
		marginBottom: 80,
	},
})
