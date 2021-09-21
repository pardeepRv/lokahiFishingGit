import React, { useContext } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { HeaderButtons, Item, HeaderButton } from 'react-navigation-header-buttons'
import MenuIcon from 'react-native-vector-icons/Entypo'
import ShareIcon from 'react-native-vector-icons/Ionicons'
// import FilterIcon from 'react-native-vector-icons/Ionicons';
// import BackIcon from 'react-native-vector-icons/Feather';
import { Dimensions, TouchableOpacity } from 'react-native'
import Members from '../Screens/drawerNavScreens/Members/Members'
import MemberProfile from '../Screens/drawerNavScreens/Members/MemberProfile'
import MemberSinglePhoto from '../Screens/drawerNavScreens/Members/MemberProfileTabs/MemberSinglePhoto'
import { MemberContext } from '../../context/MemberContext/memberProvider'

const Stack = createStackNavigator()

const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width

export const MembersStack = ({ navigation }) => {
	const { membersList, selectedPhoto, selectedMember } = useContext(MemberContext)

	// const FilterHeaderButton = props => <HeaderButton IconComponent={FilterIcon} iconSize={23} {...props} />;
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
			initialRouteName='Members'
		>
			<Stack.Screen
				name='Members'
				component={Members}
				options={({ navigation }) => ({
					title: 'Members',
					headerTitle: `${membersList.length} Members`,
					// headerShown: false,
					drawerIcon: () => <FontAwesomeIcon name='group' size={18} color='white' style={{ marginRight: -12 }} />,
					headerLeft: () => (
						<TouchableOpacity>
							<HeaderButtons>
								<Item title='Menu' IconComponent={MenuIcon} iconName='menu' iconSize={40} color='#fafafa' onPress={navigation.toggleDrawer} />
							</HeaderButtons>
						</TouchableOpacity>
					),
					// headerRight: () => (
					// 	<TouchableOpacity
					// 		onPress={() => {
					// 			setIsFilterVisible(!isFilterVisible);
					// 		}}
					// 		style={{ marginRight: 10 }}
					// 	>
					// 		<HeaderButtons HeaderButtonComponent={FilterHeaderButton}>
					// 			<FilterIcon name='filter' size={30} color='#fafafa' />
					// 		</HeaderButtons>
					// 	</TouchableOpacity>
					// ),
				})}
			/>
			<Stack.Screen
				name='MemberProfile'
				component={MemberProfile}
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
					// headerShown: false,
					// headerLeft: () => (
					// 	<TouchableOpacity>
					// 		<HeaderButtons HeaderButtonComponent={ShareHeaderButton}>
					// 			<BackIcon name='chevron-left' size={42} color='#fafafa' onPress={() => navigation.navigate('Members')} />
					// 		</HeaderButtons>
					// 	</TouchableOpacity>
					// ),
				}}
			/>
			<Stack.Screen
				name='MemberSinglePhoto'
				component={MemberSinglePhoto}
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
		</Stack.Navigator>
	)
}
