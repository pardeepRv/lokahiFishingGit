import React, { useState, useEffect, useContext } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { AuthStack } from './authStack'
import { DrawerNav } from './drawerNav'
import { OverflowMenuProvider } from 'react-navigation-header-buttons'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import { StatusBar } from 'react-native'
import { AuthContext } from '../../context/authProvider'

export const Routes = () => {
	const { user, setUser } = useContext(AuthContext)
	const [loading, setLoading] = useState(true)
	const [initializing, setInitializing] = useState(true)
	const firstTimeUser = user?.data ? user.data.firstTimeUser : false

	const onAuthStateChanged = user => {
		if (user) {
			firestore()
				.collection('Users')
				.doc(user.uid)
				.get()
				.then(doc => {
					if (doc.exists) {
						const dbData = doc.data()
						setUser({ user, dbData })
					} else {
						console.log('No such document!')
					}
				})
				.catch(error => {
					console.log('Error getting document:', error)
				})
		}
		if (initializing) {
			setInitializing(false)
		}
		setLoading(false)
	}

	useEffect(() => {
		const subscriber = auth().onAuthStateChanged(onAuthStateChanged)

		return subscriber
	}, [])

	useEffect(() => {
		const subscriber = auth().onAuthStateChanged(onAuthStateChanged)

		return subscriber
	}, [])

	return (
		<NavigationContainer>
			<StatusBar barStyle='dark-content' />
			<OverflowMenuProvider>{!user ? <AuthStack /> : <DrawerNav />}</OverflowMenuProvider>
		</NavigationContainer>
	)
}
