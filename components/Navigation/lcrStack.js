import React, { useContext } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { HeaderButtons, Item, HeaderButton } from 'react-navigation-header-buttons'
import MenuIcon from 'react-native-vector-icons/Entypo'
import ShareIcon from 'react-native-vector-icons/Ionicons'
import { Dimensions, TouchableOpacity } from 'react-native'
import SingleLCR from '../Screens/mainStackScreens/Leaderboard/SingleLCR'
import Leaderboard from '../Screens/mainStackScreens/Leaderboard/leaderboard'
import { LCRContext } from '../../context/LCRContext/lcrProvider'
import EditLCR from '../Screens/mainStackScreens/Leaderboard/EditLCR'
import PencilIcon from 'react-native-vector-icons/SimpleLineIcons'

const Stack = createStackNavigator()

const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width

export const LCRStack = ({ navigation }) => {
	const { selectedLCR } = useContext(LCRContext)

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
			initialRouteName='Leaderboard'
		>
			<Stack.Screen
				name='Leaderboard'
				component={Leaderboard}
				options={({ navigation }) => ({
					title: 'Leaderboard',
					headerTitleStyle: {
						color: '#2c385e',
						fontSize: 24,
						shadowOpacity: 0.7,
						shadowColor: '#000',
						shadowOffset: { height: 1, width: 1 },
						shadowRadius: 0,
					},
					headerBackTitleStyle: {
						color: '#2c385e',
					},
					headerTintColor: '#2c385e',
				})}
			/>
			<Stack.Screen
				name='SingleLCR'
				component={SingleLCR}
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
						<HeaderButtons>
							<TouchableOpacity onPress={() => navigation.navigate('EditLCR')} style={{ marginRight: 10 }}>
								<PencilIcon name='pencil' size={23} color={'#fff'} />
							</TouchableOpacity>
						</HeaderButtons>
					),
				}}
			/>
			<Stack.Screen
				name='EditLCR'
				component={EditLCR}
				options={{
					headerBackTitleVisible: false,
					headerTintColor: '#2c385e',
					title: 'Edit Catch Report',
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
		</Stack.Navigator>
	)
}
