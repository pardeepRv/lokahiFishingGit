import React, { useState, useContext, useEffect } from 'react'
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer'
import firestore from '@react-native-firebase/firestore'
import { MainStack } from './mainStack'
import { MembersStack } from './membersStack'
import { LCRStack } from './lcrStack'
// import PendingLCR from '../Screens/drawerNavScreens/PendingLCR/PendingLCR';
import LCRList from '../Screens/drawerNavScreens/LCRList/LCRList'
import TournamentRules from '../Screens/drawerNavScreens/TournamentRules/TournamentRules'
// import TagandReleaseList from '../Screens/drawerNavScreens/TagandReleaseList/TagandReleaseList';
import VideoTips from '../Screens/drawerNavScreens/VideoTips/VideoTips'
import LCRFilter from '../Screens/drawerNavScreens/LCRFilter/LCRFilter'
// import CatchReportLocations from '../Screens/drawerNavScreens/CatchReportLocations/CatchReportLocations';
import FriendRequests from '../Screens/drawerNavScreens/FriendRequests/FriendRequests'
// import Survey from '../Screens/drawerNavScreens/Survey/Survey';
import ImportantLinks from '../Screens/drawerNavScreens/ImportantLinks/ImportantLinks'
// import Members from '../Screens/drawerNavScreens/Members/Members';
// import MemberProfile from '../Screens/drawerNavScreens/Members/MemberProfile';
import Friends from '../Screens/drawerNavScreens/Friends/Friends'
// import Gallery from '../Screens/drawerNavScreens/Gallery/Gallery';
import MyProfile from '../Screens/drawerNavScreens/MyProfile/MyProfile'
import About from '../Screens/drawerNavScreens/About/About'
import PrivacyPolicy from '../Screens/drawerNavScreens/PrivacyPolicy/PrivacyPolicy'
import TermsandConditions from '../Screens/drawerNavScreens/TermsandConditions/TermsandConditions'
import Settings from '../Screens/drawerNavScreens/Settings/Settings'

import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import IonIcon from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

import { TouchableOpacity, Alert, Linking, View, Text, Dimensions, ImageBackground } from 'react-native'
import { HeaderButtons, Item, HiddenItem, OverflowMenu, HeaderButton } from 'react-navigation-header-buttons'
import MenuIcon from 'react-native-vector-icons/Entypo'
// import auth from '@react-native-firebase/auth';
import PencilIcon from 'react-native-vector-icons/SimpleLineIcons'
import FastImage from 'react-native-fast-image'
import { AuthContext } from '../../context/authProvider'
import { MemberContext } from '../../context/MemberContext/memberProvider'
import { useNavigation } from '@react-navigation/native'
// import { FriendsBlockedContext } from '../../context/FriendsBlockedContext/friendsBlockedProvider
const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height
const Drawer = createDrawerNavigator()

export const DrawerNav = ({ navigation }) => {
	const { user, mainUser, setMainUser, logout, setUser } = useContext(AuthContext)
	const { membersList } = useContext(MemberContext)
	// const { friendsList } = useContext(FriendsBlockedContext)

	const handleEmail = () => {
		Linking.openURL('mailto:info@lokahifishing.com?subject=SendMail&body=Description')
	}

	const handleFeedback = () => {
		Linking.openURL('https://forms.gle/mys7NWseSHgiZ9Tw9')
	}

	useEffect(() => {
		const ref = firestore().collection('Users').doc(user?.user?._user?.uid)
		return ref.onSnapshot(querySnapshot => {
			const data = querySnapshot.data()
			setUser({ ...user, data })
		})
	}, [])
	const createTwoButtonAlert = () =>
		Alert.alert('Lokahi', 'Are you sure you want to logout?', [
			{ text: 'Logout', onPress: logout },
			{
				text: 'Cancel',
				onPress: () => console.log('Cancel Pressed'),
				style: 'cancel',
			},
		])

	// const logout = () => {
	// 	auth()
	// 		.signOut()
	// 		.then(() => console.log('User signed out!'));
	// };

	const CustomDrawerContent = props => {
		console.log(props,'props in js')
		// const navigation = useNavigation()
		const {navigate} = props.navigation;


		return (
			// <View>
			// 	<Text>
			// 		kvts
			// 	</Text>
			// </View>
			<ImageBackground source={require('../../media/images/signup_bg.png')} style={{ height: windowHeight }}>
				<DrawerContentScrollView {...props}>
					<TouchableOpacity
						style={{ justifyContent: 'center', alignItems: 'center', marginBottom: windowHeight * 0.02 }}
						onPress={() => navigation.navigate('MyProfile')}
						onPress={() =>  navigate('MyProfile')}

					>
						<FastImage
							style={{ height: windowHeight * 0.12, width: windowHeight * 0.12, borderColor: '#fff', borderWidth: 1, borderRadius: 180 }}
							source={{ uri: user?.data?.User_Image.includes('appspot') ? user?.data?.User_Image : user?.data?.User_Image.slice(0, 78) }}
						/>
						<Text style={{ fontSize: 20, fontWeight: '600', fontFamily: 'Trebuchet MS', color: 'white', marginTop: 10 }}>
							{user?.data?.User_Name}
						</Text>
					</TouchableOpacity>
					<DrawerItemList {...props} />
					<DrawerItem
						label='Contact Us'
						onPress={() => handleEmail()}
						icon={() => <MaterialIcon name='contact-phone' size={22} color='white' style={{ marginRight: -14 }} />}
						labelStyle={{
							width: '115%',
							fontSize: 20,
							fontWeight: '600',
							fontFamily: 'Trebuchet MS',
							marginLeft: -8,
						}}
						inactiveTintColor='#fff'
						style={{ marginVertical: -6 }}
					/>
					<DrawerItem
						label='App Feedback'
						onPress={() => handleFeedback()}
						icon={() => <MaterialIcon name='feedback' size={22} color='white' style={{ marginRight: -14 }} />}
						labelStyle={{
							width: '115%',
							fontSize: 20,
							fontWeight: '600',
							fontFamily: 'Trebuchet MS',
							marginLeft: -8,
						}}
						inactiveTintColor='#fff'
						style={{ marginVertical: -6 }}
					/>
					<DrawerItem
						label='Logout'
						onPress={() => createTwoButtonAlert()}
						icon={() => <MaterialIcon name='logout' size={20} color='white' style={{ marginRight: -10 }} />}
						labelStyle={{
							width: '115%',
							fontSize: 20,
							fontWeight: '600',
							fontFamily: 'Trebuchet MS',
							marginLeft: -8,
						}}
						inactiveTintColor='#fff'
						style={{ marginVertical: -6, marginBottom: 20 }}
					/>
				</DrawerContentScrollView>
			</ImageBackground>
		)
	}

	return (
		<Drawer.Navigator
			drawerContent={props => <CustomDrawerContent {...props} />}
			initialRouteName='MainStack'
			drawerContentOptions={{
				activeTintColor: '#fafafa',
				itemStyle: {
					marginVertical: -6,
					width: '100%',
				},
				inactiveTintColor: '#fff',
				labelStyle: {
					width: '115%',
					fontSize: 20,
					fontWeight: '600',
					fontFamily: 'Trebuchet MS',
					marginLeft: -8,
				},
			}}
			drawerStyle={{
				backgroundColor: '#2c385e',
			}}
			screenOptions={{
				headerStyle: {
					backgroundColor: '#2c385e',
					shadowOpacity: 0,
				},
				headerTitleStyle: {
					fontSize: 24,
					color: '#fafafa',
					shadowOpacity: 0.7,
					shadowColor: '#000',
					shadowOffset: { height: 1, width: 1 },
					shadowRadius: 0,
				},
			}}
		>
			<Drawer.Screen
				name='MainStack'
				component={MainStack}
				options={({ navigation }) => ({
					title: 'Home',
					drawerIcon: () => <FontAwesomeIcon name='home' size={20} color='white' style={{ marginRight: -13 }} />,
				})}
			/>
			{/* <Drawer.Screen
				name='PendingLCR'
				component={PendingLCR}
				options={({ navigation }) => ({
					title: 'Pending LCR',
					headerShown: true,
					drawerIcon: () => <FontAwesomeIcon name='database' size={18} color='white' style={{ marginRight: -10 }} />,
					headerLeft: () => (
						<TouchableOpacity>
							<HeaderButtons>
								<Item title='Menu' IconComponent={MenuIcon} iconName='menu' iconSize={40} color='#fafafa' onPress={navigation.toggleDrawer} />
							</HeaderButtons>
						</TouchableOpacity>
					),
				})}
			/> */}
			<Drawer.Screen
				name='LCRList'
				component={LCRList}
				options={({ navigation }) => ({
					title: 'LCR List',
					headerTitle: 'Recent Local Catches',
					headerTitleStyle: {
						color: '#2c385e',
						fontSize: 24,
					},
					headerShown: true,
					headerStyle: {
						backgroundColor: '#fafafa',
						shadowOpacity: 0,
					},
					drawerIcon: () => <FontAwesomeIcon name='list-ul' size={18} color='white' style={{ marginRight: -12 }} />,
					headerLeft: () => (
						<TouchableOpacity>
							<HeaderButtons>
								<Item title='Menu' IconComponent={MenuIcon} iconName='menu' iconSize={40} color='#2c385e' onPress={navigation.toggleDrawer} />
							</HeaderButtons>
						</TouchableOpacity>
					),
				})}
			/>
			<Drawer.Screen
				name='TournamentRules'
				component={TournamentRules}
				options={({ navigation }) => ({
					title: 'Tournament Rules',
					headerShown: true,
					drawerIcon: () => <FontAwesome5Icon name='scroll' size={16} color='white' style={{ marginRight: -14 }} />,
					headerLeft: () => (
						<TouchableOpacity>
							<HeaderButtons>
								<Item title='Menu' IconComponent={MenuIcon} iconName='menu' iconSize={40} color='#fafafa' onPress={navigation.toggleDrawer} />
							</HeaderButtons>
						</TouchableOpacity>
					),
				})}
			/>
			<Drawer.Screen
				name='MembersStack'
				component={MembersStack}
				options={({ navigation }) => ({
					title: 'Members',
					// headerTitle: `${membersList.length} Members`,
					headerShown: false,
					drawerIcon: () => <FontAwesomeIcon name='group' size={18} color='white' style={{ marginRight: -12 }} />,
					headerLeft: () => (
						<TouchableOpacity>
							<HeaderButtons>
								<Item title='Menu' IconComponent={MenuIcon} iconName='menu' iconSize={40} color='#fafafa' onPress={navigation.toggleDrawer} />
							</HeaderButtons>
						</TouchableOpacity>
					),
				})}
			/>
			{/* <Drawer.Screen
				name='TagandReleaseList'
				component={TagandReleaseList}
				options={({ navigation }) => ({
					title: 'Tag and Release List',
					headerShown: true,
					drawerIcon: () => <FontAwesome5Icon name='fish' size={20} color='white' style={{ marginRight: -16 }} />,
					headerLeft: () => (
						<TouchableOpacity>
							<HeaderButtons>
								<Item title='Menu' IconComponent={MenuIcon} iconName='menu' iconSize={40} color='#fafafa' onPress={navigation.toggleDrawer} />
							</HeaderButtons>
						</TouchableOpacity>
					),
				})}
			/> */}
			<Drawer.Screen
				name='VideoTips'
				component={VideoTips}
				options={({ navigation }) => ({
					title: 'Video Tips',
					headerShown: true,
					drawerIcon: () => <FontAwesomeIcon name='video-camera' size={20} color='white' style={{ marginRight: -12 }} />,
					headerLeft: () => (
						<TouchableOpacity>
							<HeaderButtons>
								<Item title='Menu' IconComponent={MenuIcon} iconName='menu' iconSize={40} color='#fafafa' onPress={navigation.toggleDrawer} />
							</HeaderButtons>
						</TouchableOpacity>
					),
				})}
			/>
			<Drawer.Screen
				name='LCRFilter'
				component={LCRFilter}
				options={({ navigation }) => ({
					title: 'LCR Filter',
					headerShown: true,
					drawerIcon: () => <FontAwesomeIcon name='filter' size={20} color='white' style={{ marginRight: -8 }} />,
					headerLeft: () => (
						<TouchableOpacity>
							<HeaderButtons>
								<Item title='Menu' IconComponent={MenuIcon} iconName='menu' iconSize={40} color='#fafafa' onPress={navigation.toggleDrawer} />
							</HeaderButtons>
						</TouchableOpacity>
					),
				})}
			/>
			{/* <Drawer.Screen
				name='CatchReportLocations'
				component={CatchReportLocations}
				options={({ navigation }) => ({
					title: 'Catch Report Locations',
					headerShown: true,
					drawerIcon: () => <IonIcon name='location-outline' size={22} color='white' style={{ marginRight: -14 }} />,
					headerLeft: () => (
						<TouchableOpacity>
							<HeaderButtons>
								<Item title='Menu' IconComponent={MenuIcon} iconName='menu' iconSize={40} color='#fafafa' onPress={navigation.toggleDrawer} />
							</HeaderButtons>
						</TouchableOpacity>
					),
				})}
			/> */}
			<Drawer.Screen
				name='FriendRequests'
				component={FriendRequests}
				options={({ navigation }) => ({
					title: 'Friend Requests',
					headerShown: true,
					drawerIcon: () => <FontAwesome5Icon name='bell' size={20} color='white' style={{ marginRight: -10 }} />,
					headerLeft: () => (
						<TouchableOpacity>
							<HeaderButtons>
								<Item title='Menu' IconComponent={MenuIcon} iconName='menu' iconSize={40} color='#fafafa' onPress={navigation.toggleDrawer} />
							</HeaderButtons>
						</TouchableOpacity>
					),
				})}
			/>
			{/* <Drawer.Screen
				name='Survey'
				component={Survey}
				options={({ navigation }) => ({
					title: 'Survey',
					headerShown: true,
					drawerIcon: () => <IonIcon name='document-text-outline' size={22} color='white' style={{ marginRight: -14 }} />,
					headerLeft: () => (
						<TouchableOpacity>
							<HeaderButtons>
								<Item title='Menu' IconComponent={MenuIcon} iconName='menu' iconSize={40} color='#fafafa' onPress={navigation.toggleDrawer} />
							</HeaderButtons>
						</TouchableOpacity>
					),
				})}
			/> */}
			<Drawer.Screen
				name='Friends'
				component={Friends}
				options={({ navigation }) => ({
					title: 'Friends',
					headerShown: true,
					drawerIcon: () => <IonIcon name='ios-people-outline' size={24} color='white' style={{ marginRight: -16 }} />,
					headerLeft: () => (
						<TouchableOpacity>
							<HeaderButtons>
								<Item title='Menu' IconComponent={MenuIcon} iconName='menu' iconSize={40} color='#fafafa' onPress={navigation.toggleDrawer} />
							</HeaderButtons>
						</TouchableOpacity>
					),
				})}
			/>
			<Drawer.Screen
				name='MyProfile'
				component={MyProfile}
				options={({ navigation }) => ({
					title: 'My Profile',
					headerShown: true,
					headerStyle: {
						backgroundColor: 'transparent',
					},
					drawerIcon: () => <IonIcon name='person-outline' size={20} color='white' style={{ marginRight: -12 }} />,
					headerLeft: () => (
						<TouchableOpacity>
							<HeaderButtons>
								<Item title='Menu' IconComponent={MenuIcon} iconName='menu' iconSize={40} color='#fafafa' onPress={navigation.toggleDrawer} />
							</HeaderButtons>
						</TouchableOpacity>
					),
					headerRight: () => (
						<HeaderButtons>
							<OverflowMenu
								style={{ marginHorizontal: 10 }}
								OverflowIcon={() => (
									<TouchableOpacity>
										<PencilIcon name='pencil' size={23} color={'#fff'} />
									</TouchableOpacity>
								)}
							>
								{/* <Item title='What do you want to edit?' /> */}
								<HiddenItem title='Edit Profile' onPress={() => navigation.navigate('EditProfile')} />
								<HiddenItem title='Edit Boat Info' onPress={() => navigation.navigate('EditBoatInfo')} />
								{/* <HiddenItem title='Emergency Contacts' onPress={() => navigation.navigate('EditContacts')} /> */}
							</OverflowMenu>
						</HeaderButtons>
					),
				})}
			/>
			<Drawer.Screen
				name='About'
				component={About}
				options={({ navigation }) => ({
					title: 'About',
					headerShown: true,
					drawerIcon: () => <IonIcon name='information-circle-outline' size={22} color='white' style={{ marginRight: -14 }} />,
					headerLeft: () => (
						<TouchableOpacity>
							<HeaderButtons>
								<Item title='Menu' IconComponent={MenuIcon} iconName='menu' iconSize={40} color='#fafafa' onPress={navigation.toggleDrawer} />
							</HeaderButtons>
						</TouchableOpacity>
					),
				})}
			/>
			<Drawer.Screen
				name='PrivacyPolicy'
				component={PrivacyPolicy}
				options={({ navigation }) => ({
					title: 'Privacy Policy',
					headerShown: true,
					drawerIcon: () => <FontAwesomeIcon name='id-card-o' size={20} color='white' style={{ marginRight: -14 }} />,
					headerLeft: () => (
						<TouchableOpacity>
							<HeaderButtons>
								<Item title='Menu' IconComponent={MenuIcon} iconName='menu' iconSize={40} color='#fafafa' onPress={navigation.toggleDrawer} />
							</HeaderButtons>
						</TouchableOpacity>
					),
				})}
			/>
			<Drawer.Screen
				name='TermsandConditions'
				component={TermsandConditions}
				options={({ navigation }) => ({
					title: 'Terms & Conditions',
					headerShown: true,
					drawerIcon: () => <MaterialCommunityIcon name='text-box-check-outline' size={24} color='white' style={{ marginRight: -16 }} />,
					headerLeft: () => (
						<TouchableOpacity>
							<HeaderButtons>
								<Item title='Menu' IconComponent={MenuIcon} iconName='menu' iconSize={40} color='#fafafa' onPress={navigation.toggleDrawer} />
							</HeaderButtons>
						</TouchableOpacity>
					),
				})}
			/>
			<Drawer.Screen
				name='ImportantLinks'
				component={ImportantLinks}
				options={({ navigation }) => ({
					title: 'Important Links',
					headerShown: true,
					drawerIcon: () => <FontAwesome5Icon name='link' size={18} color='white' style={{ marginRight: -10 }} />,
					headerLeft: () => (
						<TouchableOpacity>
							<HeaderButtons>
								<Item title='Menu' IconComponent={MenuIcon} iconName='menu' iconSize={40} color='#fafafa' onPress={navigation.toggleDrawer} />
							</HeaderButtons>
						</TouchableOpacity>
					),
				})}
			/>
			<Drawer.Screen
				name='Settings'
				component={Settings}
				options={({ navigation }) => ({
					title: 'Settings',
					headerShown: true,
					drawerIcon: () => <IonIcon name='settings-outline' size={22} color='white' style={{ marginRight: -12 }} />,
					headerLeft: () => (
						<TouchableOpacity>
							<HeaderButtons>
								<Item title='Menu' IconComponent={MenuIcon} iconName='menu' iconSize={40} color='#fafafa' onPress={navigation.toggleDrawer} />
							</HeaderButtons>
						</TouchableOpacity>
					),
				})}
			/>
		</Drawer.Navigator>
	)
}
