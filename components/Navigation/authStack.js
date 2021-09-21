import React from 'react'
// import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'

import SignUp from '../Auth/signUp'
import Login from '../Auth/login'
import ForgotPassword from '../Auth/forgotPassword'
import ResetPassword from '../Auth/resetPassword'
import { HeaderBackButton } from '@react-navigation/elements'

const Stack = createStackNavigator()

export const AuthStack = () => {
	return (
		<Stack.Navigator
			initialRouteName='Login'
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
		>
			<Stack.Screen
				name='Login'
				component={Login}
				options={{
					header: () => null,
				}}
			/>
			<Stack.Screen
				name='SignUp'
				component={SignUp}
				options={{
					header: () => null,
				}}
			/>
			<Stack.Screen
				name='ForgotPassword'
				options={{
					headerTitle: 'Forgot Password',
					headerTintColor: '#fafafa',
				}}
				component={ForgotPassword}
			/>
			<Stack.Screen
				name='ResetPassword'
				options={{
					headerTitle: 'Reset Password',
					headerTintColor: '#fafafa',
				}}
				component={ResetPassword}
			/>
		</Stack.Navigator>
	)
}
