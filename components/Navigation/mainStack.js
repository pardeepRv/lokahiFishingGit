import React, { useContext } from 'react'
import { Dimensions, TouchableOpacity, Text, Alert } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { HeaderButtons, Item, HiddenItem, OverflowMenu } from 'react-navigation-header-buttons'
import MenuIcon from 'react-native-vector-icons/Entypo'
import ShareIcon from 'react-native-vector-icons/Ionicons'
import BackIcon from 'react-native-vector-icons/Feather'
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize'
import { LCRContext } from '../../context/LCRContext/lcrProvider'
import { LCRStack } from './lcrStack'

import Home from '../Screens/Home/home'
import Current from '../Screens/mainStackScreens/DataFeeds/Current'
import Radar from '../Screens/mainStackScreens/DataFeeds/Radar'
import SeaTemp from '../Screens/mainStackScreens/DataFeeds/SeaTemp'
import Tide from '../Screens/mainStackScreens/DataFeeds/Tide'
import Weather from '../Screens/mainStackScreens/DataFeeds/Weather'
import Wind from '../Screens/mainStackScreens/DataFeeds/Wind'
import BlueMarlin from '../Screens/mainStackScreens/Leaderboard/LeaderboardFish/blueMarlin'
import StripedMarlin from '../Screens/mainStackScreens/Leaderboard/LeaderboardFish/stripedMarlin'
import Spearfish from '../Screens/mainStackScreens/Leaderboard/LeaderboardFish/spearfish'
import Ahi from '../Screens/mainStackScreens/Leaderboard/LeaderboardFish/ahi'
import Aku from '../Screens/mainStackScreens/Leaderboard/LeaderboardFish/aku'
import Ehu from '../Screens/mainStackScreens/Leaderboard/LeaderboardFish/ehu'
import MahiMahi from '../Screens/mainStackScreens/Leaderboard/LeaderboardFish/mahiMahi'
import Omilu from '../Screens/mainStackScreens/Leaderboard/LeaderboardFish/omilu'
import Onaga from '../Screens/mainStackScreens/Leaderboard/LeaderboardFish/onaga'
import Ono from '../Screens/mainStackScreens/Leaderboard/LeaderboardFish/ono'
import Opakapaka from '../Screens/mainStackScreens/Leaderboard/LeaderboardFish/opakapaka'
import Ulua from '../Screens/mainStackScreens/Leaderboard/LeaderboardFish/ulua'
import Uku from '../Screens/mainStackScreens/Leaderboard/LeaderboardFish/uku'
import Opelu from '../Screens/mainStackScreens/Leaderboard/LeaderboardFish/opelu'
import Menpachi from '../Screens/mainStackScreens/Leaderboard/LeaderboardFish/menpachi'
import NoFish from '../Screens/mainStackScreens/Leaderboard/LeaderboardFish/noFish'

import CatchReport from '../Screens/mainStackScreens/CatchReport/catchReport'
import BoatFishing from '../Screens/mainStackScreens/CatchReport/BoatFishing/BoatFishing'
import OffshoreFishType from '../Screens/mainStackScreens/CatchReport/BoatFishing/OffshoreFishing/OffshoreFishType'
import BottomFishing from '../Screens/mainStackScreens/CatchReport/BoatFishing/BottomFishing/BottomFishing'
import DeepBottom from '../Screens/mainStackScreens/CatchReport/BoatFishing/BottomFishing/DeepBottom'
import ShallowBottom from '../Screens/mainStackScreens/CatchReport/BoatFishing/BottomFishing/ShallowBottom'
import ShorelineFishing from '../Screens/mainStackScreens/CatchReport/ShorelineFishing/ShorelineFishing'
import TagAndRelease from '../Screens/mainStackScreens/CatchReport/TagAndRelease'
import Whipping from '../Screens/mainStackScreens/CatchReport/ShorelineFishing/Whipping/Whipping'
import Baitcasting from '../Screens/mainStackScreens/CatchReport/ShorelineFishing/Baitcasting/Baitcasting'
import SlideBait from '../Screens/mainStackScreens/CatchReport/ShorelineFishing/SlideBait/SlideBait'
import LCROptional from '../Screens/mainStackScreens/CatchReport/LCROptional'

import DataFeeds from '../Screens/mainStackScreens/DataFeeds/dataFeeds'
import Leaderboard from '../Screens/mainStackScreens/Leaderboard/leaderboard'
import News from '../Screens/mainStackScreens/News/news'
import SharePhotos from '../Screens/mainStackScreens/SharePhotos/sharePhotos'
import Tournament from '../Screens/mainStackScreens/Tournament/tournament'
import EditProfile from '../Screens/drawerNavScreens/MyProfile/Edit/EditProfile'
import EditBoatInfo from '../Screens/drawerNavScreens/MyProfile/Edit/EditBoatInfo'
// import EditContacts from '../Screens/drawerNavScreens/Profile/Edit/EditContacts';
// import ArrowRightIcon from 'react-native-vector-icons/SimpleLineIcons';
// import MemberProfile from '../Screens/drawerNavScreens/Members/MemberProfile';
// import MemberSinglePhoto from '../Screens/drawerNavScreens/Members/MemberProfileTabs/MemberSinglePhoto';
import MySinglePhoto from '../Screens/drawerNavScreens/MyProfile/MyProfileTabs/MySinglePhoto'
import CatchReportForm from '../Screens/mainStackScreens/CatchReport/catchReport'
import Post from '../Screens/mainStackScreens/SharePhotos/addPost'
import CommentScreen from '../Screens/mainStackScreens/SharePhotos/Comments'
// import LCROptional from '../Screens/mainStackScreens/CatchReport/LCROptional';
import ArcSolutions from '../Screens/mainStackScreens/WebViews/ArcSolutions'
import PopHawaii from '../Screens/mainStackScreens/WebViews/PopHawaii'
import Hobbietat from '../Screens/mainStackScreens/WebViews/Hobbietat'
import Tsutomu from '../Screens/mainStackScreens/WebViews/Tsutomu'
import Gyotaku from '../Screens/mainStackScreens/WebViews/Gyotaku'
import hanapaafishing from '../Screens/mainStackScreens/WebViews/hanapaafishing'
import MorrisLures from '../Screens/mainStackScreens/WebViews/MorrisLures'
import Nicos from '../Screens/mainStackScreens/WebViews/Nicos'
import NittaFishing from '../Screens/mainStackScreens/WebViews/NittaFishing'
import stokunagastore from '../Screens/mainStackScreens/WebViews/STokunagaStore'
import WestMarine from '../Screens/mainStackScreens/WebViews/WestMarine'
import PacificRim from '../Screens/mainStackScreens/WebViews/PacificRim'
import FishingWebsite from '../Screens/drawerNavScreens/ImportantLinks/FishingWebsite'
import HawaiiLegislature from '../Screens/drawerNavScreens/ImportantLinks/HawaiiLegislatureWebsite'

// import DrawerIcon from './drawerIcon';

const Stack = createStackNavigator()

const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width

export const MainStack = ({ navigation }) => {
	const { postLCRtoFB, postLCRtoPhotosFB, postToPhotos, setLCRIsPosting } = useContext(LCRContext)

	const toggleDrawer = () => {
		navigation.toggleDrawer()
	}

	const onLCRPostSubmit = () => {
		setLCRIsPosting(true)
		{
			postToPhotos
				? postLCRtoPhotosFB()
				: Alert.alert(
						'Post Catch Report to Photo Sharing',
						`To enter Lokahi tournaments, you must post your catch report to photo sharing. Would you like to post your catch report to photo sharing?`,
						[
							{
								text: 'Yes',
								onPress: () => postLCRtoPhotosFB(),
							},
							{
								text: 'No',
								style: 'cancel',
							},
						]
				  )
		}
		postLCRtoFB().then(() => {
			setLCRIsPosting(false)
			Alert.alert('LCR', 'Catch report posted!')
			navigation.navigate('Home')
		})
	}

	const ShareHeaderButton = props => <HeaderButton IconComponent={ShareIcon} iconSize={23} {...props} />

	return (
		<Stack.Navigator
			screenOptions={{
				headerTransparent: true,
				headerTitleStyle: {
					fontSize: 24,
					color: '#fafafa',
					shadowOpacity: 0.7,
					shadowColor: '#000',
					shadowOffset: { height: 1, width: 1 },
					shadowRadius: 0,
				},
			}}
			style={{ height: windowHeight, flex: 1 }}
			initialRouteName='Home'
		>
			<Stack.Screen
				name='Home'
				component={Home}
				options={({ navigation }) => ({
					title: 'Lokahi',
					headerLeft: () => (
						<TouchableOpacity>
							<HeaderButtons>
								<Item
									title='Menu'
									IconComponent={MenuIcon}
									iconName='menu'
									iconSize={40}
									color='#fafafa'
									onPress={() => navigation.toggleDrawer()}
								/>
							</HeaderButtons>
						</TouchableOpacity>
					),
				})}
			/>
			<Stack.Screen
				name='CatchReport'
				component={CatchReport}
				options={{
					headerBackTitleVisible: false,
					headerTintColor: '#fff',
					title: 'Select Fishing Type',
				}}
			/>
			<Stack.Screen
				name='BoatFishing'
				component={BoatFishing}
				options={{
					headerBackTitleVisible: false,
					headerTintColor: '#2c385e',
					title: 'Select Boat Fishing Type',
					headerTitleStyle: {
						color: '#2c385e',
						fontSize: 24,
						shadowOpacity: 0.7,
						shadowColor: '#000',
						shadowOffset: { height: 1, width: 1 },
						shadowRadius: 0,
					},
				}}
			/>
			<Stack.Screen
				name='OffshoreFishType'
				component={OffshoreFishType}
				options={{
					headerBackTitleVisible: false,
					headerTintColor: '#2c385e',
					title: 'Select Fish Type',
					headerTitleStyle: {
						color: '#2c385e',
						fontSize: 24,
						shadowOpacity: 0.7,
						shadowColor: '#000',
						shadowOffset: { height: 1, width: 1 },
						shadowRadius: 0,
					},
				}}
			/>
			<Stack.Screen
				name='BottomFishing'
				component={BottomFishing}
				options={{
					headerBackTitleVisible: false,
					headerTintColor: '#2c385e',
					title: 'Select Bottom Fishing Type',
					headerTitleStyle: {
						color: '#2c385e',
						fontSize: 24,
						shadowOpacity: 0.7,
						shadowColor: '#000',
						shadowOffset: { height: 1, width: 1 },
						shadowRadius: 0,
					},
				}}
			/>
			<Stack.Screen
				name='DeepBottom'
				component={DeepBottom}
				options={{
					headerBackTitleVisible: false,
					headerTintColor: '#2c385e',
					title: 'Select Fish Type',
					headerTitleStyle: {
						color: '#2c385e',
						fontSize: 24,
						shadowOpacity: 0.7,
						shadowColor: '#000',
						shadowOffset: { height: 1, width: 1 },
						shadowRadius: 0,
					},
				}}
			/>
			<Stack.Screen
				name='ShallowBottom'
				component={ShallowBottom}
				options={{
					headerBackTitleVisible: false,
					headerTintColor: '#2c385e',
					title: 'Select Fish Type',
					headerTitleStyle: {
						color: '#2c385e',
						fontSize: 24,
						shadowOpacity: 0.7,
						shadowColor: '#000',
						shadowOffset: { height: 1, width: 1 },
						shadowRadius: 0,
					},
				}}
			/>
			<Stack.Screen
				name='TagAndRelease'
				component={TagAndRelease}
				options={{
					headerBackTitleVisible: false,
					headerTintColor: '#2c385e',
					title: 'Tag and Release',
					headerTitleStyle: {
						color: '#2c385e',
						fontSize: 24,
						shadowOpacity: 0.7,
						shadowColor: '#000',
						shadowOffset: { height: 1, width: 1 },
						shadowRadius: 0,
					},
				}}
			/>
			<Stack.Screen
				name='ShorelineFishing'
				component={ShorelineFishing}
				options={{
					headerBackTitleVisible: false,
					headerTintColor: '#2c385e',
					title: 'Select Shoreline Fishing Type',
					headerTitleStyle: {
						color: '#2c385e',
						fontSize: 24,
						shadowOpacity: 0.7,
						shadowColor: '#000',
						shadowOffset: { height: 1, width: 1 },
						shadowRadius: 0,
					},
				}}
			/>
			<Stack.Screen
				name='Whipping'
				component={Whipping}
				options={{
					headerBackTitleVisible: false,
					headerTintColor: '#2c385e',
					title: 'Select Fish Type',
					headerTitleStyle: {
						color: '#2c385e',
						fontSize: 24,
						shadowOpacity: 0.7,
						shadowColor: '#000',
						shadowOffset: { height: 1, width: 1 },
						shadowRadius: 0,
					},
				}}
			/>
			<Stack.Screen
				name='Baitcasting'
				component={Baitcasting}
				options={{
					headerBackTitleVisible: false,
					headerTintColor: '#2c385e',
					title: 'Select Fish Type',
					headerTitleStyle: {
						color: '#2c385e',
						fontSize: 24,
						shadowOpacity: 0.7,
						shadowColor: '#000',
						shadowOffset: { height: 1, width: 1 },
						shadowRadius: 0,
					},
				}}
			/>
			<Stack.Screen
				name='SlideBait'
				component={SlideBait}
				options={{
					headerBackTitleVisible: false,
					headerTintColor: '#2c385e',
					title: 'Select Fish Type',
					headerTitleStyle: {
						color: '#2c385e',
						fontSize: 24,
						shadowOpacity: 0.7,
						shadowColor: '#000',
						shadowOffset: { height: 1, width: 1 },
						shadowRadius: 0,
					},
				}}
			/>
			<Stack.Screen
				name='TidesandWeather'
				component={DataFeeds}
				options={{
					headerBackTitleVisible: false,
					headerTintColor: '#fff',
					headerTitle: 'Tides and Weather',
					headerTitleStyle: {
						color: '#fafafa',
						fontSize: 24,
						shadowOpacity: 0.7,
						shadowColor: '#000',
						shadowOffset: { height: 1, width: 1 },
						shadowRadius: 0,
					},
				}}
			/>
			<Stack.Screen
				name='LCRStack'
				component={LCRStack}
				options={({ navigation }) => ({
					headerBackTitleVisible: false,
					headerTintColor: '#2c385e',
					headerBackTitleStyle: {
						color: '#2c385e',
					},
					headerTitle: 'Leaderboard',
					headerTitleStyle: {
						color: '#2c385e',
						fontSize: 24,
						shadowOpacity: 0.7,
						shadowColor: '#000',
						shadowOffset: { height: 1, width: 1 },
						shadowRadius: 0,
					},
					headerShown: false,
				})}
			/>
			<Stack.Screen
				name='News'
				component={News}
				options={{
					headerBackTitleVisible: false,
					headerTintColor: '#fff',
					title: 'Lokahi News',
					headerTitleStyle: {
						color: '#fafafa',
						fontSize: 24,
						shadowOpacity: 0.7,
						shadowColor: '#000',
						shadowOffset: { height: 1, width: 1 },
						shadowRadius: 0,
					},
				}}
			/>
			<Stack.Screen
				name='SharePhotos'
				component={SharePhotos}
				options={{
					headerBackTitleVisible: false,
					headerTintColor: '#fff',
					title: 'Photo Sharing',
					headerTitleStyle: {
						color: '#fafafa',
						fontSize: 24,
						shadowOpacity: 0.7,
						shadowColor: '#000',
						shadowOffset: { height: 1, width: 1 },
						shadowRadius: 0,
					},
				}}
			/>
			<Stack.Screen
				name='Tournament'
				component={Tournament}
				options={{
					headerBackTitleVisible: false,
					headerTintColor: '#000',
					title: 'Tournament Result List',
					headerTitleStyle: {
						color: '#2c385e',
						fontSize: 24,
						shadowOpacity: 0.7,
						shadowColor: '#000',
						shadowOffset: { height: 1, width: 1 },
						shadowRadius: 0,
					},
				}}
			/>
			<Stack.Screen
				name='Current'
				component={Current}
				options={{
					headerBackTitleVisible: false,
				}}
			/>
			<Stack.Screen
				name='Radar'
				component={Radar}
				options={{
					headerBackTitleVisible: false,
				}}
			/>
			<Stack.Screen
				name='SeaTemp'
				component={SeaTemp}
				options={{
					headerBackTitleVisible: false,
				}}
			/>
			<Stack.Screen
				name='Tide'
				component={Tide}
				options={{
					headerBackTitleVisible: false,
				}}
			/>
			<Stack.Screen
				name='Weather'
				component={Weather}
				options={{
					headerBackTitleVisible: false,
				}}
			/>
			<Stack.Screen
				name='Wind'
				component={Wind}
				options={{
					headerBackTitleVisible: false,
				}}
			/>
			<Stack.Screen name='BlueMarlin' component={BlueMarlin} options={{ title: 'Edit Boat Info' }} />
			<Stack.Screen name='StripedMarlin' component={StripedMarlin} options={{ title: 'Edit Contacts' }} />
			<Stack.Screen name='Spearfish' component={Spearfish} options={{ title: 'Edit Profile' }} />
			<Stack.Screen name='Ahi' component={Ahi} options={{ title: 'Edit Boat Info' }} />
			<Stack.Screen name='MahiMahi' component={MahiMahi} options={{ title: 'Edit Contacts' }} />
			<Stack.Screen name='Ono' component={Ono} options={{ title: 'Edit Profile' }} />
			<Stack.Screen name='Aku' component={Aku} options={{ title: 'Edit Boat Info' }} />
			<Stack.Screen name='Ulua' component={Ulua} options={{ title: 'Edit Contacts' }} />
			<Stack.Screen name='Omilu' component={Omilu} options={{ title: 'Edit Profile' }} />
			<Stack.Screen name='Onaga' component={Onaga} options={{ title: 'Edit Boat Info' }} />
			<Stack.Screen name='Opakapaka' component={Opakapaka} options={{ title: 'Edit Contacts' }} />
			<Stack.Screen name='Ehu' component={Ehu} options={{ title: 'Edit Profile' }} />
			<Stack.Screen name='Uku' component={Uku} options={{ title: 'Edit Boat Info' }} />
			<Stack.Screen name='Opelu' component={Opelu} options={{ title: 'Edit Contacts' }} />
			<Stack.Screen name='Menpachi' component={Menpachi} options={{ title: 'Edit Contacts' }} />
			<Stack.Screen name='NoFish' component={NoFish} options={{ title: 'Edit Contacts' }} />
			<Stack.Screen
				name='EditProfile'
				component={EditProfile}
				options={{
					headerBackTitleVisible: false,
					headerTintColor: '#2c385e',
					title: 'Edit Profile',
					headerTitleStyle: {
						color: '#2c385e',
						fontSize: 24,
						shadowOpacity: 0.7,
						shadowColor: '#000',
						shadowOffset: { height: 1, width: 1 },
						shadowRadius: 0,
					},
					headerLeft: () => (
						<TouchableOpacity>
							<HeaderButtons>
								<Item title='Menu' IconComponent={MenuIcon} iconName='menu' iconSize={40} color='#2c385e' onPress={navigation.toggleDrawer} />
							</HeaderButtons>
						</TouchableOpacity>
					),
				}}
			/>
			<Stack.Screen
				name='EditBoatInfo'
				component={EditBoatInfo}
				options={{
					headerBackTitleVisible: false,
					headerTintColor: '#2c385e',
					title: 'Edit Boat Info',
					headerTitleStyle: {
						color: '#2c385e',
						fontSize: 24,
						shadowOpacity: 0.7,
						shadowColor: '#000',
						shadowOffset: { height: 1, width: 1 },
						shadowRadius: 0,
					},
				}}
			/>
			{/* <Stack.Screen
				name='EditContacts'
				component={EditContacts}
				options={{
					headerBackTitleVisible: false,
					headerTintColor: '#2c385e',
					title: 'Edit Contacts',
					headerTitleStyle: {
						color: '#2c385e',
						fontSize: 24,
						shadowOpacity: 0.7,
						shadowColor: '#000',
						shadowOffset: { height: 1, width: 1 },
						shadowRadius: 0,
					},
				}}
			/> */}
			<Stack.Screen
				name='MySinglePhoto'
				component={MySinglePhoto}
				options={{
					headerBackTitleVisible: false,
					headerTintColor: '#fafafa',
					title: '',
					headerTitleStyle: {
						color: '#fafafa',
						fontSize: 24,
						shadowOpacity: 0.7,
						shadowColor: '#000',
						shadowOffset: { height: 1, width: 1 },
						shadowRadius: 0,
					},
					headerRight: () => (
						<TouchableOpacity>
							<HeaderButtons HeaderButtonComponent={ShareHeaderButton}>
								<ShareIcon name='share-outline' size={30} color='#fafafa' />
							</HeaderButtons>
						</TouchableOpacity>
					),
				}}
			/>
			{/* <Stack.Screen
				name='CatchReportForm'
				component={CatchReportForm}
				options={{
					headerBackTitleVisible: false,
					headerTintColor: '#2c385e',
					title: 'Catch Report',
					headerTitleStyle: {
						color: '#2c385e',
						fontSize: 24,
						shadowOpacity: 0.7,
						shadowColor: '#000',
						shadowOffset: { height: 1, width: 1 },
						shadowRadius: 0,
					},
					headerRight: () => (
						<TouchableOpacity>
							<Text
								style={{
									color: 'green',
									fontSize: 24,
									textDecorationLine: 'underline',
									shadowOpacity: 0.7,
									shadowColor: '#000',
									shadowOffset: { height: 1, width: 1 },
									shadowRadius: 0,
									marginRight: 15,
								}}
							>
								Post
							</Text>
						</TouchableOpacity>
					),
				}}
			/> */}

			<Stack.Screen
				name='LCROptional'
				component={LCROptional}
				options={{
					headerBackTitleVisible: false,
					headerTintColor: '#2c385e',
					title: 'Catch Report',
					headerTitleStyle: {
						color: '#2c385e',
						fontSize: 24,
						shadowOpacity: 0.7,
						shadowColor: '#000',
						shadowOffset: { height: 1, width: 1 },
						shadowRadius: 0,
					},
					headerRight: () => (
						<TouchableOpacity onPress={onLCRPostSubmit}>
							<Text
								style={{
									color: 'green',
									fontSize: 24,
									textDecorationLine: 'underline',
									shadowOpacity: 0.7,
									shadowColor: '#000',
									shadowOffset: { height: 1, width: 1 },
									shadowRadius: 0,
									marginRight: 15,
								}}
							>
								Post
							</Text>
						</TouchableOpacity>
					),
				}}
			/>
			<Stack.Screen
				name='Post'
				component={Post}
				options={{
					headerTintColor: '#2c385e',
					headerTitleStyle: {
						color: '#2c385e',
						fontSize: 24,
						shadowOpacity: 0.7,
						shadowColor: '#000',
						shadowOffset: { height: 1, width: 1 },
						shadowRadius: 0,
					},
				}}
			/>
			<Stack.Screen name='Comments' component={CommentScreen} options={{ title: '', headerBackTitleVisible: false }} />
			<Stack.Screen name='ArcSolutions' component={ArcSolutions} options={{ headerBackTitleVisible: false }} />
			<Stack.Screen name='PopHawaii' component={PopHawaii} options={{ headerBackTitleVisible: false }} />
			<Stack.Screen name='Hobbietat' component={Hobbietat} options={{ headerBackTitleVisible: false }} />
			<Stack.Screen name='Tsutomu' component={Tsutomu} options={{ headerBackTitleVisible: false }} />
			<Stack.Screen name='Gyotaku' component={Gyotaku} options={{ headerBackTitleVisible: false }} />
			<Stack.Screen name='hanapaafishing' component={hanapaafishing} options={{ headerBackTitleVisible: false }} />
			<Stack.Screen name='MorrisLures' component={MorrisLures} options={{ headerBackTitleVisible: false }} />
			<Stack.Screen name='Nicos' component={Nicos} options={{ headerBackTitleVisible: false }} />
			<Stack.Screen name='NittaFishing' component={NittaFishing} options={{ headerBackTitleVisible: false }} />
			<Stack.Screen name='STokunagaStore' component={stokunagastore} options={{ headerBackTitleVisible: false }} />
			<Stack.Screen name='WestMarine' component={WestMarine} options={{ headerBackTitleVisible: false }} />
			<Stack.Screen name='PacificRim' component={PacificRim} options={{ headerBackTitleVisible: false }} />
			<Stack.Screen name='FishingWebsite' component={FishingWebsite} options={{ title: 'Lokahi Website' }} />
			<Stack.Screen name='HawaiiLegislature' component={HawaiiLegislature} options={{ title: 'Hawaii Legislature' }} />
		</Stack.Navigator>
	)
}
