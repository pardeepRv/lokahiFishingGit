import React, { createContext, useState } from 'react'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
export const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null)
	const [registrationObj, setRegistrationObj] = useState(null)

	return (
		<AuthContext.Provider
			value={{
				user,
				registrationObj,
				setUser,
				login: async (email, password) => {
					try {
						await auth()
							.signInWithEmailAndPassword(email, password)
							.then(res => {
								console.log('User account created & signed in!', res)
								setUser(res)
							})
					} catch (error) {
						if (error.code === 'auth/email-already-in-use') {
							console.log('That email address is already in use!')
						}

						if (error.code === 'auth/invalid-email') {
							console.log('That email address is invalid!')
						}

						console.error(error)
					}
				},
				register: async (email, password, regObj) => {
					try {
						await auth()
							.createUserWithEmailAndPassword(email, password)
							.then(res => {
								console.log('Account created! ', res)
								const user = res.user._user.uid
								console.log('UserId: ', regObj)
								setUser(res)
								firestore()
									.collection('Users')
									.doc(user)
									.set({ ...regObj, User_Id: res.user._user.uid })
							})
					} catch (e) {}
				},
				logout: async (email, password) => {
					try {
						await auth()
							.signOut()
							.then(() => console.log('User signed out!'), setUser(''))
					} catch (e) {}
				},
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}
